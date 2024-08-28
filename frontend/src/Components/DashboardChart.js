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
  LinearScale,
);

const DashboardChart = ({salesData}) => {
  const labels = salesData?.map((item) => item._id);
  const data = salesData?.map((item) => item.totalSales);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Monthly Sales",
        data,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
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
