// import * as d3 from "d3";

var colorRed = '#e32d2d';
var colorOrange = '#e8900c';
var colorPurple = '#793ac2';

var allImages = [];
var selectedAnswer = [];
var rightAnswer = [];
var numberOfQuestions = 3;

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
    var selectShape = document.getElementById('shapeselect')
    console.log(selectShape)
    console.log(selectShape.value)

    var quizImage = $('#shapeimg')

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
    var selectTexture = document.getElementById('textureselect')
    console.log(selectTexture)
    console.log(selectTexture.value)

    var quizImage = $('#textureimg')

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
    var selectShape = document.getElementById('shapeselect')
    var selectTexture = document.getElementById('textureselect')

    var quizImage = $('#stylizedimg')

    classpath = "./assets/stylized-images/"+selectShape.value+"-stylized-"+ selectTexture.value + ".jpg";

    $.ajax({
        url: classpath,
        type: "GET"
    }).done(function() {
        quizImage.attr('src', classpath);   // set the image source
    }).fail(function() {
        quizImage.hide();    // or something other
    });

    predictClass(document.getElementById('stylizedimg'));
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