import { useState } from "react";
import { useExpenseContext } from "../context/ExpenseContext";

export const CATEGORIES = ["Food", "Transport", "Bills", "Shopping", "Health", "Entertainment", "Travel", "Other"];
export const CATEGORY_COLORS = {
  Food: "#7B5CF5", Transport: "#3B8BEB", Bills: "#F5A623",
  Shopping: "#E24B4A", Health: "#5DCAA5", Entertainment: "#9B7CF7",
  Travel: "#5BA8F5", Other: "rgba(245,244,240,0.3)",
};

export default function ExpenseForm({ onClose, existing }) {
  const { addExpense, editExpense } = useExpenseContext();
  const [form, setForm] = useState({
    amount: existing?.amount || "",
    category: existing?.category || "Food",
    note: existing?.note || "",
    date: existing?.date || new Date().toISOString().split("T")[0],
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.amount || isNaN(form.amount) || form.amount <= 0) return alert("Enter a valid amount");
    setLoading(true);
    try {
      const data = { ...form, amount: parseFloat(form.amount) };
      if (existing) {
        await editExpense(existing.id, data);
      } else {
        await addExpense(data);
      }
      onClose?.();
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: 12,
    padding: "0.75rem 1rem",
    color: "#F5F4F0",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.875rem",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>

      {/* Amount */}
      <div>
        <label style={{ fontSize: "0.75rem", color: "rgba(245,244,240,0.4)", fontWeight: 400, display: "block", marginBottom: "0.35rem" }}>Amount (₹)</label>
        <input
          type="number"
          placeholder="0.00"
          value={form.amount}
          onChange={e => setForm({ ...form, amount: e.target.value })}
          style={inputStyle}
          onFocus={e => e.target.style.borderColor = "rgba(123,92,245,0.5)"}
          onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.09)"}
          required
        />
      </div>

      {/* Category */}
      <div>
        <label style={{ fontSize: "0.75rem", color: "rgba(245,244,240,0.4)", fontWeight: 400, display: "block", marginBottom: "0.35rem" }}>Category</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setForm({ ...form, category: cat })}
              style={{
                padding: "0.3rem 0.75rem",
                borderRadius: 100,
                border: `1px solid ${form.category === cat ? CATEGORY_COLORS[cat] : "rgba(255,255,255,0.09)"}`,
                background: form.category === cat ? `${CATEGORY_COLORS[cat]}20` : "rgba(255,255,255,0.03)",
                color: form.category === cat ? CATEGORY_COLORS[cat] : "rgba(245,244,240,0.4)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.78rem",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >{cat}</button>
          ))}
        </div>
      </div>

      {/* Note */}
      <div>
        <label style={{ fontSize: "0.75rem", color: "rgba(245,244,240,0.4)", fontWeight: 400, display: "block", marginBottom: "0.35rem" }}>Note (optional)</label>
        <input
          type="text"
          placeholder="e.g. Lunch with team"
          value={form.note}
          onChange={e => setForm({ ...form, note: e.target.value })}
          style={inputStyle}
          onFocus={e => e.target.style.borderColor = "rgba(123,92,245,0.5)"}
          onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.09)"}
        />
      </div>

      {/* Date */}
      <div>
        <label style={{ fontSize: "0.75rem", color: "rgba(245,244,240,0.4)", fontWeight: 400, display: "block", marginBottom: "0.35rem" }}>Date</label>
        <input
          type="date"
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
          style={{ ...inputStyle, colorScheme: "dark" }}
          onFocus={e => e.target.style.borderColor = "rgba(123,92,245,0.5)"}
          onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.09)"}
          required
        />
      </div>

      {/* Submit */}
      <button type="submit" disabled={loading} style={{
        marginTop: "0.25rem",
        padding: "0.85rem",
        borderRadius: 12,
        border: "none",
        background: "linear-gradient(135deg, #7B5CF5, #3B8BEB)",
        color: "white",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.9rem",
        fontWeight: 500,
        cursor: loading ? "not-allowed" : "pointer",
        opacity: loading ? 0.6 : 1,
        transition: "opacity 0.2s",
      }}>
        {loading ? "Saving…" : existing ? "Save Changes" : "Add Expense"}
      </button>
    </form>
  );
}