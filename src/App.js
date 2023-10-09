import React from 'react';
// import AppTopBar from "./components/AppBar";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Home from "./scenes/Home";
import Login from './scenes/Login';
import Register from './scenes/Register';
import './index.css';
import DashBoard from './scenes/Dashboard';
import PrivateRoute from './config/privateRoute';
import BookAppointment from './scenes/BookAppointment';
// import Categories from "./scenes/Categories";
import Services from './scenes/Services';
import AboutUs from './scenes/AboutUs';
import VendorDetails from './scenes/VendorDetails';
import VendorList from './scenes/VendorList';
//import Footer from "./components/footer/footer";
import DashBoard2 from './scenes/Dashboard2';
import Header from './components/Header/header';
import Home from './scenes/Home';
import AdminDashboard from './scenes/AdminDashboard';
import ContactUs from './scenes/ContactUs';
import routes from './config/routeConstants';
import SFooter from './components/SFooter';
import ForgotPassword from './scenes/ForgotPassword';
import PageNotFound from './components/PageNotFound';
// import ErrorPage from "./components/ErrorPage";
import { ErrorBoundary } from 'react-error-boundary';

function App() {
  return (
    <BrowserRouter>
      <div className="App" >
        <header className="App-header">
          <Header></Header>
        </header>
        <ErrorBoundary fallback={<PageNotFound message="Something went wrong, please try again after sometime." description=' '></PageNotFound>}>
          <main className='min-h-[60vh]'>
            <Routes>
              {/** <Route path="/" element={<Home />} /> */}
              <Route path={routes.LOGIN} element={<Login />} />
              <Route path={routes.REGISTER} element={<Register />} />
              <Route path={routes.HOME} element={<Home />} />
              <Route path={routes.SERVICES_BY_CATEGORY} element={<Services />} />
              <Route path={routes.SERVICES} element={<Services />} />
              <Route path={routes.VENDOR_LIST} element={<VendorList />} />
              <Route path={routes.VENDOR_DETAILS} element={<VendorDetails />} />
              <Route path={routes.ABOUT} element={<AboutUs />} />
              <Route path={routes.CONTACT} element={<ContactUs />} />
              <Route path={routes.FORGOTPASSWORD} element={<ForgotPassword />} />

              <Route
                path={routes.DASHBOARD}
                element={
                  <PrivateRoute >
                    <DashBoard />
                  </PrivateRoute>
                }
              />
              <Route
                path={routes.DASHBOARD2}
                element={
                  <PrivateRoute >
                    <DashBoard2 />
                  </PrivateRoute>
                }
              />
              <Route
                path={routes.BOOK_APPOINTMENT}
                element={
                  <PrivateRoute >
                    <BookAppointment />
                  </PrivateRoute>
                }
              />
              <Route
                path={routes.ADMIN}
                element={
                  <PrivateRoute >
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<PageNotFound />}></Route>
            </Routes>
          </main>
        </ErrorBoundary>
        <footer>
          <SFooter></SFooter>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
