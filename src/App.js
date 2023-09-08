import React from "react";
// import AppTopBar from "./components/AppBar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import Home from "./scenes/Home";
import Login from "./scenes/Login";
import Register from "./scenes/Register";
import "./index.css";
import DashBoard from "./scenes/Dashboard";
import PrivateRoute from "./config/routes";
import BookAppointment from "./scenes/BookAppointment";
// import Categories from "./scenes/Categories";
import Services from "./scenes/Services";
import AboutUs from "./scenes/AboutUs";
import VendorDetails from "./scenes/VendorDetails";
import VendorList from "./scenes/VendorList";
//import Footer from "./components/footer/footer";
import DashBoard2 from "./scenes/Dashboard2";
import Header from "./components/Header/header";
import Home from "./scenes/Home";
import AdminDashboard from "./scenes/AdminDashboard";
import ContactUs from "./scenes/ContactUs";
import routes from "./config/routeConstants"

function App() {
  return (
    <BrowserRouter>

      <div className="App" >
        <header className="App-header">
          {/* <AppTopBar></AppTopBar> */}
          <Header></Header>
        </header>
        <main>
          <Routes>
            {/** <Route path="/" element={<Home />} /> */}
            <Route path={routes.HOME} element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/services/:category" element={<Services />} />
            <Route path="/vendor-list/:category" element={<VendorList />} />
            <Route path="/vendor/details/:email" element={<VendorDetails />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute >
                  <DashBoard />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard2/:tab?"
              element={
                <PrivateRoute >
                  <DashBoard2 />
                </PrivateRoute>
              }
            />
            <Route
              path="/book-appointment"
              element={
                <PrivateRoute >
                  <BookAppointment />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute >
                  <AdminDashboard />
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
