var cImg = $('#canvasImg');
var canvasImgSrc = "./assets/quiz/doberman-size.png";

function loadExplainImage() {
    $.ajax({
        url: canvasImgSrc,
        type: "GET"
    }).done(function() {
        cImg.attr('src', canvasImgSrc);
    }).fail(function() {
        // Fall back to the local asset even if the request fails.
        cImg.attr('src', canvasImgSrc);
        console.log("FAILED TO LOAD IMAGE");
    });
}

function drawCanvasImages() {
    var canvas = document.getElementById("canvas");
    if (!canvas) {
        return;
    }

    var ctx = canvas.getContext("2d");
    var canvasCompare = document.getElementById("canvas-compare");
    var contextCompare = canvasCompare.getContext("2d");

    var img = document.getElementById("canvasImg");
    var img2 = document.getElementById("canvasImg-compare");

    function paintBaseImage() {
        if (!img.complete || img.naturalWidth === 0) {
            return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }

    function paintCompareImage() {
        if (!img2.complete || img2.naturalWidth === 0) {
            return;
        }
        contextCompare.clearRect(0, 0, canvasCompare.width, canvasCompare.height);
        contextCompare.drawImage(img2, 0, 0, canvasCompare.width, canvasCompare.height);
    }

    img.addEventListener("load", paintBaseImage);
    img2.addEventListener("load", paintCompareImage);

    if (img.complete) {
        paintBaseImage();
    }
    if (img2.complete) {
        paintCompareImage();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    drawCanvasImages();
    loadExplainImage();
});

function revealAnswer(button){
    var answerDiv = document.getElementById("answerCanvas");
    answerDiv.classList.add("reveal");
    if (button) {
        button.remove();
    }
}
