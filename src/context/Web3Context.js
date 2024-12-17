import React, { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import DroneRegistryABI from "../abi/DroneRegistry.json"; 

export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        try {
          // Initialize ethers provider
          const _provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await _provider.getSigner();

          // Get the user's wallet account
          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
          setAccount(accounts[0]);

          // Load the contract
          const contractAddress = "0x166EeCf9376645AAF41a2c541c05F6bA22117364"; 
          const _contract = new ethers.Contract(contractAddress, DroneRegistryABI.abi, signer);

          setProvider(_provider);
          setContract(_contract);
        } catch (error) {
          console.error("Error loading blockchain data:", error);
        }
      } else {
        alert("Please install MetaMask to use this app.");
      }
    };

    loadBlockchainData();
  }, []);

  return (
    <Web3Context.Provider value={{ account, provider, contract }}>
      {children}
    </Web3Context.Provider>
  );
};
