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

document.querySelectorAll("button").forEach((button) => {
  button.onclick = async () => {
    const key = button.className;
    try {
      console.log(`Loading data for key: ${key}`);
      const data = await loader.load(key);
      console.log(`Data loaded: ${JSON.stringify(data)}`);
      loadContent(key, data);
    } catch (e) {
      console.error("Failed to load data:", e);
    }
  };
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

  if (key === "books") {
    const imageContainer = document.createElement("div");
    imageContainer.className = "image-container";

    data.image.forEach((book) => {
      const { title, src, sinopse } = book;

      const bookContainer = document.createElement("div");
      bookContainer.className = "book-container";

      const titleElement = document.createElement("h1");
      titleElement.textContent = title;

      const imageElement = document.createElement("img");
      imageElement.src = src;
      imageElement.alt = title;

      imageElement.addEventListener("click", () => {
        displayBookInfo(title, sinopse, contentContainer);
      });

      bookContainer.appendChild(titleElement);
      bookContainer.appendChild(imageElement);

      imageContainer.appendChild(bookContainer);
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

function displayBookInfo(title, sinopse, container) {
  let bookInfoContainer = container.querySelector(".book-info");
  if (!bookInfoContainer) {
    bookInfoContainer = document.createElement("div");
    bookInfoContainer.className = "book-info";
    container.appendChild(bookInfoContainer);
  }

  bookInfoContainer.innerHTML = "";

  const titleElement = document.createElement("h2");
  titleElement.textContent = title;

  const sinopseElement = document.createElement("p");
  sinopseElement.textContent = sinopse.join(" ");

  bookInfoContainer.appendChild(titleElement);
  bookInfoContainer.appendChild(sinopseElement);
}