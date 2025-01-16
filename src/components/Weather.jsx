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
  const foreCast = weatherData.list.filter((weather) => {
    return (
      weather.dt_txt === `${currentDate(1)} 21:00:00` ||
      weather.dt_txt === `${currentDate(2)} 21:00:00` ||
      weather.dt_txt === `${currentDate(3)} 21:00:00` ||
      weather.dt_txt === `${currentDate(4)} 21:00:00`
    );
  });
  const style = {
    boxShadow: "0 1px 20px 2px rgba(105, 105,105,0.5)",
  };

  return (
    <div
      className="relative  flex flex-col w-1/2 h-3/5 mt-12 justify-between rounded-3xl  shadow-lg  "
      style={style}
    >
      <section className="relative mt-9 flex justify-center  items-center pl-4 pr-4 laptop:gap-14 mobile:gap-0 tablet:flex-row laptop:flex-row mobile:flex-col-reverse">
        <img
          className="laptop:w-max mobile:w-32"
          src={`https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@4x.png`}
          alt="weather-image"
        />
        <div className="flex flex-col  justify-center mobile:text-base laptop:text-xl gap-2 mobile:mt-10 laptop:mt-0 ">
          <span>Today</span>
          <span className="laptop:text-4xl mobile:text-xl">
            {weatherData.city.name}
          </span>
          <span className="laptop:text-base mobile:text-sm">
            Temperature {(weatherData.list[0].main.temp - 273).toFixed(2)}{" "}
            <sup>o</sup>C{" "}
          </span>
          <span className="laptop:text-base mobile:text-sm">
            {weatherData.list[0].weather[0].description}
          </span>
        </div>
      </section>
      <div className=" w-full absolute bottom-[-5.5rem]   flex justify-center laptop:gap-6 mobile:gap-4 tablet:gap-16 text-center laptop:px-3 mobile:px-1 ">
        {foreCast.map((weather, ind) => (
          <section
            key={`ind${ind}`}
            className={`${
              ind > 1 ? "mobile:hidden laptop:block" : ""
            }  rounded-3xl shadow-lg shadow-gray-500  mobile:w-fit laptop:w-36 p-1`}
          >
            <span
              className="laptop:text-base mobile:text-sm"
              key={`span${ind}`}
            >
              {dayInword[ind + 1]}
            </span>
            <img
              className={`laptop:w-full mobile:w-20`}
              key={`img${ind}`}
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt=""
            />
            <span
              className="laptop:text-base mobile:text-sm"
              key={`${ind} span`}
            >
              {(weather.main.temp - 273).toFixed(2)} <sup>o</sup>C
            </span>
          </section>
        ))}
      </div>
    </div>
  );
};
export default Weather;
