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
        styleImage.attr('src', style_classpath);   // set the image source
    }).fail(function() {
        styleImage.hide();    // or something other
    });

}

function changeK(){
    const sliderK = document.querySelector("#sliderK");
    document.getElementById("numK").innerHTML = sliderK.value;

    var choice = document.getElementById("stylized-ss")

    var shpnme = choice.value.split("-")[0]

    var remove_pie1 = document.getElementById("salsim-pie1")
    var remove_pie2 = document.getElementById("salsim-pie2")

    if (remove_pie1 != null || remove_pie2 != null){
        updatePieChart(piechartjson[choice.value][sliderK.value]['data'], piechartjson[shpnme][sliderK.value]['data'], piechartjson[choice.value][sliderK.value]['colors'], piechartjson[shpnme][sliderK.value]['colors'])
    }
}

function changeOpacity(slider = document.querySelector("#sliderOpacity"), imgchoice = document.querySelector("#xrai-img"), text = document.getElementById("numOpacity")){
    const sliderOpacity = slider;
    const img = imgchoice;

    img.style.opacity = (sliderOpacity.value)/100;
    text.innerHTML = sliderOpacity.value;
}