// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/// @title CROQ Staking
/// @dev Contrat de staking pour les validateurs du protocole Tooth Fairy Exchange.
/// @notice Permet aux utilisateurs de staker leurs tokens CROQ pour participer à la validation.
contract CROQStaking is Ownable, Pausable, ReentrancyGuard {
    IERC20 public croqToken;
    uint256 public stakingPeriod = 30 days;
    uint256 public withdrawalDelay = 7 days;

    struct Stake {
        uint256 amount;
        uint256 startTime;
        uint256 unlockTime;
    }

    mapping(address => Stake) public stakes;
    mapping(address => bool) public isValidator;

    /// @dev Événement émis lors du staking de tokens.
    event Staked(address indexed user, uint256 amount, uint256 duration);

    /// @dev Événement émis lors du retrait de tokens.
    event Withdrawn(address indexed user, uint256 amount);

    /// @dev Événement émis lors de l'ajout d'un validateur.
    event ValidatorAdded(address indexed validator);

    /// @dev Événement émis lors du retrait d'un validateur.
    event ValidatorRemoved(address indexed validator);

    /// @dev Constructeur du contrat.
    /// @param croqToken_ Adresse du token CROQ.
    constructor(address croqToken_) {
        croqToken = IERC20(croqToken_);
    }

    /// @dev Fonction pour ajouter un validateur.
    /// @param validator Adresse du validateur.
    function addValidator(address validator) external onlyOwner {
        isValidator[validator] = true;
        emit ValidatorAdded(validator);
    }

    /// @dev Fonction pour retirer un validateur.
    /// @param validator Adresse du validateur.
    function removeValidator(address validator) external onlyOwner {
        isValidator[validator] = false;
        emit ValidatorRemoved(validator);
    }

    /// @dev Fonction pour staker des tokens.
    /// @param amount Montant à staker.
    function stake(uint256 amount) external whenNotPaused nonReentrant {
        require(amount > 0, "CROQStaking: amount must be greater than 0");
        require(isValidator[msg.sender], "CROQStaking: not a validator");

        croqToken.transferFrom(msg.sender, address(this), amount);

        uint256 unlockTime = block.timestamp + stakingPeriod + withdrawalDelay;
        stakes[msg.sender] = Stake({
            amount: stakes[msg.sender].amount + amount,
            startTime: block.timestamp,
            unlockTime: unlockTime
        });

        emit Staked(msg.sender, amount, stakingPeriod);
    }

    /// @dev Fonction pour retirer ses tokens après la période de staking.
    function withdraw() external whenNotPaused nonReentrant {
        Stake memory stake = stakes[msg.sender];
        require(stake.amount > 0, "CROQStaking: no stake found");
        require(block.timestamp >= stake.unlockTime, "CROQStaking: stake is locked");

        croqToken.transfer(msg.sender, stake.amount);
        delete stakes[msg.sender];

        emit Withdrawn(msg.sender, stake.amount);
    }

    /// @dev Fonction pour mettre en pause le contrat.
    function pause() external onlyOwner {
        _pause();
    }

    /// @dev Fonction pour reprendre le contrat.
    function unpause() external onlyOwner {
        _unpause();
    }

    /// @dev Fonction pour obtenir le montant staké par un utilisateur.
    /// @param user Adresse de l'utilisateur.
    /// @return Montant staké.
    function getStakedAmount(address user) external view returns (uint256) {
        return stakes[user].amount;
    }

    /// @dev Fonction pour obtenir le temps de déliaison restant pour un utilisateur.
    /// @param user Adresse de l'utilisateur.
    /// @return Temps restant en secondes.
    function getRemainingLockTime(address user) external view returns (uint256) {
        Stake memory stake = stakes[user];
        if (block.timestamp >= stake.unlockTime) {
            return 0;
        }
        return stake.unlockTime - block.timestamp;
    }
}