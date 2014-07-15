
var n = 6, // number of layers
    m = 20, // number of samples per layer
    stack = d3.layout.stack();

// var layers = stack([[{"x":0,"y":60},{"x":1,"y":60},{"x":2,"y":59.5},{"x":3,"y":60},{"x":4,"y":58.5},{"x":5,"y":59},{"x":6,"y":59},{"x":7,"y":60}],[{"x":0,"y":18},{"x":1,"y":18},{"x":2,"y":19.5},{"x":3,"y":20},{"x":4,"y":21},{"x":5,"y":21.5},{"x":6,"y":22},{"x":7,"y":22}],[{"x":0,"y":7},{"x":1,"y":7},{"x":2,"y":8},{"x":3,"y":8},{"x":4,"y":9},{"x":5,"y":9.5},{"x":6,"y":9},{"x":7,"y":8}],[{"x":0,"y":2},{"x":1,"y":3},{"x":2,"y":2},{"x":3,"y":2},{"x":4,"y":2},{"x":5,"y":2},{"x":6,"y":2},{"x":7,"y":2}],[{"x":0,"y":7},{"x":1,"y":7},{"x":2,"y":7},{"x":3,"y":6},{"x":4,"y":5.5},{"x":5,"y":5},{"x":6,"y":5},{"x":7,"y":5}],[{"x":0,"y":5},{"x":1,"y":5},{"x":2,"y":4},{"x":3,"y":4},{"x":4,"y":4},{"x":5,"y":3},{"x":6,"y":3},{"x":7,"y":3}]]),
var layers=stack([[{"x":1,"y":0.605823104576222},{"x":2,"y":0.600191916179312},{"x":3,"y":0.59340725472791},{"x":4,"y":0.601289806702823},{"x":5,"y":0.58493177422503},{"x":6,"y":0.588564926142219},{"x":7,"y":0.598761896970193},{"x":8,"y":0.600841184387618},{"x":9,"y":0.604909409701929},{"x":10,"y":0.59254965218268},{"x":11,"y":0.602040108250642},{"x":12,"y":0.591106762339639},{"x":13,"y":0.571316920672138},{"x":14,"y":0.574925373134328},{"x":15,"y":0.535536441828882},{"x":16,"y":0.532502708559047},{"x":17,"y":0.548994974874372},{"x":18,"y":0.513691128148959},{"x":19,"y":0.484522207267833},{"x":20,"y":0.536547433903577}],[{"x":1,"y":0.184457686951453},{"x":2,"y":0.177548400482384},{"x":3,"y":0.191147486722735},{"x":4,"y":0.198807537199277},{"x":5,"y":0.214046169952269},{"x":6,"y":0.213457574716592},{"x":7,"y":0.215958984428264},{"x":8,"y":0.218707940780619},{"x":9,"y":0.213871030586402},{"x":10,"y":0.228954531706825},{"x":11,"y":0.221844424398029},{"x":12,"y":0.235920852359209},{"x":13,"y":0.248534583821805},{"x":14,"y":0.246865671641791},{"x":15,"y":0.276595744680851},{"x":16,"y":0.258938244853738},{"x":17,"y":0.25},{"x":18,"y":0.272727272727273},{"x":19,"y":0.246298788694482},{"x":20,"y":0.255054432348367}],[{"x":1,"y":0.0729021601839557},{"x":2,"y":0.0733171674209318},{"x":3,"y":0.0805061158168715},{"x":4,"y":0.0804130162703379},{"x":5,"y":0.0854907110030697},{"x":6,"y":0.0880925798694607},{"x":7,"y":0.0869399220049633},{"x":8,"y":0.0835464333781965},{"x":9,"y":0.0884083382037795},{"x":10,"y":0.0886178042141345},{"x":11,"y":0.0911109569079176},{"x":12,"y":0.0868667101543814},{"x":13,"y":0.0865572489253615},{"x":14,"y":0.0791044776119403},{"x":15,"y":0.0986871887732005},{"x":16,"y":0.0996749729144095},{"x":17,"y":0.0954773869346734},{"x":18,"y":0.0985761226725082},{"x":19,"y":0.122476446837147},{"x":20,"y":0.101088646967341}],[{"x":1,"y":0.0241117984260129},{"x":2,"y":0.0252473514270524},{"x":3,"y":0.0242977718266207},{"x":4,"y":0.024822695035461},{"x":5,"y":0.0247351704313572},{"x":6,"y":0.0237031947784267},{"x":7,"y":0.0226894652158499},{"x":8,"y":0.022678331090175},{"x":9,"y":0.0217027079680499},{"x":10,"y":0.0216251638269987},{"x":11,"y":0.0199847338838387},{"x":12,"y":0.0221787345075016},{"x":13,"y":0.0211019929660023},{"x":14,"y":0.0208955223880597},{"x":15,"y":0.0185604345857854},{"x":16,"y":0.0249187432286024},{"x":17,"y":0.0219849246231156},{"x":18,"y":0.0328587075575027},{"x":19,"y":0.0323014804845222},{"x":20,"y":0.0264385692068429}],[{"x":1,"y":0.0650889011238138},{"x":2,"y":0.0697381900229521},{"x":3,"y":0.0665743902989453},{"x":4,"y":0.0573981365595884},{"x":5,"y":0.0537289067906382},{"x":6,"y":0.0524519065613191},{"x":7,"y":0.047260628869072},{"x":8,"y":0.0467025572005384},{"x":9,"y":0.0440677966101695},{"x":10,"y":0.0418893033571933},{"x":11,"y":0.036569287349941},{"x":12,"y":0.032941943900848},{"x":13,"y":0.0388823759280969},{"x":14,"y":0.0402985074626866},{"x":15,"y":0.0389316432775011},{"x":16,"y":0.0417118093174431},{"x":17,"y":0.0452261306532663},{"x":18,"y":0.0525739320920044},{"x":19,"y":0.0592193808882907},{"x":20,"y":0.0637636080870918}],[{"x":1,"y":0.0476163487385433},{"x":2,"y":0.0539569744673678},{"x":3,"y":0.0440669806069177},{"x":4,"y":0.0372688082325129},{"x":5,"y":0.0370672675976365},{"x":6,"y":0.0337298179319821},{"x":7,"y":0.0283891025116584},{"x":8,"y":0.0275235531628533},{"x":9,"y":0.0270407169296708},{"x":10,"y":0.0263635447121686},{"x":11,"y":0.0284504892096315},{"x":12,"y":0.0309849967384214},{"x":13,"y":0.0336068776865963},{"x":14,"y":0.037910447761194},{"x":15,"y":0.03168854685378},{"x":16,"y":0.0422535211267606},{"x":17,"y":0.0383165829145729},{"x":18,"y":0.0295728368017525},{"x":19,"y":0.0551816958277254},{"x":20,"y":0.0171073094867807}]]), 
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