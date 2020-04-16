import React, { useState } from "react";
import Buildings from "./Buildings";
import "./App.css";

function App() {
  const [data] = useState([
    {
      name: "Burj Khalifa",
      height: "350",
    },
    {
      name: "Shanghai Tower",
      height: "263.34",
    },
    {
      name: "Abraj Al-Bait Clock Tower",
      height: "254.04",
    },
    {
      name: "Ping An Finance Centre",
      height: "253.20",
    },
    {
      name: "Lotte World Tower",
      height: "230.16",
    },
  ]);

  console.log(data);
  console.log(data[0].name);
  return (
    <React.Fragment>
      <Buildings data={data} />
    </React.Fragment>
  );
}

export default App;
