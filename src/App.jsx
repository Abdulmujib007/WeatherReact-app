import Filter from "./components/Filter";
import Weather from "./components/Weather";

const App = () => {

return(
  <div className="bg-[url('/img/background.jpg')] bg-cover bg-center h-screen w-screen flex flex-col items-center pt-10">
    <Filter/>
    <Weather/>

  </div>
)
};

export default App;
