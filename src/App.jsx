import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./Components/Header";
import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import Search from "./Pages/Search";
import Home from "./Pages/Home";

function App() {
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState([]);

  return (
    <div className="text-3xl">
      <Header
        search={search}
        weatherData={weatherData}
        setWeatherData={setWeatherData}
      />
      <div className="min-h-[90vh] bg-gradient-to-r from-sky-200/75 to-gray-400">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                search={search}
                setSearch={setSearch}
                weatherData={weatherData}
                setWeatherData={setWeatherData}
              />
            }
          />
          {/* <Route path="/search" element={<Search />} /> */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
