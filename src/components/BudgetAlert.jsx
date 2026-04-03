import { useExpenseContext } from "../context/ExpenseContext";
import { CATEGORY_COLORS } from "./ExpenseForm";

export default function BudgetAlert() {
  const { exceededBudgets, spentByCategory, budgets } = useExpenseContext();

  if (exceededBudgets.length === 0) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem" }}>
      {exceededBudgets.map(([category, limit]) => {
        const spent = spentByCategory[category] || 0;
        const over = spent - limit;
        return (
          <div key={category} style={{
            background: "rgba(226,75,74,0.08)",
            border: "1px solid rgba(226,75,74,0.25)",
            borderRadius: 14,
            padding: "0.85rem 1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: CATEGORY_COLORS[category], flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "#F5F4F0", fontFamily: "'DM Sans', sans-serif" }}>
                {category} budget exceeded
              </span>
              <span style={{ fontSize: "0.78rem", color: "rgba(226,75,74,0.8)", fontWeight: 300, marginLeft: "0.5rem" }}>
                ₹{over.toLocaleString()} over limit
              </span>
            </div>
            <div style={{ fontSize: "0.72rem", color: "rgba(245,244,240,0.35)", fontWeight: 300, flexShrink: 0 }}>
              ₹{spent.toLocaleString()} / ₹{limit.toLocaleString()}
            </div>
          </div>
        );
      })}
    </div>
  );
}