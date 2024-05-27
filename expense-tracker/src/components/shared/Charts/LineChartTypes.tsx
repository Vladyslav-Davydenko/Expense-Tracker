import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  TooltipItem,
} from "chart.js";
import { IExpenses, IType } from "@/types";

import { months } from "@/constants";

import { filterTypes } from "@/lib/utils";

interface LineChartTypesProps {
  expenses: IExpenses[];
  types: IType[];
}

const LineChartTypes = ({ expenses, types }: LineChartTypesProps) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    LineElement
  );

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const typesData: Record<string, Record<string, number>> = {};
  types.map((type) => {
    typesData[type.$id] = filterTypes({ expenses, type, year: currentYear });
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "white",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"line">) {
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
          callback: function (value: unknown) {
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
    labels: months.slice(0, currentMonth + 1),
    datasets: Object.keys(typesData).map((typeDataId, indx) => {
      return {
        label: types.map((type) => type.name)[indx],
        data: Object.keys(typesData[typeDataId])
          .sort((a, b) => months.indexOf(a) - months.indexOf(b))
          .map((key) => typesData[typeDataId][key] / 100),
        backgroundColor: types[indx].color,
        borderColor: types[indx].color,
        borderWidth: 2,
      };
    }),
  };
  return <Line data={data} options={options} className=" p-4 " />;
};

export default LineChartTypes;
