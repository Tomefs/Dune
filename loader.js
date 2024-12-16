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

  contentContainer.appendChild(titleElement);
  contentContainer.appendChild(descriptionElement);

  if (image && image.length > 0) {
    const imageContainer = document.createElement("div");
    imageContainer.className = "image-container";

    image.forEach(({ src, title, sinopse }) => {
      const imgElement = document.createElement("img");
      imgElement.src = src;
      imgElement.alt = title;

      imgElement.addEventListener("click", () => displayImageInfo(title, sinopse, contentContainer));

      imageContainer.appendChild(imgElement);
    });

    contentContainer.appendChild(imageContainer);
  }
  
  function displayImageInfo(title, sinopse, container) {
    let imageTitle = container.querySelector(".image-title");
    if (!imageTitle) {
      imageTitle = document.createElement("h1");
      imageTitle.className = "image-title";
      container.appendChild(imageTitle);
    }
    imageTitle.textContent = title;
  
    let imageSinopse = container.querySelector(".image-sinopse");
    if (!imageSinopse) {
      imageSinopse = document.createElement("div");
      imageSinopse.className = "image-sinopse";
      container.appendChild(imageSinopse);
    }
  
    imageSinopse.innerHTML = "";
    sinopse.forEach((paragraph) => {
      const paragraphElement = document.createElement("p");
      paragraphElement.textContent = paragraph;
      imageSinopse.appendChild(paragraphElement);
    });
  }

}
