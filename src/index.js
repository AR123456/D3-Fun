import React from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";

import "./styles.css";
import Scatterplot from "./Scatterplot";
import Datapoint from "./Datapoint";

class App extends React.Component {
  state = {
    width: 300,
    height: 300,
    data: d3.range(100).map(_ => [Math.random(), Math.random()])
  };

  onClick = () => {
    const { width, height } = this.state;
    this.setState({
      width: width * 0.7,
      height: height * 0.7
    });
  };

  render() {
    const { width, height, data } = this.state;

    return (
      <div className="App">
        <svg width="800" height="800" onClick={this.onClick}>
          <Scatterplot
            x={50}
            y={50}
            width={width}
            height={height}
            data={data}
            datapoint={({ x, y }) => <Datapoint x={x} y={y} />}
          />
        </svg>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
