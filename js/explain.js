var cImg = $('#canvasImg')
$.ajax({
    url: "./assets/quiz/doberman-size.png",
    type: "GET"
}).done(function() {
    cImg.attr('src', "./assets/quiz/doberman-size.png");   // set the image source
}).fail(function() {
    cImg.hide();    // or something other
    cImg.attr('src', "./assets/quiz/doberman-size.png");
    console.log("FAILED TO LOAD IMAGE")
});

// Canvas image loaded
window.onload = function() {
  var c = document.getElementById("canvas");
  var ctx = c.getContext("2d");
  const canvasCompare = document.getElementById("canvas-compare");
  const contextCompare = canvasCompare.getContext("2d");

  var img = document.getElementById("canvasImg");
  var img2 = document.getElementById("canvasImg-compare");
  img.onload = function() {
    // At this point, the image is fully loaded
    ctx.drawImage(img, 0, 0,c.width,c.height);
};
//ctx.drawImage(img, 0, 0,c.width,c.height);

contextCompare.drawImage(img2, 0, 0,c.width,c.height);
}

function revealAnswer(){
    var answerDiv = document.getElementById("answerCanvas");
    answerDiv.classList.add("reveal");    
    document.getElementById("revealAnswerButton").remove();
}