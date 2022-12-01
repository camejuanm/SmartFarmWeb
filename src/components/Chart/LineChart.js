import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import Annotation from "chartjs-plugin-annotation"; 
Chart.register(Annotation);

function LineChart({ chartData, chartOption }) {
  return <Line data={chartData} options={chartOption} />;
}

export default LineChart;