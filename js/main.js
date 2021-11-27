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