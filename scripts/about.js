import {sendGet} from "/scripts/reqManager.js";

const frontendSection = document.querySelector(".frontend-technologies");
const backendSection = document.querySelector(".backend-technologies");
const toolsSection = document.querySelector(".others-technologies");

const addTechnology = (fragment, techName, imgUrl, levelNumber) => {
    // Elements creation:
    let container = document.createElement("div");
    let title = document.createElement("h4");
    let img = document.createElement("img");
    let level = document.createElement("p");
    // Text adding:
    title.innerHTML = techName;
    img.setAttribute("src", imgUrl);
    switch (levelNumber) {
        case 3:
            level.innerHTML = "Advanced";
            break;
        case 2:
            level.innerHTML = "Intermediate";
            break;
        default:
            level.innerHTML = "Beginner";
    }
    // Class definition:
    container.classList.add("technology");
    title.classList.add("technology__name");
    img.classList.add("technology__img");
    if (levelNumber)
        level.classList.add("technology__level");
    // Assembly:
    container.appendChild(title);
    container.appendChild(img);
    if (levelNumber)
        container.appendChild(level);
    // Finish:
    fragment.appendChild(container);
}

const loadTechnologies = async () => {
    // Frontend:
    const frontendFragment = document.createDocumentFragment();
    const frontend = await sendGet("/json/frontend.json", "json");
    for (let tech of frontend)
        addTechnology(frontendFragment, tech.name, tech.image, tech.level);
    // Backend:
    const backendFragment = document.createDocumentFragment();
    const backend = await sendGet("/json/backend.json", "json");
    for (let tech of backend)
        addTechnology(backendFragment, tech.name, tech.image, tech.level);
    // Tools:
    const toolsFragment = document.createDocumentFragment();
    const tools = await sendGet("/json/tools.json", "json");
    for (let tech of tools)
        addTechnology(toolsFragment, tech.name, tech.image);
    // Print projects:
    frontendSection.appendChild(frontendFragment);
    backendSection.appendChild(backendFragment);
    toolsSection.appendChild(toolsFragment);
}

loadTechnologies();