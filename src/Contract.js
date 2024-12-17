import { useState, useEffect } from 'react';
import { ethers } from "ethers"; // Corrected import
import DroneRegistryABI from './abi/DroneRegistry.json'; //Abi file path 

const contractAddress = "0x166EeCf9376645AAF41a2c541c05F6bA22117364"; //Contract address

export default function DroneRegistry() {
    const [account, setAccount] = useState(null);
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);
    const [droneDetails, setDroneDetails] = useState([]);
    const [droneDID, setDroneDID] = useState("");
    const [droneModel, setDroneModel] = useState("");
    const [droneOperator, setDroneOperator] = useState("");
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        const init = async () => {
            if (window.ethereum) {
                const _provider = new ethers.providers.Web3Provider(window.ethereum); 

                // Request account access if needed
                await window.ethereum.request({ method: "eth_requestAccounts" });

                const _contract = new ethers.Contract(contractAddress, DroneRegistryABI, _provider.getSigner());
                setProvider(_provider);
                setContract(_contract);

                const accounts = await _provider.listAccounts();
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                } else {
                    alert("Please connect your wallet.");
                }
            } else {
                alert("Please install MetaMask or another Ethereum provider.");
            }
        };
        init();
    }, []);

    const handleRegisterDrone = async () => {
        if (contract && account) {
            if (!droneDID || !droneModel || !droneOperator) {
                alert("Please fill in all the fields.");
                return;
            }

            try {
                setLoading(true); 
                const tx = await contract.registerDrone(droneDID, droneModel, droneOperator);
                await tx.wait(); // Wait for the transaction to be mined
                alert("Drone registered successfully!");
            } catch (err) {
                console.error("Error during registration:", err);
                alert("Error registering drone.");
            } finally {
                setLoading(false); 
            }
        } else {
            alert("Please connect your wallet and try again.");
        }
    };

    const handleFetchDrone = async () => {
        if (contract && account) {
            try {
                const drone = await contract.getDrone(droneDID);
                setDroneDetails(drone);
            } catch (err) {
                console.error("Error fetching drone:", err);
                alert("Error fetching drone details.");
            }
        }
    };

    return (
        <div>
            <h1>Drone Registry</h1>
            <div>
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
                <button onClick={handleRegisterDrone} disabled={loading}>
                    {loading ? "Registering..." : "Register Drone"}
                </button>
            </div>
            <div>
                <h2>Fetch Drone Details</h2>
                <input
                    type="text"
                    placeholder="Enter DID to fetch"
                    value={droneDID}
                    onChange={(e) => setDroneDID(e.target.value)} 
                />
                <button onClick={handleFetchDrone}>Fetch Drone</button>
                {droneDetails.length > 0 && (
                    <div>
                        <p><strong>DID:</strong> {droneDetails[0]}</p>
                        <p><strong>Model:</strong> {droneDetails[1]}</p>
                        <p><strong>Operator:</strong> {droneDetails[2]}</p>
                        <p><strong>Registered:</strong> {droneDetails[3] ? "Yes" : "No"}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
