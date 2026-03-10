import React, { useMemo, useContext } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { OrdersContenxt } from "../../../contexts/OrdersProvider";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function BarChartAD() {
    const orders = useContext(OrdersContenxt);

    const revenueByMonth = useMemo(() => {

        const months = [
            { month: "January", totalFood: 0, totalChair: 0 },
            { month: "February", totalFood: 0, totalChair: 0 },
            { month: "March", totalFood: 0, totalChair: 0 },
            { month: "April", totalFood: 0, totalChair: 0 },
            { month: "May", totalFood: 0, totalChair: 0 },
            { month: "June", totalFood: 0, totalChair: 0 },
            { month: "July", totalFood: 0, totalChair: 0 },
            { month: "August", totalFood: 0, totalChair: 0 },
            { month: "September", totalFood: 0, totalChair: 0 },
            { month: "October", totalFood: 0, totalChair: 0 },
            { month: "November", totalFood: 0, totalChair: 0 },
            { month: "December", totalFood: 0, totalChair: 0 },
        ];

        orders?.forEach(order => {
            const date = order.timePayment.toDate();
            const monthIndex = date.getMonth();

            months[monthIndex].totalChair += order.totalChair;
            months[monthIndex].totalFood += order.totalFood;
        });

        return months;

    }, [orders]);



    const data = {
        labels: revenueByMonth.map(e => e.month),
        datasets: [
            {
                label: "Đồ Ăn",
                data: revenueByMonth.map(e => e.totalFood),
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "Ghế",
                data: revenueByMonth.map(e => e.totalChair),
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Food & Chair Sales By Month",
            },
        },
    };

    return <Bar options={options} data={data} />;
}

export default BarChartAD;