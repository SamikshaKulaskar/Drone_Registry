import React, { useState } from "react";
import { ethers } from "ethers";

const ConnectWallet = ({ setWalletAddress }) => {
  const [connected, setConnected] = useState(false);

  const connectWalletHandler = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask not found. Please install MetaMask.");
        return;
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setWalletAddress(address);
      setConnected(true);
      alert("Wallet connected successfully!");
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    <div className="connect-wallet">
      <button
        onClick={connectWalletHandler}
        className="btn btn-primary"
        disabled={connected}
      >
        {connected ? "Wallet Connected" : "Connect Wallet"}
      </button>
    </div>
  );
};

export default ConnectWallet;
