// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title Protocol Treasury
/// @dev Trésorerie du protocole Tooth Fairy Exchange.
/// @notice Toutes les transactions doivent passer par un timelock pour plus de sécurité.
contract ProtocolTreasury is Ownable, Pausable, ReentrancyGuard {
    address public timelock;
    IERC20 public croqToken;

    /// @dev Événement émis lors du dépôt de fonds.
    event Deposited(address indexed sender, uint256 amount);

    /// @dev Événement émis lors du retrait de fonds.
    event Withdrawn(address indexed to, uint256 amount);

    /// @dev Constructeur du contrat.
    /// @param timelock_ Adresse du contrat de timelock.
    /// @param croqToken_ Adresse du token CROQ.
    constructor(address timelock_, address croqToken_) {
        timelock = timelock_;
        croqToken = IERC20(croqToken_);
    }

    /// @dev Fonction pour déposer des fonds dans la trésorerie.
    /// @param amount Montant à déposer.
    function deposit(uint256 amount) external whenNotPaused nonReentrant {
        croqToken.transferFrom(msg.sender, address(this), amount);
        emit Deposited(msg.sender, amount);
    }

    /// @dev Fonction pour retirer des fonds de la trésorerie.
    /// @param to Adresse du bénéficiaire.
    /// @param amount Montant à retirer.
    /// @param delay Délai avant exécution (doit correspondre au délai du timelock).
    function scheduleWithdrawal(
        address to,
        uint256 amount,
        uint256 delay,
        bytes memory callData
    ) external onlyOwner {
        // Dans une implémentation réelle, cette fonction appellerait le timelock
        // pour planifier le retrait après un délai.
        // Exemple : timelock.schedule(address(this), 0, callData, bytes32(keccak256(abi.encodePacked(delay))), delay);
        emit Withdrawn(to, amount);
    }

    /// @dev Fonction pour obtenir le solde de la trésorerie.
    /// @return Solde de la trésorerie.
    function getBalance() external view returns (uint256) {
        return croqToken.balanceOf(address(this));
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