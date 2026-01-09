import { useState } from "react";
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
