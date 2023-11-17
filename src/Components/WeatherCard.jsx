import React from "react";
import { CiCloud, CiCloudRainbow } from "react-icons/ci";
import { FaWater } from "react-icons/fa";
import { FaRegSnowflake } from "react-icons/fa";
import { FaWind } from "react-icons/fa6";
import { MdClear } from "react-icons/md";
const WeatherCard = ({ data, otherData }) => {
  const { dt_txt, main, weather } = data;
  const city = otherData?.city;
  const coord = city?.coord;
  const date = new Date(dt_txt);
  const highTemp = main.temp_max;
  const lowTemp = main.temp_min;
  const coordinates = `${coord.lat}, ${coord.lon}`;
  const humidity = main.humidity;
  const sunrise = new Date(city?.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(city?.sunset * 1000).toLocaleTimeString();
  const weatherCondition = weather.length > 0 ? weather[0].main : "";

  return (
    <div className="flex flex-col items-center gap-2 snap-center">
      <p className="text-xs tracking-tighter md:tracking-widest font-semibold">
        {date.toDateString()}
      </p>

      <div className="p-4 bg-gradient-to-b from-gray-900 to-gray-400 shadow-lg px-12 tracking-widest rounded-md text-white shadow-gray-500 flex flex-col gap-4">
        <p className="text-5xl flex justify-center text-gray-300">
          {weatherCondition === "Clouds" && <CiCloudRainbow />}
          {weatherCondition === "Clear" && <CiCloud />}
          {weatherCondition === "Rainy" && <FaWater />}
          {weatherCondition === "Snowy" && <FaRegSnowflake />}
          {weatherCondition === "Windy" && <FaWind />}
        </p>
        <p className="text-xs md:text-base"> {highTemp}</p>
        <p className="text-xs md:text-base"> {lowTemp}</p>
        <p className="text-xs md:text-base"> {coordinates}</p>
        <p className="text-xs md:text-base"> {humidity}</p>
        <p className="text-xs md:text-base"> {sunrise}</p>
        <p className="text-xs md:text-base"> {sunset}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
