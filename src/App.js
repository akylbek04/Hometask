
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import { useGlobalContext } from "./context/context";

function App() {
  const {isDark} = useGlobalContext()
  return (
    <div className={`text-center ${isDark && "App"}`}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character/:id" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
