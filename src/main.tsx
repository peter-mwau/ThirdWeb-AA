import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThirdwebProvider } from "thirdweb/react";
import { ContractProvider } from "./providers/provider.tsx";
import { PeopleProvider } from "./contexts/usePeople.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThirdwebProvider>
      <BrowserRouter>
        <ContractProvider>
          <PeopleProvider>
            <App />
          </PeopleProvider>
        </ContractProvider>
      </BrowserRouter>
    </ThirdwebProvider>
  </StrictMode>
);
