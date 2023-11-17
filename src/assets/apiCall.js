// weather : https://api.openweathermap.org/data/2.5/weather?q=patna&appid=04ba3a0bcd219bbbe1ea899946ba8045
// forecast : https://api.openweathermap.org/data/2.5/forecast?q=patna&appid=04ba3a0bcd219bbbe1ea899946ba8045

import axios from "axios";

export const forecast = async (search) => {
  const data = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=04ba3a0bcd219bbbe1ea899946ba8045`
  );
  //   console.log(data);
  return data;
};
