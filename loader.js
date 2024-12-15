class ScriptLoader {
  constructor(script) {
    this.script = script;
    this.scriptElement = null;
    this.head = document.querySelector("head");
    this.isLoaded = false;
  }

  load() {
    return new Promise((resolve, reject) => {
      if (this.isLoaded) {
        resolve("Script already loaded");
        return;
      }

      this.scriptElement = document.createElement("script");
      this.scriptElement.src = this.script;
      this.scriptElement.onload = () => {
        this.isLoaded = true;
        resolve("Script loaded successfully");
      };
      this.scriptElement.onerror = (e) => reject(e);
      this.head.appendChild(this.scriptElement);
    });
  }
}

let loader = new ScriptLoader("data.js");

document.querySelectorAll("button").forEach((button) => {
  button.onclick = () => {
    const key = button.className;
    loader
      .load()
      .then(() => loadContent(key))
      .catch((e) => console.error(e));
  };
});

function loadContent(key) {
  const sectionClass = key.charAt(0).toUpperCase() + key.slice(1);

  document.querySelectorAll("main > section").forEach((section) => {
    section.innerHTML = "";
  });

  const contentContainer = document.querySelector(`.${sectionClass}`);

  if (!contentContainer) {
    console.error(`No section found for key: ${key}`);
    return;
  }

  let selectedData = data[key]?.[0];
  if (!selectedData) {
    contentContainer.innerHTML = `<p>No data found for ${key}.</p>`;
    return;
  }

  const { title, body, image } = selectedData;

  const titleElement = document.createElement("h1");
  titleElement.textContent = title;

  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = body || "No content available.";

  if (image) {
    const imageElement = document.createElement("img");
    imageElement.src = image;
    imageElement.alt = title || "Image";
    imageElement.style.maxWidth = "100%"; // Optional: Responsive styling
    contentContainer.appendChild(imageElement);
  }
  
  contentContainer.appendChild(titleElement);
  contentContainer.appendChild(descriptionElement);
}
