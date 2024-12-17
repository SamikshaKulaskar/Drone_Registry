const { expect } = require("chai");

describe("DroneRegistry Contract", function () {
    let DroneRegistry, droneRegistry, deployer;

    beforeEach(async function () {
        // Get the deployer's account
        [deployer] = await ethers.getSigners();
        DroneRegistry = await ethers.getContractFactory("DroneRegistry");

        // Deploy the contract
        droneRegistry = await DroneRegistry.deploy();
    });

    it("Should deploy the contract successfully", async function () {
        // Assert that the contract address is not empty
        expect(droneRegistry.address).to.not.equal(0);
    });

    it("Should register and fetch drone details", async function () {
        const did = "did:drone1";
        const model = "DJI Phantom";
        const operator = "Operator A";

        // Register the drone
        await droneRegistry.registerDrone(did, model, operator);

        // Fetch drone details
        const drone = await droneRegistry.getDrone(did);

        // Assert the drone details
        expect(drone[0]).to.equal(did);
        expect(drone[1]).to.equal(model);
        expect(drone[2]).to.equal(operator);
        expect(drone[3]).to.equal(true); // isRegistered should be true
    });
});
