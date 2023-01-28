function loginNow() {
  const email = document.getElementById("Email").value;
  const password = document.getElementById("Password").value;

  fetch("http://localhost:3000/loginAdmin", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then();
}

function showPass() {
  var x = document.getElementById("Password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
