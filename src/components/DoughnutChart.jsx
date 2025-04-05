import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ dataArray, labelsArray, bgColorArray }) => {
  const data = {
    labels: labelsArray,
    datasets: [
      {
        data: dataArray,
        backgroundColor: bgColorArray,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="w-72 h-72">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
