import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const {  logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav style={{
      background: "#0F0F13",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      padding: "1rem 5vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <Link to="/" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.1rem", background: "linear-gradient(135deg, #7B5CF5, #3B8BEB)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textDecoration: "none" }}>
        ExpenseAI
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        {[["Dashboard", "/"], ["Expenses", "/expenses"], ["Budgets", "/budgets"]].map(([label, path]) => (
          <Link key={label} to={path} style={{ fontSize: "0.875rem", color: "rgba(245,244,240,0.5)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#F5F4F0"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(245,244,240,0.5)"}>
            {label}
          </Link>
        ))}

        <button onClick={handleLogout} style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: 100,
          padding: "0.4rem 1rem",
          color: "rgba(245,244,240,0.5)",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.8rem",
          cursor: "pointer",
          transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(226,75,74,0.4)"; e.currentTarget.style.color = "#E24B4A"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; e.currentTarget.style.color = "rgba(245,244,240,0.5)"; }}>
          Sign out
        </button>
      </div>
    </nav>
  );
}