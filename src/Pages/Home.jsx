import React, { useEffect, useState } from "react";
import WeatherCard from "./../Components/WeatherCard";
import { forecast } from "../assets/apiCall";
import { CiSearch } from "react-icons/ci";
import { CiLocationOff } from "react-icons/ci";
const Home = ({ search, setSearch, setWeatherData, weatherData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await forecast("ranchi");
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
        setError(null);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("An error occurred while fetching weather data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Call the fetchData function immediately
  }, []); // Empty dependency array, as this effect should only run once on mount

  const fetchData = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await forecast(search);
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
      setError(null);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("An error occurred while fetching weather data.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col justify-normal items-center">
      <div className="flex flex-col items-center gap-4 md:gap-0 md:flex-row  justify-around border-gray-500 pt-10 pb-5 w-[90%] md:w-[80%] border-b-2 ">
        <div>
          <p className="tracking-widest text-lg md:text-2xl flex gap-1 md:gap-2 items-center`">
            <CiLocationOff />
            {weatherData?.otherData?.city?.name}
          </p>
          <p className="text-xs">
            {weatherData?.otherData && (
              <>
                {" "}
                {weatherData?.otherData?.city?.coord?.lat} lat /{" "}
                {weatherData?.otherData?.city?.coord?.lat} long
              </>
            )}
          </p>
        </div>
        <form
          onSubmit={fetchData}
          className="flex items-center justify-center gap-1"
        >
          <input
            placeholder="City ?"
            type="text"
            className="rounded-md outline-none p-1 md:p-2 text-xs md:text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="text-lg md:text-2xl">
            <CiSearch />
          </button>
        </form>
      </div>
      <div className="py-4 flex">
        {weatherData?.filteredData ? (
          <>
            {!loading && !error && (
              <div className="py-4 flex flex-col gap-5 pr-4">
                <div className="h-[5.5rem] md:h-[6rem]" />
                <p className="text-sm">High Temperature: </p>
                <p className="text-sm">Low Temperature: </p>
                <p className="text-sm">Coordinates: </p>
                <p className="text-sm">Humidity: </p>
                <p className="text-sm">Sunrise: </p>
                <p className="text-sm">Sunset: </p>
              </div>
            )}
          </>
        ) : (
          <>
            {!loading && (
              <p className="text-3xl tracking-widest">Please Search City</p>
            )}
          </>
        )}
        <div className="max-w-[60vw] overflow-x-scroll md:overflow-auto p-6 snap-x rounded-md md:max-w-[80vw] flex gap-4">
          {error && (
            <div className="text-red-500 h-[50vh] flex items-center justify-center flex-col">
              {error}
              <button onClick={fetchData} className="text-blue-500 ml-2">
                Retry
              </button>
            </div>
          )}
          {loading && !error ? (
            <div className="h-[50vh] flex items-center justify-center">
              Loading...
            </div>
          ) : (
            weatherData?.filteredData?.map((data, index) => (
              <div key={index} className="snap-x">
                {!error && (
                  <WeatherCard
                    key={index}
                    data={data}
                    otherData={weatherData?.otherData}
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
