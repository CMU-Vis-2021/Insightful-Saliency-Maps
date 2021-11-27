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
    btn = document.getElementById("averageCompute imageOptions")
    btn.style.background = "#246db6"
}

function leaveBtn(){
    btn = document.getElementById("averageCompute imageOptions")
    btn.style.background = "#479ff8"
}
