//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
pragma abicoder v2;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Moo is ERC721Enumerable, ERC721Burnable, ERC721Pausable, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _tokenIds;

    uint256 immutable public collectionSize = 10000;

    uint256 immutable public mintPrice = 3 ether;

    address payable public payableAddress;

    string public defaultBaseURI;

    constructor(address to, string memory baseURI) ERC721("Moo World", "MOO") {
        payableAddress = payable(to);
        defaultBaseURI = baseURI;
        _tokenIds.increment();
        _pause();
    }

    function mint(uint256 quantity) external payable whenNotPaused {
        uint256 tokenId = _tokenIds.current();
        require((tokenId + quantity - 1) < collectionSize, "Max amount reached");
        uint256 totalPrice = mintPrice * quantity;
        require(msg.value >= totalPrice, "Invalid amount");
        payableAddress.transfer(totalPrice);
        for (uint256 i; i < quantity; i++) {
            _safeMint(msg.sender, tokenId + i);
            _tokenIds.increment();
        }
    }

    function give(address to, uint256 quantity) external onlyOwner {
        uint256 tokenId = _tokenIds.current();
        require((tokenId + quantity - 1) < collectionSize, "Max amount reached");
        for (uint256 i; i < quantity; i++) {
            _safeMint(to, tokenId + i);
            _tokenIds.increment();
        }
    }

    function walletOfOwner(address to) external view returns (uint256[] memory tokenIds) {
        uint256 balance = balanceOf(to);
        tokenIds = new uint256[](balance);
        for (uint256 i; i < balance; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(to, i);
        }
    }

    function togglePause() external onlyOwner {
        if (paused()) {
            _unpause();
        } else {
            _pause();
        }
    }

    function setPayableAddress(address to) external onlyOwner {
        payableAddress = payable(to);
    }

    function setBaseURI(string memory baseURI) external onlyOwner {
        defaultBaseURI = baseURI;
    }

    function _baseURI() internal view override(ERC721) returns (string memory) {
        return defaultBaseURI;
    }

    function tokenURI(uint256 tokenId) public view override(ERC721) returns (string memory) {
        return string(abi.encodePacked(_baseURI(), tokenId.toString()));
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable, ERC721Pausable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}