import React,{useContext} from "react";
import { taskcontext } from "../App";
import { Pie } from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js'
const PieChart = () => {
Chart.register(ArcElement);
let {success}=useContext(taskcontext);
console.log(success)
const labels = ["completed task","incomplete task"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: ["green", "gray"],
      data: [success ,success-100],
    },
  ],
};

  return (
    <div className="p-3 text-center">
      <Pie id="chart" data={data} />
      <p>You have completed {success}% of your tasks</p>
    </div>
  );
};
export default PieChart;