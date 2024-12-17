import React, { useContext, useState } from "react";
import { Web3Context } from "../context/Web3Context";

const DroneList = () => {
  const { contract } = useContext(Web3Context);
  const [drones, setDrones] = useState([]);

  const fetchAllDrones = async () => {
    try {
      const allDrones = await contract.getAllDrones(); 
      setDrones(allDrones);
    } catch (error) {
      console.error("Error fetching drones:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>All Registered Drones</h2>
      <button className="btn btn-primary mb-3" onClick={fetchAllDrones}>
        Fetch Drones
      </button>
      <div>
        {drones.length > 0 ? (
          <ul className="list-group">
            {drones.map((drone, index) => (
              <li key={index} className="list-group-item">
                <strong>DID:</strong> {drone[0]} <br />
                <strong>Model:</strong> {drone[1]} <br />
                <strong>Operator:</strong> {drone[2]} <br />
                <strong>Registered:</strong> {drone[3] ? "Yes" : "No"}
              </li>
            ))}
          </ul>
        ) : (
          <p>No drones registered yet.</p>
        )}
      </div>
    </div>
  );
};

export default DroneList;
