class DataLoader {
  constructor(url) {
    this.url = url;
  }

  async load(key) {
    try {
      const response = await fetch(`${this.url}/${key}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      const contentType = response.headers.get("Content-Type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Expected JSON, but got:", text);
        throw new Error("Expected JSON, but got something else.");
      }

      const data = await response.json();
      console.log(`Data received: ${JSON.stringify(data)}`);
      return data;
    } catch (error) {
      console.error("Error in ScriptLoader.load:", error);
      throw error;
    }
  }
}

let loader = new DataLoader("http://localhost:3002/getData");

document.querySelector(".account").addEventListener("click", async () => {
  try {
    const data = await loader.load("login");
    document.querySelector(".register").innerHTML = data.html;
    addSwitchEventListeners();
    addLoginEventListener();
  } catch (e) {
    console.error("Failed to load data:", e);
  }
});

function addSwitchEventListeners() {
  document.querySelector(".register").addEventListener("click", async (event) => {
    if (event.target.classList.contains("switch-form")) {
      event.preventDefault();
      const targetForm = event.target.getAttribute("data-target");
      const formData = await loader.load(targetForm);
      document.querySelector(".register").innerHTML = formData.html;
      addSwitchEventListeners();
      if (targetForm === "login") {
        addLoginEventListener();
      } else {
        addRegisterEventListener();
      }
    }
  });
}

function addLoginEventListener() {
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const username = document.getElementById("login-username").value;
      const password = document.getElementById("login-password").value;

      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert("Login successful");
        showLogoutButton();
      } else {
        alert("Login failed");
      }
    });
  }
}

function addRegisterEventListener() {
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const username = document.getElementById("register-username").value;
      const password = document.getElementById("register-password").value;

      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert("Registration successful");
        const loginData = await loader.load("login");
        document.querySelector(".register").innerHTML = loginData.html;
        document.getElementById("register-page").classList.remove("visible");
        document.getElementById("login-page").classList.add("visible");
        addSwitchEventListeners();
        addLoginEventListener();
      } else {
        alert("Registration failed");
      }
    });
  }
}

function showLogoutButton() {
  const logoutButton = document.querySelector(".logout");
  logoutButton.classList.remove("hidden");
  logoutButton.addEventListener("click", () => {
    alert("Logged out");
    location.reload();
  });
}

document.querySelectorAll("button").forEach((button) => {
  button.onclick = async () => {
    const key = button.className;
    try {
      console.log(`Loading data for key: ${key}`);
      const data = await loader.load(key);
      console.log(`Data loaded: ${JSON.stringify(data)}`);
      loadContent(key, data);
      history.pushState({ key }, data.title, ""); 
    } catch (e) {
      console.error("Failed to load data:", e);
    }
  };
});

window.addEventListener("popstate", async (event) => {
  if (event.state && event.state.key) {
    try {
      const data = await loader.load(event.state.key);
      console.log(`Data loaded from history: ${JSON.stringify(data)}`);
      loadContent(event.state.key, data);
    } catch (e) {
      console.error("Failed to load data from history:", e);
    }
  }
});

function loadContent(key, data) {
  const sectionClass = key.charAt(0).toUpperCase() + key.slice(1);

  document.querySelectorAll("main > section").forEach((section) => {
    section.innerHTML = "";
  });

  const contentContainer = document.querySelector(`.${sectionClass}`);

  if (!contentContainer) {
    console.error(`No section found for key: ${key}`);
    return;
  }

  if (key === "books" || key === "movies") {
    const imageContainer = document.createElement("div");
    imageContainer.className = "image-container";

    data.image.forEach((item) => {
      const { title, src, sinopse } = item;

      const itemContainer = document.createElement("div");
      itemContainer.className = "item-container";

      const titleElement = document.createElement("h1");
      titleElement.textContent = title;

      const imageElement = document.createElement("img");
      imageElement.src = src;
      imageElement.alt = title;

      imageElement.addEventListener("click", () => {
        displayItemInfo(title, sinopse, contentContainer);
      });

      itemContainer.appendChild(titleElement);
      itemContainer.appendChild(imageElement);

      imageContainer.appendChild(itemContainer);
    });
    contentContainer.appendChild(imageContainer);
  } else {
    const { title, body, image } = data;

    const titleElement = document.createElement("h1");
    titleElement.textContent = title;

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = body.join(" ");

    contentContainer.appendChild(titleElement);
    contentContainer.appendChild(descriptionElement);

    if (image && image.length > 0) {
      const imageContainer = document.createElement("div");
      imageContainer.className = "image-container";

      image.forEach(({ src }) => {
        const imgElement = document.createElement("img");
        imgElement.src = src;

        imageContainer.appendChild(imgElement);
      });

      contentContainer.appendChild(imageContainer);
    }
  }
}

function displayItemInfo(title, sinopse, container) {
  let itemInfoContainer = container.querySelector(".item-info");
  if (!itemInfoContainer) {
    itemInfoContainer = document.createElement("div");
    itemInfoContainer.className = "item-info";
    container.appendChild(itemInfoContainer);
  }

  itemInfoContainer.innerHTML = "";

  const titleElement = document.createElement("h1");
  titleElement.textContent = title;

  const sinopseElement = document.createElement("p");
  sinopseElement.textContent = sinopse.join(" ");

  itemInfoContainer.appendChild(titleElement);
  itemInfoContainer.appendChild(sinopseElement);
}