// Initialize data dashboard
function init() {
    console.log("Data from Flask (external JavaScript):", tests);
    console.log("Data from Flask (external JavaScript):", allData);
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
    console.log("Sample:", sample);
    // console.log("AllData:", allData);
    let dataAll = allData;

    // For this section of code, we are getting the unit of measurement for the "sample" (which is our pollutant) since some has different units of measurement for our line grapgh
    let pollutantData = dataAll.filter(item => item.parameter_name == sample); // Getting just the polltant selected info
    // console.log('pollutantData: ', pollutantData);
    let unitOfMeasureForPollutant = pollutantData[0]['units_of_measure'] // Going to the first item in the array and getting the units of measurement
    // console.log('unitOfMeasureForPollutant: ', unitOfMeasureForPollutant);
    
    let xticks = pollutantData.map(item => item.state_name);
    let uniqueItems = [...new Set(xticks)] // https://stackoverflow.com/questions/11246758/how-to-get-unique-values-in-an-array
    // console.log('uniqueItems: ', uniqueItems);

    let groupedBarData = {};
    dataAll.forEach(item => {
        if (item.parameter_name === sample) {
            if (!groupedBarData[item.state_name]) {
                groupedBarData[item.state_name] = [];
            }
            groupedBarData[item.state_name].push(item.arithmetic_mean);
        }
    });
    // console.log('group Bar Data: ', groupedBarData);

    let stateArithMeanArray = [];
    Object.keys(groupedBarData).forEach(function(key) {
        let maxValueArray = groupedBarData[key]

        const average = array => array.reduce((a, b) => a + b) / array.length; //Find the average of an array. https://stackoverflow.com/questions/29544371/finding-the-average-of-an-array-using-js
        let addAve = average(maxValueArray);
        stateArithMeanArray.push(addAve);

    });
    // console.log('stateArithMeanArray ', stateArithMeanArray)
    
    // let yticks = pollutantData.map(item => item.arithmetic_mean);
    // console.log('ytick nums: ', yticks);

    let stateColors = {
        "Minnesota": "#DABF47",
        "California": "#2B91C2",
        "Texas": "#B52F3E",
        "New York": "#D97230"
    }
    let colors = xticks.map(state_name => stateColors[state_name] || "gray");
    let uniqueColors = [...new Set(colors)]
    // console.log('colors: ', colors);
    // console.log('Unique colors: ', uniqueColors);


    let trace = {
        x: uniqueItems,
        y: stateArithMeanArray,
        type: "bar",
        marker: {
            color: uniqueColors,
        }
    };
    let layout = {
        title: `${sample} by State`,
        plot_bgcolor: "white",
        xaxis: { title: "State Name"},
        yaxis: { title: `Arithmetic mean of ${sample} (${unitOfMeasureForPollutant})`}
    };
    // Plot the bar chart
    Plotly.newPlot("bar", [trace], layout);
};
    // Function for line chart
    function LineChart(sample) {
        console.log("Selected Sample:", sample);
        let dataAll = allData;

        // For this section of code, we are getting the unit of measurement for the "sample" (which is our pollutant) since some has different units of measurement for our line grapgh
        let pollutantData = dataAll.filter(item => item.parameter_name == sample); // Getting just the polltant selected info
        // console.log('pollutantData: ', pollutantData);
        let unitOfMeasureForPollutant = pollutantData[0]['units_of_measure'] // Going to the first item in the array and getting the units of measurement
        // console.log('unitOfMeasureForPollutant: ', unitOfMeasureForPollutant);

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

            let uniqueDates = [...new Set(dates)]
            // console.log('START: This is testing unique dates:', uniqueDates);
            // console.log('This is testing unique dates length:', uniqueDates.length);
                
            let eachDateMaxMaxValueArray = []
            // let plus = 0;
            uniqueDates.forEach(date => {
                let dataData = stateData.filter(item => item.date === date);
                // plus = plus + 1;
                // console.log('This is testing dataData:', dataData);
                // console.log('This is testing dataData LENGTH:', dataData.length)
                // console.log('This is testing dataData:', dataData[0]['max_value']);
    
                let groupedBarData = [];
                dataData.forEach(item => {
                        groupedBarData.push(item.max_value);
                });
                // console.log('group Bar Data: ', groupedBarData); 
                // console.log('END group Bar Data LENGTH: ', groupedBarData.length);
    
                let maxValueCompare = groupedBarData[0];
    
                    for (let i = 0; i < groupedBarData.length; i++) {
                        if (groupedBarData[i] > maxValueCompare) {
                            maxValueCompare = groupedBarData[i];
                        }    
                    }
                    // console.log('maxValueCompare!!!!', maxValueCompare);
                eachDateMaxMaxValueArray.push(maxValueCompare);
            });
    
            // console.log("END of the looop:", plus);
            // console.log('This is testing eachDateMaxMaxValueArray:', eachDateMaxMaxValueArray);
    
            // let maxValues = stateData.map(item => item.max_value);
            // console.log('This is testing the maxValues:', maxValues);
            // console.log('LAST!! This is testing the length of maxValues:', maxValues.length);            
    

            let stateColors = {
                "Minnesota": "#DABF47",
                "California": "#2B91C2",
                "Texas": "#B52F3E",
                "New York": "#D97230"
            }
            let trace = {
                x: uniqueDates,
                y: eachDateMaxMaxValueArray,
                mode: 'lines+markers',
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
                title: `Max ${sample} Value (${unitOfMeasureForPollutant})`
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
