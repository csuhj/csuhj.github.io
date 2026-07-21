var chart;

function createChart(canvas, title, xValues, yValues) {
    chart = new Chart(canvas, {
      type: "bar",
      data: {
          labels: xValues,
          datasets: [{
          backgroundColor: ["green"],
          data: yValues
          }]
      },
      options: {
          maintainAspectRatio: false,
          plugins: {
          legend: {display: false},
          title: {
              display: true,
              text: title,
              font: {size: 16}
          }
        }
      }
    });
}

function applyDataToChart(canvas, data) {
  const xValues = [];
  const yValues = [];
  var dataLines = data.split(/\r\n|\n/);

  var categoryType = dataLines[0].split(/,/)[0];
  var valueType = dataLines[0].split(/,/)[1];
  var title = valueType+' by '+categoryType;
  console.log(title);

  for (var i=1; i<dataLines.length; i++) {
    var cells = dataLines[i].split(/,/);

    console.log('Adding data '+cells[0]+' = '+cells[1]);

    xValues.push(cells[0]);
    yValues.push(cells[1]);
  };

  createChart(canvas, title, xValues, yValues);
}

function fetchData(canvas) {
  fetch('./data.csv')
    .then(response => {
      var data = response.text().then(text => {
        applyDataToChart(canvas, text);
      });
    })
    .catch(error => console.error('Failed to fetch data:', error)); 
}

function clickHandler(chart, event, outputLabel) {
    const points = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);

    if (points.length) {
        const firstPoint = points[0];
        const label = chart.data.labels[firstPoint.index];
        const value = chart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];

        outputLabel.textContent = label+' has a value of '+value;
    }
}

function connectClickHandler(canvas, outputLabel) {
    canvas.addEventListener('click', (event) => clickHandler(chart, event, outputLabel), false);
}