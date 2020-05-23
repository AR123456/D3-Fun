import React, { useState } from "react";

import "./App.css";
import BrushChart from "./BrushChart";
import BrushChartChild from "./BrushChartChild";

function App() {
  //data with array
  const [data, setData] = useState([
    0,
    0,
    1,
    0,
    3,
    0,
    0,
    0,
    0,
    2,
    1,
    0,
    3,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    2,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    8,
    6,
    23,
    25,
    20,
    66,
    47,
    64,
    147,
    225,
    290,
    278,
    414,
    267,
    338,
    1237,
    755,
    2797,
    3419,
    4777,
    3528,
    5836,
    8821,
    10934,
    10115,
    13987,
    16916,
    17965,
    19332,
    18251,
    22635,
    22562,
    27043,
    26135,
    34864,
    30683,
    26065,
    43438,
    20682,
    32449,
    31705,
    33251,
    33288,
    29145,
    24242,
    26527,
    26930,
    29164,
    29836,
    29895,
    26543,
    29468,
    26490,
    25858,
    37144,
    30181,
    32853,
    29256,
    23371,
    23901,
    25512,
    31787,
    30369,
    29794,
    29763,
    19138,
    22303,
    25253,
    28974,
    25996,
    26660,
    23792,
    18106,
    21467,
    20869,
    27191,
    22977,
    31967,
    13284,
    24481,
    23405,
    22860,
    20522,
  ]);

  // const onAddDataClick = () =>
  //   setData([...data, Math.round(Math.random() * 100)]);

  return (
    <React.Fragment>
      <br />
      <br />
      <h2>
        COVID-19 Cases in US by date of Illness January 12th 2020 to May 22nd
        2020
      </h2>
      <h6>
        <a
          href="https://www.cdc.gov/coronavirus/2019-ncov/cases-in-us.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          From CDC.Gov
        </a>
      </h6>
      <h4>Drag or resize the brush for closer look.</h4>

      <BrushChart data={data}>
        {(selection) => <BrushChartChild data={data} selection={selection} />}
      </BrushChart>
    </React.Fragment>
  );
}

export default App;
