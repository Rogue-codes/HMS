import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import Home from "./pages/Home/Home";
import Patient from "./pages/Patients/Patient";
import Doctors from "./pages/doctors/Doctors";
import Inventory from "./pages/inventory/Inventory";
import Register from "./pages/register/Register";
import PrivateRoute from "./routes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <main>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        {/* <Route
          path="/Appointments"
          element={
            <PrivateRoute>
              <Appointment />
            </PrivateRoute>
          }
        /> */}
        <Route
          path="/Patients"
          element={
            <PrivateRoute>
              <Patient />
            </PrivateRoute>
          }
        />
        <Route
          path="/Doctors"
          element={
            <PrivateRoute>
              <Doctors />
            </PrivateRoute>
          }
        />
        <Route
          path="/Inventory"
          element={
            <PrivateRoute>
              <Inventory />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </main>
  );
}

export default App;
