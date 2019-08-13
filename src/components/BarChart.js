import React, { Component } from "react";
// import { render } from "react-dom";
import { VictoryBar, VictoryChart } from "victory";

class BarChart extends Component {
  render() {
    const styles = {
      fontFamily: "sans-serif",
      textAlign: "center"
    };

    const data = [
      { quarter: 1, earnings: 13000 },
      { quarter: 2, earnings: 16500 },
      { quarter: 3, earnings: 14250 },
      { quarter: 4, earnings: 19000 }
    ];
    return (
      <div style={styles}>
        <h1>Victory basic demo</h1>
        <VictoryChart domainPadding={20}>
          <VictoryBar data={data} x="quarter" y="earnings" />
        </VictoryChart>
      </div>
    );
  }
}
export default BarChart;
