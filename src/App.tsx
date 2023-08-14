import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import Home from "./pages/Home/Home";
import Appointment from "./pages/Appointment/Appointment";
import Patient from "./pages/Patients/Patient";
import Doctors from "./pages/doctors/Doctors";
import Inventory from "./pages/inventory/Inventory";
import Register from "./pages/register/Register";
function App() {
  return (
    <main>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Home />} />
          <Route path="/Appointments" element={<Appointment />} />
          <Route path="/Patients" element={<Patient />} />
          <Route path="/Doctors" element={<Doctors />} />
          <Route path="/Inventory" element={<Inventory />} />
        </Routes>
    </main>
  );
}

export default App;
