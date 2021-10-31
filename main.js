// import * as d3 from "d3";

let tab1 = document.getElementById("tab1");
let tab2 = document.getElementById("tab2");
let tab3 = document.getElementById("tab3");

let tab1Button = document.getElementById("openTab1");
let tab2Button = document.getElementById("openTab2");
let tab3Button = document.getElementById("openTab3");

let classList = ["airplane", "bear", "bicycle", "bird", "boat", "bottle", "car", "cat", "chair", "clock", "dog", "elephant", 
    "keyboard", "knife", "oven", "truck"];
let mydata = JSON.stringify(data);
let parseddata = JSON.parse(mydata)

const classifier = ml5.imageClassifier("MobileNet", modelLoaded);

// When the model is loaded
function modelLoaded() {
    console.log("Model Loaded!");
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


// Changing quiz images here
// add in an extra argument to grab the class of the first image so that can be removed from the list
function changeImage(progress){
    
    console.log(classList)

    // choose an image class and random image within that class

    var selection = classList[Math.floor(Math.random()*classList.length)];
    console.log("current selection", selection)
    var imgNum = Math.floor(Math.random()*10)+1;
    var quizImage = document.getElementById("quizImg");
    var classpath = "./assets/style-transfer-preprocessed-512/"+selection+"/"+selection+imgNum+"-";
    
    var randidx = parseddata[selection][imgNum][Math.floor(Math.random()*parseddata[selection][imgNum].length)]
    var path = classpath + randidx;


    var quizImage = $('#quizImg')

    $.ajax({
        url: path,
        type: "GET"
    }).done(function() {
        quizImage.attr('src', path);   // set the image source
    }).fail(function() {
        quizImage.hide();    // or something other
    });

    predictClass(document.getElementById('quizImg'));

    // Calculate progress for next dot -- change button to say submit if on the last question
    var nextnum = parseInt(progress.textContent) + 1;
    if (nextnum == 16){
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
    classList = classList.filter(function(value, index, arr){
        return value != selection;
    });

}

function predictClass(image){

    classifier.predict(image, 
        function (err, results) {
            // alert(results[0].label);
            console.log(results[0].label);
        });
}

function firstImage(){

    select = document.getElementById('quizselect')
    console.log(select)

    // choose an image class and random image within that class
    var selection = classList[Math.floor(Math.random()*classList.length)];
    var imgNum = Math.floor(Math.random()*10)+1;
    var quizImage = document.getElementById("quizImg");
    var classpath = "./assets/style-transfer-preprocessed-512/"+selection+"/"+selection+imgNum+"-";

    var randidx = parseddata[selection][imgNum][Math.floor(Math.random()*parseddata[selection][imgNum].length)]
    var path = classpath + randidx;


    var quizImage = $('#quizImg')

    $.ajax({
        url: path,
        type: "GET"
    }).done(function() {
        quizImage.attr('src', path);   // set the image source
    }).fail(function() {
        quizImage.hide();    // or something other
    });

    // remove that option from the image selection list
    classList = classList.filter(function(value, index, arr){
        return value != selection;
    });
}

function loadOptionsQuiz(){
    var select = document.getElementById('quizselect')

    for(var i = 0; i < classList.length; i++){
        option = document.createElement('option');
        option.value = classList[i]
        option.text = classList[i].charAt(0).toUpperCase() + classList[i].slice(1)
        select.add(option, -1);
    }
};

loadOptionsQuiz();
firstImage();
