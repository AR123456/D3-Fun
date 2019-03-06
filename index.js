//interacting with the DOM
const btns = document.querySelectorAll("button");
const form = document.querySelector("form");
const formAct = document.querySelector("form span");
const input = document.querySelector("input");
const error = document.querySelector("error");

var activity = "cycling";
//event listoners on the buttons
btns.forEach(btn => {
  btn.addEventListener("click", e => {
    // find the activity of the button
    activity = e.target.dataset.activity;
    //remove the active class from prior click and add the new
    btns.forEach(btn => btn.classList.remove("active"));
    // apply the active class to the new clicked button
    e.target.classList.add("active");
    //set id on input field
    input.setAttribute("id", activity);
    // set text of the span in the form
    formAct.textContent = activity;
  });
});
