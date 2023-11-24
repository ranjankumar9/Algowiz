// App.js
import { useEffect, useState } from "react";
import io from 'socket.io-client';
import Graph from "./Components/Graph/Graph";
import "./App.css";

function App() {
  const [ltpData, setLtpData] = useState([]);
  const [selectedAxis, setSelectedAxis] = useState('Nifty');

  useEffect(() => {
    const socket = new WebSocket(
      "wss://functionup.fintarget.in/ws?id=fintarget-functionup"
    );

    socket.onopen = () => {
      console.log("Connected to WebSocket");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLtpData(data);
    };

    socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleAxisChange = (selectedAxis) => {
    setSelectedAxis(selectedAxis);
  };

  return (
    <div className="App">
      <div className="navbar">
        <div className="nav1">
          <img src="https://hostingcanada.org/app/uploads/2020/08/trading-app-300x300.png" alt="" width={50} />
        </div>

        <nav className="nav2">
          <p onClick={() => handleAxisChange('Nifty')}>Nifty: {ltpData.Nifty}</p>
          <p onClick={() => handleAxisChange('Banknifty')}>BankNifty: {ltpData.Banknifty}</p>
          <p onClick={() => handleAxisChange('Finnifty')}>FinNifty: {ltpData.Finnifty}</p>
        </nav>

      </div>
      <div>
        <p style={{ background: "black", color: "white", padding: "10px" }}>{selectedAxis} is Running...</p>
        <Graph chartdata={ltpData} selectedAxis={selectedAxis} />
      </div>
    </div>
  );
}

export default App;
