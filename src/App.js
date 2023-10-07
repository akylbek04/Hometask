
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="text-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character/:id" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
