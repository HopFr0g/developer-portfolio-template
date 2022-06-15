"use strict";

for (let i = 1; i <= document.querySelector(".texture-selector").children.length; ++i) {
    document.querySelector(`.texture-${i}`).addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("numero", i);
    });
}

const area = document.querySelector(".texture-area");

area.addEventListener("dragover", (event) => {
    event.preventDefault();
});

area.addEventListener("drop", (event) => {
    let numeroImagen = event.dataTransfer.getData("numero");
    let nombreImagen = `Texture${numeroImagen}.png`;
    definirTextura(".texture-area", nombreImagen);
});

const definirTextura = (claseContenedor, nombreImagen) => {
    if (nombreImagen == "Texture1.png")
        document.querySelector(claseContenedor).setAttribute("style", `background-image: url("https://cdn.glitch.me/eab28935-60de-4c85-ac7f-6a2b28c79d86%2FTexture1.png?v=1637206479232");`);
    if (nombreImagen == "Texture2.png")
        document.querySelector(claseContenedor).setAttribute("style", `background-image: url("https://cdn.glitch.me/eab28935-60de-4c85-ac7f-6a2b28c79d86%2FTexture2.png?v=1637206480781");`);
    if (nombreImagen == "Texture3.png")
        document.querySelector(claseContenedor).setAttribute("style", `background-image: url("https://cdn.glitch.me/eab28935-60de-4c85-ac7f-6a2b28c79d86%2FTexture3.png?v=1637206481836");`);
    if (nombreImagen == "Texture4.png")
        document.querySelector(claseContenedor).setAttribute("style", `background-image: url("https://cdn.glitch.me/eab28935-60de-4c85-ac7f-6a2b28c79d86%2FTexture4.png?v=1637206482617");`);
}