import { Suspense } from "react";
import "./App.css";
import AppRoutes from "./routes";
import Backdrop from "./components/Backdrop";
import { StyledEngineProvider } from "@mui/material";

function App() {
  return (
    <Suspense fallback={<Backdrop open={true} />}>
      <StyledEngineProvider injectFirst>
        <AppRoutes />
      </StyledEngineProvider>
    </Suspense>
  );
}

export default App;
