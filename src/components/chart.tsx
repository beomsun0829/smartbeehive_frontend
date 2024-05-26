import { Chart } from "react-google-charts";
import { getSound } from "@/api/getsound";
import { getTemperature } from "@/api/gettemperature";
import { useEffect, useState } from "react";

export default function CardLineChart() {
  const [soundData, setSoundData] = useState<any[]>([]);
  const [temperatureData, setTemperatureData] = useState<any[]>([]);
  const [co2Data, setCo2Data] = useState<any[]>([]);
  const [humidityData, setHumidityData] = useState<any[]>([]);
  const [n2oData, setN2oData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sound = await getSound();
        const temp = await getTemperature();

        const formattedSoundData = [["Time", "Sound"], ...sound['results'].map((item: any) => [item.interval, item.avg_sound])];
        const formattedTemperatureData = [["Time", "Temperature"], ...temp['results'].map((item: any) => [item.interval, item.avg_temperature])];
        const formattedCo2Data = [["Time", "CO2"], ...temp['results'].map((item: any) => [item.interval, item.avg_co])];
        const formattedHumidityData = [["Time", "Humidity"], ...temp['results'].map((item: any) => [item.interval, item.avg_humidity])];
        const formattedN2oData = [["Time", "N2O"], ...temp['results'].map((item: any) => [item.interval, item.avg_nitrogen_dioxide])];

          console.log(formattedSoundData);
        setSoundData([formattedSoundData[0], ...formattedSoundData.slice(1).reverse()]);
        setTemperatureData([formattedTemperatureData[0], ...formattedTemperatureData.slice(1).reverse()]);
        setCo2Data([formattedCo2Data[0], ...formattedCo2Data.slice(1).reverse()]);
        setHumidityData([formattedHumidityData[0], ...formattedHumidityData.slice(1).reverse()]);
        setN2oData([formattedN2oData[0], ...formattedN2oData.slice(1).reverse()]);
          
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const commonOptions = {
    curveType: "function",
    legend: { position: "bottom" },
    hAxis: {
      title: "Time",
      textStyle: { color: "rgba(255,255,255,.7)" },
      titleTextStyle: { color: "red" },
    },
    vAxis: {
      title: "Value",
      textStyle: { color: "rgba(255,255,255,.7)" },
      titleTextStyle: { color: "red" },
    },
    backgroundColor: "transparent",
    colors: ["#3182ce"],
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
      <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
              Overview
            </h6>
            <h2 className="text-l font-semibold">Charts</h2>
          </div>
        </div>
      </div>
      <div className="p-3 flex-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
        <div className="relative h-96">
          <Chart
            chartType="LineChart"
            width="100%"
            height="100%"
            data={soundData}
            options={{ ...commonOptions, title: "Sound Levels" }}
          />
        </div>
        <div className="relative h-96">
          <Chart
            chartType="LineChart"
            width="100%"
            height="100%"
            data={temperatureData}
            options={{ ...commonOptions, title: "Temperature Levels" }}
          />
        </div>
        <div className="relative h-96">
          <Chart
            chartType="LineChart"
            width="100%"
            height="100%"
            data={co2Data}
            options={{ ...commonOptions, title: "CO2 Levels" }}
          />
        </div>
        <div className="relative h-96">
          <Chart
            chartType="LineChart"
            width="100%"
            height="100%"
            data={humidityData}
            options={{ ...commonOptions, title: "Humidity Levels" }}
          />
        </div>
        <div className="relative h-96">
          <Chart
            chartType="LineChart"
            width="100%"
            height="100%"
            data={n2oData}
            options={{ ...commonOptions, title: "N2O Levels" }}
          />
        </div>
      </div>
    </div>
  );
}
