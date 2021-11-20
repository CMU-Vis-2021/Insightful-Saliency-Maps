var colorYellow = '#ffda2e';
var colorRed = '#bb0f44';
var colorOrange = '#f3781e';
var colorPurple = '#5b0b67';
var colorGrey = '#A9A9A9';

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
    url: "./assets/quiz/doberman-size.png",
    type: "GET"
}).done(function() {
    cImg.attr('src', "./assets/quiz/doberman-size.png");   // set the image source
}).fail(function() {
    cImg.hide();    // or something other
    cImg.attr('src', "./assets/quiz/doberman-size.png");
    console.log("FAILED TO LOAD IMAGE")
});
// cImg = $('#canvasImg-Compare')
// $.ajax({
//     url: "./assets/quiz/doberman-heat.png",
//     type: "GET"
// }).done(function() {
//     cImg.attr('src', "./assets/quiz/doberman-size.png");   // set the image source
// }).fail(function() {
//     cImg.hide();    // or something other
//     cImg.attr('src', "./assets/quiz/doberman-size.png");
//     console.log("FAILED TO LOAD IMAGE")
// });

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
ctx.drawImage(img, 0, 0,c.width,c.height);
contextCompare.drawImage(img2, 0, 0,c.width,c.height);
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

function ssimg(){

    var remove_img = document.getElementById("xrai-img")
    if (remove_img != null){
        remove_img.src = ""
    }

    var choice = document.getElementById("stylized-ss")

    var style_classpathss = "./assets/stylized-images/"+ choice.value + ".jpg";

    var img_style = document.getElementById("stylized-img-ss")
    img_style.setAttribute('src', style_classpathss)

    var shapename = choice.value.split("-")[0]

    var ogselect = document.getElementById("original-ss");
    ogselect.value = shapename;

    ogimg();

    var radio = document.getElementsByName("xraiList")
    if(radio[0].checked){
        console.log("Show is checked")
        set_xraiimg()

        var remove_img = document.getElementById("stylized-img-xrai")
        if (remove_img != null){
            remove_img.src = ""
        } else {
            var img_div = document.querySelector('.flex #stylized-img-div')
            console.log(img_div.innerHTML)
            img_div.innerHTML = img_div.innerHTML + '<img id="stylized-img-xrai">'
        }
        
        set_xraiimg()

        var radio_og = document.getElementsByName("ogList")

        if(radio_og[0].checked){

            var remove_img = document.getElementById("original-img-xrai")
            if (remove_img != null){
                remove_img.src = ""
            } else {
                var img_div = document.querySelector('.flex #original-img-div')
                console.log(img_div.innerHTML)
                img_div.innerHTML = img_div.innerHTML + '<img id="original-img-xrai">'
            }

            set_xraiimg(choice = document.getElementById("original-ss"), imgobj = '#original-img-xrai')
            saliencySim()
        }
    } else if(radio[2].checked){
        const sliderOpacity = document.querySelector("#sliderOpacity");
        sliderOpacity.value = 40;
        xraioverlap();
    }

}

function ogimg(){

    var choice = document.getElementById("original-ss")

    var og_classpath = "./assets/shapes/"+ choice.value + ".jpg";

    var img_style = document.getElementById("original-img-ss")
    img_style.setAttribute('src', og_classpath)

}

function set_xraiimg(choice = document.getElementById("stylized-ss"), imgobj = '#stylized-img-xrai'){

    var remove_img = document.getElementById("xrai-img")
    console.log("REMOVE IMG", remove_img)
    if (remove_img != null){
        remove_img.src = ""
    }

    var xrai_classpath = "./assets/heatmaps/"+ choice.value + ".png";

    console.log(imgobj)
    var xraiImage = $(imgobj)

    console.log(xraiImage)
    $.ajax({
        url: xrai_classpath,
        type: "GET"
    }).done(function() {
        console.log("adding image")
        xraiImage.attr('src', xrai_classpath);   // set the image source
    }).fail(function() {
        console.log("failed")
        xraiImage.hide();    // or something other
    });

}

function xrairadio(radio = document.getElementsByName("xraiList"), query = '.flex #stylized-img-div', appendHTML = '<img id="stylized-img-xrai">', originalHTML = '<img id="stylized-img-ss">'){

    for (var i = 0, length = radio.length; i < length; i++) {
      if (radio[i].checked) {
        // do whatever you want with the checked radio
        console.log(radio[i].value);

        if(radio[i].value == "show"){
            var img_div = document.querySelector(query)
            console.log(img_div)
            console.log(img_div.innerHTML)

            img_div.innerHTML = img_div.innerHTML + appendHTML

            if(radio[i].id == "xrai"){
                console.log("in xrai")
                var slider = document.getElementById("sliders")
                slider.style.display = "none";
                set_xraiimg(); 
           } else if(radio[i].id == "og"){
                var slider = document.getElementById("sliders")
                slider.style.display = "none";
                set_xraiimg(choice = document.getElementById("original-ss"), imgobj = '#original-img-xrai');
           }

           var radio_og = document.getElementsByName("ogList")
           var radio_xrai = document.getElementsByName("xraiList")

           if(radio_og[0].checked && radio_xrai[0].checked){
            saliencySim()
           }

        }
        else if (radio[i].value == "hide"){
            var img_div = document.querySelector(query)
            img_div.innerHTML = originalHTML

            document.getElementById("salsim-div").style.display = "none";

            var slider = document.getElementById("sliders")
            slider.style.display = "none";
            ssimg()
        } else if(radio[i].value == "overlap"){
            document.getElementById("salsim-div").style.display = "none";
            const sliderOpacity = document.querySelector("#sliderOpacity");
            sliderOpacity.value = 40;
            xraioverlap();
        }

        // only one radio can be logically checked, don't check the rest
        break;
      }
    }

}

function xraioverlap(choice = document.getElementById("stylized-ss"), query = '.flex #stylized-img-div', appendHTML = '<img id="stylized-img-ss" style="position: relative;"> <img id="xrai-img" style="position: absolute; opacity: 40%"> '){

    var img_div = document.querySelector(query)
    img_div.innerHTML = appendHTML

    console.log("OVERLAP", choice.value)
    if (choice.value.split("-")[1] == "stylized"){
        var beg_path = "./assets/stylized-images/"
        var option = choice.value
    } else {
        var beg_path = "./assets/shapes/"
        var option = choice.value.split("-")[0]
    }

    var og_classpath = beg_path+option + ".jpg";
    var xrai_classpath = "./assets/heatmaps/"+ choice.value + ".png";

    var xraiImage = $('#xrai-img')
    var ogImage = $('#stylized-img-ss')

    $.ajax({
        url: xrai_classpath,
        type: "GET"
    }).done(function() {
        console.log("adding image")
        xraiImage.attr('src', xrai_classpath);   // set the image source
    }).fail(function() {
        console.log("failed")
        xraiImage.hide();    // or something other
    });

    $.ajax({
        url: og_classpath,
        type: "GET"
    }).done(function() {
        console.log("adding image")
        ogImage.attr('src', og_classpath);   // set the image source
    }).fail(function() {
        console.log("failed")
        ogImage.hide();    // or something other
    });

    var slider = document.getElementById("sliders")
    slider.style.display = "block";

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

    var cur_div = document.getElementById(elementid)
    console.log(cur_div)

}

function saliencySim(){
    console.log("they are the same!")
    var sal_div = document.getElementById("salsim-div")
    console.log(sal_div)
    sal_div.style.display = "block";

    changeAlpha();
}

function changeAlpha(){

    var choice = document.getElementById("stylized-ss")

    const sliderAlpha = document.querySelector("#sliderAlpha");

    var radio_ss = document.getElementsByName("salsimList")
    var type = ""
    if (radio_ss[0].checked){
        type = "intersection"
    } else {
        type = "difference"
    }

    var styleImage = $('#salsim-img')


    var style_classpath = "./assets/saliency-similarity/"+ choice.value + "-" + sliderAlpha.value.toString() + "-" +  type + ".png";

    $.ajax({
        url: style_classpath,
        type: "GET"
    }).done(function() {
        console.log("adding image")
        styleImage.attr('src', style_classpath);   // set the image source
    }).fail(function() {
        console.log("failed")
        styleImage.hide();    // or something other
    });

}

function hoverImg(){
    iconimg = document.getElementById("plusicon")
    iconimg.setAttribute('src', "assets/icons/plus-hover.svg")
}

function leaveImg(){
    iconimg = document.getElementById("plusicon")
    iconimg.setAttribute('src', "assets/icons/plus.svg")
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

function changeOpacity(){
    const sliderOpacity = document.querySelector("#sliderOpacity");
    const img = document.querySelector("#xrai-img");

    img.style.opacity = (sliderOpacity.value)/100;

    document.getElementById("numOpacity").innerHTML = sliderOpacity.value;
}
