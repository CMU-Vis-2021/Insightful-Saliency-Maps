function ssimg(xraiimg = document.getElementById("xrai-img"), opacityNum = document.querySelector("#sliderOpacity")){

    var remove_img = xraiimg
    
    if (remove_img != null){
        remove_img.src = ""
    }

    var choice = document.getElementById("stylized-ss")

    var style_classpathss = "./assets/stylized-images/"+ choice.value + ".jpg";

    var img_style = document.getElementById("stylized-img-ss")
    img_style.setAttribute('src', style_classpathss)

    document.getElementById("AIpred").innerHTML = predictions[choice.value][0]['label']
    document.getElementById("AIconf").innerHTML = (predictions[choice.value][0]['confidence'] * 100).toFixed(2)

    var shapename = choice.value.split("-")[0]

    var ogselect = document.getElementById("original-ss");
    ogselect.value = shapename;

    ogimg();

    var radio = document.getElementsByName("xraiList")
    if(radio[0].checked){
        set_xraiimg()

        var remove_img = document.getElementById("stylized-img-xrai")
        if (remove_img != null){
            remove_img.src = ""
        } else {
            var img_div = document.querySelector('.flex #stylized-img-div')
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

    var choice = document.getElementById("original-ss")

    var og_classpath = "./assets/shapes/"+ choice.value + ".jpg";

    var img_style = document.getElementById("original-img-ss")
    img_style.setAttribute('src', og_classpath)

    document.getElementById("OgAIpred").innerHTML = predictions[choice.value][0]['label']
    document.getElementById("OgAIconf").innerHTML = (predictions[choice.value][0]['confidence'] * 100).toFixed(2)

}


var models = []

function modelCompare(checkID){

    if((checkID.value).includes("unchecked")){
        checkID.value = (checkID.value).split("unchecked ")[1]
        models.push(checkID.value)
    } else {
        
        models = models.filter(function(value){ 
            return value != checkID.value;
        });
        checkID.value = "unchecked " + checkID.value
    }
}

function intersectCompare(){
    models.forEach(function(element){
        if(models.length == 2){
            document.getElementById("modelsCompare").style.margin = "0px 10$ 0px 10%"
        } else if (models.length == 1){
            document.getElementById("modelsCompare").style.margin = "0px 20% 0px 20%"
        }

        document.getElementById(element+"-img").src = "/assets/saliency-similarity/"+element+"/"+document.getElementById("compare-ss").value+"-15.png"
        document.getElementById(element+"-compare").style.display = "block"


    })
}