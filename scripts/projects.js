import {displayNotification} from "/scripts/notification.js";
import {sendGet} from "/scripts/reqManager.js";

const fullSection = document.querySelector(".full-projects");
const demosSection = document.querySelector(".frontend-projects");

const checkMouseConnected = () => {
    return matchMedia("(pointer:fine)").matches;
}

const addProject = (projectTitle, projectDescription, imageUrl, projectUrl, external, multiplatform, fragment) => {
    // Elements creation:
    const container = document.createElement("DIV");
    const title = document.createElement("H2");
    const description = document.createElement("P");
    const imageContainer = document.createElement("DIV");
    const image = document.createElement("IMG");
    const button = document.createElement("BUTTON");
    // Class definition:
    container.classList.add("project");
    container.classList.add("fancy__box");
    title.classList.add("project__h2");
    title.classList.add("fancy__subtitle");
    description.classList.add("project__p");
    description.classList.add("fancy__text");
    imageContainer.classList.add("project__img");
    button.classList.add("project__button");
    button.classList.add(external ? "fancy__button-blue" : "fancy__button-green");
    // Text content adding:
    title.innerHTML = projectTitle;
    description.innerHTML = projectDescription;
    image.setAttribute("src", imageUrl);
    external ? button.innerHTML = "Ir al proyecto" : button.innerHTML = "Ver proyecto";
    // Listeners:
    button.addEventListener("click", () => {
        let hasMouse = checkMouseConnected();
        if (multiplatform || hasMouse)
            location.href = projectUrl;
        else
            displayNotification("Dispositivo no compatible", "Para entrar a esta demostración, tu dispositivo debe tener un mouse conectado.", {"text":"Aceptar"});
    });
    // Structure assembly:
    container.appendChild(title);
    container.appendChild(description);
    imageContainer.appendChild(image);
    container.appendChild(imageContainer);
    container.appendChild(button);
    // Finally, add project to fragment:
    fragment.appendChild(container);
}

const loadProjects = async () => {
    // Full:
    const fullFragment = document.createDocumentFragment();
    const fullProjects = await sendGet("/json/projects.json", "json");
    for (let project of fullProjects)
    addProject(project.name, project.description, project.image, project.url, true, true, fullFragment);
    // Frontend:
    const demosFragment = document.createDocumentFragment();
    const demos = await sendGet("/json/demos.json", "json");
    for (let demo of demos)
        addProject(demo.name, demo.description, demo.image, demo.url, false, demo.multiplatform, demosFragment);
    // Print projects:
    fullSection.appendChild(fullFragment);
    demosSection.appendChild(demosFragment);
}

loadProjects();