// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract SampleToken is ERC20, Ownable {
    uint96 ratio;

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {
        _mint(msg.sender, 10000 * 10 ** decimals());
    }

    function setRatio(uint96 newRatio) external onlyOwner {
        ratio = newRatio;
    }

    function buy() external payable {
        uint256 mintAmount = ratio * msg.value;
        _mint(msg.sender, mintAmount);
    }

    function withdraw() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }
}
