import { useQuery } from "@tanstack/react-query";
import { getAll } from "../requests";
const Weather = () => {
  const result = useQuery({
    queryKey: ["weatherData"],
    queryFn: () => getAll("abuja"),
    retry: 1,
  });
  if (result.isLoading) {
    return (
      <div className="pt-9">
        <img src="/img/loading.gif" alt="" />
      </div>
    );
  } else if (result.isError) {
    return <div className="pt-6">Please check your Network connection</div>;
  }
  const currentDay = (add) => {
    const date = new Date().getDay();
    return date + add === 7
      ? 0
      : date + add === 8
      ? 1
      : date + add === 9
      ? 2
      : date + add === 10
      ? 3
      : date + add;
  };

  const dayArray = [
    currentDay(0),
    currentDay(1),
    currentDay(2),
    currentDay(3),
    currentDay(4),
  ];
  const dayInword = dayArray.map((day) => {
    if (day == 0) {
      return "Sunday";
    } else if (day == 1) {
      return "Monday";
    } else if (day == 2) {
      return "Tuesday";
    } else if (day == 3) {
      return "wednesday";
    } else if (day == 4) {
      return "Thursday";
    } else if (day == 5) {
      return "Friday";
    } else if (day == 6) {
      return "Saturday";
    }
  });
  // console.log(dayArray, dayInword);
  const currentDate = (add) => {
    const date = new Date();
    const day = date.getDate();
    const newMonth = date.getMonth() + 1;
    const month = newMonth < 10 ? "0" + newMonth : newMonth;
    const year = date.getFullYear();
    if (add > 0) {
      const newDay = day + add;
    const dayy =   newDay < 10 ? "0" + newDay : newDay;
      return `${year}-${month}-${dayy}`;
    }
  };

  
  const { data: weatherData } = result;
  console.log(weatherData)
  console.log(currentDate(1),currentDate(2),currentDate(3),currentDate(4))
  const foreCast = weatherData.list.filter((weather) => {
    return (
      weather.dt_txt === `${currentDate(1)} 21:00:00` ||
      weather.dt_txt === `${currentDate(2)} 21:00:00` ||
      weather.dt_txt === `${currentDate(3)} 21:00:00` ||
      weather.dt_txt === `${currentDate(4)} 21:00:00`
    );
  });
  console.log(foreCast)
  const style = {
    boxShadow: "0 1px 20px 2px rgba(105, 105,105,0.5)",
  };

  return (
    <div
      className="flex flex-col w-1/2 h-3/5 mt-12 justify-between rounded-3xl  shadow-lg  "
      style={style}
    >
      <section className="mt-9 flex justify-center  items-center pl-4 pr-4 gap-14">
        <img
          className=""
          src={`https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@4x.png`}
          alt="weather-image"
        />
        <div className="flex flex-col  justify-center text-xl gap-2">
          <span>Today</span>
          <span className="text-4xl">{weatherData.city.name}</span>
          <span>
            Temperature {(weatherData.list[0].main.temp - 273).toFixed(2)}{" "}
            <sup>o</sup>C{" "}
          </span>
          <span>{weatherData.list[0].weather[0].description}</span>
        </div>
      </section>
      <div className=" w-1/2 absolute mt-72 flex justify-center gap-6 text-center">
        {foreCast.map((weather, ind) =>  (
          <section
            key={`ind${ind}`}
            className=" rounded-3xl shadow-lg shadow-gray-500 w-36 p-1"
          >
            <span key={`span${ind}`}>{dayInword[ind + 1]}</span>
            <img
              key={`img${ind}`}
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt=""
            />
            <span key={`${ind} span`}>
              {(weather.main.temp - 273).toFixed(2)} <sup>o</sup>C
            </span>
          </section>
        ))}
      </div>
    </div>
  );
};
export default Weather;
