let timeRangeDropdown = document.getElementById("timeRangeDropdown");
let dropdownItems = document.querySelectorAll(".dropdown-item");
let myChart;
let myChart2;
let myChart3;

// dropdownItems.forEach(function(item) {
//   item.addEventListener("click", function() {
//     let selectedText = this.textContent;
//     let selectedTimeRange = this.getAttribute("data-time-range");
//     timeRangeDropdown.textContent = selectedText;
//     updateCharts(selectedTimeRange);
//   });
// });

function updateCharts() {
  let caseId = document.getElementById('plantCaseId').value.trim();
  // Fetch data from JSON file based on the selected time range
  let dataURL = 'chartData' + caseId + '.json';
  console.log(caseId);
  // Fetch data for both charts
  fetch(dataURL)
    .then((response) => response.json())
    .then((data) => {
      let chart1Data = data.chart1;
      let chart2Data = data.chart2;
      let chart3Data = data.chart3;
      // var chart1Data = data.chart1[timeRange];
      myChart.data.datasets = chart1Data.datasets;
      myChart.data.labels = chart1Data.labels;

      // var chart2Data = data.chart2[timeRange];
      myChart2.data.datasets = chart2Data.datasets;
      myChart2.data.labels = chart2Data.labels;

      // var chart3Data = data.chart3[timeRange];
      myChart3.data.datasets = chart3Data.datasets;
      myChart3.data.labels = chart3Data.labels;

      // Update both charts
      myChart.update();
      myChart2.update();
      myChart3.update();
    });
}

let ctx = document.getElementById("myChart").getContext("2d");
let data = {
  labels: [
    "2024-02-13",
    "2024-02-13",
    "2024-02-14",
    "2024-02-14",
    "2024-02-15",
    "2024-02-15",
    "2024-02-16",
    "2024-02-16",
  ],
  datasets: [
    {
      label: "Moisture",
      data: [354.05, 354.09, 354.7, 354.07, 354.06, 354.3, 354.05, 354.07],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

let options = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

myChart = new Chart(ctx, {
  type: "line",
  data: data,
  options: options,
});

let ctr = document.getElementById("myChart2").getContext("2d");
let data2 = {
  labels: [
    "2024-02-13",
    "2024-02-13",
    "2024-02-14",
    "2024-02-14",
    "2024-02-15",
    "2024-02-15",
    "2024-02-16",
    "2024-02-16",
  ],
  datasets: [
    {
      label: "Temp",
      data: [26.277, 26.577, 25.257, 26.277, 26.577, 25.257, 26.277, 26.577],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderWidth: 1,
    },
  ],
};

let options2 = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

myChart2 = new Chart(ctr, {
  type: "bar",
  data: data2,
  options: options2,
});

let ctz = document.getElementById("myChart3").getContext("2d");
let data3 = {
  labels: [
    "2024-02-13",
    "2024-02-13",
    "2024-02-14",
    "2024-02-14",
    "2024-02-15",
    "2024-02-15",
    "2024-02-16",
    "2024-02-16",
  ],
  datasets: [
    {
      label: "Temp",
      data: [26.277, 26.577, 25.257, 25.477, 24.577, 24.257, 26.277, 26.577],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderWidth: 1,
    },
  ],
};

let options3 = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

myChart3 = new Chart(ctz, {
  type: "line",
  data: data3,
  options: options3,
});

$(document).ready(function () {
  $("#editProfilePic").on("click", function (event) {
    event.preventDefault(); // Prevent the link's default action
    $("#editModalProfile").modal("show"); // Show the modal with the specified ID
  });
});



document.getElementById('newPicBtn').addEventListener('click', function() {
  let caseId = document.getElementById('plantCaseId').value.trim();

  fetch('takeNewPic.php?caseNumber=' + caseId, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.text();
  })
  .then(data => {
      console.log('Picture taken successfully.');
      // Create img tag and set src attribute to the captured picture path
      const img = document.createElement('img');
      img.src = data;
      document.getElementById('plantPicM').value = data;

      setTimeout(() => {
          window.location.reload(); 
      }, 2000); 

  })
  .catch(error => {
      console.error('Error taking picture:', error);
  });
});


document.getElementById('newMeasue').addEventListener('click', function() {
  let caseId = document.getElementById('plantCaseId').value.trim();

  fetch('newMeasure.php',{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.text();
  })
  .then(data => {
      console.log('New measurement was takken');
      setTimeout(() => {
          window.location.reload(); 
      }, 6000); 

  })
  .catch(error => {
      console.error('Error measurment', error);
  });
});

window.onload = updateCharts;


