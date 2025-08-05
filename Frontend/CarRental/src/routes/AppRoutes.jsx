import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../assets/components/auth/Login";
import AdminLogin from "../assets/components/auth/AdminLogin";
import AdminRegister from "../assets/components/auth/AdminRegister";
import Register from "../assets/components/auth/Register";
import LoginChoice from "../pages/LoginChoice";
import AdminPage from "../pages/AdminPage";
import CustomerPage from "../pages/CustomerPage";
import NotFound from "../pages/NotFound";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login-choice" element={<LoginChoice />} />
    <Route path="/login" element={<Login />} />
    <Route path="/admin-login" element={<AdminLogin />} />
    <Route path="/admin-register" element={<AdminRegister />} />
    <Route path="/register" element={<Register />} />
    <Route path="/admin/*" element={<AdminPage />} />
    <Route path="/customer/*" element={<CustomerPage />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;