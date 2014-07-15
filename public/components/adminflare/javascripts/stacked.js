
var n = 6, // number of layers
    m = 7, // number of samples per layer
    stack = d3.layout.stack();

var layers = stack([[{"x":0,"y":60},{"x":1,"y":60},{"x":2,"y":59.5},{"x":3,"y":60},{"x":4,"y":58.5},{"x":5,"y":59},{"x":6,"y":59},{"x":7,"y":60}],[{"x":0,"y":18},{"x":1,"y":18},{"x":2,"y":19.5},{"x":3,"y":20},{"x":4,"y":21},{"x":5,"y":21.5},{"x":6,"y":22},{"x":7,"y":22}],[{"x":0,"y":7},{"x":1,"y":7},{"x":2,"y":8},{"x":3,"y":8},{"x":4,"y":9},{"x":5,"y":9.5},{"x":6,"y":9},{"x":7,"y":8}],[{"x":0,"y":2},{"x":1,"y":3},{"x":2,"y":2},{"x":3,"y":2},{"x":4,"y":2},{"x":5,"y":2},{"x":6,"y":2},{"x":7,"y":2}],[{"x":0,"y":7},{"x":1,"y":7},{"x":2,"y":7},{"x":3,"y":6},{"x":4,"y":5.5},{"x":5,"y":5},{"x":6,"y":5},{"x":7,"y":5}],[{"x":0,"y":5},{"x":1,"y":5},{"x":2,"y":4},{"x":3,"y":4},{"x":4,"y":4},{"x":5,"y":3},{"x":6,"y":3},{"x":7,"y":3}]]),
    yGroupMax = d3.max(layers, function (layer) {
        return d3.max(layer, function (d) {
            return d.y;
        });
    }),
    yStackMax = d3.max(layers, function (layer) {
        return d3.max(layer, function (d) {
            return d.y0 + d.y;
        });
    });

var margin = {top: 40, right: 10, bottom: 20, left: 10},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .domain(d3.range(m))
    .rangeRoundBands([0, width], .08);

var y = d3.scale.linear()
    .domain([0, yStackMax])
    .range([height, 0]);

var color = ["#8db241", "#b53834", "#3369ab", "#74549d", "#34a4c2", "#fa8727"];

var xAxis = d3.svg.axis()
    .scale(x)
    .tickSize(0)
    .tickPadding(6)
    .orient("bottom");

var svg = d3.select("#viz").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var layer = svg.selectAll(".layer")
    .data(layers)
    .enter().append("g")
    .attr("class", "layer")
    .style("fill", function (d, i) {
        return color[i];
    });

var rect = layer.selectAll("rect")
    .data(function (d) {
        return d;
    })
    .enter().append("rect")
    .attr("x", function (d) {
        return x(d.x);
    })
    .attr("y", height)
    .attr("width", x.rangeBand())
    .attr("height", 0);

rect.transition()
    .delay(function (d, i) {
        return i * 10;
    })
    .attr("y", function (d) {
        return y(d.y0 + d.y);
    })
    .attr("height", function (d) {
        return y(d.y0) - y(d.y0 + d.y);
    });

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

d3.selectAll("input").on("change", change);

var timeout = setTimeout(function () {
    console.log("timeout fired");
    d3.select("input[value=\"grouped\"]").property("checked", true).each(change);
}, 4000);

function change() {
    //clearTimeout(timeout);
    if (this.value === "grouped") {
        transitionGrouped();
    } else {
        transitionStacked();
    }
}


function transitionGrouped() {
    y.domain([0, yGroupMax]);

    rect.transition()
        .duration(500)
        .delay(function (d, i) {
            return i * 10;
        })
        .attr("x", function (d, i, j) {
            return x(d.x) + x.rangeBand() / n * j;
        })
        .attr("width", x.rangeBand() / n)
        .transition()
        .attr("y", function (d) {
            return y(d.y);
        })
        .attr("height", function (d) {
            return height - y(d.y);
        });

    setTimeout(function timer() {
        change();
    }, 3000);
}

function transitionStacked() {
    y.domain([0, yStackMax]);

    rect.transition()
        .duration(500)
        .delay(function (d, i) {
            return i * 10;
        })
        .attr("y", function (d) {
            return y(d.y0 + d.y);
        })
        .attr("height", function (d) {
            return y(d.y0) - y(d.y0 + d.y);
        })
        .transition()
        .attr("x", function (d) {
            return x(d.x);
        })
        .attr("width", x.rangeBand());

    setTimeout(function timer() {
        change();
    }, 3000);
}