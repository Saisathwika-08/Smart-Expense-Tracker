import { useState } from "react";
import { CATEGORIES, CATEGORY_COLORS } from "../components/ExpenseForm";
import { useExpenseContext } from "../context/ExpenseContext";

export default function BudgetsPage() {
  const { budgets, setBudget, spentByCategory } = useExpenseContext();
  const [editing, setEditing] = useState({});

  const handleSet = async (category) => {
    const val = parseFloat(editing[category]);
    if (!val || val <= 0) return alert("Enter a valid amount");
    await setBudget(category, val);
    setEditing(prev => ({ ...prev, [category]: "" }));
  };

  return (
    <div style={{ minHeight: "100vh", background: "#050508", fontFamily: "'DM Sans', sans-serif", color: "#F5F4F0", padding: "2rem 5vw" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.75rem", letterSpacing: "-0.03em", marginBottom: "0.25rem" }}>Budgets</h1>
      <p style={{ fontSize: "0.85rem", color: "rgba(245,244,240,0.35)", fontWeight: 300, marginBottom: "2rem" }}>Set monthly limits per category</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
        {CATEGORIES.map(category => {
          const limit = budgets[category] || 0;
          const spent = spentByCategory[category] || 0;
          const percent = limit ? Math.min((spent / limit) * 100, 100) : 0;
          const isOver = spent > limit && limit > 0;
          const color = CATEGORY_COLORS[category];

          return (
            <div key={category} style={{
              background: "rgba(255,255,255,0.025)",
              border: `1px solid ${isOver ? "rgba(226,75,74,0.3)" : "rgba(255,255,255,0.07)"}`,
              borderRadius: 20,
              padding: "1.5rem",
              transition: "border-color 0.2s",
            }}>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: color }} />
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem" }}>{category}</span>
                {isOver && <span style={{ marginLeft: "auto", fontSize: "0.68rem", color: "#E24B4A", background: "rgba(226,75,74,0.1)", border: "1px solid rgba(226,75,74,0.2)", borderRadius: 100, padding: "0.15rem 0.5rem" }}>Over budget</span>}
              </div>

              {/* Progress bar */}
              {limit > 0 && (
                <div style={{ marginBottom: "1rem" }}>
                  <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 100, overflow: "hidden", marginBottom: "0.4rem" }}>
                    <div style={{
                      height: "100%", borderRadius: 100,
                      width: `${percent}%`,
                      background: isOver ? "#E24B4A" : `linear-gradient(90deg, ${color}, ${color}BB)`,
                      transition: "width 0.4s ease",
                    }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "rgba(245,244,240,0.35)" }}>
                    <span>₹{spent.toLocaleString()} spent</span>
                    <span>₹{limit.toLocaleString()} limit</span>
                  </div>
                </div>
              )}

              {/* Set budget input */}
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  type="number"
                  placeholder={limit ? `₹${limit.toLocaleString()}` : "Set limit…"}
                  value={editing[category] || ""}
                  onChange={e => setEditing(prev => ({ ...prev, [category]: e.target.value }))}
                  style={{
                    flex: 1,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: 10,
                    padding: "0.6rem 0.85rem",
                    color: "#F5F4F0",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.85rem",
                    outline: "none",
                  }}
                  onFocus={e => e.target.style.borderColor = `${color}80`}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.09)"}
                />
                <button
                  onClick={() => handleSet(category)}
                  style={{
                    padding: "0.6rem 1rem",
                    borderRadius: 10,
                    border: "none",
                    background: `${color}20`,
                    color: color,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "background 0.2s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = `${color}35`}
                  onMouseLeave={e => e.currentTarget.style.background = `${color}20`}
                >
                  {limit ? "Update" : "Set"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}