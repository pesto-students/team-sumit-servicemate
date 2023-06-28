import React from 'react';
import AppTopBar from './components/AppBar';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './scenes/Home';
import Login from './scenes/Login';
import Register from './scenes/Register';
import "./index.css"

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
            {/* <PrivateRoute path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" replace />}></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
