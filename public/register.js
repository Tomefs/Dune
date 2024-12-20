document.getElementById("register-form").addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (response.ok) {
      alert("Registration successful");
    } else {
      alert("Registration failed");
    }
  });
  
  document.getElementById("to-login").addEventListener("click", async (event) => {
    event.preventDefault();
    const response = await fetch("/login");
    const html = await response.text();
    document.body.innerHTML = html;
  });