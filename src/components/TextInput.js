"use client";
import { useState } from "react";

export default function TextInput({ onSubmit }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e?.preventDefault?.();
    if (onSubmit) onSubmit(value);
    else console.log("Submitted:", value);
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
      <label htmlFor="text-input" style={{ display: "block", marginBottom: 6 }}>
        Enter text:
      </label>
      <input
        id="text-input"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ padding: "8px", width: "100%", maxWidth: 420 }}
      />
      <div style={{ marginTop: 8 }}>
        <button type="submit" style={{ padding: "8px 12px" }}>
          Submit
        </button>
      </div>
      {value && <p style={{ marginTop: 8 }}>Current: {value}</p>}
    </form>
  );
}
