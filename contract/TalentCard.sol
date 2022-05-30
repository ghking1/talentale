// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC1155.sol";

contract TalentCard is ERC1155 {

    address private signer = 0x03bF5c44046a4fdf5B97f812f67006CF7ddA4C83;
    mapping(bytes32 => bool) private _used_sign;

    address payable private _creator;

    constructor () ERC1155("") {
        _creator = payable(msg.sender);
    }

    //function buy(address from, address to, uint256 card_id, uint256 num, uint256 price, uint256 timestamp, uint256 validtime, uint8 _v, bytes32 _r, bytes32 _s) payable public {
    //    bytes32 _hash;

    //    _hash = keccak256( abi.encodePacked("\x19Ethereum Signed Message:\n", "200", address(from), address(to), card_id, num, price, timestamp, validtime) );
    //    require(ecrecover(_hash, _v, _r, _s) == signer, "TalentCard: signer error");
    //    require(_used_sign[_hash] != true, "TalentCard: sign already used");

    //    require(block.timestamp <= timestamp+validtime, "TalentCard: sign over time");
    //    require(msg.value >= price, "TalentCard: price error");

    //    ERC1155._safeTransferFrom(from, to, card_id, num, "");

    //    _used_sign[_hash] = true;
    //}

    function buy(address from, address to, uint256 card_id, uint256 num, uint256 price, address connector) payable public {

        if(connector != address(0))
        {
            require(msg.value >= price+100000000000000, "TalentCard: price error");
            ERC1155._safeTransferFrom(from, to, card_id, num, "");
            payable(from).transfer(price);
            payable(connector).transfer(100000000000000); //0.0001 matic
        }
        else
        {
            require(msg.value >= price, "TalentCard: price error");
            ERC1155._safeTransferFrom(from, to, card_id, num, "");
            payable(from).transfer(price);
        }
    }

    function mint(uint256 num) public {
        ERC1155._mint(msg.sender, uint256(uint160(msg.sender)), num, "");
    }

    function payfun() payable public { 
        /*none*/
    }

    function withdraw() public {
        require(msg.sender == _creator, "BSMP: only creator can do it");
        _creator.transfer(address(this).balance);
    }

    function destroy() public {
        require(msg.sender == _creator, "BSMP: only creator can do it");
        selfdestruct(_creator);
    }
}
