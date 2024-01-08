let data; // Define a global variable to hold the dataset

// Function to fetch data
function fetchData() {
    fetch('/get_data/all')
        .then(response => response.json())
        .then(result => {
            data = result;
            updateHeatmap(data); // Initial display of the entire dataset
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Call fetchData to fetch the initial data
fetchData();

// Updated filterData function
function filterData() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();

    // Check if the search term is "all"
    if (searchInput === 'all') {
        // Display the chart for the entire dataset
        updateHeatmap(data);
    } else {
        // Fetch filtered data from Flask backend
        fetch(`/get_data/${searchInput}`)
            .then(response => response.json())
            .then(filteredData => {
                // Check if filteredData is empty, if yes, show the entire dataset
                if (filteredData.length === 0) {
                    updateHeatmap(data);
                } else {
                    updateHeatmap(filteredData);
                }
            })
            .catch(error => console.error('Error fetching filtered data:', error));
    }
}
function updateHeatmap(filteredData) {
    // Clear previous content
    d3.select("#heatmap").selectAll("*").remove();

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
        .domain(filteredData.map(d => d.Name))  // Use the Name as the domain for x-axis
        .range([0, width])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(filteredData, d => Math.max(d.BloodPressure, d.Glucose))])
        .range([height, 0]);

    // Reduce the size of the bars for better visibility
    const barWidth = Math.min(xScale.bandwidth() / 2, 20);

    // Add red bars for BloodPressure
    svg.selectAll(".bar-bloodpressure")
        .data(filteredData)
        .enter()
        .append("rect")
        .attr("class", "bar-bloodpressure")
        .attr("x", d => xScale(d.Name))  // Use the Name for x-position
        .attr("y", d => yScale(d.BloodPressure))
        .attr("width", barWidth)
        .attr("height", d => height - yScale(d.BloodPressure))
        .attr("fill", "red");

    // Add blue bars for Glucose
    svg.selectAll(".bar-glucose")
        .data(filteredData)
        .enter()
        .append("rect")
        .attr("class", "bar-glucose")
        .attr("x", d => xScale(d.Name) + barWidth)
        .attr("y", d => yScale(d.Glucose))
        .attr("width", barWidth)
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
        .attr("x", d => xScale(d.Name) + barWidth / 2)
        .attr("y", height + margin.top + 40)
        .attr("text-anchor", "middle")
        .text(d => d.Name)
        .style("font-size", "12px");
}

// Updated filterData function
function filterData() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();

    // Check if the search term is "all"
    if (searchInput === "all") {
        // Display the chart for the entire dataset
        updateHeatmap(data);
    } else {
        // Fetch filtered data from Flask backend
        fetch(`/get_data/${searchInput}`)
            .then(response => response.json())
            .then(filteredData => {
                // Check if filteredData is empty, if yes, show the entire dataset
                if (filteredData.length === 0) {
                    updateHeatmap(data);
                } else {
                    updateHeatmap(filteredData);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }
}
