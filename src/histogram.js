import React, { useState } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2'
ChartJS.register(...registerables);



const Histogram = () => {
  const [histogramData, setHistogramData] = useState([]);

  const fetchData = async () => {
    const response = await fetch('https://www.terriblytinytales.com/test.txt');
    const data = await response.text();
    const words = data.split(/[^\w]/).filter(word => word.length > 0);
    const wordFrequency = {};
    words.forEach(word => {
      if (wordFrequency[word]) {
        wordFrequency[word]++;
      } else {
        wordFrequency[word] = 1;
      }
    });
    const sortedWordFrequency = Object.entries(wordFrequency).sort((a, b) => b[1] - a[1]);
    const top20Words = sortedWordFrequency.slice(0, 20);
    const newHistogramData = top20Words.map(([word, frequency]) => ({ word, frequency }));
    setHistogramData(newHistogramData);
  };

  const handleExport = () => {
    const csvData =
      'data:text/csv;charset=utf-8,' +
      histogramData.map(item => `${item.word},${item.frequency}`).join('\n');
    const encodedUri = encodeURI(csvData);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'histogram_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (histogramData.length > 0) {
    const chartData = {
      labels: histogramData.map(item => item.word),
      datasets: [
        {
          label: 'Word Frequency',
          data: histogramData.map(item => item.frequency),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
        xAxes: [
          {
            type: 'linear',
          },
        ],
      },
    };
    return (
      <div>
        <button onClick={fetchData}>Submit</button>
        <button onClick={handleExport}>Export</button>
        
        <div className="chart-container">
          <h2>20 most occurring words</h2>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={fetchData}>Submit</button>
      </div>
    );
  }
};

export default Histogram;
