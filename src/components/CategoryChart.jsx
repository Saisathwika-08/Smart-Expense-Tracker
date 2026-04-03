import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useExpenseContext } from "../context/ExpenseContext";
import { CATEGORY_COLORS } from "./ExpenseForm";

export default function CategoryChart() {
  const { spentByCategory } = useExpenseContext();

  const data = Object.entries(spentByCategory).map(([name, value]) => ({ name, value }));

  if (data.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", color: "rgba(245,244,240,0.3)", fontSize: "0.85rem" }}>
        No data yet
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((entry) => (
            <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || "#7B5CF5"} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`₹${value.toLocaleString()}`, ""]}
          contentStyle={{ background: "#0F0F13", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#F5F4F0" }}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          formatter={(value) => <span style={{ color: "rgba(245,244,240,0.6)", fontSize: "0.78rem", fontFamily: "'DM Sans', sans-serif" }}>{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}