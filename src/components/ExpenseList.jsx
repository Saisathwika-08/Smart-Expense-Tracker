import { useState } from "react";
import { useExpenseContext } from "../context/ExpenseContext";
import ExpenseForm, { CATEGORY_COLORS } from "./ExpenseForm";

export default function ExpenseList() {
  const { expenses, deleteExpense } = useExpenseContext();
  const [editing, setEditing] = useState(null);

  if (expenses.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "3rem", color: "rgba(245,244,240,0.3)", fontSize: "0.875rem", fontWeight: 300 }}>
        No expenses yet. Add your first one above.
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
      {expenses.map(exp => (
        <div key={exp.id} style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 16,
          padding: "1rem 1.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          transition: "border-color 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(123,92,245,0.25)"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
        >
          {/* Left */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: 1, minWidth: 0 }}>
            <div style={{
              width: 10, height: 10, borderRadius: "50%", flexShrink: 0,
              background: CATEGORY_COLORS[exp.category] || "rgba(245,244,240,0.3)",
            }} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", fontWeight: 500, color: "#F5F4F0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {exp.note || exp.category}
              </div>
              <div style={{ fontSize: "0.72rem", color: "rgba(245,244,240,0.35)", fontWeight: 300, marginTop: "0.1rem" }}>
                {exp.category} · {exp.date}
              </div>
            </div>
          </div>

          {/* Amount */}
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#F5F4F0", flexShrink: 0 }}>
            ₹{exp.amount.toLocaleString()}
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "0.4rem", flexShrink: 0 }}>
            <button onClick={() => setEditing(exp)} style={{ background: "rgba(123,92,245,0.1)", border: "1px solid rgba(123,92,245,0.2)", borderRadius: 8, padding: "0.3rem 0.65rem", color: "#9B7CF7", fontSize: "0.75rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(123,92,245,0.2)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(123,92,245,0.1)"}>
              Edit
            </button>
            <button onClick={() => deleteExpense(exp.id)} style={{ background: "rgba(226,75,74,0.1)", border: "1px solid rgba(226,75,74,0.2)", borderRadius: 8, padding: "0.3rem 0.65rem", color: "#E24B4A", fontSize: "0.75rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(226,75,74,0.2)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(226,75,74,0.1)"}>
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Edit modal */}
      {editing && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: "1rem" }}
          onClick={() => setEditing(null)}>
          <div style={{ background: "#0F0F13", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "2rem", width: "100%", maxWidth: 420 }}
            onClick={e => e.stopPropagation()}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.1rem", marginBottom: "1.5rem", color: "#F5F4F0" }}>Edit Expense</h2>
            <ExpenseForm existing={editing} onClose={() => setEditing(null)} />
          </div>
        </div>
      )}
    </div>
  );
}