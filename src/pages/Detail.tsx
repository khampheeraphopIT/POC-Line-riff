import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  getProfile,
  isLoggedIn,
  type LiffProfile,
} from "../services/liffService";

function Detail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get("code") || "";
  const [profile, setProfile] = useState<LiffProfile | null>(null);

  useEffect(() => {
    if (isLoggedIn()) {
      getProfile().then(setProfile).catch(console.error);
    }
  }, []);

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
          <div
            style={{
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            {profile.pictureUrl && (
              <img
                src={profile.pictureUrl}
                alt="profile"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            )}
            <span
              style={{ fontWeight: 600, color: "#333", fontSize: "0.9rem" }}
            >
              {profile.displayName}
            </span>
          </div>
        )}

        <h1
          style={{
            margin: "0 0 1.5rem",
            fontSize: "1.75rem",
            color: "#06c755",
            fontWeight: 700,
          }}
        >
          รายละเอียด
        </h1>
        <div
          style={{
            background: "#f5f5f5",
            borderRadius: 10,
            padding: "1.25rem",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <span style={{ color: "#888", fontSize: "0.95rem" }}>Code:</span>
          <span
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "#333",
              wordBreak: "break-all",
            }}
          >
            {code}
          </span>
        </div>
        <button
          onClick={() => navigate("/")}
          style={{
            width: "100%",
            padding: "0.85rem",
            background: "transparent",
            color: "#06c755",
            border: "2px solid #06c755",
            borderRadius: 10,
            fontSize: "1rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          กลับหน้าหลัก
        </button>
      </div>
    </div>
  );
}

export default Detail;
