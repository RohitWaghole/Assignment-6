function registerNow() {
  const username = document.getElementById("Username").value;
  const email = document.getElementById("Email").value;
  const password = document.getElementById("Password").value;
  const confirmPassword = document.getElementById("ConfirmPassword").value;
  let flag = true;
  if (!username || !email || !password || !confirmPassword) {
    alert("❌❌❌Information Required");
    flag = false;
    return;
  }

  if (password != confirmPassword) {
    alert("Password Not Match");
    document.getElementById("Password").value = "";
    document.getElementById("ConfirmPassword").value = "";
  } else {
    fetch("http://localhost:3000/addAdmin", {
      method: "POST",
      body: JSON.stringify({
        username: username,
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
    if (flag) alert("Registration Successful!");
  }
}
