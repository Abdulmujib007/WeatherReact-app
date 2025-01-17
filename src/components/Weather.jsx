import { useQuery } from "@tanstack/react-query";
import { getAll } from "../requests";
import Filter from "./Filter";
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
    return (
      <div className="pt-6 text-white text-xl font-bold">
        Please check your Network connection
      </div>
    );
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
      const dayy = newDay < 10 ? "0" + newDay : newDay;
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
  // console.log(foreCast);

  //  (
  //   <div
  //     className="relative  flex flex-col w-1/2 h-3/5 mt-12 justify-between rounded-3xl  shadow-lg  "
  //     style={style}
  //   >
  //     <section className="relative mt-9 flex justify-center  items-center pl-4 pr-4 laptop:gap-14 mobile:gap-0 tablet:flex-row laptop:flex-row mobile:flex-col-reverse">
  //       <img
  //         className="laptop:w-max mobile:w-32"
  //         src={`https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@4x.png`}
  //         alt="weather-image"
  //       />
  //       <div className="flex flex-col  justify-center mobile:text-base laptop:text-xl gap-2 mobile:mt-10 laptop:mt-0 ">
  //         <span>Today</span>
  //         <span className="laptop:text-4xl mobile:text-xl">
  //           {weatherData.city.name}
  //         </span>
  //         <span className="laptop:text-base mobile:text-sm">
  //           Temperature {(weatherData.list[0].main.temp - 273).toFixed(2)}{" "}
  //           <sup>o</sup>C{" "}
  //         </span>
  //         <span className="laptop:text-base mobile:text-sm">
  //           {weatherData.list[0].weather[0].description}
  //         </span>
  //       </div>
  //     </section>
  //     <div className=" w-full absolute bottom-[-5.5rem]   flex justify-center laptop:gap-6 mobile:gap-4 tablet:gap-16 text-center laptop:px-3 mobile:px-1 ">
  //       {foreCast.map((weather, ind) => (
  //         <section
  //           key={`ind${ind}`}
  //           className={`${
  //             ind > 1 ? "mobile:hidden laptop:block" : ""
  //           }  rounded-3xl shadow-lg shadow-gray-500  mobile:w-fit laptop:w-36 p-1`}
  //         >
  //           <span
  //             className="laptop:text-base mobile:text-sm"
  //             key={`span${ind}`}
  //           >
  //             {dayInword[ind + 1]}
  //           </span>
  //           <img
  //             className={`laptop:w-full mobile:w-20`}
  //             key={`img${ind}`}
  //             src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
  //             alt=""
  //           />
  //           <span
  //             className="laptop:text-base mobile:text-sm"
  //             key={`${ind} span`}
  //           >
  //             {(weather.main.temp - 273).toFixed(2)} <sup>o</sup>C
  //           </span>
  //         </section>
  //       ))}
  //     </div>
  //   </div>
  // );
  return (
    <main className="flex laptop:flex-row 
   mobile:flex-col laptop:justify-between mobile:items-center mobile:justify-start text-white h-full mobile:pb-5 laptop:pb-0 ">

      <section className="flex flex-col laptop:justify-between tablet:justify-start mobile:gap-40  laptop:gap-0 mobile:h-fit laptop:h-screen pt-9 pb-20">
        <Filter />
        <div className="flex flex-col">
          <span className="text-9xl font-medium">
            {(weatherData.list[0].main.temp - 273).toFixed(0)}
            <sup>o</sup>C
          </span>
          <span className="mt-10 text-4xl">
            {weatherData.city.name},{weatherData.city.country}
          </span>
          <div className="flex items-center text-xl gap-40">
            <span> {weatherData.list[0].weather[0].description}</span>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}.png`}
              alt="weather-svg"
            />
          </div>
        </div>
      </section>
      <section className="h-fit w-fit  px-6 flex tablet:flex-row mobile:flex-col gap-5  glassPrism ">
        <div className="h-full pr-5 tablet:border-r-[1px] mobile:border-r-0 border-r-white pt-9 pb-10 ">
          {/* <main> */}
          <p>Weather Details</p>
          <p className="mt-[0.8rem] ">Today:</p>
          <div className="mt-[1.9rem] pb-10 border-b-[1px] border-b-white flex flex-col gap-8">
            <p className="flex gap-40">
              <span className="text-whitly">Location</span>
              <span>
                {" "}
                {weatherData.city.name},{weatherData.city.country}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="text-whitly">Description</span>
              <span>{weatherData.list[0].weather[0].description}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-whitly">Humidity</span>
              <span>{weatherData.list[0].main.humidity}%</span>
            </p>
            <p className="flex justify-between">
              <span className="text-whitly">Wind</span>
              <span>{weatherData.list[0].wind.speed}m/s</span>
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-8">
            <p className="flex justify-between">
              <span className="text-whitly">Max</span>
              <span>
                {" "}
                {(weatherData.list[0].main.temp_max - 273).toFixed(0)}
                <sup>o</sup>C
              </span>
            </p>
            <p className="flex justify-between">
              <span className="text-whitly">Min</span>
              <span>
                {" "}
                {(weatherData.list[0].main.temp_min - 273).toFixed(0)}
                <sup>o</sup>C
              </span>
            </p>
            <p className="flex justify-between">
              <span className="text-whitly">Feels</span>
              <span>
                {" "}
                {(weatherData.list[0].main.feels_like - 273).toFixed(0)}
                <sup>o</sup>C
              </span>
            </p>
            <p className="flex justify-between">
              <span className="text-whitly">Pressure</span>
              <span>{weatherData.list[0].main.pressure}hpa</span>
            </p>
          </div>
        </div>
        {/* <div className="">
         */}
        <div className=" tablet:pt-9 mobile:pt-0 mt-0 ">
          <span>Weather overview</span>
          <div className=" flex  flex-col gap-3 ">
            {foreCast.map((weather, ind) => (
              <main
                className={`pb-1 ${ind === 3 ? 'border-b-0' : 'border-b-[1px]'}   border-b-white flex flex-col gap-3`}
                key={`div${ind}`}
              >
                <div className="flex  justify-between gap-40 items-center mb-1 ">
                  <span className="text-whitly">
                    {ind === 0 ? "Tomorrow:" : `${dayInword[ind + 1]}:`}
                  </span>
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                    alt="image"
                  />
                </div>
                <p className="flex justify-between">
                  <span className="text-whitly">Temperature</span>
                  <span>
                    {" "}
                    {(weather.main.temp - 273).toFixed(0)} <sup>o</sup>C
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="text-whitly">Description</span>
                  <span>{weather.weather[0].description}</span>
                </p>
              </main>
            ))}
          </div>

          {/* <div className="mt-5"></div> */}
        </div>
      </section>
    </main>
  );
};
export default Weather;
