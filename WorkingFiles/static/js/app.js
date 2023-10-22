// Initialize data dashboard
function init() {

    // console.log("Data from Flask (external JavaScript):", tests);
    let dropdown = d3.select("#selDataset");

    let names = tests;

    names.forEach((polluntant) => {
        // console.log(polluntant);
    
        dropdown.append("option")
            .text(polluntant)
            .property("value", polluntant);
    
        });


    // //Use d3 select for dropdown
    // let dropdown = d3.select("#selDataset");

    // //Get sample names and populate dropdown
    // d3.json(URL).then((data) => {

    //     //Set up variable for names
    //     let names = data.names;

    //     //Add names to dropdown
    //     names.forEach((id) => {

    //         console.log(id);

    //         dropdown.append("option")
    //         .text(id)
    //         .property("value", id);

    //     });

    //     //set up first value in list
        let init_sample = names[0];
    //     console.log(init_sample);

    //     //Initial Plots
    //     Metadata(init_sample);
        BarChart(init_sample);
    //     BubbleChart(init_sample);
    //     GaugeChart(init_sample);
    
    // }).catch(error => {
    //     console.error("Error fetching data: ", error);
    // })
};


// Function for bar chart
function BarChart(sample) {

    // Get data for bar chart
    let dataAll = allData;
    // console.log("Data from Flask (external JavaScript):", dataAll);
    
    // let test = dataAll[0].arithmetic_mean
    // console.log('mean: ', test);

    // Filter results based on value
    let polluntant = dataAll.filter(item => item.id == sample);

    // First index from array
    let valueData = value[0];

    // Set variables
    let otu_ids = valueData.otu_ids;
    let otu_labels = valueData.otu_labels;
    let sample_values = valueData.sample_values;

    console.log(otu_ids, otu_labels, sample_values);

    //Set up trace for bar chart
    let trace = {
        x: xticks,
        y: yticks,
        text: labels,
        // mode: "markers",
        type: "bar",
        marker: {
            color: xticks,
            colorscale: "Electric"
            }
        };
        
    // Set layout
    let layout = {
        title: "Seasonal Pollution Plot",
        plot_bgcolor: "lightgray"
    };

    // Plot the bar chart
    Plotly.newPlot("bar", [trace], layout)

};


// Function for bubble chart
function BubbleChart(sample) {

    // Get data for bubble chart
    d3.json(URL).then((data) => {
        let sampleInfo = data.samples;

        // Filter results based on value
        let value = sampleInfo.filter(item => item.id == sample);

        // First index from array
        let valueData = value[0];

        // Set variables
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        console.log(otu_ids, otu_labels, sample_values);

        // Set up trace for bubble chart
        let trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Electric"
            }
        };

        // Set up layout for bubble chart
        let layout = {
            title: "Bacteria Per Sample",
            plot_bgcolor: "lightgray",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

        // Plot the bubble chart
        Plotly.newPlot("bubble", [trace1], layout)
    });
};


// Function for updating when value is changed
function optionChanged(value) {

    // Log new value
    console.log(value);

    // Call functions
    Metadata(value);
    BarChart(value);
    BubbleChart(value);
    GaugeChart(value);
};


function updatePlotly(value) {
    console.log(value)
}

// Call the intialize function
init();
