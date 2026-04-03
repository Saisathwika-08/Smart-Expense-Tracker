import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export function useExpenses(uid) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;
    const q = query(
      collection(db, "users", uid, "expenses"),
      orderBy("date", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setExpenses(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, [uid]);

  const addExpense = async (data) => {
    await addDoc(collection(db, "users", uid, "expenses"), {
      ...data,
      createdAt: new Date().toISOString(),
    });
  };

  const deleteExpense = async (id) => {
    await deleteDoc(doc(db, "users", uid, "expenses", id));
  };

  const editExpense = async (id, data) => {
    await updateDoc(doc(db, "users", uid, "expenses", id), data);
  };

  return { expenses, addExpense, deleteExpense, editExpense, loading };
}