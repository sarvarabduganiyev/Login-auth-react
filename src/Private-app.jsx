import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function Private() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}

export default Private;
