import React, { useState } from "react";
import Circles from "./Circles";
import "./App.css";

function App() {
  // https://swizec.com/blog/building-a-react-dataviz-with-react-hooks/swizec/8801
  //  https://swizec1.teachable.com/courses/447741/lectures/9911350
  const [data] = useState([
    {
      name: "Tony",
      age: "10",
    },
    {
      name: "Jessica",
      age: "12",
    },
    {
      name: "Andrew",
      age: "9",
    },
    {
      name: "Emily",
      age: "10",
    },
    {
      name: "Richard",
      age: "11",
    },
  ]);

  console.log(data);
  console.log(data[0].name);
  return (
    <React.Fragment>
      <Circles data={data} />
    </React.Fragment>
  );
}

export default App;
