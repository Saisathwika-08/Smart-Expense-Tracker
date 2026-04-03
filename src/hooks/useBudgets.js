import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export function useBudgets(uid) {
  const [budgets, setBudgets] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;
    const ref = doc(db, "users", uid, "budgets", "limits");
    const unsub = onSnapshot(ref, (snap) => {
      setBudgets(snap.exists() ? snap.data() : {});
      setLoading(false);
    });
    return () => unsub();
  }, [uid]);

  const setBudget = async (category, limit) => {
    const ref = doc(db, "users", uid, "budgets", "limits");
    const snap = await getDoc(ref);
    if (snap.exists()) {
      await setDoc(ref, { [category]: limit }, { merge: true });
    } else {
      await setDoc(ref, { [category]: limit });
    }
  };

  return { budgets, setBudget, loading };
}