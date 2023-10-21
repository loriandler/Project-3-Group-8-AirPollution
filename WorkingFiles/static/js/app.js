// Initialize data dashboard
function init() {

    console.log("Data from Flask (external JavaScript):", tests);
    let dropdown = d3.select("#selDataset");

    let names = tests;

    names.forEach((polluntant) => {
        console.log(polluntant);
    
        dropdown.append("option")
            .text(polluntant)
            .property("value", polluntant);
    
        });

};


// Call the intialize function
init();