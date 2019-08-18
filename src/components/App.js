import React from "react";
import Axis from "./Axis";
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};
class App extends React.Component {
  render() {
    return (
      <svg width="800" height="400" id="svg">
        <Axis y={10} />
      </svg>
    );
  }
}

export default App;
