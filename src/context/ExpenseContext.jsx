import { createContext, useContext } from "react";
import { useBudgets } from "../hooks/useBudgets";
import { useExpenses } from "../hooks/useExpenses";
import { useAuth } from "./AuthContext";

const ExpenseContext = createContext();

export function useExpenseContext() {
  return useContext(ExpenseContext);
}

export function ExpenseProvider({ children }) {
  const { user } = useAuth();
  const { expenses, addExpense, deleteExpense, editExpense, loading: expensesLoading } = useExpenses(user?.uid);
  const { budgets, setBudget, loading: budgetsLoading } = useBudgets(user?.uid);

  // Total spent per category
  const spentByCategory = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  // Categories that exceeded budget
  const exceededBudgets = Object.entries(budgets).filter(
    ([category, limit]) => spentByCategory[category] > limit
  );

  return (
    <ExpenseContext.Provider value={{
      expenses,
      addExpense,
      deleteExpense,
      editExpense,
      budgets,
      setBudget,
      spentByCategory,
      exceededBudgets,
      loading: expensesLoading || budgetsLoading,
    }}>
      {children}
    </ExpenseContext.Provider>
  );
}