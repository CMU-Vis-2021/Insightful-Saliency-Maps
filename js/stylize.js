function shapeImg(){
    var selectShape = document.getElementById('shapeselect'+count.toString())
    console.log(selectShape)
    console.log(selectShape.value)

    var quizImage = $('#shapeimg'+count.toString())

    classpath = "./assets/shapes/"+selectShape.value+".jpg";

    $.ajax({
        url: classpath,
        type: "GET"
    }).done(function() {
        quizImage.attr('src', classpath);   // set the image source
    }).fail(function() {
        quizImage.hide();    // or something other
    });
}

function textureImg(){
    var selectTexture = document.getElementById('textureselect'+count.toString())
    console.log(selectTexture)
    console.log(selectTexture.value)

    var quizImage = $('#textureimg'+count.toString())

    classpath = "./assets/textures/"+selectTexture.value+".jpg";

    $.ajax({
        url: classpath,
        type: "GET"
    }).done(function() {
        quizImage.attr('src', classpath);   // set the image source
    }).fail(function() {
        quizImage.hide();    // or something other
    });
}

function input3enable(){
    let input3 = document.getElementById('tab1-input3');
    if(input3.classList.contains('disabled'))
        input3.classList.remove('disabled');
}

function stylizeImg(){
    
    input3enable();

    var selectShape = document.getElementById('shapeselect'+count.toString())
    var selectTexture = document.getElementById('textureselect'+count.toString())

    var quizImage = $('#stylizedimg'+count.toString())

    classpath = "./assets/stylized-images/"+selectShape.value+"-stylized-"+ selectTexture.value + ".jpg";
    updateBarPrediction(selectShape.value+"-stylized-"+ selectTexture.value + ".jpg");
    console.log("FILE NAME ===   "+selectShape.value+"-stylized-"+ selectTexture.value + ".jpg")
    $.ajax({
        url: classpath,
        type: "GET"
    }).done(function() {
        quizImage.attr('src', classpath);   // set the image source
    }).fail(function() {
        quizImage.hide();    // or something other
    });

    // predict image class
    // predictClass(document.getElementById('stylizedimg'+count.toString()));
    // document.getElementById('prediction').textContent = prediction;

    document.getElementById("checkboxoverlap").style.display = "block";
}