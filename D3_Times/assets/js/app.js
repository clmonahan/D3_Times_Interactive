// @TODO: YOUR CODE HERE!
var svgHeight = 450;
var svgWidth = 650;

var margin = {
    top: 20,
    right: 40,
    bottom: 100,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create SVG wrapper, append an SVG group to hold chart 
// & shift new group by left and top margins

// Edit HTML
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append SVG group
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial params
var chosenXAxis = "poverty";
var chosenYAxis = "healthcare";



// Function to update x-scale var upon clicking x-axis label
function xScale(healthData, chosenXAxis) {
    // create scales
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(healthData, d => d[chosenXAxis]) * 0.8,
            d3.max(healthData, d => d[chosenXAxis]) * 1.2
        ])
        .range([0, width]);

    return xLinearScale;
}

// Update y-scale var on axis-label click
function yScale(healthData, chosenYAxis) {
    // create scales
    var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(healthData, d => d[chosenYAxis]) * 1.2])
    .range([height, 0]);

    return yLinearScale;
}

// Update xAxis var on axis-label click
function renderAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);

    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);

    return xAxis;
}

// Update yAxis var on axis-label click
function renderYAxes(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);

    yAxis.transition()
        .duration(1000)
        .call(leftAxis);

    return yAxis;
}

//Function to update circles group and transition to new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis) {
    circlesGroup.transition()
        .duration(1000)
        .attr("cx", d => newXScale(d[chosenXAxis]));

    return circlesGroup;
}

function renderYCircles(circlesGroup, newYScale, chosenYAxis) {
    circlesGroup.transition()
        .duration(1000)
        .attr("cy", d => newYScale(d[chosenYAxis]));

    return circlesGroup;
}

// Update circles with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

    if (chosenXAxis === "poverty") {
        var label = "% in Poverty:";
    }
    else if (chosenXAxis === "age") {
        var label = "Median Age: ";
    }
    else if (chosenXAxis === "income") {
        var label = "Median Household Income: ";
    }

    // var chosenYAxis = d3.select(".yLabel").select(".active").attr("value");

    if (chosenYAxis === "healthcare") {
        var yLabel = "% Lacking Healthcare: ";
    }
    else if (chosenYAxis === "obesity") {
        var yLabel = "% Obese: ";
    }

    else if (chosenYAxis === "smokes") {
        var yLabel = "% Smokers: ";
    }

    var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .offset([80, -60])
        .html(function(d){
            return (`${d.state}<br>${label} ${d[chosenXAxis]}<br>${yLabel} ${d[chosenYAxis]}`);
        });

    circlesGroup.call(toolTip);

    circlesGroup.on("mouseover", function(data) {
        toolTip.show(data);
    })
        .on("mouseout", function(data, index) {
            toolTip.hide(data);
        });

    return circlesGroup;
}

// Update circles with new toolTip
function updateYToolTip(chosenYAxis, circlesGroup) {

    if (chosenYAxis === "healthcare") {
        var yLabel = "% Lacking Healthcare: ";
    }
    else if (chosenYAxis === "obesity") {
        var yLabel = "% Obese: ";
    }
    else if (chosenYAxis === "smokes") {
        var yLabel = "% Smokers: ";
    }

    // Not sure what this does here...
    // var chosenXAxis = d3.select(".xLabel").select(".active").attr("value");

    if (chosenXAxis === "poverty") {
        var label = "% in Poverty: ";
    }
    else if (chosenXAxis === "age") {
        var label = "Median Age: ";
    }
    else if (chosenXAxis === "income") {
        var label = "Household Income: ";
    }

    // var toolTip = d3.tip()
    //     .attr("class", "tooltip")
    //     .offset([80, -60])
    //     .html(function(d){
    //         return (`${d.abbr}<br>${label} ${d[chosenXAxis]}<br>${yLabel} ${d[chosenYAxis]}`);
    //     });
    
    // svg.call(toolTip);

    // svg.on("mouseover", function(data) {
    //     toolTip.show(data);
    // })
    //     .on("mouseout", function(data, index) {
    //         toolTip.hide(data);
    //     })
    
    return circlesGroup;
}


// Load csv file
d3.csv('assets/data/data.csv', function(err, healthData) {
    if (err) throw err;
    
    // parse data & make numbers integers
    healthData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.age = +data.age;
        data.income = +data.income;
        data.healthcare = +data.healthcare;
        data.obesity = +data.obesity;
        data.smokes = +data.smokes;
    });

    // console.log(healthData);

    // xLinearScale function above csv import
    var xLinearScale = xScale(healthData, chosenXAxis);

    // yLinearScale = yScale(healthData, chosenYAxis);
    // var yLinearScale = yScale(healthData, chosenYAxis);

    // Create y scale function
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(healthData, d => d.poverty)])
        .range([height, 0]);


    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append x axis
    var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

    // Append y axis
    var yAxis = chartGroup.append("g")
    // .classed("y-axis", true)   Not sure if needed...
    .call(leftAxis);

    // Append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        // .append("g")
        .attr("cx", d => xLinearScale(d[chosenXAxis]))
        .attr("cy", d => yLinearScale(d[chosenYAxis]))
        .attr("r", 12)
        .attr("fill", "lightblue")
        .attr("opacity", ".9");

    // Prepare 3 x-axis labels
    var labelGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20})`);
        // .classed("xLabel", true);

    var povertyLabel = labelGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        // Grab poverty value
        .attr("value", "poverty")
        .classed("active", true)
        .text("% In Poverty");

    var ageLabel = labelGroup.append("text")
        .attr("x", 0)
        .attr("y", 40)
        // Grab age event listener
        .attr("value", "age")
        .classed("inactive", true)
        .text("Median Age");

    var incomeLabel = labelGroup.append("text")
        .attr("x", 0)
        .attr("y", 60)
        // Grab Income Value
        .attr("value", "income")
        .classed("inactive", true)
        .text("Median Household Income");

    // Create group for 3 y-axis labels
    var ylabelGroup = chartGroup.append("g")
        .attr("transform", "rotate(-90)")
        .classed("yLabel", true);

    // Healthcare Label
    var healthcareLabel = ylabelGroup.append("text")
        .attr("y", 0 - 50)
        .attr("x", 0 - (height / 2))
        .attr("value", "healthcare")
        .attr("dy", "1em")
        .classed("active", true)
        .text("% Lacking Healthcare");

    // Obesity Label
    var obesityLabel = ylabelGroup.append("text")
        .attr("y", 0 - 70)
        .attr("x", 0 - (height / 2))
        .attr("value", "obesity")
        .attr("dy", "1em")
        .classed("inactive", true)
        .text("% Obese");

    // Smoking Label
    var smokerLabel = ylabelGroup.append("text")
        .attr("y", 0 - 90)
        .attr("x", 0 - (height / 2))
        .attr("value", "smokes")
        .attr("dy", "1em")
        .classed("inactive", true)
        .text("% Smokers");

    // updateToolTip function
    var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
    circlesGroup = updateYToolTip(chosenYAxis, circlesGroup);

    // x-axis labels event listener
    labelGroup.selectAll("text")
        .on("click", function() {
        // get value of selection
        var value = d3.select(this).attr("value");
        if (value !== chosenXAxis) {

            //replace chosenXaxis with value
            chosenXAxis = value;

            // console.log(chosenXAxis)

            // update x scale for new data
            xLinearScale = xScale(healthData, chosenXAxis);

            // update x axis with transition
            xAxis = renderAxes(xLinearScale, xAxis);

            // update circles with new x values
            circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

            // update texts with new x values
            textGroup = renderTexts(textGroup, xLinearScale, chosenXAxis);

            // update tooltips with new info
            circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

            // change classes to change bold text
            if (chosenXAxis === "age") {
                ageLabel
                    .classed("active", true)
                    .classed("inactive", false);
                povertyLabel
                    .classed("active", false)
                    .classed("inactive", true);
                incomeLabel
                    .classed("active", false)
                    .classed("inactive", true);
            }
            else if (chosenXAxis === "poverty") {
                ageLabel
                    .classed("active", false)
                    .classed("inactive", true);
                povertyLabel
                    .classed("active", true)
                    .classed("inactive", false);
                incomeLabel
                    .classed("active", false)
                    .classed("inactive", true);
            }
            else if (chosenXAxis === "income") {
                ageLabel
                    .classed("active", false)
                    .classed("inactive", true);
                povertyLabel
                    .classed("active", false)
                    .classed("inactive", true);
                incomeLabel
                    .classed("active", true)
                    .classed("inactive", false);
            }
        }
    });

    // y axis labels event listener
    ylabelGroup.selectAll("text")
    .on("click", function() {
        // get value of selection
        var value = d3.select(this).attr("value");
        if (value !== chosenYAxis) {

            //replace chosenXaxis with value
            chosenYAxis = value;

            // console.log(chosenYAxis)

            // update x scale for new data
            yLinearScale = yScale(healthData, chosenYAxis);

            // update x axis with transition
            yAxis = renderYAxes(yLinearScale, yAxis);

            // update circles with new x values
            circlesGroup = renderYCircles(circlesGroup, yLinearScale, chosenYAxis);

            // update texts with new x values
            textGroup = renderYTexts(textGroup, yLinearScale, chosenYAxis);

            // update tooltips with new info
            circlesGroup = updateYToolTip(chosenYAxis, circlesGroup);

            // change classes to change bold text
            if (chosenYAxis === "healthcare") {
                healthcareLabel
                    .classed("active", true)
                    .classed("inactive", false);
                obesityLabel
                    .classed("active", false)
                    .classed("inactive", true);
                smokerLabel
                    .classed("active", false)
                    .classed("inactive", true);
            }
            else if (chosenYAxis === "obesity") {
                healthcareLabel
                    .classed("active", false)
                    .classed("inactive", true);
                obesityLabel
                    .classed("active", true)
                    .classed("inactive", false);
                smokerLabel
                    .classed("active", false)
                    .classed("inactive", true);
            }
            else if (chosenYAxis === "smokes") {
                healthcareLabel
                    .classed("active", false)
                    .classed("inactive", true);
                obesityLabel
                    .classed("active", false)
                    .classed("inactive", true);
                smokerLabel
                    .classed("active", true)
                    .classed("inactive", false);
            }
        }
    });

    // / Append text labels
    var textGroup = chartGroup.append("g")
        .selectAll("text")
        .data(healthData)
        .enter()
        .append("text")
        .classed("text-group", true)
        .text(d => d.abbr)
        .attr("x", d => xLinearScale(d[chosenXAxis]))
        .attr("y", d => yLinearScale(d[chosenYAxis]))
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")
        // Font type
        .attr("font_family", "arial") 
        // Font size
        .attr("font_size", "6px")
        // Font color
        .attr("fill", "white")
        // Bold font
        // .style("font-weight", "bold");

    // Update text
    function renderTexts(textGroup, newXScale, chosenXAxis) {

        textGroup.transition()
            .duration(1000)
            .attr("x", d => newXScale(d[chosenXAxis]));

        return textGroup;
    }

    function renderYTexts(textGroup, newYScale, chosenYAxis) {

        textGroup.transition()
            .duration(1000)
            .attr("y", d => newYScale(d[chosenYAxis]));

        return textGroup;
    }
});
