import React, { useContext, useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";
import { OrdersContenxt } from "../../../contexts/OrdersProvider";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChartAD() {
  const orders = useContext(OrdersContenxt);

  const revenueMonth = useMemo(() => {
    const months = [
      { month: "January", total: 0 },
      { month: "February", total: 0 },
      { month: "March", total: 0 },
      { month: "April", total: 0 },
      { month: "May", total: 0 },
      { month: "June", total: 0 },
      { month: "July", total: 0 },
      { month: "August", total: 0 },
      { month: "September", total: 0 },
      { month: "October", total: 0 },
      { month: "November", total: 0 },
      { month: "December", total: 0 }
    ];

    orders?.forEach((order) => {
      const date = order.timePayment.toDate();
      const monthIndex = date.getMonth();
      months[monthIndex].total += order.total;
    });

    return months;
  }, [orders]);

  const data = {
    labels: revenueMonth.map((e) => e.month),
    datasets: [
      {
        label: "Doanh thu",
        data: revenueMonth.map((e) => e.total),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: "Line Chart Revenue"
      }
    }
  };

  return (
    <div style={{ width: "700px", margin: "auto" }}>
      <Line data={data} options={options} />
    </div>
  );
}

export default LineChartAD;