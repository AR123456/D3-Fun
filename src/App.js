import React, { useState } from "react";
// import Video from "./Video";
import "./App.css";
import BrushChart from "./BrushChart";
import BrushChartChild from "./BrushChartChild";

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
    3,
    1,
    1,
    0,
    1,
    1,
    0,
    0,
    0,
    2,
    0,
    1,
    0,
    4,
    5,
    0,
    4,
    3,
    5,
    3,
    9,
    10,
    6,
    10,
    20,
    22,
    18,
    43,
    34,
    52,
    47,
    66,
    57,
    103,
    95,
    121,
    125,
    119,
    139,
    120,
    140,
    194,
    172,
    174
  ]);
  // const onAddDataClick = () =>
  //   setData([...data, Math.round(Math.random() * 100)]);

  return (
    <React.Fragment>
      <br />
      <br />
      <h2>
        COVID-19 Cases in US by date of Illness January 12th 2020 to March 7th
        2020
      </h2>
      <h7>
        <a
          href="https://www.cdc.gov/coronavirus/2019-ncov/cases-in-us.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          From CDC.Gov
        </a>
      </h7>
      <h4>Drag or resize the brush for closer look.</h4>

      <BrushChart data={data}>
        {selection => <BrushChartChild data={data} selection={selection} />}
      </BrushChart>
    </React.Fragment>
  );
}

export default App;
