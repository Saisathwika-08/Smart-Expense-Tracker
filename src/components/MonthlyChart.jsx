import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useExpenseContext } from "../context/ExpenseContext";

export default function MonthlyChart() {
  const { expenses } = useExpenseContext();

  // Group by month
  const byMonth = expenses.reduce((acc, e) => {
    const month = e.date?.slice(0, 7); // "2024-03"
    if (!month) return acc;
    acc[month] = (acc[month] || 0) + e.amount;
    return acc;
  }, {});

  const data = Object.entries(byMonth)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6) // last 6 months
    .map(([month, total]) => ({
      month: new Date(month + "-01").toLocaleString("default", { month: "short", year: "2-digit" }),
      total,
    }));

  if (data.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", color: "rgba(245,244,240,0.3)", fontSize: "0.85rem" }}>
        No data yet
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} barSize={28}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: "rgba(245,244,240,0.35)", fontSize: 11, fontFamily: "'DM Sans', sans-serif" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "rgba(245,244,240,0.35)", fontSize: 11, fontFamily: "'DM Sans', sans-serif" }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v}`} />
        <Tooltip
          formatter={(value) => [`₹${value.toLocaleString()}`, "Spent"]}
          contentStyle={{ background: "#0F0F13", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#F5F4F0" }}
          cursor={{ fill: "rgba(123,92,245,0.08)" }}
        />
        <Bar dataKey="total" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
        <defs>
          <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7B5CF5" />
            <stop offset="100%" stopColor="#3B8BEB" />
          </linearGradient>
        </defs>
      </BarChart>
    </ResponsiveContainer>
  );
}