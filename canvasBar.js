import * as d3 from "d3";



var dataColors = [
    {
      "color": "yellow",
      "pixel_count": 1069,
      "percentage": 0.98,
      "user_percentage": 1
    },
    {
      "color": "orange",
      "pixel_count": 3494,
      "percentage": 3.21,
      "user_percentage": 2
    },
    {
      "color": "red",
      "pixel_count": 16193,
      "percentage": 14.87,
      "user_percentage": 3
    },
    {
      "color": "purple",
      "pixel_count": 7892,
      "percentage": 7.25,
      "user_percentage": 4
    }
  ];

// // set the dimensions and margins of the graph
// var margin = {top: 20, right: 30, bottom: 40, left: 90},
//     width = 460 - margin.left - margin.right,
//     height = 400 - margin.top - margin.bottom;

var color = d3.scaleOrdinal()
    .domain(["yellow","orange","red","purple"])
    .range(["#ffda2e","#f3781e","#bb0f44","#5b0b67"])

// // append the svg object to the body of the page
// var svg = d3.select("#d3-canvas-bar")
//   .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform",
//           "translate(" + margin.left + "," + margin.top + ")");

// const x = d3.scaleLinear()
//           .domain([0, 15])
//           .range([ 0, width]);
// svg.append("g")
//           .attr("transform", `translate(0, ${height})`)
//           .call(d3.axisBottom(x))
//           .selectAll("text")
//             .attr("transform", "translate(-10,0)rotate(-45)")
//             .style("text-anchor", "end");
      
//         // Y axis
// const y = d3.scaleBand()
//           .range([ 0, height ])
//           .domain(dataColors.map(d => d.color))
//           .padding(.1);
// svg.append("g")
//           .call(d3.axisLeft(y))

// const subgroups = ["yellow","orange","red","purple"];

// // Another scale for subgroup position?
// const ySubgroup = d3.scaleBand()
// .domain(subgroups)
// .range([0, width])
// .padding([0.05])

//Bars
// svg.selectAll("myRect")
//   .data(dataColors)
//   .join("rect")
//   .attr("x", x(0) )
//   .attr("y", d => y(d.color))
//   .attr("width", d => x(d.percentage))
//   .attr("height", y.bandwidth())
//   .attr("fill", function(d){ console.log(d.color);return color(d.color)})

// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 20, left: 50},
    width = 460 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;


// append the svg object to the body of the page
const svg = d3.select("#d3-canvas-bar")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",`translate(${margin.left},${margin.top})`);

  // List of subgroups = header of the csv files = soil condition here
  const subgroups = ["percentage","user_percentage"];

  // List of groups = species here = value of the first column called group -> I show them on the X axis
  const groups = dataColors.map(d => d.color);

  console.log("groups = "+ groups)

  // Add X axis
  const x = d3.scaleBand()
      .domain(groups)
      .range([0, width])
      .padding([0.2])
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).tickSize(0));

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([0, 15])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Another scale for subgroup position?
  const xSubgroup = d3.scaleBand()
    .domain(subgroups)
    .range([0, x.bandwidth()])
    .padding([0.05])

  // color palette = one color per subgroup
  // const color = d3.scaleOrdinal()
  //   .domain(subgroups)
  //   .range(['#e41a1c','#377eb8','#4daf4a'])

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
      .attr("height", d => height - y(d.value))
      .attr("fill", function(d) { if(d.key == "percentage"){ return colorGrey}; return color(d.color) });

// Make y axis label
svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("dy", "-35px")
    .attr("dx", "-"+(width/2-40)+"px")
    .attr("transform", "rotate(-90)")
    .text("Percentage");



// d3.selectAll(".button").on("click",updateData);
d3.selectAll("#canvas").on("mouseup",updateData);

  function updateData(){
    console.log(dataColors[1].user_percentage);
    dataColors[1].user_percentage += 2;

    // var bars = svg.selectAll("g")
    //               .data(dataColors)
                  

      // Show the bars
    var bars = svg.selectAll(".user_percentage")
                  .data(dataColors)
    console.log(bars);
    // bars
    // .data(function(d) {return subgroups.map(function(key) { if(key == "user_percentage"){return {key: key, value: d.user_percentage, color: d.color};} return {key: key, value: d.percentage, color: d.color}; }); })
    // .join("rect")
    // .transition()
    // .duration(1000)
    //   .attr("x", d => xSubgroup(d.key))
    //   .attr("y", d => y(d.value))
    //   .attr("width", xSubgroup.bandwidth())
    //   .attr("height", d => height - y(d.value))
    //   .attr("fill", d => color(d.color));
    
    bars
      .join(".user_percentage")
      .transition()
      .duration(1000)
        .attr("x", d => xSubgroup("user_percentage"))
        .attr("y", d => y(d.user_percentage))
        .attr("width", xSubgroup.bandwidth())
        .attr("height", d => height - y(d.user_percentage))
        .attr("fill", d => color(d.color));

  }
