import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
  Title,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
  Title
);

const LineChart = ({
  labelsArray,
  dataArray,
  labelName,
  title,
  tooltipName,
}) => {
  const lineChartData = {
    labels: labelsArray,
    datasets: [
      {
        label: labelName,
        data: dataArray,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "rgb(59, 130, 246)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "rgb(59, 130, 246)",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 8,
          padding: 15,
          font: {
            size: window.innerWidth < 768 ? 12 : 14,
          },
        },
      },
      title: {
        display: true,
        text: title,
        font: {
          size: window.innerWidth < 768 ? 14 : 16,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 10,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        displayColors: false,
        titleFont: {
          size: window.innerWidth < 768 ? 12 : 14,
        },
        bodyFont: {
          size: window.innerWidth < 768 ? 12 : 14,
        },
        callbacks: {
          label: function (context) {
            return `${tooltipName}: ${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 500,
          padding: 10,
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
          callback: function (value) {
            return value.toLocaleString();
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
          drawBorder: true,
        },
        border: {
          display: true,
          color: "rgba(0, 0, 0, 0.2)",
        },
      },
      x: {
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.1)",
          drawBorder: true,
        },
        border: {
          display: true,
          color: "rgba(0, 0, 0, 0.2)",
        },
        ticks: {
          padding: 10,
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
            weight: "500",
          },
          maxRotation: window.innerWidth < 768 ? 45 : 0,
          minRotation: window.innerWidth < 768 ? 45 : 0,
        },
      },
    },
    layout: {
      padding: {
        top: window.innerWidth < 768 ? 10 : 20,
        right: window.innerWidth < 768 ? 10 : 20,
        bottom: window.innerWidth < 768 ? 10 : 20,
        left: window.innerWidth < 768 ? 10 : 20,
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-lg ">
      <div className="relative w-full h-[300px] md:h-[400px]">
        <Line data={lineChartData} options={lineChartOptions} />
      </div>
    </div>
  );
};

export default LineChart;
