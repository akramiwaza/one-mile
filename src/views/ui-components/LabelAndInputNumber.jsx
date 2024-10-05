import { useTheme } from "@emotion/react";
import React, { useState } from "react";

const LabelAndInputNumber = ({
  label,
  handleInput,
  onBlur,
  value,
  placeholder,
  ErrorMessage,
  id,
  min,
  max,
  ...rest
}) => {
  const theme = useTheme();
  const isLightMode = theme.palette.mode === "light";
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "0.5rem",
        alignSelf: "stretch",
        width: "100%",
      }}
    >
      <label
        style={{
          fontWeight: "normal",
          fontSize: "12px",
          textTransform: "capitalize",
          color: isLightMode ? "#333" : "#fff",
        }}
      >
        {label}
      </label>
      <div
        style={{
          width: "100%",
          border: isFocused
            ? "1px solid #4788ff"
            : isLightMode
            ? "1px solid #deeaff"
            : "1px solid #6c757d",
          borderRadius: "5px",
        }}
      >
        <input
          {...rest}
          id={id}
          value={value ?? ""}
          type="number" // Restrict to number input
          min={min}
          max={max}
          style={{
            width: "100%",
            height: "2.75rem",
            backgroundColor: "transparent",
            border: "none",
            color: isLightMode ? "#333" : "#fff",
            fontSize: "12px",
            paddingTop: "10px",
            paddingBottom: "10px",
            paddingLeft: "12px",
            paddingRight: "12px",
            borderRadius: "5px",
            fontWeight: "normal",
            outline: "none",
            alignSelf: "stretch",
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur && onBlur(e);
          }}
          onChange={handleInput}
          placeholder={placeholder}
        />
      </div>
      <p
        style={{
          fontSize: "0.775rem",
          color: "#ff0000",
          position: "absolute",
          bottom: "-1.9rem",
          left: "0.25rem",
          lineHeight: "1rem",
        }}
      >
        {ErrorMessage}
      </p>
    </div>
  );
};

export default LabelAndInputNumber;
