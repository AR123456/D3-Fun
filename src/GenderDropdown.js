import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
// get genderSelected property from props object being passed in.
// based on the onSelected the given argument is passed into gender selected, this is then pased
// from this file into app js where it is imported - this changes the state in App.js, this is in turn updated in D3 Chart . js

function GenderDropdown({ genderSelected }) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Please select gender
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onSelect={() => genderSelected("men")}>
          Men
        </Dropdown.Item>
        <Dropdown.Item onSelect={() => genderSelected("women")}>
          Women
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
export default GenderDropdown;
