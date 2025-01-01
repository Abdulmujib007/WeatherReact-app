import { useState } from "react";
import { useQuery,useQueryClient } from "@tanstack/react-query";
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
      <input
        className="h-8 w-96 pl-6 rounded-2xl outline-none  "
        placeholder="Enter a city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
    </form>
  );
};
export default Filter;
