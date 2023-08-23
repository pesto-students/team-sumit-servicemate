import React from "react";
import AppTopBar from "./components/AppBar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import Home from "./scenes/Home";
import Login from "./scenes/Login";
import Register from "./scenes/Register";
import "./index.css";
import DashBoard from "./scenes/Dashboard";
import PrivateRoute from "./config/routes";
import BookAppointment from "./scenes/BookAppointment";
import Categories from "./scenes/Categories";
import Services from "./scenes/Services";
import AboutUs from "./scenes/AboutUs";
import VendorDetails from "./scenes/VendorDetails";
import VendorList from "./scenes/VendorList";
import DashBoard2 from "./scenes/Dashboard2";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <AppTopBar></AppTopBar>
        </header>
        <main>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Categories />} />
            <Route path="/services" element={<Services />} />
            <Route path="/vendor-list" element={<VendorList />} />
            <Route path="/vendor/details/:id" element={<VendorDetails />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute isAuthenticated={true}>
                  <DashBoard />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard2"
              element={
                <PrivateRoute isAuthenticated={true}>
                  <DashBoard2 />
                </PrivateRoute>
              }
            />
            <Route
              path="/book-appointment"
              element={
                <PrivateRoute isAuthenticated={true}>
                  <BookAppointment />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />}></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
