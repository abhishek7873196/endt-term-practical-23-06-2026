import { useState } from "react";

export default function App() {
  const [num, setNum] = useState("");
  const [marks, setMarks] = useState([]);
  const [current, setCurrent] = useState("");
  const [step, setStep] = useState("setup");

  const total = marks.reduce((a, b) => a + b, 0);
  const avg = marks.length ? total / marks.length : 0;

  const getGrade = (a) => {
    if (a >= 90) return "A+";
    if (a >= 80) return "A";
    if (a >= 70) return "B";
    if (a >= 60) return "C";
    if (a >= 50) return "D";
    return "F";
  };
  const handleStart = () => {
    if (num > 0 && num <= 20) {
      setMarks([]);
      setStep("entry");
    }
  };

  const handleAdd = () => {
    const val = parseFloat(current);
    if (isNaN(val) || val < 0 || val > 100) return;
    const updated = [...marks, val];
    setMarks(updated);
    setCurrent("");
    if (updated.length === parseInt(num)) setStep("result");
  };

  return (
    <div style={{ maxWidth: 400, margin: "60px auto", fontFamily: "sans-serif", padding: 20 }}>
      <h2>Grade Calculator</h2>

      {step === "setup" && (
        <div>
          <p>How many subjects?</p>
          <input
            type="number"
            value={num}
            onChange={(e) => setNum(e.target.value)}
            placeholder="e.g. 5"
            style={{ padding: 8, fontSize: 16, width: "100%", marginBottom: 10 }}
          />
          <button onClick={handleStart} style={{ padding: "8px 20px", fontSize: 16 }}>
            Start
          </button>
        </div>
      )}

      {step === "entry" && (
        <div>
          <p>Enter mark for Subject {marks.length + 1} of {num}:</p>
          <input
            type="number"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            placeholder="Marks out of 100"
            style={{ padding: 8, fontSize: 16, width: "100%", marginBottom: 10 }}
          />
          <button onClick={handleAdd} style={{ padding: "8px 20px", fontSize: 16 }}>
            {marks.length + 1 === parseInt(num) ? "Finish" : "Next"}
          </button>

          {marks.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <p><strong>Entered so far:</strong></p>
              {marks.map((m, i) => (
                <p key={i}>Subject {i + 1}: {m}</p>
              ))}
            </div>
          )}
        </div>
      )}

      {step === "result" && (
        <div style={{ marginTop: 20 }}>
          <h3>Results</h3>
          {marks.map((m, i) => (
            <p key={i}>Subject {i + 1}: {m} marks</p>
          ))}
          <hr />
          <p><strong>Total Marks:</strong> {total} / {num * 100}</p>
          <p><strong>Average:</strong> {avg.toFixed(2)}</p>
          <p><strong>Grade:</strong> {getGrade(avg)}</p>
          <button onClick={() => { setStep("setup"); setNum(""); setMarks([]); }}
            style={{ marginTop: 10, padding: "8px 20px", fontSize: 16 }}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}