import React, { useState } from "react";
import Buildings from "./Buildings";

import "./App.css";

function App() {
  // https://swizec.com/blog/building-a-react-dataviz-with-react-hooks/swizec/8801
  //  https://swizec1.teachable.com/courses/447741/lectures/9911350
  const [data] = useState([
    {
      name: "Burj Khalifa",
      height: "28",
    },
    {
      name: "Shanghai Tower",
      height: "623",
    },
    {
      name: "Abraj Al-Bait Clock Tower",
      height: "1601",
    },
    {
      name: "Ping An Finance Centre",
      height: "3990",
    },
    {
      name: "Lotte World Tower",
      height: "5440",
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
