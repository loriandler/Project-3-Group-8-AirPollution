// Initialize data dashboard
function init() {
    console.log("Data from Flask (external JavaScript):", tests);
    console.log ("Data from Flask (external JavaScript):", allData);
    let dropdown = d3.select("#selDataset");
    let names = tests;
    names.forEach((pollutant) => {
        // console.log(pollutant);
        dropdown.append("option")
            .text(pollutant)
            .property("value", pollutant);
    });
BarChart(names[0])
LineChart(names[0])
}
// Function for bar chart
function BarChart(sample) {
// console.log("Sample:", sample);
// console.log("AllData:", allData);
    let dataAll = allData;
    let pollutantData = dataAll.filter(item => item.parameter_name == sample);
    let xticks = pollutantData.map(item => item.state_name);
    let yticks = pollutantData.map(item => item.arithmetic_mean);
    let stateColors = {
        "Minnesota": "#DABF47",
        "California": "#2B91C2",
        "Texas": "#B52F3E",
        "New York": "#D97230"
    }
    let colors = xticks.map(state_name => stateColors[state_name] || "gray");
    let trace = {
        x: xticks,
        y: yticks,
        type: "bar",
        marker: {
            color: colors,
        }
    };
    let layout = {
        title: `${sample} by State`,
        plot_bgcolor: "white",
        xaxis: { title: "State Name"},
        yaxis: { title: `Arithmetic mean of ${sample}`}
    };
    // Plot the bar chart
    Plotly.newPlot("bar", [trace], layout);
};
    // Function for line chart
    function LineChart(sample) {
        console.log("Selected Sample:", sample);
        let dataAll = allData;

        // Group data by state
        let groupedData = {};
        dataAll.forEach(item => {
            if (item.parameter_name === sample) {
                if (!groupedData[item.state_name]) {
                    groupedData[item.state_name] = [];
                }
                groupedData[item.state_name].push({
                    date: item.date_local,
                    max_value: item.first_max_value
                });
            }
        });

        console.log("Grouped Data:", groupedData)

        // Prepare data for the line chart
        let traces = [];
        let stateNames = Object.keys(groupedData);
        stateNames.forEach(state => {
            let stateData = groupedData[state];

            // Sort dates in ascending order
            stateData.sort((a, b) => new Date(a.date) - new Date(b.date));

            let dates = stateData.map(item => item.date);
            let maxValues = stateData.map(item => item.max_value);

            let stateColors = {
                "Minnesota": "#DABF47",
                "California": "#2B91C2",
                "Texas": "#B52F3E",
                "New York": "#D97230"
            }
            let trace = {
                x: dates,
                y: maxValues,
                mode: 'lines',
                name: state, // Legend label for the line
                line: {
                    color: stateColors[state] || "gray"
                }
            };
            traces.push(trace);
        });
        // Layout for the line chart
        let layout = {
            title: `Max Values of ${sample} by State`,
            xaxis: {
                title: 'Date'
            },
            yaxis: {
                title: `Max ${sample} Value`
            }
        };
    // Plot the line chart in the 'line' div element
    Plotly.newPlot("lines", traces, layout);
}
// Call the LineChart function when the option is changed
function optionChanged(value) {
    // Log new value
    console.log(value);
    // Call functions
    BarChart(value);
    LineChart(value);
};
function updatePlotly(value) {
    console.log(value)
}
// Call the intialize function
init();
