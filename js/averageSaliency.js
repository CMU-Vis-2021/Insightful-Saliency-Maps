// change these variables based on the shapes and textures that you are going to use
let shapeList = ['bear', 'dog']
let textureList = ['bikes', 'elephant', 'tiger', 'trucks', 'zebra']

var stylepath = "./assets/stylized-images/"
var stylefile = ".jpg"

var heatpath = "./assets/heatmaps/"
var heatfile = ".png"

let buttonDisabledTab4 = true;

function displayImgs(){

    var choice = document.getElementById("average-select")

    var imgList = []

    textureList.forEach(element => imgList.push(choice.value + "-stylized-" + element))

    var rows = document.getElementById("imageOptions rows").children;

    for (var i =0; i < rows.length; i++){
        imgchild_style = rows[i].children[0].children[0]
        imgchild_heat = rows[i].children[0].children[1]
        newsrc = stylepath + imgList[i] + stylefile
        imgchild_style.src = stylepath + imgList[i] + stylefile
        imgchild_style.alt = "Image choice of " + imgList[i] + " shown for generating average saliency map."
        imgchild_heat.src = heatpath + imgList[i] + heatfile
    }

    document.getElementById('ogheat').src = heatpath + choice.value + heatfile

    document.getElementById("imageOptions rows").style.display = "block";
    document.getElementById("imageOptions").style.display = "block";

    var canvas = document.getElementById("canvasAvg")

    if(canvas.children.length == 3){
        document.getElementById("canvasAvg").children[2].remove();
    }

    document.getElementById("canvasAvg").innerHTML += "<canvas id='outputCanvas' style='width: 200px; height: 200px;'></canvas>"
}


function computeAvg(){

    // function modified from: https://stackoverflow.com/questions/17291455/how-to-get-an-average-picture-from-100-pictures-using-pil

  document.getElementById("canvasAvg").style.display = "block";
  document.getElementById("ogHeatmap").style.display = "block";

  let heatmap_list = []

  averageImgList.forEach(function(element){
    heatmap_list.push(element + " heatmap")
  })

  console.log(averageImgList)
  console.log(heatmap_list[0])

  console.log(document.getElementById(heatmap_list[0]))
  let N = averageImgList.length

  let first_img = cv.imread(document.getElementById(heatmap_list[0]))

  let first_dst = new cv.Mat(); 
  cv.cvtColor(first_img, first_dst, cv.COLOR_RGBA2RGB);

  // console.log("FIRST IMG",  first_dst.ucharPtr(175,175))
  let size = first_img.size()

  let avg_img = new cv.Mat.zeros(size, first_dst.type());
  let result = new cv.Mat.zeros(size, first_dst.type());
  let dst = new cv.Mat();
  let temp = new cv.Mat();

  let mat = new cv.Mat(330, 330, cv.CV_8UC3, new cv.Scalar(N, N, N))

  for (var i = 0; i < N; i++) {

    let src = cv.imread(document.getElementById(heatmap_list[i]))

    cv.cvtColor(src, dst, cv.COLOR_RGBA2RGB);

    cv.divide(dst, mat, temp)

    cv.add(temp, avg_img, avg_img)
  }

  cv.imshow(document.getElementById('outputCanvas'), avg_img);
}



function addImg(imgid){
    if(buttonDisabledTab4){
        document.getElementById("averageCompute imageOptions").style.display = "block";
        buttonDisabledTab4 = false;
    }
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
