import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/home/home";
import { AssinaturasPage } from "../pages/signatures/signatures";
import { GastosPage } from "../pages/expenses/index";
import { InvestimentosPage } from "../pages/investments/index";

export function RoutesPage() {
    return (
        <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/assinaturas" element={<AssinaturasPage />} />
            <Route path="/gastos" element={<GastosPage />} />
            <Route path="/investimentos" element={<InvestimentosPage />} />
        </Routes>
    )
}