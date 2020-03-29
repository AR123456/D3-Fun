import React, { useState } from "react";
// import Video from "./Video";
import "./App.css";
import BrushChart from "./BrushChart";

function App() {
  //data with array
  const [data, setData] = useState([
    1,
    1,
    2,
    2,
    5,
    5,
    5,
    5,
    5,
    7,
    8,
    8,
    11,
    11,
    11,
    11,
    11,
    11,
    11,
    11,
    12,
    12,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    15,
    15,
    15,
    15,
    15,
    15,
    16,
    16,
    24,
    30,
    53,
    80,
    98,
    164,
    214,
    279,
    423,
    647,
    937,
    1215,
    1629,
    1896,
    2234,
    3487,
    4226,
    7038,
    10442,
    15219,
    18747,
    24583,
    33404,
    44183,
    54453,
    68440,
    85356,
    103321
  ]);
  // const onAddDataClick = () =>
  //   setData([...data, Math.round(Math.random() * 100)]);

  return (
    <React.Fragment>
      <h2>
        COVID-19 Cases in US by date reported January 12th 2020 to March 28th
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

      <BrushChart data={data} />

      {/* <Video /> */}
    </React.Fragment>
  );
}

export default App;
