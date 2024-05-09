import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from "chart.js";
import { IExpenses } from "@/types";

import { defaultColors } from "@/pages/_root/Types";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface BarChartProps {
  expenses: IExpenses[];
}

const BarChart = ({ expenses }: BarChartProps) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement
  );

  // Data for different months
  const preparedData: Record<string, number> = {};

  const currentYear = new Date().getFullYear();

  expenses.map((expense) => {
    const expenseDate = new Date(expense.date);

    // Data will shown of this year only
    if (expenseDate.getFullYear() !== currentYear) return;

    const expenseMonth = expenseDate.getMonth();
    if (!preparedData[months[expenseMonth]])
      preparedData[months[expenseMonth]] = expense.amount;
    else preparedData[months[expenseMonth]] += expense.amount;
  });

  console.log(preparedData);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "white",
          boxWidth: 0,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = "";
            if (context.parsed.y !== null) {
              label += " $" + context.parsed.y;
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "white",
          callback: function (
            value: unknown,
            _index: unknown,
            _values: unknown
          ) {
            return "$" + value;
          },
        },
      },
      x: {
        ticks: {
          color: "white",
        },
      },
    },
  };
  const data = {
    labels: Object.keys(preparedData).sort(
      (a, b) => months.indexOf(a) - months.indexOf(b)
    ),
    datasets: [
      {
        label: `Expenses for ${currentYear}`,
        data: Object.keys(preparedData)
          .sort((a, b) => months.indexOf(a) - months.indexOf(b))
          .map((key) => preparedData[key] / 100),
        backgroundColor: defaultColors,
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };
  return <Bar data={data} options={options} />;
};

export default BarChart;
