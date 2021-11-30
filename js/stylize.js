function shapeImg(){
    var selectShape = document.getElementById('shapeselect'+count.toString())
}

function textureImg(){
    var selectTexture = document.getElementById('textureselect'+count.toString())
}

function input3enable(){
    let input3 = document.getElementById('tab1-input3');
    let input4 = document.getElementById('stylized-img-div1');
    if(input3.classList.contains('disabled')){
        input4.classList.remove('disabled');
        input3.classList.remove('disabled');
    }
}

function stylizeImg(){
    
    input3enable();

    var selectShape = document.getElementById('shapeselect'+count.toString())
    var selectTexture = document.getElementById('textureselect'+count.toString())

    var quizImage = $('#stylizedimg'+count.toString())

    classpath = "./assets/stylized-images/"+selectShape.value+"-stylized-"+ selectTexture.value + ".jpg";
    updateBarPrediction(selectShape.value+"-stylized-"+ selectTexture.value);

    $.ajax({
        url: classpath,
        type: "GET"
    }).done(function() {
        quizImage.attr('src', classpath);   // set the image source
    }).fail(function() {
        quizImage.hide();    // or something other
    });

    if(document.getElementById('tab1xrai').value == "checked"){
        xraioverlap(choice = document.getElementById("shapeselect0"), id = 'stylizedimg', query = '.flex #stylized-img-div1', appendHTML = '<img id="stylizedimg0" style="position: relative; margin: 0px; max-width: 230px; width:100%;"> <img id="xrai-img1" style="position: absolute; opacity: ' + document.querySelector("#sliderOpacity1").value + '%; max-width: 230px;width:100%;"> ', sliders = document.getElementById("sliderTab1"));
    }  
    

    document.getElementById("checkboxoverlap").style.display = "block";
}