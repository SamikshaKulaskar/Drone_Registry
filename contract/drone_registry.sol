// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract DroneRegistry {
    struct Drone {
        string did;           // Decentralized Identifier
        string model;         // Drone model
        string operator;      // Operator's information
        bool isRegistered;    // Registration status
    }

    mapping(string => Drone) private drones;
    string[] private droneDIDs; // Array to store all registered DIDs

    event DroneRegistered(string indexed did, string model, string operator);
    event DroneFetched(string indexed did, string model, string operator, bool isRegistered);

    // Register a new drone
    function registerDrone(string memory _did, string memory _model, string memory _operator) public returns (bool) {
        require(bytes(drones[_did].did).length == 0, "Drone already registered");

        drones[_did] = Drone({
            did: _did,
            model: _model,
            operator: _operator,
            isRegistered: true
        });
        droneDIDs.push(_did); // Add DID to the array

        emit DroneRegistered(_did, _model, _operator);
        return true;
    }

    // Retrieve a drone's details by DID
    function getDrone(string memory _did) public view returns (string memory, string memory, string memory, bool) {
        Drone memory drone = drones[_did];
        require(bytes(drone.did).length != 0, "Drone not found");
        return (drone.did, drone.model, drone.operator, drone.isRegistered);
    }

    // Retrieve all registered drones
    function getAllDrones() public view returns (Drone[] memory) {
        Drone[] memory allDrones = new Drone[](droneDIDs.length);

        for (uint256 i = 0; i < droneDIDs.length; i++) {
            allDrones[i] = drones[droneDIDs[i]];
        }

        return allDrones;
    }
}
