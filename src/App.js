import React, { useState } from "react";
import "./App.css";
import ZoomableLineChart from "./ZoomableLineChart";

function App() {
  // generating the random numes for the graph
  const [data, setData] = useState(
    // generating array of 50 random numbers
    Array.from({ length: 50 }, () => Math.round(Math.random() * 100))
  );

  return (
    <React.Fragment>
      <h2>Zoomable Line Chart with D3 </h2>
      {/* passing data in state to the zoomableLineChart component */}
      <ZoomableLineChart data={data} />
      {/* this button adds more random data to the display  */}
      <button
        onClick={() => setData([...data, Math.round(Math.random() * 100)])}
      >
        Add data
      </button>
    </React.Fragment>
  );
}

export default App;
