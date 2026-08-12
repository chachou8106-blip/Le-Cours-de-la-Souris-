// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import {CROQToken} from "../src/CROQToken.sol";

contract CROQTokenTest is Test {
    CROQToken croqToken;
    address owner = address(1);
    address user1 = address(2);
    address user2 = address(3);
    uint256 cap = 1_000_000_000 * 1e18; // 1 milliard de tokens

    function setUp() public {
        vm.startBroadcast(owner);
        croqToken = new CROQToken(cap);
        vm.stopBroadcast();
    }

    // Test du déploiement
    function testDeployment() public {
        assertEq(croqToken.cap(), cap);
        assertEq(croqToken.totalSupply(), 0);
        assertEq(croqToken.owner(), owner);
    }

    // Test du mint
    function testMint() public {
        uint256 amount = 100 * 1e18;
        
        // Mint réussi
        vm.startBroadcast(owner);
        croqToken.mint(user1, amount);
        vm.stopBroadcast();
        
        assertEq(croqToken.balanceOf(user1), amount);
        assertEq(croqToken.totalSupply(), amount);
        
        // Mint échoue si non-owner
        vm.expectRevert("Ownable: caller is not the owner");
        vm.startBroadcast(user1);
        croqToken.mint(user2, amount);
        vm.stopBroadcast();
    }

    // Test du mint dépassant le cap
    function testMintExceedsCap() public {
        vm.startBroadcast(owner);
        croqToken.mint(user1, cap);
        vm.stopBroadcast();
        
        vm.expectRevert("CROQToken: cap exceeded");
        vm.startBroadcast(owner);
        croqToken.mint(user2, 1);
        vm.stopBroadcast();
    }

    // Test du burn
    function testBurn() public {
        uint256 amount = 100 * 1e18;
        
        vm.startBroadcast(owner);
        croqToken.mint(user1, amount);
        vm.stopBroadcast();
        
        vm.startBroadcast(user1);
        croqToken.burn(amount / 2);
        vm.stopBroadcast();
        
        assertEq(croqToken.balanceOf(user1), amount / 2);
        assertEq(croqToken.totalSupply(), amount / 2);
    }

    // Test de la pause
    function testPause() public {
        vm.startBroadcast(owner);
        croqToken.pause();
        vm.stopBroadcast();
        
        assertTrue(croqToken.paused());
        
        // Mint échoue quand en pause
        vm.expectRevert("Pausable: paused");
        vm.startBroadcast(owner);
        croqToken.mint(user1, 100);
        vm.stopBroadcast();
        
        // Unpause
        vm.startBroadcast(owner);
        croqToken.unpause();
        vm.stopBroadcast();
        
        assertFalse(croqToken.paused());
    }

    // Test des transferts
    function testTransfer() public {
        uint256 amount = 100 * 1e18;
        
        vm.startBroadcast(owner);
        croqToken.mint(user1, amount);
        vm.stopBroadcast();
        
        vm.startBroadcast(user1);
        croqToken.transfer(user2, amount / 2);
        vm.stopBroadcast();
        
        assertEq(croqToken.balanceOf(user1), amount / 2);
        assertEq(croqToken.balanceOf(user2), amount / 2);
    }

    // Test des transferts en pause
    function testTransferWhenPaused() public {
        uint256 amount = 100 * 1e18;
        
        vm.startBroadcast(owner);
        croqToken.mint(user1, amount);
        croqToken.pause();
        vm.stopBroadcast();
        
        vm.expectRevert("Pausable: paused");
        vm.startBroadcast(user1);
        croqToken.transfer(user2, amount / 2);
        vm.stopBroadcast();
    }

    // Test des métadonnées du token
    function testTokenMetadata() public {
        assertEq(croqToken.name(), "CROQ Protocol Token");
        assertEq(croqToken.symbol(), "CROQ");
        assertEq(croqToken.decimals(), 18);
    }

    // Test des événements
    function testMintEvent() public {
        uint256 amount = 100 * 1e18;
        
        vm.expectEmit(true, true, true, true);
        emit TokensMinted(user1, amount);
        
        vm.startBroadcast(owner);
        croqToken.mint(user1, amount);
        vm.stopBroadcast();
    }

    // Test de l'approval et du transferFrom
    function testApproveAndTransferFrom() public {
        uint256 amount = 100 * 1e18;
        
        vm.startBroadcast(owner);
        croqToken.mint(user1, amount);
        vm.stopBroadcast();
        
        vm.startBroadcast(user1);
        croqToken.approve(user2, amount / 2);
        vm.stopBroadcast();
        
        vm.startBroadcast(user2);
        croqToken.transferFrom(user1, user2, amount / 2);
        vm.stopBroadcast();
        
        assertEq(croqToken.balanceOf(user1), amount / 2);
        assertEq(croqToken.balanceOf(user2), amount / 2);
        assertEq(croqToken.allowance(user1, user2), 0);
    }
}