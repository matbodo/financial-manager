import { Fragment } from "react";
import { HomePage } from "./pages/home/home";
import { RoutesPage } from "./routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <RoutesPage />
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
