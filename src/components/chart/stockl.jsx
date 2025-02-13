import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from "chart.js";

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const StockChart = ({ stockBanyak, stockSedikit }) => {
  // Sample data
  const data = {
    labels: ["Stock < 10", "Stock > 10"], // Labels for each slice of the pie
    datasets: [
      {
        data: [stockSedikit?.length, stockBanyak?.length], // Data for the slices
        backgroundColor: ["#FF6384", "#36A2EB"], // Slice colors
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw} units`; // Display extra info on hover
          },
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default StockChart;
