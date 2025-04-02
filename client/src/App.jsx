import { useState } from "react";
import styles from "./Calculator.module.css";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleButtonClick = (value) => {
    if (value === "=") {
      try {
        setResult(eval(input).toString());
      } catch (error) {
        setResult("Error");
      }
    } else if (value === "AC") {
      setInput("");
      setResult("");
    } else if (value === "DEL") {
      setInput(input.slice(0, -1));
    } else {
      setInput(input + value);
    }
  };

  const buttons = [
    { value: "AC", type: "function" },
    { value: "DEL", type: "function" },
    { value: "%", type: "operator" },
    { value: "/", type: "operator" },
    { value: "7", type: "number" },
    { value: "8", type: "number" },
    { value: "9", type: "number" },
    { value: "*", type: "operator" },
    { value: "4", type: "number" },
    { value: "5", type: "number" },
    { value: "6", type: "number" },
    { value: "-", type: "operator" },
    { value: "1", type: "number" },
    { value: "2", type: "number" },
    { value: "3", type: "number" },
    { value: "+", type: "operator" },
    { value: "00", type: "number" },
    { value: "0", type: "number" },
    { value: ".", type: "number" },
    { value: "=", type: "equals" },
  ];

  return (
    <div className={styles.calculatorContainer}>
      <div className={styles.calculator}>
        <div className={styles.display}>
          <div className={styles.input}>{input || "0"}</div>
          <div className={styles.result}>{result}</div>
        </div>

        <div className={styles.buttons}>
          {buttons.map((button) => (
            <button
              key={button.value}
              onClick={() => handleButtonClick(button.value)}
              className={`${styles.button} ${styles[button.type]}`}
            >
              {button.value}
              
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
