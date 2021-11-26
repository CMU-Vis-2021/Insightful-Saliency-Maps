// set the dimensions and margins of the graph
var marginT1 = {top: 10, right: 0, bottom: 90, left: 120},
    widthT1 = 460 - marginT1.left - marginT1.right,
    heightT1 = 350 - marginT1.top - marginT1.bottom;


// append the svg object to the body of the page
const svgPrediction = d3.select("#d3-bar-tab1")
  .append("svg")
  .attr("width", widthT1 + marginT1.left + marginT1.right)
  .attr("height", heightT1 + marginT1.top + marginT1.bottom)
  .append("g")
  .attr("transform",`translate(${marginT1.left},${marginT1.top})`);


// Add X axis
var xT1 = d3.scaleLinear()
  .range([ 0, widthT1]);

  //add x axis to the bar chart svg
const xAxisT1 = svgPrediction.append("g")
  .attr("transform", "translate(0," + heightT1 + ")");

    
// Add Y axis
var yT1 = d3.scaleBand()
  .range([ 0, heightT1 ])
  .padding(.1);

//add y axis to the bar chart svg
const yAxisT1 = svgPrediction.append("g");

let predictData = predictions.filter( function(d){return d.file_name == "dog-stylized-tiger.jpg"});

// Y axis
yT1.domain(predictData.map(function(d) { return d.prediction; } ) )
yAxisT1.transition().duration(1000).call(d3.axisLeft(yT1) )

// Add X axis
xT1.domain([0, d3.max(predictData, function(d) { return d.confidence }) ]);
xAxisT1.transition().duration(1000).call(d3.axisBottom(xT1));

// Make x axis label
svgPrediction.append("text")
    .attr("class", "x-label")
    .attr("text-anchor", "end")
    .attr("dy", ""+(heightT1+45)+"px")
    .attr("dx", ""+(widthT1)-20+"px")
    .text("Algorithm's confidence in prediction(%)");


function updateBarPrediction(fileName){
  //filter our data to only show predictions for the selected file
  let predictData = predictions.filter( function(d){return d.file_name == fileName});

  // Y axis
  yT1.domain(predictData.map(function(d) { return d.prediction; } ) )
  yAxisT1.transition().duration(1000).call(d3.axisLeft(yT1) )

  // Add X axis
  xT1.domain([0, d3.max(predictData, function(d) { return d.confidence }) ]);
  xAxisT1.transition().duration(1000).call(d3.axisBottom(xT1));

  // map data to existing bars
  var barsPredict = svgPrediction.selectAll("rect")
             .data(predictData);
  
  
  barsPredict
    .join("rect")
    .transition()
    .duration(1000)
    // .attr("class", function(d) { return "fire"+d.FIRE_SIZE } )
    .attr("x", xT1(0) )
    .attr("y", d => yT1(d.prediction) )
    .attr("width", d => xT1(d.confidence))
    .attr("height", yT1.bandwidth() )
    .attr("fill", "#efa768")
}
//updateBarPrediction("dog-stylized-tiger.jpg");

