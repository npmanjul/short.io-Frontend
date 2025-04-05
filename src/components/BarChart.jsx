import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ dataArray, labelsArray, chartTitle, bgColorArray }) => {
  const data = {
    labels: labelsArray,
    datasets: [
      {
        label: chartTitle,
        data: dataArray,
        backgroundColor: bgColorArray,
        borderColor: bgColorArray,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false, position: "top" },
      title: { display: false, text: chartTitle },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
