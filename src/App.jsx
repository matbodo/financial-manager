import { useState } from "react";
import viteLogo from "/vite.svg";
// import "./App.css";
import { HomePage } from "./pages/home/home";
import { RoutesPage } from "./routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <RoutesPage />
    </BrowserRouter>
  );
}

export default App;
