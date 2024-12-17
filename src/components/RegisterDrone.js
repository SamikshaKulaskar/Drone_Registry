import React, { useState } from "react";
import { ethers } from "ethers";
import DroneRegistryABI from "../abi/DroneRegistry.json";

const RegisterDrone = ({ walletAddress }) => {
  const [droneDID, setDroneDID] = useState("");
  const [droneModel, setDroneModel] = useState("");
  const [droneOperator, setDroneOperator] = useState("");

  const contractAddress = "0x1C08eF487582f394736562ffE1CD3DC1Bb104400";

  const handleRegisterDrone = async () => {
    if (!walletAddress) {
      alert("Please connect your wallet first!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        DroneRegistryABI.abi,
        signer
      );

      const tx = await contract.registerDrone(droneDID, droneModel, droneOperator);
      await tx.wait();

      alert("Drone registered successfully!");
    } catch (error) {
      console.error("Error registering drone:", error);
      alert("Failed to register drone.");
    }
  };

  return (
    <div className="register-drone">
      <h2>Register Drone</h2>
      <input
        type="text"
        placeholder="Drone DID"
        value={droneDID}
        onChange={(e) => setDroneDID(e.target.value)}
      />
      <input
        type="text"
        placeholder="Drone Model"
        value={droneModel}
        onChange={(e) => setDroneModel(e.target.value)}
      />
      <input
        type="text"
        placeholder="Operator"
        value={droneOperator}
        onChange={(e) => setDroneOperator(e.target.value)}
      />
      <button onClick={handleRegisterDrone} className="btn btn-success">
        Register Drone
      </button>
    </div>
  );
};

export default RegisterDrone;
