import React, { useState } from "react";
import StarBreak from "./StarBreak";
import useInterval from "./useInterval";
import visData from "./data/data.json";
import "./App.css";

function App() {
  // https://swizec.com/blog/building-a-react-dataviz-with-react-hooks/swizec/8801
  //  https://swizec1.teachable.com/courses/447741/lectures/9911350
  const [data] = useState([visData]);

  let [time, setTime] = useState([0]);

  console.log(data);

  useInterval(() => {
    ////////////// this is updating  flag every 2 sec in this log but when I try to
    ///////////// move over to StarBreak neither it is not seconds
    // console.log("Hello");
    // setFlagData to opposite what it started at every 2 sec
    // then pass it to StarBreak component

    // updated teh formattedData time every time loop runs
    // send time to the GapMinder component
    //at end of data array , loop back

    setTime(() => {
      time = time < 214 ? time + 1 : 0;
      return +time;
    });
    // console.log(time);
    // console.log(flag);
  }, 2000);

  return (
    <React.Fragment>
      <StarBreak data={data} time={time} />
    </React.Fragment>
  );
}

export default App;
