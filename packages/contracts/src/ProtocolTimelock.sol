// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {TimelockController} from "@openzeppelin/contracts/governance/TimelockController.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/// @title Protocol Timelock
/// @dev Contrat de timelock pour le protocole Tooth Fairy Exchange.
/// @notice Permet de retarder l'exécution de certaines actions pour plus de sécurité.
contract ProtocolTimelock is Ownable {
    TimelockController public timelock;

    /// @dev Événement émis lors de la création du timelock.
    event TimelockCreated(address indexed timelockAddress);

    /// @dev Constructeur du contrat.
    /// @param proposers_ Liste des adresses autorisées à proposer des actions.
    /// @param executors_ Liste des adresses autorisées à exécuter des actions.
    /// @param minDelay_ Délai minimal pour les actions (en secondes).
    constructor(
        address[] memory proposers_,
        address[] memory executors_,
        uint256 minDelay_
    ) {
        timelock = new TimelockController(minDelay_, proposers_, executors_);
        emit TimelockCreated(address(timelock));
    }

    /// @dev Fonction pour obtenir l'adresse du timelock.
    /// @return Adresse du timelock.
    function getTimelockAddress() external view returns (address) {
        return address(timelock);
    }

    /// @dev Fonction pour mettre à jour le délai minimal.
    /// @param newDelay Nouveau délai minimal (en secondes).
    function updateMinDelay(uint256 newDelay) external onlyOwner {
        timelock.updateDelay(newDelay);
    }
}