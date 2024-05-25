import { Chart } from "react-google-charts";

export default function CardLineChart() {
  const data = [
    ["Month", "Current Year", "Previous Year"],
    ["January", 65, 40],
    ["February", 78, 68],
    ["March", 66, 86],
    ["April", 44, 74],
    ["May", 56, 56],
    ["June", 67, 60],
    ["July", 75, 87],
  ];

  const options = {
    title: "Sound Levels",
    curveType: "function",
    legend: { position: "bottom" },
    hAxis: {
      title: "Month",
      textStyle: { color: "rgba(255,255,255,.7)" },
      titleTextStyle: { color: "red" },
    },
    vAxis: {
      title: "Value",
      textStyle: { color: "rgba(255,255,255,.7)" },
      titleTextStyle: { color: "red" },
    },
    backgroundColor: "transparent",
    colors: ["#3182ce", "#444444"],
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
      <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
              Overview
            </h6>
            <h2 className="text-l font-semibold">Chart</h2>
          </div>
        </div>
      </div>
      <div className="p-4 flex-auto">
        <div className="relative h-96">
          <Chart
            chartType="LineChart"
            width="100%"
            height="400px"
            data={data}
            options={options}
          />
        </div>
      </div>
    </div>
  );
};

