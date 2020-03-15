import React, { useState } from "react";
// import Video from "./Video";
import "./App.css";
import BrushChart from "./BrushChart";

function App() {
  //data with array
  const [data, setData] = useState([
    0,
    0,
    2,
    0,
    1,
    0,
    0,
    0,
    1,
    1,
    1,
    0,
    1,
    3,
    0,
    0,
    2,
    1,
    1,
    0,
    1,
    1,
    0,
    0,
    0,
    1,
    0,
    1,
    0,
    3,
    1,
    1,
    3,
    2,
    0,
    0,
    5,
    10,
    6,
    7,
    11,
    14,
    13,
    34,
    16,
    30,
    19,
    40,
    40,
    53,
    51,
    48,
    58,
    74,
    43,
    79
  ]);
  // const onAddDataClick = () =>
  //   setData([...data, Math.round(Math.random() * 100)]);

  return (
    <React.Fragment>
      <h2>
        COVID-19 Cases in US by date of Illness January 12th 2020 to March 7th
        2020
      </h2>
      <h3>
        <a
          href="https://www.cdc.gov/coronavirus/2019-ncov/cases-in-us.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          From CDC.Gov
        </a>
      </h3>

      <BrushChart data={data} />

      {/* <Video /> */}
    </React.Fragment>
  );
}

export default App;
