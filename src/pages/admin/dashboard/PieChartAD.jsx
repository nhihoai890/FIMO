import React, { useContext, useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { MoviesContext } from "../../../contexts/MovieProvider";
import { CategoriesContext } from "../../../contexts/CategoryProvider";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChartAD() {
    const movies = useContext(MoviesContext);
    const categories = useContext(CategoriesContext);


    const data = useMemo(() => {
        if (!movies || !categories) return { labels: [], datasets: [] }

        const cateMap = {}
        categories.forEach(cate => {
            cateMap[cate.id] = cate.name
        });

        const genreCount = {};
        movies.forEach(movie => {

            movie.listCate?.forEach(cateId => {

                const cateName = cateMap[cateId]

                if (!genreCount[cateName]) {
                    genreCount[cateName] = 0
                }

                genreCount[cateName]++

            })

        })
        return {
            labels: Object.keys(genreCount),
        datasets: [
          {
            label: "Thể loại phim",
            data: Object.values(genreCount),
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              
            ],
            borderWidth: 1,
          },
        ],

        }

    }, [movies, categories]);
    

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
        },
    };

    return (
        <div className="w-[400px] h-[400px]">
            <Pie data={data} options={options} />
        </div>
    );
}

export default PieChartAD;