// Initialize 'data' variable to hold the dataset
let data;

// Fetch the dataset from Flask backend on page load
fetch('/get_data/all')
    .then(response => response.json())
    .then(initialData => {
        data = initialData;
        // Display the initial heatmap for the entire dataset
        updateHeatmap(data);
    })
    .catch(error => console.error('Error fetching initial data:', error));

// D3.js heatmap code
function updateHeatmap(filteredData) {
    // Clear previous content
    d3.select("#heatmap").selectAll("*").remove();

    // Check if filteredData has the expected structure
    if (!filteredData || !Array.isArray(filteredData) || filteredData.length === 0) {
        console.error('Invalid or empty data:', filteredData);
        return;
    }

    // Ensure that the filteredData has the required properties (Name, BloodPressure, Glucose)
    const requiredProperties = ['Name', 'BloodPressure', 'Glucose'];
    if (!requiredProperties.every(prop => prop in filteredData[0])) {
        console.error('Data does not have the required properties:', filteredData[0]);
        return;
    }

    // Define the dimensions of the heatmap
    const margin = { top: 20, right: 30, bottom: 50, left: 70 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create an SVG element
    const svg = d3.select("#heatmap")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Set up scales
    const xScale = d3.scaleBand()
        .domain(filteredData.map(d => d.Name))
        .range([0, width])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(filteredData, d => Math.max(d.BloodPressure, d.Glucose))])
        .range([height, 0]);

    // Add red bars for BloodPressure
    svg.selectAll(".bar-bloodpressure")
        .data(filteredData)
        .enter()
        .append("rect")
        .attr("class", "bar-bloodpressure")
        .attr("x", d => xScale(d.Name))
        .attr("y", d => yScale(d.BloodPressure))
        .attr("width", xScale.bandwidth() / 3)
        .attr("height", d => height - yScale(d.BloodPressure))
        .attr("fill", "red");

    // Add blue bars for Glucose
    svg.selectAll(".bar-glucose")
        .data(filteredData)
        .enter()
        .append("rect")
        .attr("class", "bar-glucose")
        .attr("x", d => xScale(d.Name) + xScale.bandwidth() * 2 / 3)
        .attr("y", d => yScale(d.Glucose))
        .attr("width", xScale.bandwidth() / 3)
        .attr("height", d => height - yScale(d.Glucose))
        .attr("fill", "blue");

    // Add x-axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

    // Add y-axis
    svg.append("g")
        .call(d3.axisLeft(yScale));

    // Add y-axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Scale");

    // Add names below the bars
    svg.selectAll(".bar-names")
        .data(filteredData)
        .enter()
        .append("text")
        .attr("class", "bar-names")
        .attr("x", d => xScale(d.Name) + xScale.bandwidth() / 2)
        .attr("y", height + margin.top + 40)
        .attr("text-anchor", "middle")
        .text(d => d.Name)
        .style("font-size", "12px");
}

// ... (Previous code)

// Updated filterData function
function filterData() {
    // Get the search input value
    const searchInputValue = document.getElementById("searchInput").value.toLowerCase();

    // Fetch filtered data from Flask backend
    fetch(`/get_data/${searchInputValue}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(filteredData => {
            // Log received data
            console.log('Received Data:', filteredData);

            // Check if search term is "all" or filteredData is empty
            if (searchInputValue === "all" || filteredData.length === 0) {
                console.log('Displaying entire dataset');
                updateHeatmap(data);  // Pass 'data' as a parameter
            } else {
                console.log('Displaying filtered data');
                updateHeatmap(filteredData);  // Display the chart for the filtered data
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

// ... (Continue your script if there's more)
