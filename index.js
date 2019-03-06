// //interacting with firebase and DOM
// const form = document.querySelector("form");
// const cost = document.querySelector("#cost");
// const name = document.querySelector("#name");
// const error = document.querySelector("#error");

// form.addEventListener("submit", e => {
//   // prevent default action (page refresh)
//   e.preventDefault();
//   //check that name and cost have been entered
//   if (name.value && cost.value) {
//     // create the object () documment )to submit to firebase
//     const item = {
//       name: name.value,
//       cost: parseInt(cost.value)
//     };

//     db.collection("expenses")
//       .add(item)
//       .then(res => {
//         // clear the error message if there is one
//         error.textContent = "";
//         //after getting response reset the input fields
//         name.value = "";
//         cost.value = "";
//       });
//   } else {
//     error.textContent = "Please enter values before submitting";
//   }

//   //
// });
