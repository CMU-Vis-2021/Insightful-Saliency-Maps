/***********************************************/
//            PIECHART VARIABLES               //
/***********************************************/

const width = 275,
    height = 275,
    margin = 20;

const svg1 = d3.select("#salsim-pie1")
  .append("svg")
    .attr("width", width-25)
    .attr("height", height-25)
  .append("g")
    .attr("transform", `translate(${(width-25)/2}, ${(height-25)/2})`);

// append the svg object to the div called 'my_dataviz'
const svg2 = d3.select("#salsim-pie2")
  .append("svg")
    .attr("width", width-25)
    .attr("height", height-25)
  .append("g")
    .attr("transform", `translate(${(width-25)/2}, ${(height-25)/2})`);


function updatePieChart(pie1data, pie2data, colors1, colors2){

    //pie2 is original image
    //pie1 is stylized image

    const width = 275,
    height = 275,
    margin = 20;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    const radius = Math.min(width-25, height-25) / 2 - margin;

    const data1 = pie1data

    // set the color scale
    const color1 = d3.scaleOrdinal().range(colors1)
    console.log(color1)

    // Compute the position of each group on the pie:
    const pie = d3.pie()
        .startAngle(1.1*Math.PI)
        .endAngle(3.1*Math.PI)
      .value(function(d) {return d[1]})

    const data_ready1 = pie(Object.entries(data1))

    const data2 = pie2data

    const color2 = d3.scaleOrdinal().range(colors2)

    const data_ready2 = pie(Object.entries(data2))

    // change the pie charts
    var arc = d3.arc()
        .outerRadius(radius)
        .innerRadius(0);

    var g = svg2.selectAll(".arc")
      .data(data_ready2)
        .join("path")
      .style("fill", function(d) { return color2(d.data[1]); })
      .transition().delay(function(d, i) { return i * 500; }).duration(500)
      .attrTween('d', function(d) {
           var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
           return function(t) {
               d.endAngle = i(t);
             return arc(d);
           }
      });

    svg2.append("text")
        .attr("x", -50)             
        .attr("y", 120)
        .attr("text-anchor", "bottom")  
        .style("font-size", "14px") 
        .style("font-weight", "bold")  
        .text("Original Image");

    svg2
      .selectAll('.arc')
      .data(data_ready2)
      .join('text')
      .text(function(d){ return (d.data[1]*100).toFixed(1)})
      .attr("transform", function(d) { return `translate(${arc.centroid(d)})`})
      .style("text-anchor", "middle")
      .style("font-size", 12)


    var g1 = svg1.selectAll(".arc")
      .data(data_ready1)
        .join("path")
      .style("fill", function(d) { return color1(d.data[1]); })
      .transition().delay(function(d, i) { return i * 500; }).duration(500)
      .attrTween('d', function(d) {
           var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
           return function(t) {
               d.endAngle = i(t);
             return arc(d);
           }
      });

      svg1.append("text")
        .attr("x", -50)             
        .attr("y", 120)
        .attr("text-anchor", "bottom")  
        .style("font-size", "14px") 
        .style("font-weight", "bold")  
        .text("Stylized Image");

    svg1
      .selectAll('.arc')
      .data(data_ready1)
      .join('text')
      .text(function(d){ return (d.data[1]*100).toFixed(1)})
      .attr("transform", function(d) { return `translate(${arc.centroid(d)})`})
      .style("text-anchor", "middle")
      .style("font-size", 12)

}