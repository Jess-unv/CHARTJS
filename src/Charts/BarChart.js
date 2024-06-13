import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement);

const BarChart = () => {
  const [chart, setChart] = useState({});
  const baseUrl = "https://api.coinranking.com/v2/coins/?limit=10";
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiKey = "coinrankingb29fa8228e0b0979f2a9a74739b95eddd7afce88bafe0082";

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(`${proxyUrl}${baseUrl}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': apiKey,
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        console.log(json.data);
        setChart(json.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchCoins();
  }, [baseUrl, proxyUrl, apiKey]);

  console.log("chart", chart);

  const data = {
    labels: chart?.coins?.map(x => x.name) || [],
    datasets: [{
      label: `${chart?.coins?.length || 0} Coins Available`,
      data: chart?.coins?.map(x => x.price) || [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    }],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        labels: {
          fontSize: 25,
        },
      },
    },
  };

  return (
    <div>
      <Bar
        data={data}
        height={400}
        options={options}
      />
    </div>
  );
};

export default BarChart;
