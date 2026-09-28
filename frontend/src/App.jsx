import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:3000/api/expenses";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({ title: "", amount: "", type: "" });
  const [editingId, setEditingId] = useState(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    const total = transactions.reduce((acc, curr) => {
      const txType = curr.type || curr.category;
      return txType === "income" ? acc + Number(curr.amount) : acc - Number(curr.amount);
    }, 0);
    setBalance(total);
  }, [transactions]);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(API_URL);
      setTransactions(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: formData.title.trim(),
      amount: Number(formData.amount),
      type: formData.type,
    };

    try {
      if (editingId) {
        const res = await axios.put(`\({API_URL}/\){editingId}`, payload);
        setTransactions(
          transactions.map((t) => (t._id === editingId ? res.data : t))
        );
        setEditingId(null);
      } else {
        const res = await axios.post(API_URL, payload);
        setTransactions([res.data, ...transactions]);
      }
      setFormData({ title: "", amount: "", type: "" });
    } catch (err) {
      console.error("Error saving transaction:", err);
    }
  };

  const handleEdit = (transaction) => {
    setEditingId(transaction._id);
    setFormData({
      title: transaction.title,
      amount: transaction.amount,
      type: transaction.type || transaction.category || "expense",
    });
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`\({API_URL}/\){id}`);
      setTransactions(transactions.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting transaction:", err);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>💰 Expense Tracker</h1>
        <p style={{ textAlign: "center", color: "white", marginBottom: "20px" }}>
          Track your income & expenses in real time
        </p>
      </header>

      <section className="summary">
        <h2>Balance</h2>
        <p id="total">₹{balance}</p>
      </section>

      <section className="form-section">
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title (e.g. Rent, Salary)"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
            required
          />
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            required
          >
            <option value="" disabled>Select Type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <button type="submit">Add Transaction</button>
        </form>
      </section>

      <section className="transactions">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t._id}>
                <td>{t.title}</td>
                <td style={{ textTransform: "capitalize" }}>{t.type}</td>
                <td style={{ color: t.type === "income" ? "lightgreen" : "lightcoral" }}>
                  ₹{t.amount}
                </td>
                <td>
                  <button className="delete-btn" onClick={() => deleteTransaction(t._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;