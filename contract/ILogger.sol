// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (utils/introspection/ERC165.sol)

pragma solidity ^0.8.0;

interface ILogger {
    event LogInt(string, int);
    event LogUint(string, uint);
    event LogBool(string, bool);
    event LogBytes(string, bytes);
    event LogString(string, string);
    event LogBytes32(string, bytes32);
    event LogAddress(string, address);
}