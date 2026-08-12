// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";

/// @title Merkle Rewards Distributor
/// @dev Contrat pour distribuer des récompenses via des preuves Merkle.
/// @notice Permet une distribution sécurisée et anti-Sybil des récompenses.
contract MerkleRewardsDistributor is Ownable, Pausable {
    IERC20 public croqToken;
    bytes32 public merkleRoot;
    uint256 public totalRewards;
    uint256 public claimWindowStart;
    uint256 public claimWindowDuration = 30 days;

    mapping(address => bool) public hasClaimed;

    /// @dev Événement émis lors du claim de récompenses.
    event Claimed(address indexed user, uint256 amount);

    /// @dev Événement émis lors de la mise à jour de la racine Merkle.
    event MerkleRootUpdated(bytes32 newRoot, uint256 totalRewards);

    /// @dev Constructeur du contrat.
    /// @param croqToken_ Adresse du token CROQ.
    constructor(address croqToken_) {
        croqToken = IERC20(croqToken_);
    }

    /// @dev Fonction pour mettre à jour la racine Merkle et le montant total des récompenses.
    /// @param newRoot Nouvelle racine Merkle.
    /// @param totalRewards_ Montant total des récompenses.
    function updateMerkleRoot(bytes32 newRoot, uint256 totalRewards_) external onlyOwner {
        merkleRoot = newRoot;
        totalRewards = totalRewards_;
        claimWindowStart = block.timestamp;
        emit MerkleRootUpdated(newRoot, totalRewards_);
    }

    /// @dev Fonction pour claimer ses récompenses.
    /// @param amount Montant à claimer.
    /// @param proof Preuve Merkle.
    function claim(uint256 amount, bytes32[] calldata proof) external whenNotPaused {
        require(block.timestamp >= claimWindowStart, "MerkleRewardsDistributor: claim window not started");
        require(
            block.timestamp <= claimWindowStart + claimWindowDuration,
            "MerkleRewardsDistributor: claim window expired"
        );
        require(!hasClaimed[msg.sender], "MerkleRewardsDistributor: already claimed");

        bytes32 leaf = keccak256(abi.encodePacked(msg.sender, amount));
        require(
            _verify(leaf, proof, merkleRoot),
            "MerkleRewardsDistributor: invalid proof"
        );

        hasClaimed[msg.sender] = true;
        croqToken.transfer(msg.sender, amount);

        emit Claimed(msg.sender, amount);
    }

    /// @dev Fonction pour vérifier une preuve Merkle.
    /// @param leaf Feuille à vérifier.
    /// @param proof Preuve Merkle.
    /// @param root Racine Merkle.
    /// @return Vrai si la preuve est valide.
    function _verify(bytes32 leaf, bytes32[] memory proof, bytes32 root) internal pure returns (bool) {
        bytes32 computedHash = leaf;
        for (uint256 i = 0; i < proof.length; i++) {
            computedHash = _hashPair(computedHash, proof[i]);
        }
        return computedHash == root;
    }

    /// @dev Fonction pour hasher une paire de bytes32.
    /// @param a Premier élément.
    /// @param b Deuxième élément.
    /// @return Hash de la paire.
    function _hashPair(bytes32 a, bytes32 b) internal pure returns (bytes32) {
        return a < b ? keccak256(abi.encodePacked(a, b)) : keccak256(abi.encodePacked(b, a));
    }

    /// @dev Fonction pour mettre en pause le contrat.
    function pause() external onlyOwner {
        _pause();
    }

    /// @dev Fonction pour reprendre le contrat.
    function unpause() external onlyOwner {
        _unpause();
    }
}