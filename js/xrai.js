function xraicheck(){
    if(document.getElementById('tab1xrai').value == "unchecked"){
        console.log("currently unchecked")
        document.getElementById('tab1xrai').value = "checked"
    } else {
        console.log("currently checked")
        document.getElementById('tab1xrai').value = "unchecked"
    }

    if(document.getElementById("tab1xrai").value == "checked"){
        console.log("value is checked")
        document.getElementById("xraiscale").style.display = "block";
        xraioverlap(choice = document.getElementById("shapeselect0"), id = 'stylized-img-ss1', query = '.flex #stylized-img-div1', appendHTML = '<img id="stylized-img-ss1" style="position: relative; margin: 0px; max-width: 230px; width:100%;"> <img id="xrai-img1" style="position: absolute; opacity: 40%; max-width: 230px;width:100%;"> ', sliders = document.getElementById("sliderTab1"));
    } else {
        document.getElementById("xraiscale").style.display = "none";
        document.getElementById("sliderTab1").style.display = "none"
        document.getElementById("xrai-img1").remove();
        stylizeImg();
    }
    
}

function set_xraiimg(choice = document.getElementById("stylized-ss"), imgobj = '#stylized-img-xrai', xrai =document.getElementById("xrai-img")){

    var remove_img = xrai
    if (remove_img != null){
        remove_img.src = ""
    }

    var xrai_classpath = "./assets/heatmaps/"+ choice.value + ".png";

    var xraiImage = $(imgobj)

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



function xrairadio(radio = document.getElementsByName("xraiList"), query = '.flex #stylized-img-div', appendHTML = '<div class= "img-label"><img id="stylized-img-xrai"><div><p>XRAI</p></div></div>', originalHTML = '<img id="stylized-img-ss">', sliders = document.getElementById("sliders"), opacityNum = document.querySelector("#sliderOpacity")){

    for (var i = 0, length = radio.length; i < length; i++) {
      if (radio[i].checked) {
        if(radio[i].value == "show"){
            var img_div = document.querySelector(query)
            img_div.innerHTML = img_div.innerHTML + appendHTML

            if(radio[i].name == "xraiList"){
                var slider = sliders
                slider.style.display = "none";
                set_xraiimg(); 
           } else if(radio[i].name == "ogList"){
                var slider = sliders
                slider.style.display = "none";
                set_xraiimg(choice = document.getElementById("original-ss"), imgobj = '#original-img-xrai', xrai=document.getElementById("xrai-og-img"));
           }

           var radio_og = document.getElementsByName("ogList")
           var radio_xrai = document.getElementsByName("xraiList")

           if(radio_og[0].checked && radio_xrai[0].checked){
                var sal_div = document.getElementById("salsim-div")
                sal_div.style.display = "block";
                changeAlpha();
                changeK();
           }

        }
        else if (radio[i].value == "hide"){
            var img_div = document.querySelector(query)
            img_div.innerHTML = originalHTML

            console.log("IN HIDE")

            document.getElementById("label1-xrai-tab2")
            document.getElementById("salsim-div").style.display = "none";

            var slider = sliders
            slider.style.display = "none";
            if(radio[i].name == "xraiList"){
                ssimg()
            }else if(radio[i].name =="ogList"){
                ssimg(xraiimg=document.getElementById("xrai-og-img"), opacityNum = document.querySelector("#sliderOpacityOg"))
            }
            
        } else if(radio[i].value == "overlap"){
            document.getElementById("salsim-div").style.display = "none";
            const sliderOpacity = opacityNum;
            sliderOpacity.value = 40;

            if(radio[i].name == "xraiList"){
                xraioverlap();
            } else if(radio[i].name == "ogList"){
                xraioverlap(document.getElementById("original-ss"), id="original-img-ss", query = ".flex #original-img-div", appendHTML = "<img id=\"original-img-ss\" style=\"position: relative;\"> <img id=\"xrai-og-img\" style=\"position: absolute; opacity: 40%\">", sliders = document.getElementById("slidersOg"))
            }
        } 
        break;
      }
    }

}

function xraioverlap(choice = document.getElementById("stylized-ss"), id = 'stylized-img-ss', query = '.flex #stylized-img-div', appendHTML = '<img id="stylized-img-ss" style="position: relative;"> <img id="xrai-img" style="position: absolute; opacity: 40%"> ', sliders = document.getElementById("sliders")){

    var img_div = document.querySelector(query)
    img_div.innerHTML = appendHTML

    if (id != "stylized-img-ss1"){
        if (choice.value.split("-")[1] == "stylized"){
            var beg_path = "./assets/stylized-images/"
            var option = choice.value
        } else {
            var beg_path = "./assets/shapes/"
            var option = choice.value.split("-")[0]
        }

        var og_classpath = beg_path+option + ".jpg";
        var xrai_classpath = "./assets/heatmaps/"+ choice.value + ".png";
    } else {
        var beg_path = "./assets/stylized-images/"
        var option = choice.value + "-stylized-" + document.getElementById("textureselect0").value

        console.log(option)
        var og_classpath = beg_path+option + ".jpg";
        var xrai_classpath = "./assets/heatmaps/"+ option + ".png";
    }
    
    if(id == 'original-img-ss'){
        console.log("original-img-ss")
        document.getElementById("salsim-div").style.display = "none";
        var ogImage = $('#original-img-ss')
        var xraiImage = $('#xrai-og-img')
    } else if(id == 'stylized-img-ss1'){
        console.log("stylizedimg0")
        var ogImage = $('#stylized-img-ss1')
        var xraiImage = $('#xrai-img1')
    } else {
        console.log("it is something else")
        document.getElementById("salsim-div").style.display = "none";
        var ogImage = $('#stylized-img-ss')
        var xraiImage = $('#xrai-img')
    }
    

    $.ajax({
        url: xrai_classpath,
        type: "GET"
    }).done(function() {
        xraiImage.attr('src', xrai_classpath);   // set the image source
    }).fail(function() {
        xraiImage.hide();    // or something other
    });

    $.ajax({
        url: og_classpath,
        type: "GET"
    }).done(function() {
        ogImage.attr('src', og_classpath);   // set the image source
    }).fail(function() {
        ogImage.hide();    // or something other
    });

    sliders.style.display = "block";

}