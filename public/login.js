document.getElementById("login-form").addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (response.ok) {
      alert("Login successful");
    } else {
      alert("Login failed");
    }
  });
  
  document.getElementById("to-register").addEventListener("click", async (event) => {
    event.preventDefault();
    const response = await fetch("/register");
    const html = await response.text();
    document.body.innerHTML = html;
  });