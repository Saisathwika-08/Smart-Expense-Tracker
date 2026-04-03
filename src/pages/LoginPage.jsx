import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: 12, padding: "0.85rem 1rem", color: "#F5F4F0",
    fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", outline: "none",
    boxSizing: "border-box", transition: "border-color 0.2s",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#050508", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", color: "#F5F4F0", padding: "2rem" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      <div style={{ width: "100%", maxWidth: 400, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 28, padding: "2.5rem" }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.3rem", background: "linear-gradient(135deg, #7B5CF5, #3B8BEB)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "0.25rem" }}>ExpenseAI</div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.6rem", letterSpacing: "-0.03em", marginBottom: "0.4rem", marginTop: "1.5rem" }}>Welcome back</h1>
        <p style={{ fontSize: "0.85rem", color: "rgba(245,244,240,0.35)", fontWeight: 300, marginBottom: "2rem" }}>Sign in to your account</p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle}
            onFocus={e => e.target.style.borderColor = "rgba(123,92,245,0.5)"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.09)"} required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle}
            onFocus={e => e.target.style.borderColor = "rgba(123,92,245,0.5)"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.09)"} required />
          <button type="submit" disabled={loading} style={{ padding: "0.9rem", borderRadius: 12, border: "none", background: "linear-gradient(135deg, #7B5CF5, #3B8BEB)", color: "white", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", fontWeight: 500, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1, marginTop: "0.25rem" }}>
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: "0.82rem", color: "rgba(245,244,240,0.3)", marginTop: "1.5rem", fontWeight: 300 }}>
          No account?{" "}
          <Link to="/signup" style={{ color: "rgba(155,124,247,0.85)", textDecoration: "none" }}>Sign up free</Link>
        </p>
      </div>
    </div>
  );
}