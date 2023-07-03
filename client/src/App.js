import React from 'react';
import AppTopBar from './components/AppBar';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './scenes/Home';
import Login from './scenes/Login';
import Register from './scenes/Register';
import "./index.css"
import DashBoard from './scenes/Dashboard';
import PrivateRoute from './config/routes';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <AppTopBar></AppTopBar>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute isAuthenticated={true} ><DashBoard /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/" replace />}></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
