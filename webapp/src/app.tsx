import { Flowbite } from "flowbite-react";
import theme from "./flowbite-theme";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages";

const App = () => {
  return (
    <Flowbite theme={{ theme, mode: "dark" }}>
      <HomePage />
      <Toaster />
    </Flowbite>
  );
};

export default App;
