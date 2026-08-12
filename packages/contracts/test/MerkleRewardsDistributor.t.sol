// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import {CROQToken} from "../src/CROQToken.sol";
import {MerkleRewardsDistributor} from "../src/MerkleRewardsDistributor.sol";

contract MerkleRewardsDistributorTest is Test {
    CROQToken croqToken;
    MerkleRewardsDistributor distributor;
    address owner = address(1);
    address user1 = address(2);
    address user2 = address(3);
    uint256 cap = 1_000_000_000 * 1e18;

    function setUp() public {
        vm.startBroadcast(owner);
        croqToken = new CROQToken(cap);
        distributor = new MerkleRewardsDistributor(address(croqToken));
        vm.stopBroadcast();
        
        // Mint des tokens pour le distributeur
        vm.startBroadcast(owner);
        croqToken.mint(address(distributor), 1000 * 1e18);
        vm.stopBroadcast();
    }

    // Fonction utilitaire pour calculer la racine Merkle
    function calculateMerkleRoot(bytes32[] memory leaves) internal pure returns (bytes32) {
        if (leaves.length == 0) return bytes32(0);
        if (leaves.length == 1) return leaves[0];
        
        bytes32[] memory currentLevel = leaves;
        while (currentLevel.length > 1) {
            bytes32[] memory nextLevel = new bytes32[(currentLevel.length + 1) / 2];
            for (uint256 i = 0; i < currentLevel.length; i += 2) {
                bytes32 left = currentLevel[i];
                bytes32 right = i + 1 < currentLevel.length ? currentLevel[i + 1] : currentLevel[i];
                nextLevel[i / 2] = hashPair(left, right);
            }
            currentLevel = nextLevel;
        }
        return currentLevel[0];
    }

    // Fonction utilitaire pour hasher une paire
    function hashPair(bytes32 a, bytes32 b) internal pure returns (bytes32) {
        return a < b ? keccak256(abi.encodePacked(a, b)) : keccak256(abi.encodePacked(b, a));
    }

    // Test de la mise à jour de la racine Merkle
    function testUpdateMerkleRoot() public {
        bytes32[] memory leaves = new bytes32[](2);
        leaves[0] = keccak256(abi.encodePacked(user1, 100 * 1e18));
        leaves[1] = keccak256(abi.encodePacked(user2, 200 * 1e18));
        
        bytes32 root = calculateMerkleRoot(leaves);
        uint256 totalRewards = 300 * 1e18;
        
        vm.startBroadcast(owner);
        distributor.updateMerkleRoot(root, totalRewards);
        vm.stopBroadcast();
        
        assertEq(distributor.merkleRoot(), root);
        assertEq(distributor.totalRewards(), totalRewards);
    }

    // Test du claim de récompenses
    function testClaim() public {
        bytes32[] memory leaves = new bytes32[](1);
        leaves[0] = keccak256(abi.encodePacked(user1, 100 * 1e18));
        
        bytes32 root = calculateMerkleRoot(leaves);
        uint256 totalRewards = 100 * 1e18;
        
        vm.startBroadcast(owner);
        distributor.updateMerkleRoot(root, totalRewards);
        vm.stopBroadcast();
        
        // Générer la preuve Merkle (vide pour une seule feuille)
        bytes32[] memory proof = new bytes32[](0);
        
        vm.startBroadcast(user1);
        uint256 balanceBefore = croqToken.balanceOf(user1);
        distributor.claim(100 * 1e18, proof);
        uint256 balanceAfter = croqToken.balanceOf(user1);
        vm.stopBroadcast();
        
        assertEq(balanceAfter - balanceBefore, 100 * 1e18);
        assertTrue(distributor.hasClaimed(user1));
    }

    // Test du claim échoue si la preuve est invalide
    function testClaimInvalidProof() public {
        bytes32[] memory leaves = new bytes32[](1);
        leaves[0] = keccak256(abi.encodePacked(user1, 100 * 1e18));
        
        bytes32 root = calculateMerkleRoot(leaves);
        uint256 totalRewards = 100 * 1e18;
        
        vm.startBroadcast(owner);
        distributor.updateMerkleRoot(root, totalRewards);
        vm.stopBroadcast();
        
        // Utiliser une preuve invalide
        bytes32[] memory invalidProof = new bytes32[](1);
        invalidProof[0] = keccak256(abi.encodePacked("invalid"));
        
        vm.expectRevert("MerkleRewardsDistributor: invalid proof");
        vm.startBroadcast(user1);
        distributor.claim(100 * 1e18, invalidProof);
        vm.stopBroadcast();
    }

    // Test du claim échoue si déjà claimé
    function testClaimAlreadyClaimed() public {
        bytes32[] memory leaves = new bytes32[](1);
        leaves[0] = keccak256(abi.encodePacked(user1, 100 * 1e18));
        
        bytes32 root = calculateMerkleRoot(leaves);
        uint256 totalRewards = 100 * 1e18;
        
        vm.startBroadcast(owner);
        distributor.updateMerkleRoot(root, totalRewards);
        vm.stopBroadcast();
        
        bytes32[] memory proof = new bytes32[](0);
        
        vm.startBroadcast(user1);
        distributor.claim(100 * 1e18, proof);
        vm.stopBroadcast();
        
        // Deuxième tentative
        vm.expectRevert("MerkleRewardsDistributor: already claimed");
        vm.startBroadcast(user1);
        distributor.claim(100 * 1e18, proof);
        vm.stopBroadcast();
    }

    // Test de la pause
    function testPause() public {
        vm.startBroadcast(owner);
        distributor.pause();
        vm.stopBroadcast();
        
        assertTrue(distributor.paused());
        
        // Claim échoue quand en pause
        vm.expectRevert("Pausable: paused");
        vm.startBroadcast(user1);
        distributor.claim(100, new bytes32[](0));
        vm.stopBroadcast();
        
        // Unpause
        vm.startBroadcast(owner);
        distributor.unpause();
        vm.stopBroadcast();
        
        assertFalse(distributor.paused());
    }

    // Test des événements
    function testClaimedEvent() public {
        bytes32[] memory leaves = new bytes32[](1);
        leaves[0] = keccak256(abi.encodePacked(user1, 100 * 1e18));
        
        bytes32 root = calculateMerkleRoot(leaves);
        uint256 totalRewards = 100 * 1e18;
        
        vm.startBroadcast(owner);
        distributor.updateMerkleRoot(root, totalRewards);
        vm.stopBroadcast();
        
        bytes32[] memory proof = new bytes32[](0);
        
        vm.expectEmit(true, true, true, true);
        emit Claimed(user1, 100 * 1e18);
        
        vm.startBroadcast(user1);
        distributor.claim(100 * 1e18, proof);
        vm.stopBroadcast();
    }

    // Test de la vérification de la preuve Merkle
    function testVerifyMerkleProof() public {
        bytes32 leaf = keccak256(abi.encodePacked(user1, 100 * 1e18));
        bytes32[] memory leaves = new bytes32[](2);
        leaves[0] = leaf;
        leaves[1] = keccak256(abi.encodePacked(user2, 200 * 1e18));
        
        bytes32 root = calculateMerkleRoot(leaves);
        
        // Générer la preuve pour leaf
        bytes32[] memory proof = new bytes32[](1);
        proof[0] = leaves[1];
        
        assertTrue(distributor.verifyMerkleProof(leaf, proof, root));
        
        // Test avec une preuve invalide
        bytes32[] memory invalidProof = new bytes32[](1);
        invalidProof[0] = keccak256(abi.encodePacked("invalid"));
        
        assertFalse(distributor.verifyMerkleProof(leaf, invalidProof, root));
    }
}