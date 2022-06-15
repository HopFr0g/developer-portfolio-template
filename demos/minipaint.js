"use strict";

const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

var corner = canvas.getBoundingClientRect();
addEventListener("scroll", () => {
    corner = canvas.getBoundingClientRect();
});

let isPainting, color, lineWidth, cornerX, cornerY;

canvas.addEventListener("mousedown", event => {
    cornerX = event.clientX - corner.left;
    cornerY = event.clientY - corner.top;
    
    isPainting = true;
    
    color = document.querySelector(".color-selector").value;
    lineWidth = document.querySelector(".width-selector").value;
});

canvas.addEventListener("mouseup", event => {
    isPainting = false;
});

canvas.addEventListener("mousemove", event => {
    if (isPainting)
        draw(cornerX, cornerY, color, lineWidth);
    cornerX = event.clientX - corner.left;
    cornerY = event.clientY - corner.top;
});

const draw = (cornerX, cornerY, color, lineWidth) => {
    ctx.beginPath();
    ctx.arc(cornerX, cornerY, lineWidth, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.fill();
    ctx.stroke();
}