// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import {CROQToken} from "../src/CROQToken.sol";
import {CROQStaking} from "../src/CROQStaking.sol";

contract CROQStakingTest is Test {
    CROQToken croqToken;
    CROQStaking croqStaking;
    address owner = address(1);
    address validator1 = address(2);
    address validator2 = address(3);
    address nonValidator = address(4);
    uint256 cap = 1_000_000_000 * 1e18;

    function setUp() public {
        vm.startBroadcast(owner);
        croqToken = new CROQToken(cap);
        croqStaking = new CROQStaking(address(croqToken));
        vm.stopBroadcast();
        
        // Mint des tokens pour les tests
        vm.startBroadcast(owner);
        croqToken.mint(validator1, 1000 * 1e18);
        croqToken.mint(validator2, 1000 * 1e18);
        croqToken.mint(nonValidator, 1000 * 1e18);
        vm.stopBroadcast();
    }

    // Test de l'ajout d'un validateur
    function testAddValidator() public {
        vm.startBroadcast(owner);
        croqStaking.addValidator(validator1);
        vm.stopBroadcast();
        
        assertTrue(croqStaking.isValidator(validator1));
        assertFalse(croqStaking.isValidator(validator2));
    }

    // Test du retrait d'un validateur
    function testRemoveValidator() public {
        vm.startBroadcast(owner);
        croqStaking.addValidator(validator1);
        croqStaking.removeValidator(validator1);
        vm.stopBroadcast();
        
        assertFalse(croqStaking.isValidator(validator1));
    }

    // Test du staking
    function testStake() public {
        vm.startBroadcast(owner);
        croqStaking.addValidator(validator1);
        vm.stopBroadcast();
        
        uint256 amount = 100 * 1e18;
        
        vm.startBroadcast(validator1);
        croqToken.approve(address(croqStaking), amount);
        croqStaking.stake(amount);
        vm.stopBroadcast();
        
        assertEq(croqToken.balanceOf(address(croqStaking)), amount);
        assertEq(croqStaking.getStakedAmount(validator1), amount);
    }

    // Test du staking échoue si non-validateur
    function testStakeNonValidator() public {
        uint256 amount = 100 * 1e18;
        
        vm.startBroadcast(nonValidator);
        croqToken.approve(address(croqStaking), amount);
        vm.expectRevert("CROQStaking: not a validator");
        croqStaking.stake(amount);
        vm.stopBroadcast();
    }

    // Test du retrait après la période de staking
    function testWithdraw() public {
        vm.startBroadcast(owner);
        croqStaking.addValidator(validator1);
        vm.stopBroadcast();
        
        uint256 amount = 100 * 1e18;
        
        vm.startBroadcast(validator1);
        croqToken.approve(address(croqStaking), amount);
        croqStaking.stake(amount);
        
        // Avancer dans le temps pour dépasser la période de staking + délai de déliaison
        vm.warp(croqStaking.stakingPeriod() + croqStaking.withdrawalDelay() + 1);
        
        uint256 balanceBefore = croqToken.balanceOf(validator1);
        croqStaking.withdraw();
        uint256 balanceAfter = croqToken.balanceOf(validator1);
        vm.stopBroadcast();
        
        assertEq(balanceAfter - balanceBefore, amount);
        assertEq(croqStaking.getStakedAmount(validator1), 0);
    }

    // Test du retrait échoue si la période n'est pas terminée
    function testWithdrawTooEarly() public {
        vm.startBroadcast(owner);
        croqStaking.addValidator(validator1);
        vm.stopBroadcast();
        
        uint256 amount = 100 * 1e18;
        
        vm.startBroadcast(validator1);
        croqToken.approve(address(croqStaking), amount);
        croqStaking.stake(amount);
        
        // Ne pas avancer dans le temps
        vm.expectRevert("CROQStaking: stake is locked");
        croqStaking.withdraw();
        vm.stopBroadcast();
    }

    // Test de la pause
    function testPause() public {
        vm.startBroadcast(owner);
        croqStaking.pause();
        vm.stopBroadcast();
        
        assertTrue(croqStaking.paused());
        
        // Stake échoue quand en pause
        vm.expectRevert("Pausable: paused");
        vm.startBroadcast(validator1);
        croqStaking.stake(100);
        vm.stopBroadcast();
        
        // Unpause
        vm.startBroadcast(owner);
        croqStaking.unpause();
        vm.stopBroadcast();
        
        assertFalse(croqStaking.paused());
    }

    // Test des événements
    function testStakedEvent() public {
        vm.startBroadcast(owner);
        croqStaking.addValidator(validator1);
        vm.stopBroadcast();
        
        uint256 amount = 100 * 1e18;
        
        vm.expectEmit(true, true, true, true);
        emit Staked(validator1, amount, croqStaking.stakingPeriod());
        
        vm.startBroadcast(validator1);
        croqToken.approve(address(croqStaking), amount);
        croqStaking.stake(amount);
        vm.stopBroadcast();
    }

    // Test du calcul du temps de déliaison restant
    function testRemainingLockTime() public {
        vm.startBroadcast(owner);
        croqStaking.addValidator(validator1);
        vm.stopBroadcast();
        
        uint256 amount = 100 * 1e18;
        
        vm.startBroadcast(validator1);
        croqToken.approve(address(croqStaking), amount);
        croqStaking.stake(amount);
        vm.stopBroadcast();
        
        uint256 stakingPeriod = croqStaking.stakingPeriod();
        uint256 withdrawalDelay = croqStaking.withdrawalDelay();
        uint256 totalLockTime = stakingPeriod + withdrawalDelay;
        
        // Au début, le temps restant est totalLockTime
        assertEq(croqStaking.getRemainingLockTime(validator1), totalLockTime);
        
        // Après la moitié du temps, le temps restant est totalLockTime / 2
        vm.warp(totalLockTime / 2);
        assertEq(croqStaking.getRemainingLockTime(validator1), totalLockTime / 2);
        
        // Après totalLockTime, le temps restant est 0
        vm.warp(totalLockTime);
        assertEq(croqStaking.getRemainingLockTime(validator1), 0);
    }
}