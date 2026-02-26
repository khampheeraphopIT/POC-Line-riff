import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { initializeLiff, ensureLoggedIn } from "./services/liffService";

const root = document.getElementById("root")!;

initializeLiff()
  .then(() => {
    // init สำเร็จ → ตรวจ login → ถ้ายังไม่ login จะ redirect ไป LINE Login
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
    console.error("LIFF init failed:", err);

    // แสดง error บนหน้าจอ
    root.innerHTML = `
      <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:green;padding:1rem;">
        <div style="background:#fff;border-radius:16px;padding:2.5rem 2rem;max-width:400px;width:100%;text-align:center;box-shadow:0 8px 32px rgba(0,0,0,0.15);">
          <h1 style="color:#e53935;margin:0 0 1rem;font-size:1.5rem;">LIFF Error</h1>
          <p style="color:#666;margin:0 0 1rem;font-size:0.95rem;">ไม่สามารถเชื่อมต่อ LINE LIFF ได้</p>
          <p style="color:#999;font-size:0.8rem;word-break:break-all;">${err?.message || err}</p>
          <button onclick="location.reload()" style="margin-top:1rem;padding:0.75rem 2rem;background:#06c755;color:#fff;border:none;border-radius:10px;font-size:1rem;cursor:pointer;">
            ลองใหม่
          </button>
        </div>
      </div>
    `;
  });
