import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/login";
import { Fragment } from "react";
import { HomePage } from "../pages/home/home";
import { AssinaturasPage } from "../pages/signatures/signatures";
import { GastosPage } from "../pages/expenses/index";
import { InvestimentosPage } from "../pages/investments/index";

const Private = ({ Item }) => {
    const signed = false;

    return signed > 0 ? <Item /> : <LoginPage />
}

export function RoutesPage() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<Private Item={HomePage} />} />
            <Route path="/assinaturas" element={<Private Item={AssinaturasPage} />} />
            <Route path="/gastos" element={<Private Item={GastosPage} />} />
            <Route path="/investimentos" element={<Private Item={InvestimentosPage} />} />
            <Route path="*" element={<LoginPage />} />
        </Routes>
    );
};