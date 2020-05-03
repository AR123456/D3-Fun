import React, { useState } from "react";
import StarBreak from "./StarBreak";

import "./App.css";

function App() {
  // https://swizec.com/blog/building-a-react-dataviz-with-react-hooks/swizec/8801
  //  https://swizec1.teachable.com/courses/447741/lectures/9911350
  const [data] = useState([
    {
      month: "January",
      revenue: "13432",
      profit: "8342",
    },
    {
      month: "February",
      revenue: "19342",
      profit: "10342",
    },
    {
      month: "March",
      revenue: "17443",
      profit: "15423",
    },
    {
      month: "April",
      revenue: "26342",
      profit: "18432",
    },
    {
      month: "May",
      revenue: "34213",
      profit: "29434",
    },
    {
      month: "June",
      revenue: "50321",
      profit: "45343",
    },
    {
      month: "July",
      revenue: "54273",
      profit: "47452",
    },
  ]);

  console.log(data);
  console.log(data[0].name);
  return (
    <React.Fragment>
      <StarBreak data={data} />
    </React.Fragment>
  );
}

export default App;
