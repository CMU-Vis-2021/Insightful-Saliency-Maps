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
let count = 0

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
//               TAB 2 FUNCTIONS               //
/***********************************************/
var disabledElem1 = document.getElementById("tab2-disabledElement1")
var disabledElem2 = document.getElementById("original-saliency")

function ssimg(xraiimg = document.getElementById("xrai-img"), opacityNum = document.querySelector("#sliderOpacity")){
    if(disabledElem1.classList.contains('disabled')){
        disabledElem1.classList.remove('disabled');
        disabledElem2.classList.remove('disabled');
    }
    var remove_img = xraiimg
    
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
        set_xraiimg()

        var remove_img = document.getElementById("stylized-img-xrai")
        if (remove_img != null){
            remove_img.src = ""
        } else {
            var img_div = document.querySelector('.flex #stylized-img-div')
            img_div.innerHTML = img_div.innerHTML + '<div class= "img-label"><img id="stylized-img-xrai"><div><p>XRAI</p></div></div>'
        }
        
        set_xraiimg()

        var radio_og = document.getElementsByName("ogList")

        if(radio_og[0].checked){

            var remove_img = document.getElementById("original-img-xrai")
            if (remove_img != null){
                remove_img.src = ""
            } else {
                var img_div = document.querySelector('.flex #original-img-div')
                img_div.innerHTML = img_div.innerHTML + '<div class = "img-label" ><div><p>XRAI</p></div><img id="original-img-xrai"></div>"'
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

}

function addImg(imgid){

    split = imgid.id.split(" ")
    imgidname = split[0] + "grid" + " " + split[1]

    if (imgid.name == "selected"){
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

let tab1input2 = document.getElementById("tab1-input2");
let tab1input2dropdown = document.getElementById("textureselect0");
function firstIputDone(){
    tab1input2.classList.remove("disabled");
    if( tab1input2dropdown.disabled == true)
        tab1input2dropdown.removeAttribute('disabled')
    else{
        stylizeImg();
    }
}