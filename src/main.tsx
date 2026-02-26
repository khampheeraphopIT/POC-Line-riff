import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { initializeLiff, ensureLoggedIn } from "./services/liffService";

const root = document.getElementById("root")!;

initializeLiff()
  .then(() => {
    // ถ้า init สำเร็จ → ตรวจ login
    ensureLoggedIn();

    createRoot(root).render(
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>,
    );
  })
  .catch((err) => {
    // ถ้า init ล้มเหลว (เช่น เปิดนอก LINE หรือ LIFF ID ผิด)
    console.error("LIFF init failed:", err);

    // fallback: ยังให้ใช้แอปได้ (สำหรับ dev)
    createRoot(root).render(
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>,
    );
  });
