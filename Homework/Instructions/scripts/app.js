function optionChanged(selectedID) {
    console.log(selectedID);
    d3.json("data/samples.json").then((data) => {
        d3.select("#selDataset").html("");
        data.metadata.forEach(item => {
            d3.select("#selDataset").append('option').attr('value', item.id).text(item.id);
        });
        d3.select("#selDataset").node().value = selectedID;
        const idMetadata = data.metadata.filter(item => (item.id == selectedID));
        const panelDisplay = d3.select("#sample-metadata");
        panelDisplay.html("");
        Object.entries(idMetadata[0]).forEach(item => {
            panelDisplay.append("p").text(`${item[0]}: ${item[1]}`)
        });
        const idSample = data.samples.filter(item => parseInt(item.id) == selectedID);
        var sampleValue = idSample[0].sample_values.slice(0, 10);
        sampleValue = sampleValue.reverse();
        var otuID = idSample[0].otu_ids.slice(0, 10);
        otuID = otuID.reverse();
        var otuLabels = idSample[0].otu_labels
        otuLabels = otuLabels.reverse();
        const yAxis = otuID.map(item => 'OTU' + " " + item);
        const trace = {
            y: yAxis,
            x: sampleValue,
            type: 'bar',
            text: otuLabels,
            marker: {
                line: {
                    width: 3
                }
            }
        },
            layout = {
            };
        Plotly.newPlot('bar', [trace], layout, { responsive: true });
        var sampleValue1 = idSample[0].sample_values;
        var otuID1 = idSample[0].otu_ids;
        const trace1 = {
            x: otuID1,
            y: sampleValue1,
            mode: 'markers',
            marker: {
                color: otuID1,
                size: sampleValue1
            }
        },
            layout1 = {
            };
        Plotly.newPlot('bubble', [trace1]);
        const guageDisplay = d3.select("#gauge");
        guageDisplay.html("");
        const washFreq = idMetadata[0].wfreq;
        const guageData = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: washFreq,
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    axis: { range: [0, 9] },
                    bar: { color: "#f2e9e4" },
                    steps: [
                        { range: [0, 1], color: "#e0e0e0" },
                        { range: [1, 2], color: "#e0e0e0" },
                        { range: [2, 3], color: "#e0e0e0" },
                        { range: [3, 4], color: "#e0e0e0" },
                        { range: [4, 5], color: "#e0e0e0" },
                        { range: [5, 6], color: "#e0e0e0" },
                        { range: [6, 7], color: "#e0e0e0" },
                        { range: [7, 8], color: "#e0e0e0" },
                        { range: [8, 9], color: "#000000" }
                    ],
                    threshold: {
                        value: washFreq
                    }
                }
            }
        ];
        Plotly.newPlot('gauge', guageData, gaugeLayout);
    });
}