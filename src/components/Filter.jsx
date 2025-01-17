import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAll } from "../requests";
const Filter = () => {
  const queryClient = useQueryClient();
  const [city, setCity] = useState("");

  const { refetch } = useQuery({
    queryKey: ["newWeatherData"],
    queryFn: () => getAll(city),
    enabled: false,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    const { data } = await refetch();
    queryClient.setQueryData(["weatherData"], data);
    setCity("");
  };
  return (
    <form onSubmit={submitHandler}>
      <main className="border-b-2 border-b-white w-fit">
        <input
          className="h-8 w-80 pl-2  outline-none bg-transparent placeholder-white  text-white  "
          placeholder="Search location"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </main>
    </form>
  );
};
export default Filter;
