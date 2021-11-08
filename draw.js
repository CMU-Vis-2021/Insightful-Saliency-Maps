// Brush colour and size
let colour = "#3d34a5";
const strokeWidth = 5;

// Drawing state
let latestPoint;
let drawing = false;

// Set up our drawing context
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// Drawing functions

const continueStroke = newPoint => {
    context.beginPath();
    context.moveTo(latestPoint[0], latestPoint[1]);
    context.strokeStyle = colour;
    context.lineWidth = strokeWidth;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineTo(newPoint[0], newPoint[1]);
    context.stroke();

    latestPoint = newPoint;
};

// Event helpers

const startStroke = point => {
    drawing = true;
    latestPoint = point;
};

const BUTTON = 0b01;
const mouseButtonIsDown = buttons => (BUTTON & buttons) === BUTTON;

// Event handlers

const mouseMove = evt => {
    if (!drawing) {
        return;
    }
    
    continueStroke([evt.offsetX, evt.offsetY]);
};

const mouseDown = evt => {
    if (drawing) {
        return;
    }
    evt.preventDefault();
    canvas.addEventListener("mousemove", mouseMove, false);
    startStroke([evt.offsetX, evt.offsetY]);
};

const mouseEnter = evt => {
    if (!mouseButtonIsDown(evt.buttons) || drawing) {
        return;
    }
    mouseDown(evt);
};

const endStroke = evt => {
    if (!drawing) {
        return;
    }
    drawing = false;
    evt.currentTarget.removeEventListener("mousemove", mouseMove, false);
};

// Register event handlers

canvas.addEventListener("mousedown", mouseDown, false);
canvas.addEventListener("mouseup", endStroke, false);
canvas.addEventListener("mouseout", endStroke, false);
canvas.addEventListener("mouseenter", mouseEnter, false);

function changeColorCanvas(color){
    if(color == 'red'){
        colour = colorRed;
    }else if(color == 'orange'){
        colour = colorOrange;
    }else if(color == 'purple'){
        colour = colorPurple;
    }
}