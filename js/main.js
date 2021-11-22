var colorYellow = '#ffda2e';
var colorRed = '#bb0f44';
var colorOrange = '#f3781e';
var colorPurple = '#5b0b67';
var colorGrey = '#A9A9A9';

let tab1 = document.getElementById("tab1");
let tab2 = document.getElementById("tab2");
let tab3 = document.getElementById("tab3");
let tab4 = document.getElementById("tab4");

let tab1Button = document.getElementById("openTab1");
let tab2Button = document.getElementById("openTab2");
let tab3Button = document.getElementById("openTab3");
let tab4button = document.getElementById("openTab4");

let mydata = JSON.stringify(data);
let parseddata = JSON.parse(mydata)
let prediction = "";
let averageImgList = [];


/***********************************************/
//            PIECHART VARIABLES               //
/***********************************************/

const width = 275,
    height = 275,
    margin = 20;

const svg1 = d3.select("#salsim-pie1")
  .append("svg")
    .attr("width", width-25)
    .attr("height", height-25)
  .append("g")
    .attr("transform", `translate(${(width-25)/2}, ${(height-25)/2})`);

// append the svg object to the div called 'my_dataviz'
const svg2 = d3.select("#salsim-pie2")
  .append("svg")
    .attr("width", width-25)
    .attr("height", height-25)
  .append("g")
    .attr("transform", `translate(${(width-25)/2}, ${(height-25)/2})`);

/***********************************************/
//             CANVAS FUNCTIONS                //
/***********************************************/

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
ctx.drawImage(img, 0, 0,c.width,c.height);
contextCompare.drawImage(img2, 0, 0,c.width,c.height);
}

/***********************************************/
//             GENERAL FUNCTIONS               //
/***********************************************/

// ml model variables and function
const classifier = ml5.imageClassifier("MobileNet", modelLoaded);
// When the model is loaded
function modelLoaded() {
    console.log("Model Loaded!");
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

function changeTab(button, tabToReveal){
    
    if(button.classList.contains("active") != true){
        tab1Button.classList = "";
        tab2Button.classList = "";
        tab3Button.classList = "";
        tab4button.classList = "";
        button.classList = "active"

        if(tabToReveal == "tab1")
            {
                tab1.classList= "";
                tab2.classList= "hidden";
                tab3.classList= "hidden";
                tab4.classList="hidden";
            }
        else if(tabToReveal == "tab2")
        {
            tab1.classList= "hidden";
            tab2.classList= "";
            tab3.classList= "hidden";
            tab4.classList="hidden";
        }
        else if(tabToReveal == "tab3")
        {
            tab1.classList= "hidden";
            tab2.classList= "hidden";
            tab3.classList= "";
            tab4.classList="hidden";
        }
        else if(tabToReveal == "tab4")
        {
            tab1.classList= "hidden";
            tab2.classList= "hidden";
            tab3.classList= "hidden";
            tab4.classList="";
        }
    }
} 

/***********************************************/
//               TAB 1 FUNCTIONS               //
/***********************************************/

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

/***********************************************/
//               TAB 2 FUNCTIONS               //
/***********************************************/

function ssimg(xraiimg = document.getElementById("xrai-img"), opacityNum = document.querySelector("#sliderOpacity")){

    var remove_img = xraiimg
    console.log(remove_img)
    if (remove_img != null){
        console.log(remove_img)
        console.log("REMOVING IT")
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
            
            var sal_div = document.getElementById("salsim-div")
            
            sal_div.style.display = "block";
            changeAlpha();
            changeK();
        }
    } else if(radio[2].checked){
        const sliderOpacity = opacityNum;
        document.getElementById("salsim-div").style.display = "none";
        sliderOpacity.value = 40;
        
        xraioverlap();
        
    }



}

function ogimg(){

    // var remove_img = document.getElementById("xrai-og-img")
    // if (remove_img != null){
    //     console.log("WE DONT WANT THIS")
    //     remove_img.src = ""
    // }

    var choice = document.getElementById("original-ss")

    var og_classpath = "./assets/shapes/"+ choice.value + ".jpg";

    var img_style = document.getElementById("original-img-ss")
    img_style.setAttribute('src', og_classpath)

}

function set_xraiimg(choice = document.getElementById("stylized-ss"), imgobj = '#stylized-img-xrai', xrai =document.getElementById("xrai-img")){

    var remove_img = xrai
    console.log("REMOVE IMG", remove_img)
    if (remove_img != null){
        console.log("SET XRAI HELLLOOOO")
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

function xrairadio(radio = document.getElementsByName("xraiList"), query = '.flex #stylized-img-div', appendHTML = '<img id="stylized-img-xrai">', originalHTML = '<img id="stylized-img-ss">', sliders = document.getElementById("sliders"), opacityNum = document.querySelector("#sliderOpacity")){

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
                var slider = sliders
                slider.style.display = "none";
                set_xraiimg(); 
           } else if(radio[i].id == "og"){
                var slider = sliders
                slider.style.display = "none";
                set_xraiimg(choice = document.getElementById("original-ss"), imgobj = '#original-img-xrai', xrai=document.getElementById("xrai-og-img"));
           }

           var radio_og = document.getElementsByName("ogList")
           var radio_xrai = document.getElementsByName("xraiList")

           if(radio_og[0].checked && radio_xrai[0].checked){
                console.log("they are the same!")
                var sal_div = document.getElementById("salsim-div")
                console.log(sal_div)
                sal_div.style.display = "block";
                changeAlpha();
                changeK();
           }

        }
        else if (radio[i].value == "hide"){
            console.log("HIDING")
            var img_div = document.querySelector(query)
            img_div.innerHTML = originalHTML

            console.log(img_div)

            document.getElementById("salsim-div").style.display = "none";

            var slider = sliders
            slider.style.display = "none";
            if(radio[i].id == "xrai"){
                console.log("HELLOOO")
                ssimg()
            }else if(radio[i].id =="og"){
                console.log("IN OG HIDE")
                ssimg(xraiimg=document.getElementById("xrai-og-img"), opacityNum = document.querySelector("#sliderOpacityOg"))
            }
            
        } else if(radio[i].value == "overlap"){
            document.getElementById("salsim-div").style.display = "none";
            const sliderOpacity = opacityNum;
            sliderOpacity.value = 40;

            if(radio[i].id == "xrai"){
                xraioverlap();
            } else if(radio[i].id == "og"){
                xraioverlap(document.getElementById("original-ss"), id="original-img-ss", query = ".flex #original-img-div", appendHTML = "<img id=\"original-img-ss\" style=\"position: relative;\"> <img id=\"xrai-og-img\" style=\"position: absolute; opacity: 40%\">", sliders = document.getElementById("slidersOg"))
            }
        } 
        break;
      }
    }

}

function xraioverlap(choice = document.getElementById("stylized-ss"), id = 'stylized-img-ss', query = '.flex #stylized-img-div', appendHTML = '<img id="stylized-img-ss" style="position: relative;"> <img id="xrai-img" style="position: absolute; opacity: 40%"> ', sliders = document.getElementById("sliders")){

    document.getElementById("salsim-div").style.display = "none";

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

    
    if(id == 'original-img-ss'){
        var ogImage = $('#original-img-ss')
        var xraiImage = $('#xrai-og-img')
    } else {
        var ogImage = $('#stylized-img-ss')
        var xraiImage = $('#xrai-img')
    }
    

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

    sliders.style.display = "block";

}

function changeAlpha(){

    var choice = document.getElementById("stylized-ss")

    const sliderAlpha = document.querySelector("#sliderAlpha");
    const sliderK = document.querySelector("#sliderK");

    document.getElementById("numAlpha").innerHTML = sliderAlpha.value;

    var styleImage = $('#salsim-img')


    var style_classpath = "./assets/saliency-similarity/"+ choice.value + "-" + sliderAlpha.value.toString() + ".png";

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

function changeK(){
    const sliderK = document.querySelector("#sliderK");
    document.getElementById("numK").innerHTML = sliderK.value;

    var choice = document.getElementById("stylized-ss")

    var shpnme = choice.value.split("-")[0]

    var remove_pie1 = document.getElementById("salsim-pie1")
    console.log("REMOVE PIE", remove_pie1)
    if (remove_pie1 != null){
        updatePieChart(piechartjson[choice.value][sliderK.value]['data'], piechartjson[shpnme][sliderK.value]['data'], piechartjson[choice.value][sliderK.value]['colors'], piechartjson[shpnme][sliderK.value]['colors'])
    }

    var remove_pie2 = document.getElementById("salsim-pie2")
    console.log("REMOVE PIE", remove_pie2)
    if (remove_pie2 != null){
        updatePieChart(piechartjson[choice.value][sliderK.value]['data'], piechartjson[shpnme][sliderK.value]['data'], piechartjson[choice.value][sliderK.value]['colors'], piechartjson[shpnme][sliderK.value]['colors'])
    }
}


function updatePieChart(pie1data, pie2data, colors1, colors2){

    console.log(pie1data)
    console.log(pie2data)
    console.log(colors1)
    console.log(colors2)


    // pie2 is original image
    //pie1 is stylized image

    const width = 275,
    height = 275,
    margin = 20;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    const radius = Math.min(width-25, height-25) / 2 - margin;

    // Create dummy data
    const data1 = pie1data

    // set the color scale
    const color1 = d3.scaleOrdinal().range(colors1)
    console.log(color1)

    // Compute the position of each group on the pie:
    const pie = d3.pie()
        
        .startAngle(1.1*Math.PI)
        .endAngle(3.1*Math.PI)
      .value(function(d) {return d[1]})

    const data_ready1 = pie(Object.entries(data1))

    const data2 = pie2data

    const color2 = d3.scaleOrdinal().range(colors2)

    const data_ready2 = pie(Object.entries(data2))

    // change the pie charts
    var arc = d3.arc()
        .outerRadius(radius)
        .innerRadius(0);

    var g = svg2.selectAll(".arc")
      .data(data_ready2)
        .join("path")
      .style("fill", function(d) { return color2(d.data[1]); })
      .transition().delay(function(d, i) { return i * 500; }).duration(500)
      .attrTween('d', function(d) {
           var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
           return function(t) {
               d.endAngle = i(t);
             return arc(d);
           }
      });

    svg2.append("text")
        .attr("x", -50)             
        .attr("y", 120)
        .attr("text-anchor", "bottom")  
        .style("font-size", "14px") 
        .style("font-weight", "bold")  
        .text("Original Image");

    svg2
      .selectAll('.arc')
      .data(data_ready2)
      .join('text')
      .text(function(d){ return (d.data[1]*100).toFixed(1)})
      .attr("transform", function(d) { return `translate(${arc.centroid(d)})`})
      .style("text-anchor", "middle")
      .style("font-size", 12)


    var g1 = svg1.selectAll(".arc")
      .data(data_ready1)
        .join("path")
      .style("fill", function(d) { return color1(d.data[1]); })
      .transition().delay(function(d, i) { return i * 500; }).duration(500)
      .attrTween('d', function(d) {
           var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
           return function(t) {
               d.endAngle = i(t);
             return arc(d);
           }
      });

      svg1.append("text")
        .attr("x", -50)             
        .attr("y", 120)
        .attr("text-anchor", "bottom")  
        .style("font-size", "14px") 
        .style("font-weight", "bold")  
        .text("Stylized Image");

    svg1
      .selectAll('.arc')
      .data(data_ready1)
      .join('text')
      .text(function(d){ return (d.data[1]*100).toFixed(1)})
      .attr("transform", function(d) { return `translate(${arc.centroid(d)})`})
      .style("text-anchor", "middle")
      .style("font-size", 12)

}

function changeOpacity(slider = document.querySelector("#sliderOpacity"), imgchoice = document.querySelector("#xrai-img"), text = document.getElementById("numOpacity")){
    const sliderOpacity = slider;
    const img = imgchoice;

    img.style.opacity = (sliderOpacity.value)/100;

    console.log("SLIDERNUM", text)
    console.log("SLIDER", sliderOpacity)
    text.innerHTML = sliderOpacity.value;
}

function displayImgs(){

    var choice = document.getElementById("average-select")

    var imgList = []

    textureList.forEach(element => imgList.push(choice.value + "-stylized-" + element))

    var rows = document.getElementById("imageOptions rows").children;
    console.log(imgList)

    for (var i =0; i < rows.length; i++){
        console.log("NEW ONE")
        console.log("style")
        imgchild_style = rows[i].children[0].children[0]
        imgchild_heat = rows[i].children[0].children[1]

        newsrc = stylepath + imgList[i] + stylefile
        console.log("NEW SRC", newsrc)
        imgchild_style.src = stylepath + imgList[i] + stylefile
        imgchild_heat.src = heatpath + imgList[i] + heatfile
        console.log(imgchild_style)
        console.log("heat")
        console.log(imgchild_heat)


    }

    document.getElementById('ogheat').src = heatpath + choice.value + heatfile

    document.getElementById("imageOptions rows").style.display = "block";
    document.getElementById("averageCompute imageOptions").style.display = "block";
    document.getElementById("imageOptions").style.display = "block";

    var canvas = document.getElementById("canvasAvg")

    console.log("CANVAS", canvas)

    if(canvas.children.length == 3){
        document.getElementById("canvasAvg").children[2].remove();
    }

    document.getElementById("canvasAvg").innerHTML += "<canvas id='outputCanvas' style='width: 85%'></canvas>"
}

function addImg(imgid){

    split = imgid.id.split(" ")
    imgidname = split[0] + "grid" + " " + split[1]

    if (imgid.name == "selected"){
        console.log("in if")
        document.getElementById(imgid.id).style.border = "0px"
        document.getElementById(imgid.id).style.opacity = "100%"
        document.getElementById(imgid.id).name = "none"

        averageImgList = averageImgList.filter(function(item) {
            return item !== imgidname
        })
        
    } else {

        document.getElementById(imgid.id).style.border = "2px solid #479ff8"
        document.getElementById(imgid.id).style.opacity = "85%"
        document.getElementById(imgid.id).name = "selected"
        averageImgList.push(imgidname)
    }
}

function computeAvg(){

    // function modified from: https://stackoverflow.com/questions/17291455/how-to-get-an-average-picture-from-100-pictures-using-pil

  document.getElementById("canvasAvg").style.display = "block";
  document.getElementById("ogHeatmap").style.display = "block";

  let heatmap_list = []

  averageImgList.forEach(function(element){
    heatmap_list.push(element + " heatmap")
  })

  console.log(heatmap_list)
  let N = averageImgList.length

  let first_img = cv.imread(document.getElementById(heatmap_list[0]))
  let first_dst = new cv.Mat();
  cv.cvtColor(first_img, first_dst, cv.COLOR_RGBA2RGB);
  let size = first_img.size()

  let avg_img = new cv.Mat.zeros(size, first_dst.type());
  let result = new cv.Mat.zeros(size, first_dst.type());
  let dst = new cv.Mat();
  let temp = new cv.Mat();

  let mat = new cv.Mat(330, 330, cv.CV_8UC3, new cv.Scalar(N, N, N))
  console.log(mat)

  for (var i = 0; i < N; i++) {

    console.log(heatmap_list[i])
    let src = cv.imread(document.getElementById(heatmap_list[i]))

    cv.cvtColor(src, dst, cv.COLOR_RGBA2RGB);

    cv.divide(dst, mat, temp)

    cv.add(temp, avg_img, avg_img)

  }

  cv.imshow(document.getElementById('outputCanvas'), avg_img);
}
/***********************************************/
//               HOVER ANIMATIONS              //
/***********************************************/

function hoverImg(){
    iconimg = document.getElementById("plusicon")
    iconimg.setAttribute('src', "assets/icons/plus-hover.svg")
}

function leaveImg(){
    iconimg = document.getElementById("plusicon")
    iconimg.setAttribute('src', "assets/icons/plus.svg")
}

function hoverImggrid(imgid){
    img = document.getElementById(imgid.id)
    img.style.opacity = "75%";
}

function leaveImggrid(imgid){
    img = document.getElementById(imgid.id)
    img.style.opacity = "100%";
}

function hoverBtn(){
    btn = document.getElementById("detailsButton")
    btn.style.background = "#246db6"
}

function leaveBtn(){
    btn = document.getElementById("detailsButton")
    btn.style.background = "#479ff8"
}

/***********************************************/
//               TAB 3 FUNCTIONS               //
/***********************************************/

function revealAnswer(){
    var answerDiv = document.getElementById("answerCanvas");
    answerDiv.classList.add("reveal");    
    document.getElementById("revealAnswerButton").remove();
}
