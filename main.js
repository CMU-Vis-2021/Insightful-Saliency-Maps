// import * as d3 from "d3";

var colorRed = '#e32d2d';
var colorOrange = '#e8900c';
var colorPurple = '#793ac2';

var allImages = [];
var selectedAnswer = [];
var rightAnswer = [];
var numberOfQuestions = 3;
let count = 0;

let tab1 = document.getElementById("tab1");
let tab2 = document.getElementById("tab2");
let tab3 = document.getElementById("tab3");

let tab1Button = document.getElementById("openTab1");
let tab2Button = document.getElementById("openTab2");
let tab3Button = document.getElementById("openTab3");

// quiz variables
// let classList = ["airplane", "bear", "bicycle", "bird", "boat", "bottle", "car", "cat", "chair", "clock", "dog", "elephant", 
//     "keyboard", "knife", "oven", "truck"];
let shapeList = ['bear', 'dog', 'elephant']
let textureList = ['bikes', 'elephant', 'tiger', 'trucks', 'zebra']
let mydata = JSON.stringify(data);
let parseddata = JSON.parse(mydata)
let prediction = "";

// ml model variables and function
const classifier = ml5.imageClassifier("MobileNet", modelLoaded);
// When the model is loaded
function modelLoaded() {
    console.log("Model Loaded!");
}

var cImg = $('#canvasImg')
$.ajax({
    url: "./assets/quiz/dobermanorig.png",
    type: "GET"
}).done(function() {
    cImg.attr('src', "./assets/quiz/dobermanorig.png");   // set the image source
}).fail(function() {
    cImg.hide();    // or something other
});

// Canvas image loaded
window.onload = function() {
  var c = document.getElementById("canvas");
  var ctx = c.getContext("2d");
  var img = document.getElementById("canvasImg");
  img.onload = function() {
    // At this point, the image is fully loaded
    ctx.drawImage(img, 0, 0,c.width,c.height);
};
  console.log(img);
  console.log(c.width);
}


function changeTab(button, tabToReveal){
    
    if(button.classList.contains("active") != true){
        tab1Button.classList = "";
        tab2Button.classList = "";
        tab3Button.classList = "";
        button.classList = "active"

        if(tabToReveal == "tab1")
            {
                tab1.classList= "";
                tab2.classList= "hidden";
                tab3.classList= "hidden";
            }
        else if(tabToReveal == "tab2")
        {
            tab1.classList= "hidden";
            tab2.classList= "";
            tab3.classList= "hidden";
        }
        else if(tabToReveal == "tab3")
        {
            tab1.classList= "hidden";
            tab2.classList= "hidden";
            tab3.classList= "";
        }
    }
} 

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

function stylizeImg(){

    var selectShape = document.getElementById('shapeselect'+count.toString())
    var selectTexture = document.getElementById('textureselect'+count.toString())

    var quizImage = $('#stylizedimg'+count.toString())

    classpath = "./assets/stylized-images/"+selectShape.value+"-stylized-"+ selectTexture.value + ".jpg";

    $.ajax({
        url: classpath,
        type: "GET"
    }).done(function() {
        quizImage.attr('src', classpath);   // set the image source
    }).fail(function() {
        quizImage.hide();    // or something other
    });

    predictClass(document.getElementById('stylizedimg'+count.toString()));
    document.getElementById('prediction').textContent = prediction;
}

function changeImage(progress){
    
    console.log(shapeList)
    var select = document.getElementById('quizselect')
    selectedAnswer.push(select.value);
    console.log(select)
    select.value = "-1";
    console.log(select)

    if(parseInt(progress.textContent) == 3){
        console.log("show Finale");
        showQuizFinal();
    }
    else{

        // choose an image class and random image within that class
        var selection_shape = shapeList[Math.floor(Math.random()*shapeList.length)];
        var selection_texture = textureList[Math.floor(Math.random()*textureList.length)];
        console.log("current selection shape: ", selection_shape)
        rightAnswer.push(selection_shape);
        // var imgNum = Math.floor(Math.random()*10)+1;
        var quizImage = document.getElementById("quizImg");
        var classpath = "./assets/stylized-images/"+selection_shape+"-stylized-"+selection_texture+'.jpg';
        
        allImages.push(classpath);
        // var randidx = parseddata[selection][imgNum][Math.floor(Math.random()*parseddata[selection][imgNum].length)]
        // var path = classpath + randidx;


        var quizImage = $('#quizImg')

        $.ajax({
            url: classpath,
            type: "GET"
        }).done(function() {
            quizImage.attr('src', classpath);   // set the image source
        }).fail(function() {
            quizImage.hide();    // or something other
        });

        predictClass(document.getElementById('quizImg'));

        // Calculate progress for next dot -- change button to say submit if on the last question
        var nextnum = parseInt(progress.textContent) + 1;
        if (nextnum == 3){
            var subbtn = document.getElementById('quizbtn')
            subbtn.textContent = "Submit"
        } 


        // create current and next id based on progress
        var nextid = "dot" + nextnum.toString() + " notactive";
        var curid = "dot" + progress.textContent + " active";

        // modify style of current dot
        var currentdot = document.getElementById(curid);
        currentdot.style.backgroundColor = "rgb(211, 211, 211)";
        curid = "dot" + progress.textContent + " notactive";
        currentdot.id = curid;

        // modify style of next dot
        var nextdot = document.getElementById(nextid);
        nextdot.style.backgroundColor = "#3274b5";
        nextdot.id = "dot" + nextnum.toString() + " active";

        // update progress and image
        progress.textContent = nextnum;


        // remove that option from the image selection list
        shapeList = shapeList.filter(function(value, index, arr){
            return value != selection_shape;
        });
        textureList = textureList.filter(function(value, index, arr){
            return value != selection_texture;
        });
    }
}

function styleAnother(){

    console.log("icon clicked")
    if(count == 0){
        var prev_div = document.querySelector('.flex')
    } else {
        var lastcount = count - 1
        var prev_div = document.querySelector('.appendimages'+lastcount.toString())
    }
    
    prev_div.insertAdjacentHTML('afterend', '<div class="appendimages'+count.toString()+'"></div>')

    elementid = "#appendimages" + count.toString()

    var new_div = document.querySelector('.appendimages'+count.toString())
    console.log(new_div)
    new_div.setAttribute('id', elementid)

    console.log(elementid)
    count += 1;

    new_div.innerHTML = '<br> <br> <br> <div class = "flex"> <div class = "flex-inner step"> <label for="shape"><span class = "number">1</span>Choose a shape:</label> <br> <div class = "select"> <select class = "standard-select" name="shape" id="shapeselect'+count.toString()+'" onchange="shapeImg()"> <option value="-1" selected disabled hidden>Select choice</option> <!-- <option value="cat">Cat</option> --> <option value="dog">Dog</option> <option value="elephant">Elephant</option> <option value="bear">Bear</option>  </select> </div> <img id="shapeimg'+count.toString()+'"> </div> <div class = "flex-inner step"> <label for="texture"><span class = "number">2</span>Choose a texture:</label> <br> <div class = "select"> <select class = "standard-select" name="texture" id="textureselect'+count.toString()+'" onchange="textureImg()"> <option value="-1" selected disabled hidden>Select choice</option> <option value="bikes">Bicycle</option> <option value="tiger">Tiger</option> <option value="trucks">Trucks</option> <option value="zebra">Zebra</option> </select> </div> <img id="textureimg'+count.toString()+'"> </div> <div class = "flex-inner step"> <label for="shape"><span class = "number">3</span>Stylize the Image:</label> <br> <button class = "blue" onclick="stylizeImg()">Stylize</button> </div> <div class = "flex-inner step"> <label for="shape">Stylized Image</label> <div class = "output-labels"> <p>AI Prediction: <span id = "prediction" class = "output"></span></p> <!-- <p>Biased: <span id = "biased" class = "output">Texture</span></p> --> </div> <img id="stylizedimg'+count.toString()+'"> </div> </div>'
    // $( ".appendimages").load( "styleimg.html" );
    

    var cur_div = document.getElementById(elementid)
    console.log(cur_div)

}

function hoverImg(){
    iconimg = document.getElementById("plusicon")
    iconimg.setAttribute('src', "assets/icons/plus-hover.svg")
}

function leaveImg(){
    iconimg = document.getElementById("plusicon")
    iconimg.setAttribute('src', "assets/icons/plus.svg")
}

function showQuizFinal(){
    let quizDiv = document.getElementById('quiz-before');
    let answerDiv = document.getElementById('quiz-after');
    let answersRight = 0;

    quizDiv.style.display = "none";
    answerDiv.style.display = "block";
    // console.log("allImages = ");
    // console.log(allImages);
    // console.log("selectedAnswer = ");
    // console.log(selectedAnswer);
    // console.log("rightAnswer = ");
    // console.log(rightAnswer);

    let templateAnswer = document.getElementById('answer-template');
    for(let i = 0; i < numberOfQuestions; i++){
        const answerElement = templateAnswer.cloneNode(true);
        answerElement.id = "";

        const imageElement = answerElement.getElementsByClassName("image")[0];
        imageElement.src = allImages[i];
        
        const userElement = answerElement.getElementsByClassName("yourAnswer")[0];
        if(selectedAnswer[i] == "-1"){
            selectedAnswer[i] = "nothing selected"
        }
        userElement.innerHTML = selectedAnswer[i];
        if(selectedAnswer[i] == rightAnswer[i])
            userElement.style.color = "green";
        else
            userElement.style.color = "red";

        const predictionElement = answerElement.getElementsByClassName("AIprediction")[0];
        predictionElement.innerHTML = rightAnswer[i];
        if(rightAnswer[i] == rightAnswer[i])
            predictionElement.style.color = "green";
        else
            predictionElement.style.color = "red";

        const rightAnswerElement = answerElement.getElementsByClassName("correctAnswer")[0];
        rightAnswerElement.innerHTML = rightAnswer[i];
        rightAnswerElement.style.color = "green";

        if(selectedAnswer[i] == rightAnswer[i]){
            answersRight += 1;
        }
        answerDiv.append(answerElement);
    }
    let answersRightElement = answerDiv.getElementsByClassName('number')[0];
    answersRightElement.innerHTML = answersRight;

}

function predictClass(image){

    classifier.predict(image, 10,
        function (err, results) {
            // alert(results[0].label);
            console.log(results[0].label);
            console.log(results[0].confidence)
            console.log(results)

            prediction = results[0].label;
        });
}

function firstImage(){

    select = document.getElementById('quizselect')
    console.log(select)

    var selection_shape = shapeList[Math.floor(Math.random()*shapeList.length)];
    var selection_texture = textureList[Math.floor(Math.random()*textureList.length)];
    console.log("current selection shape: ", selection_shape)
    rightAnswer.push(selection_shape);
    // var imgNum = Math.floor(Math.random()*10)+1;
    var quizImage = document.getElementById("quizImg");
    var classpath = "./assets/stylized-images/"+selection_shape+"-stylized-"+selection_texture+'.jpg';
    allImages.push(classpath);
    // var randidx = parseddata[selection][imgNum][Math.floor(Math.random()*parseddata[selection][imgNum].length)]
    // var path = classpath + randidx;


    var quizImage = $('#quizImg')

    $.ajax({
        url: classpath,
        type: "GET"
    }).done(function() {
        quizImage.attr('src', classpath);   // set the image source
    }).fail(function() {
        quizImage.hide();    // or something other
    });

    // remove that option from the image selection list
    shapeList = shapeList.filter(function(value, index, arr){
        return value != selection_shape;
    });
    textureList = textureList.filter(function(value, index, arr){
        return value != selection_texture;
    });
}

function loadOptionsQuiz(){
    var select = document.getElementById('quizselect')

    for(var i = 0; i < shapeList.length; i++){
        option = document.createElement('option');
        option.value = shapeList[i]
        option.text = shapeList[i].charAt(0).toUpperCase() + shapeList[i].slice(1)
        select.add(option, -1);
    }
};

loadOptionsQuiz();
firstImage();
predictClass(document.getElementById('quizImg'));