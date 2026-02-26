import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import NotAuthorized from "./pages/NotAuthorized.tsx";
import {
  initializeLiff,
  ensureLoggedIn,
  isLoggedIn,
} from "./services/liffService";

const root = document.getElementById("root")!;

initializeLiff()
  .then(() => {
    // init สำเร็จ → ตรวจ login → ถ้ายังไม่ login จะ redirect ไป LINE Login
    if (!isLoggedIn()) {
      ensureLoggedIn();
      return;
    }

    createRoot(root).render(
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>,
    );
  })
  .catch((err) => {
    console.error("LIFF init failed:", err);

    createRoot(root).render(
      <StrictMode>
        <NotAuthorized error={err?.message || String(err)} />
      </StrictMode>,
    );
  });
