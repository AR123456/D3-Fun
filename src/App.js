import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ChartWrapper from "./ChartWrapper";
// pulling in the genderdropdown file
import GenderDropdown from "./GenderDropdown";

class App extends Component {
  // adding state , start with display of men, will be able to togggel to women
  state = {
    gender: "men"
  };
  // update state with the gender selected.  gender is an object key value same so gender
  genderSelected = gender => this.setState({ gender });
  // then pass into drobdown as a prop

  render() {
    return (
      <div className="App">
        <Navbar bg="light">
          <Navbar.Brand>Barchartly</Navbar.Brand>
        </Navbar>
        <Container>
          <Row>
            <Col xs={12}>
              <GenderDropdown genderSelected={this.genderSelected} />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <ChartWrapper gender={this.state.gender} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
