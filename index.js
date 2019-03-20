//materialize modal functionalitly set up
const modal = document.querySelector(".modal");
M.Modal.init(modal);
// getting form from the dom and the feilds in the form
const form = document.querySelector("form");
const name = document.querySelector("#name");
const parent = document.querySelector("#parent ");
const department = document.querySelector("#department");

form.addEventListener("submit", e => {
  e.preventDefault();
  db.collection("employees").add({
    name: name.value,
    parent: parent.value,
    department: department.value
  });
  var instance = M.Modal.getInstance(modal);
  instance.close();
  // reset method
  //https://www.w3schools.com/jsref/met_form_reset.asp
  //https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset
  form.reset();
});
