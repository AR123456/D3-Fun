import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import Barchart from "./Barchart";

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <svg width="800" height="600">
        <Barchart x={10} y={10} width={300} height={200} />
        <Barchart x={50} y={300} width={400} height={300} />
      </svg>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
