import BudgetAlert from "../components/BudgetAlert";
import CategoryChart from "../components/CategoryChart";
import MonthlyChart from "../components/MonthlyChart";
import { useExpenseContext } from "../context/ExpenseContext";

const card = (children, extra = {}) => ({
  background: "rgba(255,255,255,0.025)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 20,
  padding: "1.5rem",
  ...extra,
});

export default function Dashboard() {
  const { expenses, budgets, spentByCategory } = useExpenseContext();

  const totalSpent = expenses.reduce((s, e) => s + e.amount, 0);
  const totalBudget = Object.values(budgets).reduce((s, v) => s + v, 0);
  const thisMonth = new Date().toISOString().slice(0, 7);
  const monthlySpent = expenses.filter(e => e.date?.startsWith(thisMonth)).reduce((s, e) => s + e.amount, 0);

  return (
    <div style={{ minHeight: "100vh", background: "#050508", fontFamily: "'DM Sans', sans-serif", color: "#F5F4F0", padding: "2rem 5vw" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.75rem", letterSpacing: "-0.03em", marginBottom: "0.25rem" }}>Dashboard</h1>
      <p style={{ fontSize: "0.85rem", color: "rgba(245,244,240,0.35)", fontWeight: 300, marginBottom: "2rem" }}>Your spending at a glance</p>

      {/* Budget alerts */}
      <BudgetAlert />

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        {[
          ["Total Spent", `₹${totalSpent.toLocaleString()}`, "#7B5CF5"],
          ["This Month", `₹${monthlySpent.toLocaleString()}`, "#3B8BEB"],
          ["Total Budget", totalBudget ? `₹${totalBudget.toLocaleString()}` : "Not set", "#5DCAA5"],
          ["Expenses", expenses.length, "#F5A623"],
        ].map(([label, value, color]) => (
          <div key={label} style={card()}>
            <div style={{ fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(245,244,240,0.35)", marginBottom: "0.5rem" }}>{label}</div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.75rem", letterSpacing: "-0.03em", color }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
        <div style={card()}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem", marginBottom: "1.25rem" }}>By Category</div>
          <CategoryChart />
        </div>
        <div style={card()}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem", marginBottom: "1.25rem" }}>Monthly Trend</div>
          <MonthlyChart />
        </div>
      </div>
    </div>
  );
}