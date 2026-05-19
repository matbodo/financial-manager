import { Route, Routes, Navigate } from "react-router-dom";
import { Fragment } from "react";
import { LoginPage } from "../auth/login";
import { RegisterPage } from "../auth/register";
import { HomePage } from "../pages/home/home";
import { AssinaturasPage } from "../pages/signatures/signatures";
import { GastosPage } from "../pages/expenses/index";
import { InvestmentsPage } from "../pages/investments/index";

const Private = ({ Item }) => {
    const signed = localStorage.getItem('user') || sessionStorage.getItem('user');

    return signed ? <Item /> : <Navigate to="/login" />
}

export function RoutesPage() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<Private Item={HomePage} />} />
            <Route path="/assinaturas" element={<Private Item={AssinaturasPage} />} />
            <Route path="/gastos" element={<Private Item={GastosPage} />} />
            <Route path="/investimentos" element={<Private Item={InvestmentsPage} />} />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
};
