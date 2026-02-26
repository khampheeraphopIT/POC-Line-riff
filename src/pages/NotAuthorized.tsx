import { ensureLoggedIn } from "../services/liffService";

interface NotAuthorizedProps {
  error?: string;
}

export default function NotAuthorized({ error }: NotAuthorizedProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "green",
        padding: "1rem",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "2.5rem 2rem",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
        }}
      >
        <h1
          style={{ color: "#e53935", margin: "0 0 1rem", fontSize: "1.5rem" }}
        >
          ไม่สามารถเข้าใช้งานได้
        </h1>
        <p style={{ color: "#666", margin: "0 0 1rem", fontSize: "0.95rem" }}>
          กรุณาเข้าสู่ระบบผ่าน LINE เพื่อใช้งาน
        </p>
        {error && (
          <p
            style={{
              color: "#999",
              fontSize: "0.8rem",
              wordBreak: "break-all",
            }}
          >
            {error}
          </p>
        )}
        <button
          onClick={() => ensureLoggedIn()}
          style={{
            marginTop: "1rem",
            padding: "0.75rem 2rem",
            background: "#06c755",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          เข้าสู่ระบบด้วย LINE
        </button>
      </div>
    </div>
  );
}
