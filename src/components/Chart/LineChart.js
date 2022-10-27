import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ chartData, chartOption }) {
  return <Line data={chartData} options={chartOption} />;
}

export default LineChart;