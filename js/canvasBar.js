var dataColors = [
    {
      "color": "yellow",
      "pixel_count": 1069,
      "percentage": 0.98,
      "user_percentage": 0
    },
    {
      "color": "orange",
      "pixel_count": 3494,
      "percentage": 3.21,
      "user_percentage": 0
    },
    {
      "color": "red",
      "pixel_count": 7892,
      "percentage": 7.25,
      "user_percentage": 0
    },
    {
      "color": "purple",
      "pixel_count": 16193,
      "percentage": 14.87,
      "user_percentage": 0
    }
  ];

var color = d3.scaleOrdinal()
    .domain(["yellow","orange","red","purple"])
    .range(["#ffda2e","#f3781e","#bb0f44","#5b0b67"])

// set the dimensions and margins of the graph
var marginT3 = {top: 10, right: 0, bottom: 20, left: 50},
    widthT3 = 460 - marginT3.left - marginT3.right,
    heightT3 = 350 - marginT3.top - marginT3.bottom;


// append the svg object to the body of the page
const svg = d3.select("#d3-canvas-bar")
  .append("svg")
    .attr("width", widthT3 + marginT3.left + marginT3.right)
    .attr("height", heightT3 + marginT3.top + marginT3.bottom)
  .append("g")
    .attr("transform",`translate(${marginT3.left},${marginT3.top})`);

  // List of subgroups = header of the csv files = soil condition here
  const subgroups = ["percentage","user_percentage"];

  // List of groups = species here = value of the first column called group -> I show them on the X axis
  const groups = dataColors.map(d => d.color);

  console.log("groups = "+ groups)

  // Add X axis
  const x = d3.scaleBand()
      .domain(groups)
      .range([0, widthT3])
      .padding([0.2])
  svg.append("g")
    .attr("transform", `translate(0, ${heightT3})`)
    .call(d3.axisBottom(x).tickSize(0));

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([0, 15])
    .range([ heightT3, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Another scale for subgroup position?
  const xSubgroup = d3.scaleBand()
    .domain(subgroups)
    .range([0, x.bandwidth()])
    .padding([0.05])

  // Show the bars
  svg.append("g")
    .selectAll("g")
    // Enter in data = loop group per group
    .data(dataColors)
    .join("g")
      .attr("transform", d => `translate(${x(d.color)}, 0)`)
    .selectAll("rect")
    .data(function(d) { return subgroups.map(function(key) { if(key == "user_percentage"){return {key: key, value: d.user_percentage, color: d.color};} return {key: key, value: d.percentage, color: d.color}; }); })
    .join("rect")
      .attr("class", d => d.key)
      .attr("x", d => xSubgroup(d.key))
      .attr("y", d => y(d.value))
      .attr("width", xSubgroup.bandwidth())
      .attr("height", d => heightT3 - y(d.value))
      .attr("fill", function(d) { if(d.key == "percentage"){ return colorGrey}; return color(d.color) });

// Make y axis label
svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("dy", "-35px")
    .attr("dx", "-"+(widthT3/2-140)+"px")
    .attr("transform", "rotate(-90)")
    .text("Percentage seen in that color");



// d3.selectAll(".button").on("click",updateData);
d3.selectAll("#canvas").on("mouseup",updateData);

  function updateData(){
    calcNewPixels();
    
    // Show the bars
    var bars = svg.selectAll(".user_percentage")
                  .data(dataColors)
    
    bars
      .join(".user_percentage")
      .transition()
      .duration(1000)
        .attr("x", d => xSubgroup("user_percentage"))
        .attr("y", d => y(d.user_percentage))
        .attr("width", xSubgroup.bandwidth())
        .attr("height", d => heightT3 - y(d.user_percentage))
        .attr("fill", d => color(d.color));

  }
  
// Set up our drawing context



  function calcNewPixels(){
    const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    const imgDataCompare = contextCompare.getImageData(0, 0, canvasCompare.width, canvasCompare.height);
    
    //the heatmap on the bottom will be what we compare the input to
    const data = imgData.data;
    const dataCompare = imgDataCompare.data;
    console.log("length of data = "+data.length)
    // console.log("length of heat data = "+dataCompare)
    
    //when I am going through each pixel, I want to count the correctly colord ones. That's what this is setting up
    let countYellow = 0;
    let countRed = 0;
    let countOrange = 0;
    let countPurple = 0;

    //Iterate through all pixels. We add 4 each time bc we are skipping throuhg the rgba(4) values
    for(let i = 0; i < data.length; i += 4) {
      //The number values at the end of the function correspond to the hex color we are using in each instance
      countYellow += compareColor(data, dataCompare, i, 255, 218, 46);
      countOrange += compareColor(data, dataCompare, i, 243, 120, 30);
      countRed += compareColor(data, dataCompare, i, 187, 15, 68);
      countPurple += compareColor(data, dataCompare, i, 91, 11, 103);
    }
    //Let's pirint the pixels its found to compare with our data
    console.log("countYellow = "+countYellow);
    console.log("countOrange = "+countOrange);
    console.log("countRed = "+countRed);
    console.log("countPurple = "+countPurple);

    //now update data json with user's inputted values.
    for(let e = 0; e < dataColors.length; e += 1){
      if(dataColors[e].color == "yellow"){
        //make values into percentages and pass it into the correct place in the json
        dataColors[e].user_percentage = ((countYellow/(data.length/4))*100).toFixed(2);
      }
      if(dataColors[e].color == "orange"){
        dataColors[e].user_percentage = ((countOrange/(data.length/4))*100).toFixed(2);
      }
      if(dataColors[e].color == "red"){
        dataColors[e].user_percentage = ((countRed/(data.length/4))*100).toFixed(2);
      }
      if(dataColors[e].color == "purple"){
        dataColors[e].user_percentage = ((countPurple/(data.length/4))*100).toFixed(2);
      }
    }

  }
  function compareColor(data, dataCompare, i, r, g, b){
    let red = false;
    let green = false;
    let blue = false;

    //compare red value in rgba
    if( data[i] == r && data[i] == dataCompare[i]){
      red = true;
    }
    //compare green
    if( data[i + 1] == g && data[i + 1] == dataCompare[i + 1]){
      green = true;
    }
    //compare blue
    if( data[i + 2] == b && data[i + 2] == dataCompare[i + 2]){
      blue = true;
    }

    //If rgb is all the same we've found the color we want!
    if(red && green && blue){
      return 4;
    }else{
      return 0;
    }

  }
