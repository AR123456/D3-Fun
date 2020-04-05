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
    3,
    0,
    1,
    0,
    1,
    0,
    2,
    1,
    3,
    0,
    3,
    3,
    0,
    1,
    2,
    1,
    4,
    1,
    3,
    5,
    2,
    0,
    1,
    2,
    1,
    4,
    1,
    7,
    8,
    5,
    8,
    8,
    12,
    6,
    22,
    20,
    10,
    24,
    32,
    28,
    35,
    72,
    53,
    95,
    86,
    137,
    119,
    272,
    273,
    317,
    351,
    415,
    520,
    571,
    803,
    1288,
    1387,
    1775,
    2351,
    3116,
    3361,
    4077,
    4662,
    3965,
    3809,
    4345,
    4588,
    4475,
  ]);
  // const onAddDataClick = () =>
  //   setData([...data, Math.round(Math.random() * 100)]);

  return (
    <React.Fragment>
      <br />
      <br />
      <h2>
        COVID-19 Cases in US by date of Illness January 12th 2020 to March 22nd
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
        {(selection) => <BrushChartChild data={data} selection={selection} />}
      </BrushChart>
    </React.Fragment>
  );
}

export default App;
