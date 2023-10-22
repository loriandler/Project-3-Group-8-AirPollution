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
ScatterPlot(names[0])
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

// Function for scatter chart
function ScatterPlot(sample) {
    // console.log("Sample:", sample);
    // console.log("AllData:", allData);
    
        let dataAll = allData;
    
        let pollutantData = dataAll.filter(item => item.parameter_name == sample);
    
        let xticks = pollutantData.map(item => item.data_local);
        let yticks = pollutantData.map(item => item.first_max_value);
    
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
            mode: "markers",
            marker: {
                color: colors,
                size: yticks,
            },
            type: "scatter"
        };
    
        let layout = {
            title: "Air Pollutant Readings by State (2022)",
            plot_bgcolor: "white",
            xaxis: { title: "Date"},
            yaxis: { title: "Max Value of Air Pollution Parameter"}
        };
    
        // Plot the bar chart
        Plotly.newPlot("scatter", [trace], layout);
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

    // Plot the line chart in the 'scatter' div element
    Plotly.newPlot("lines", traces, layout);
}

// Call the LineChart function when the option is changed
function optionChanged(value) {
    // Log new value
    console.log(value);

    // Call functions
    // Metadata(value);
    BarChart(value);
    LineChart(value);
    ScatterPlot(value);
};






//     //     //set up first value in list
//         let init_sample = names[0];
//     //     console.log(init_sample);

//     //     //Initial Plots
//     //     Metadata(init_sample);
//         BarChart(init_sample);
//     //     BubbleChart(init_sample);
//     //     GaugeChart(init_sample);
    
//     // }).catch(error => {
//     //     console.error("Error fetching data: ", error);
//     // })
// };




// Function for bubble chart
// function BubbleChart(sample) {

//     // Get data for bubble chart
//     d3.json(URL).then((data) => {
//         let sampleInfo = data.samples;

//         // Filter results based on value
//         let value = sampleInfo.filter(item => item.id == sample);

//         // First index from array
//         let valueData = value[0];

//         // Set variables
//         let otu_ids = valueData.otu_ids;
//         let otu_labels = valueData.otu_labels;
//         let sample_values = valueData.sample_values;

//         console.log(otu_ids, otu_labels, sample_values);

//         // Set up trace for bubble chart
//         let trace1 = {
//             x: otu_ids,
//             y: sample_values,
//             text: otu_labels,
//             mode: "markers",
//             marker: {
//                 size: sample_values,
//                 color: otu_ids,
//                 colorscale: "Electric"
//             }
//         };

//         // Set up layout for bubble chart
//         let layout = {
//             title: "Bacteria Per Sample",
//             plot_bgcolor: "lightgray",
//             hovermode: "closest",
//             xaxis: {title: "OTU ID"},
//         };

//         // Plot the bubble chart
//         Plotly.newPlot("bubble", [trace1], layout)
//     });
// };


// Function for updating when value is changed
function optionChanged(value) {

    // Log new value
    console.log(value);

    // Call functions
    //Metadata(value);
    BarChart(value);
    ScatterPlot(value);
    LineChart(value);
};


function updatePlotly(value) {
    console.log(value)
}

// Call the intialize function
init();
