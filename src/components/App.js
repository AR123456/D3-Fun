import React from "react";
import Map from "./Map";
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};
class App extends React.Component {
  render() {
    return (
      <svg width="960" height="600">
        {/* <Barchart x={100} y={100} width={400} height={300} /> */}
        <Map />
      </svg>
    );
  }
}

export default App;
