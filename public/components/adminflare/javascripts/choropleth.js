
/* Backbone style execution */
$(document).ready(function() {
    var map = new Map({
        scope: 'usa',
        el: $('#map'),
        geography_config: {
            highlightBorderColor: '#222',
            highlightOnHover: true,
            popupTemplate: _.template('<div class="hoverinfo"><strong><%= geography.properties.name %></strong> <% if (data.averageGrade) { %><hr/>  Average Grade: <%= data.averageGrade %> <% } %></div>')
        },

        fills: {
            '1-5': '#8db241',
            '5-10': '#fa8727',
            '10-15': '#3369ab',
            '15-20': '#74549d',
            defaultFill: '#34a4c2'
        },
        data: {
            "AZ": {
                "fillKey": "1-5",
                "averageGrade": 5
            },
            "CO": {
                "fillKey": "5-10",
                "averageGrade": 5
            },
            "DE": {
                "fillKey": "5-10",
                "averageGrade": 32
            },
            "FL": {
                "fillKey": "1-5",
                "averageGrade": 29
            },
            "GA": {
                "fillKey": "5-10",
                "averageGrade": 32
            },
            "HI": {
                "fillKey": "5-10",
                "averageGrade": 32
            },
            "ID": {
                "fillKey": "15-20",
                "averageGrade": 32
            },
            "IL": {
                "fillKey": "5-10",
                "averageGrade": 32
            },
            "IN": {
                "fillKey": "15-20",
                "averageGrade": 11
            },
            "IA": {
                "fillKey": "5-10",
                "averageGrade": 11
            },
            "KS": {
                "fillKey": "15-20",
                "averageGrade": 32
            },
            "KY": {
                "fillKey": "5-10",
                "averageGrade": 32
            },
            "LA": {
                "fillKey": "15-20",
                "averageGrade": 32
            },
            "MD": {
                "fillKey": "5-10",
                "averageGrade": 32
            },
            "ME": {
                "fillKey": "10-15",
                "averageGrade": 32
            },
            "MA": {
                "fillKey": "10-15",
                "averageGrade": 32
            },
            "MN": {
                "fillKey": "10-15",
                "averageGrade": 32
            },
            "MI": {
                "fillKey": "5-10",
                "averageGrade": 32
            },
            "MS": {
                "fillKey": "5-10",
                "averageGrade": 32
            },
            "MO": {
                "fillKey": "15-20",
                "averageGrade": 13
            },
            "MT": {
                "fillKey": "15-20",
                "averageGrade": 32
            },
            "NC": {
                "fillKey": "LIGHT_REP",
                "averageGrade": 32
            },
            "NE": {
                "fillKey": "15-20",
                "averageGrade": 32
            },
            "NV": {
                "fillKey": "HEAVY_DEM",
                "averageGrade": 32
            },
            "NH": {
                "fillKey": "5-10",
                "averageGrade": 32
            },
            "NJ": {
                "fillKey": "5-10",
                "averageGrade": 32
            },
            "NY": {
                "fillKey": "10-15",
                "averageGrade": 32
            },
            "ND": {
                "fillKey": "5-10",
                "averageGrade": 32
            },
            "NM": {
                "fillKey": "5-10",
                "averageGrade": 32
            },
            "OH": {
                "fillKey": "5-10",
                "averageGrade": 32
            },
            "OK": {
                "fillKey": "5-10",
                "averageGrade": 32
            },
            "OR": {
                "fillKey": "10-15",
                "averageGrade": 32
            },
            "PA": {
                "fillKey": "10-15",
                "averageGrade": 32
            },
            "RI": {
                "fillKey": "5-10",
                "averageGrade": 32
            },
            "SC": {
                "fillKey": "5-10",
                "averageGrade": 32
            },
            "SD": {
                "fillKey": "5-10",
                "averageGrade": 32
            },
            "TN": {
                "fillKey": "15-20",
                "averageGrade": 32
            },
            "TX": {
                "fillKey": "15-20",
                "averageGrade": 32
            },
            "UT": {
                "fillKey": "15-20",
                "averageGrade": 32
            },
            "WI": {
                "fillKey": "10-15",
                "averageGrade": 32
            },
            "VA": {
                "fillKey": "LIGHT_DEM",
                "averageGrade": 32
            },
            "VT": {
                "fillKey": "10-15",
                "averageGrade": 32
            },
            "WA": {
                "fillKey": "10-15",
                "averageGrade": 32
            },
            "WV": {
                "fillKey": "15-20",
                "averageGrade": 32
            },
            "WY": {
                "fillKey": "15-20",
                "averageGrade": 32
            },
            "CA": {
                "fillKey": "10-15",
                "averageGrade": 32
            },
            "CT": {
                "fillKey": "10-15",
                "averageGrade": 32
            },
            "AK": {
                "fillKey": "15-20",
                "averageGrade": 32
            },
            "AR": {
                "fillKey": "15-20",
                "averageGrade": 32
            },
            "AL": {
                "fillKey": "15-20",
                "averageGrade": 32
            }
        }
    });

    map.render();

    console.log("test");
});