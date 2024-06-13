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
    const [shortRange, setShortRange] = useState(true);

  useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
      try {
        const sound = await getSound(shortRange ? 10 : 1440);
        const temp = await getTemperature(shortRange ? 10 : 1440);

        const formattedSoundData = [["Time", "Sound", { role: "style" }], ...sound['results'].map((item: any) => [new Date(item.interval), item.avg_sound, item.is_anomaly ? 'point { size: 5; fill-color: red; }' : 'point { size: 0; fill-color: #3182ce; }'])];
        const formattedTemperatureData = [["Time", "Temperature", { role: "style" }], ...temp['results'].map((item: any) => [new Date(item.interval), item.avg_temperature, item.is_anomaly ? 'point { size: 5; fill-color: red; }' : 'point { size: 0; fill-color: #3182ce; }'])];
        const formattedCo2Data = [["Time", "CO2", { role: "style" }], ...temp['results'].map((item: any) => [new Date(item.interval), item.avg_co, item.is_anomaly ? 'point { size: 5; fill-color: red; }' : 'point { size: 0; fill-color: #3182ce; }'])];
        const formattedHumidityData = [["Time", "Humidity", { role: "style" }], ...temp['results'].map((item: any) => [new Date(item.interval), item.avg_humidity, item.is_anomaly ? 'point { size: 5; fill-color: red; }' : 'point { size: 0; fill-color: #3182ce; }'])];
        const formattedN2oData = [["Time", "N2O", { role: "style" }], ...temp['results'].map((item: any) => [new Date(item.interval), item.avg_nitrogen_dioxide, item.is_anomaly ? 'point { size: 5; fill-color: red; }' : 'point { size: 0; fill-color: #3182ce; }'])];

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
  }, [shortRange]);
    
    const handleShortRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShortRange(event.target.checked);
    };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const generateTicks = (data: any[]) => {
    const ticks = [];
    const firstDate = new Date(data[1][0]);
    const lastDate = new Date(data[data.length - 1][0]);

    for (let d = new Date(firstDate); d <= lastDate; d.setHours(d.getHours() + 4)) {
      ticks.push(new Date(d));
    }

    return ticks;
  };

  const soundTicks = generateTicks(soundData);
  const temperatureTicks = generateTicks(temperatureData);
  const co2Ticks = generateTicks(co2Data);
  const humidityTicks = generateTicks(humidityData);
  const n2oTicks = generateTicks(n2oData);

  const commonOptions = {
    curveType: "function",
    legend: { position: "bottom" },
    hAxis: {
      title: "",
      textStyle: { color: "rgba(255,255,255,.7)" },
      titleTextStyle: { color: "red" },
      slantedText: true,
      slantedTextAngle: 45,
      ticks: soundTicks,
    },
      backgroundColor: "transparent",
    pointSize:1,
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
      <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h2 className="text-l font-semibold">OverView</h2>
            short range <input type="checkbox" checked={shortRange} onChange={() => setShortRange(!shortRange)} />
          </div>
        </div>
      </div>
      <div className="p-3 flex-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-1">
        <div className="relative h-96">
          <Chart
            chartType="LineChart"
            width="100%"
            height="100%"
            data={soundData}
            options={{ ...commonOptions, title: "Sound Levels", hAxis: { ...commonOptions.hAxis, ticks: soundTicks } }}
          />
        </div>
        <div className="relative h-96">
          <Chart
            chartType="LineChart"
            width="100%"
            height="100%"
            data={temperatureData}
            options={{ ...commonOptions, title: "Temperature Levels", hAxis: { ...commonOptions.hAxis, ticks: temperatureTicks } }}
          />
        </div>
        <div className="relative h-96">
          <Chart
            chartType="LineChart"
            width="100%"
            height="100%"
            data={co2Data}
            options={{ ...commonOptions, title: "CO2 Levels", hAxis: { ...commonOptions.hAxis, ticks: co2Ticks } }}
          />
        </div>
        <div className="relative h-96">
          <Chart
            chartType="LineChart"
            width="100%"
            height="100%"
            data={humidityData}
            options={{ ...commonOptions, title: "Humidity Levels", hAxis: { ...commonOptions.hAxis, ticks: humidityTicks } }}
          />
        </div>
        <div className="relative h-96">
          <Chart
            chartType="LineChart"
            width="100%"
            height="100%"
            data={n2oData}
            options={{ ...commonOptions, title: "N2O Levels", hAxis: { ...commonOptions.hAxis, ticks: n2oTicks } }}
          />
        </div>
      </div>
    </div>
  );
}
