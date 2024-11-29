import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Home } from './pages/Home';
import About from './pages/About'
import {ProtectedRhRoute,ProtectedRoute,ProtectAuthRoute, isLogin, isAdmin} from './utils/PrivateRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { DashBord } from './pages/DashBord';
import { Header } from './components/header/Header';
import { NotFound } from './components/NotFound';
import { useEffect, useState } from 'react';
import { DashbordEmployee } from './pages/DashbordEmployee';
import io from 'socket.io-client';
import { WorkingHourPage } from './pages/WorkingHourPage';

function App() {

  return (
    <div className="App ">
      
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/login" element={<ProtectAuthRoute><Login /></ProtectAuthRoute>} />
          <Route path="/register" element={<ProtectAuthRoute><Register /></ProtectAuthRoute>} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="/employee-dashbord/:id" element={<ProtectedRoute><DashbordEmployee /></ProtectedRoute>} />
          <Route path="/rh-dashbord" element={<ProtectedRhRoute><DashBord /></ProtectedRhRoute>} />
          <Route path="/working-hours" element={<ProtectedRhRoute><WorkingHourPage /></ProtectedRhRoute>} />

          {/* <Route path="/employee-dashbord" element={<ProtectedRoute><DashbordEmployee /></ProtectedRoute>} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
             
      </BrowserRouter>
    </div>
  );
}

export default App;
