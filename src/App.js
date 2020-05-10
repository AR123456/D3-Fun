import React, { useState } from "react";
import StarBreak from "./StarBreak";
import useInterval from "./useInterval";

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
  // create flagData const ans setFlagData function
  const [flagData, setFlagData] = useState(true);
  // console.log(data);
  // console.log(data[0].name);
  let flag;
  useInterval(() => {
    ////////////// this is updating  flag every 2 sec in this log but when I try to
    ///////////// move over to StarBreak neither it is not seconds
    // console.log("Hello");
    // setFlagData to opposite what it started at every 2 sec
    // then pass it to StarBreak component
    setFlagData((flag = !flag));

    // console.log(flag);
  }, 2000);

  return (
    <React.Fragment>
      <StarBreak data={data} flagData={flagData} />
    </React.Fragment>
  );
}

export default App;
