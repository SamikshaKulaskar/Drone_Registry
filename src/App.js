import React, { useState } from "react";
import ConnectWallet from "./components/ConnectWallet";
import RegisterDrone from "./components/RegisterDrone";
import FetchDrone from "./components/FetchDrone"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

function App() {
  const [walletAddress, setWalletAddress] = useState("");

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Drone Registration</h1>
      <ConnectWallet setWalletAddress={setWalletAddress} />
      {walletAddress && (
        <>
          <p className="text-center">Connected Wallet: {walletAddress}</p>
          <RegisterDrone walletAddress={walletAddress} />
          <FetchDrone /> {/* Display all drones */}
        </>
      )}
    </div>
  );
}

export default App;
