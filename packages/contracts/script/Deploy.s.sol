// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import {CROQToken} from "../src/CROQToken.sol";
import {CROQStaking} from "../src/CROQStaking.sol";
import {MerkleRewardsDistributor} from "../src/MerkleRewardsDistributor.sol";
import {ProtocolTimelock} from "../src/ProtocolTimelock.sol";
import {ProtocolTreasury} from "../src/ProtocolTreasury.sol";

// Script de déploiement pour les contrats CROQ
// ⚠️  Ce script est conçu pour le déploiement sur un testnet (ex: Sepolia).
//     Pour le mainnet, une validation supplémentaire est requise.
contract Deploy is Script {
    // Configuration du déploiement
    uint256 public constant CROQ_CAP = 1_000_000_000 * 1e18; // 1 milliard de tokens
    address public deployer;
    
    // Adresses des contrats déployés
    address public croqToken;
    address public croqStaking;
    address public merkleRewardsDistributor;
    address public protocolTimelock;
    address public protocolTreasury;

    function run() external {
        // Vérifier que le déploiement est autorisé
        require(
            keccak256(abi.encodePacked(DEPLOY_ENABLED)) != keccak256(abi.encodePacked("false")),
            "Deploy: Deployment is disabled. Set DEPLOY_ENABLED=true to enable."
        );
        
        deployer = msg.sender;
        vm.startBroadcast(deployer);
        
        // Étape 1: Déployer le token CROQ
        croqToken = address(new CROQToken(CROQ_CAP));
        console.log("✅ CROQToken déployé à:", croqToken);
        
        // Étape 2: Déployer le ProtocolTimelock
        address[] memory proposers = new address[](1);
        proposers[0] = deployer;
        address[] memory executors = new address[](1);
        executors[0] = deployer;
        uint256 minDelay = 2 days; // Délai minimal de 2 jours
        
        protocolTimelock = address(new ProtocolTimelock(proposers, executors, minDelay));
        console.log("✅ ProtocolTimelock déployé à:", protocolTimelock);
        
        // Étape 3: Déployer le ProtocolTreasury
        protocolTreasury = address(new ProtocolTreasury(protocolTimelock, croqToken));
        console.log("✅ ProtocolTreasury déployé à:", protocolTreasury);
        
        // Étape 4: Déployer le CROQStaking
        croqStaking = address(new CROQStaking(croqToken));
        console.log("✅ CROQStaking déployé à:", croqStaking);
        
        // Étape 5: Déployer le MerkleRewardsDistributor
        merkleRewardsDistributor = address(new MerkleRewardsDistributor(croqToken));
        console.log("✅ MerkleRewardsDistributor déployé à:", merkleRewardsDistributor);
        
        // Étape 6: Transférer la propriété du token au timelock
        CROQToken(croqToken).transferOwnership(protocolTimelock);
        console.log("✅ Propriété du CROQToken transférée au ProtocolTimelock");
        
        // Étape 7: Mint les tokens initiaux vers la trésorerie
        CROQToken(croqToken).mint(protocolTreasury, CROQ_CAP);
        console.log("✅", CROQ_CAP / 1e18, "CROQ mintés vers la trésorerie");
        
        vm.stopBroadcast();
        
        // Résumé du déploiement
        console.log("\n📋 Résumé du déploiement:");
        console.log("   - CROQToken:", croqToken);
        console.log("   - CROQStaking:", croqStaking);
        console.log("   - MerkleRewardsDistributor:", merkleRewardsDistributor);
        console.log("   - ProtocolTimelock:", protocolTimelock);
        console.log("   - ProtocolTreasury:", protocolTreasury);
        console.log("\n⚠️  Vérifiez les adresses et les permissions avant de continuer.");
    }

    // Fonction pour vérifier le déploiement
    function checkDeployment() external view {
        console.log("🔍 Vérification du déploiement:");
        console.log("   - CROQToken:", croqToken);
        console.log("   - CROQStaking:", croqStaking);
        console.log("   - MerkleRewardsDistributor:", merkleRewardsDistributor);
        console.log("   - ProtocolTimelock:", protocolTimelock);
        console.log("   - ProtocolTreasury:", protocolTreasury);
        
        if (croqToken != address(0)) {
            console.log("✅ CROQToken est déployé");
            console.log("   - Cap:", CROQToken(croqToken).cap() / 1e18, "CROQ");
            console.log("   - Total Supply:", CROQToken(croqToken).totalSupply() / 1e18, "CROQ");
        } else {
            console.log("❌ CROQToken n'est pas déployé");
        }
    }

    // Flag pour activer/désactiver le déploiement (par défaut: false)
    bool public constant DEPLOY_ENABLED = false;
}