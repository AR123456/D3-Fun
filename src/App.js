//https://www.youtube.com/watch?v=a4rstx9Pz2o&t=3s
import React, { useState } from "react";
import BarChart from "./BarChart";
import "./App.css";

function App() {
  const [data, setData] = useState([25, 30, 45, 60, 10, 65, 75]);

  return (
    <React.Fragment>
      {/* passing data above into the BarChart component  */}
      <BarChart data={data} />
      <button onClick={() => setData(data.map(value => value + 5))}>
        Update data
      </button>
      <button onClick={() => setData(data.filter(value => value < 35))}>
        Filter data
      </button>
      <button
        onClick={() => setData([...data, Math.round(Math.random() * 100)])}
      >
        Add data
      </button>
    </React.Fragment>
  );
}

export default App;
