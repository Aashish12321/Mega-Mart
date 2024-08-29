import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const DashboardChart = ({ salesData }) => {
  const labels = salesData?.map((item) => item._id);
  const data = salesData?.map((item) => item.totalSales);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Monthly Sales",
        data,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(54, 162, 235, 0.8)",
        hoverBorderColor: "rgba(54, 162, 235, 1)",
        borderRadius: 5,
        barPercentage: 0.5,
      },
    ],
  };
  return (
    <div>
      <h2>Month-on-Month Sales for the Past 12 Months</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default DashboardChart;
