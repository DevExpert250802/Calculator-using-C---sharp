import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Calculator.module.css";

const API_BASE = "http://localhost:5020/api/calculate";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/history`);
      setHistory(response.data);
      setError("");
    } catch (err) {
      console.error("History error:", err);
      setError("Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  const handleCalculate = async () => {
    if (!input.trim()) {
      setError("Please enter an expression");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(API_BASE, { expression: input });
      setResult(response.data.result);
      await fetchHistory();
    } catch (err) {
      setError(err.response?.data?.error || "Calculation failed");
    } finally {
      setLoading(false);
    }
  };

  const buttons = [
    {
      value: "AC",
      type: "function",
      action: () => {
        setInput("");
        setResult("");
        setError("");
      },
    },
    {
      value: "DEL",
      type: "function",
      action: () => setInput((prev) => prev.slice(0, -1)),
    },
    {
      value: "%",
      type: "operator",
      action: () => setInput((prev) => prev + "%"),
    },
    {
      value: "/",
      type: "operator",
      action: () => setInput((prev) => prev + "/"),
    },
    {
      value: "7",
      type: "number",
      action: () => setInput((prev) => prev + "7"),
    },
    {
      value: "8",
      type: "number",
      action: () => setInput((prev) => prev + "8"),
    },
    {
      value: "9",
      type: "number",
      action: () => setInput((prev) => prev + "9"),
    },
    {
      value: "*",
      type: "operator",
      action: () => setInput((prev) => prev + "*"),
    },
    {
      value: "4",
      type: "number",
      action: () => setInput((prev) => prev + "4"),
    },
    {
      value: "5",
      type: "number",
      action: () => setInput((prev) => prev + "5"),
    },
    {
      value: "6",
      type: "number",
      action: () => setInput((prev) => prev + "6"),
    },
    {
      value: "-",
      type: "operator",
      action: () => setInput((prev) => prev + "-"),
    },
    {
      value: "1",
      type: "number",
      action: () => setInput((prev) => prev + "1"),
    },
    {
      value: "2",
      type: "number",
      action: () => setInput((prev) => prev + "2"),
    },
    {
      value: "3",
      type: "number",
      action: () => setInput((prev) => prev + "3"),
    },
    {
      value: "+",
      type: "operator",
      action: () => setInput((prev) => prev + "+"),
    },
    {
      value: "00",
      type: "number",
      action: () => setInput((prev) => prev + "00"),
    },
    {
      value: "0",
      type: "number",
      action: () => setInput((prev) => prev + "0"),
    },
    {
      value: ".",
      type: "number",
      action: () => setInput((prev) => prev + "."),
    },
    { value: "=", type: "equals", action: handleCalculate },
  ];

  return (
    <div className={styles.calculatorContainer}>
      <div className={styles.calculator}>
        <div className={styles.display}>
          <div className={styles.input}>{input || "0"}</div>
          <div className={styles.result}>{result}</div>
          {error && <div className={styles.error}>{error}</div>}
        </div>

        <div className={styles.buttons}>
          {buttons.map((button) => (
            <button
              key={button.value}
              onClick={button.action}
              className={`${styles.button} ${styles[button.type]}`}
              disabled={loading && button.value === "="}
            >
              {button.value}
            </button>
          ))}
        </div>

        <div className={styles.historySection}>
          <h3>History {loading && <span>Loading...</span>}</h3>
          {history.length > 0 ? (
            <ul>
              {history.map((item) => (
                <li key={item.id}>
                  <span className={styles.expression}>{item.expression}</span>
                  <span className={styles.equals}>=</span>
                  <span className={styles.historyResult}>{item.result}</span>
                  <span className={styles.timestamp}>
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.empty}>No calculations yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
