// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {ERC20Votes} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/// @title CROQ Token
/// @dev Token ERC-20 avec Permit, Votes, et Pausable pour le protocole Tooth Fairy Exchange.
/// @notice Ce contrat est conçu pour être audit-ready et conforme aux meilleures pratiques.
contract CROQToken is ERC20, ERC20Permit, ERC20Votes, Pausable, Ownable {
    uint256 private _cap;

    /// @dev Événement émis lors du mint de nouveaux tokens.
    event TokensMinted(address indexed to, uint256 amount);

    /// @dev Modificateur pour vérifier que le contrat n'est pas en pause.
    modifier whenNotPaused() {
        require(!paused(), "CROQToken: paused");
        _;
    }

    /// @dev Constructeur du contrat.
    /// @param cap_ Cap maximal de tokens à mint (immutable).
    constructor(uint256 cap_) ERC20("CROQ Protocol Token", "CROQ") ERC20Permit("CROQ Protocol Token") {
        _cap = cap_;
    }

    /// @dev Fonction pour mint des tokens (restreinte au owner).
    /// @param to Adresse du bénéficiaire.
    /// @param amount Montant à mint.
    function mint(address to, uint256 amount) external onlyOwner whenNotPaused {
        require(totalSupply() + amount <= _cap, "CROQToken: cap exceeded");
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }

    /// @dev Fonction pour brûler des tokens.
    /// @param amount Montant à brûler.
    function burn(uint256 amount) external whenNotPaused {
        _burn(msg.sender, amount);
    }

    /// @dev Fonction pour mettre en pause le contrat.
    function pause() external onlyOwner {
        _pause();
    }

    /// @dev Fonction pour reprendre le contrat.
    function unpause() external onlyOwner {
        _unpause();
    }

    /// @dev Fonction pour obtenir le cap maximal.
    /// @return Cap maximal de tokens.
    function cap() external view returns (uint256) {
        return _cap;
    }

    /// @dev Override de la fonction _update pour bloquer les transferts si le contrat est en pause.
    function _update(
        address from,
        address to,
        uint256 value
    ) internal override(ERC20, ERC20Votes) whenNotPaused {
        super._update(from, to, value);
    }

    /// @dev Override de la fonction _afterTokenTransfer pour gérer les votes.
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }

    /// @dev Override de la fonction _mint pour gérer les votes.
    function _mint(
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        super._mint(to, amount);
    }

    /// @dev Override de la fonction _burn pour gérer les votes.
    function _burn(
        address account,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        super._burn(account, amount);
    }
}