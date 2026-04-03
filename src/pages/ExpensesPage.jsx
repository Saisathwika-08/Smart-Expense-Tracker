import { useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

export default function ExpensesPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#050508", fontFamily: "'DM Sans', sans-serif", color: "#F5F4F0", padding: "2rem 5vw" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.75rem", letterSpacing: "-0.03em", marginBottom: "0.25rem" }}>Expenses</h1>
          <p style={{ fontSize: "0.85rem", color: "rgba(245,244,240,0.35)", fontWeight: 300 }}>Track every rupee you spend</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: "0.7rem 1.5rem",
            borderRadius: 100,
            border: "none",
            background: "linear-gradient(135deg, #7B5CF5, #3B8BEB)",
            color: "white",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.875rem",
            fontWeight: 500,
            cursor: "pointer",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          {showForm ? "Cancel" : "+ Add Expense"}
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "1.75rem", marginBottom: "1.5rem" }}>
          <ExpenseForm onClose={() => setShowForm(false)} />
        </div>
      )}

      {/* List */}
      <ExpenseList />
    </div>
  );
}