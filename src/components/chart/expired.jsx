import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from "chart.js";

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const ExpiredChart = ({ expired, nonExpired }) => {
  const data = {
    labels: ["Expired", "Non-Expired"], // Labels for each slice of the pie
    datasets: [
      {
        data: [expired?.length, nonExpired?.length], // Data for the slices
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

export default ExpiredChart;
