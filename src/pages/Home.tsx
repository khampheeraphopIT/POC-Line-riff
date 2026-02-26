import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProfile,
  isLoggedIn,
  logout,
  type LiffProfile,
} from "../services/liffService";

function Home() {
  const [code, setCode] = useState("");
  const [profile, setProfile] = useState<LiffProfile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      getProfile().then(setProfile).catch(console.error);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    navigate(`/detail?code=${encodeURIComponent(code.trim())}`);
  };

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
          borderRadius: 16,
          padding: "2.5rem 2rem",
          width: "100%",
          maxWidth: 400,
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          textAlign: "center",
        }}
      >
        {profile && (
          <div style={{ marginBottom: "1.5rem" }}>
            {profile.pictureUrl && (
              <img
                src={profile.pictureUrl}
                alt="profile"
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "0.5rem",
                }}
              />
            )}
            <p style={{ margin: 0, fontWeight: 600, color: "#333" }}>
              {profile.displayName}
            </p>
          </div>
        )}

        <h1
          style={{
            margin: "0 0 0.25rem",
            fontSize: "1.75rem",
            color: "#06c755",
            fontWeight: 700,
          }}
        >
          LINE LIFF
        </h1>
        <p style={{ color: "#888", margin: "0 0 1.5rem", fontSize: "0.95rem" }}>
          กรุณากรอกรหัสของคุณ
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="กรอก Code ที่นี่..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            autoFocus
            style={{
              width: "100%",
              padding: "0.85rem 1rem",
              border: "2px solid #e0e0e0",
              borderRadius: 10,
              fontSize: "1rem",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <button
            type="submit"
            disabled={!code.trim()}
            style={{
              width: "100%",
              marginTop: "1rem",
              padding: "0.85rem",
              background: "#06c755",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontSize: "1rem",
              fontWeight: 600,
              cursor: code.trim() ? "pointer" : "not-allowed",
              opacity: code.trim() ? 1 : 0.5,
            }}
          >
            Submit
          </button>
        </form>

        {isLoggedIn() && (
          <button
            onClick={logout}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              background: "transparent",
              color: "#999",
              border: "1px solid #ddd",
              borderRadius: 8,
              fontSize: "0.85rem",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
