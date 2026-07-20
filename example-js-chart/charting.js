function createChart(chartContext, title, xValues, yValues) {
    var chart = new Chart(chartContext, {
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

    chart.canvas.parentNode.style.height = '250px';
    chart.canvas.parentNode.style.width = '250px';
}

function applyDataToChart(chartContext, data) {
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

  createChart(chartContext, title, xValues, yValues);
}

function fetchData(chartContext) {
  fetch('https://csuhj.github.io/example-js-chart/data.csv')
    .then(response => {
      var data = response.text().then(text => {
        applyDataToChart(chartContext, text);
      });
    })
    .catch(error => console.error('Failed to fetch data:', error)); 
}