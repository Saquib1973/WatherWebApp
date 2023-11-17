import React, { useState } from "react";
import { IoReloadCircle } from "react-icons/io5";
import { forecast } from "../assets/apiCall";
const Header = ({ search, setWeatherData, weatherData }) => {
  const [loading, setLoading] = useState(false);
  const fetchData = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const data = await forecast(search === "" ? "ranchi" : search);
      const currentDate = new Date().toLocaleDateString();
      // Filter data for the next 4 days and include only one entry per day
      const filteredData = [];

      data?.data?.list.forEach((item, index, arr) => {
        const itemDate = new Date(item.dt_txt).toLocaleDateString();
        const nextDate =
          index + 1 < arr.length
            ? new Date(arr[index + 1].dt_txt).toLocaleDateString()
            : null;
        if (
          itemDate !== currentDate &&
          filteredData.length < 4 &&
          itemDate !== nextDate
        ) {
          filteredData.push(item);
        }
      });
      setWeatherData({ filteredData, otherData: data?.data });
      // setError(null);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      // setError("An error occurred while fetching weather data.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex p-10 items-center justify-around py-5 text-lg md:text-3xl tracking-wider bg-gray-900 text-white">
      <div>Weather 99</div>
      <div
        className="flex items-center gap-2 group cursor-pointer"
        onClick={fetchData}
      >
        <IoReloadCircle className={`${loading ? "animate-spin" : ""}`} />
        Refresh
      </div>
    </div>
  );
};

export default Header;
