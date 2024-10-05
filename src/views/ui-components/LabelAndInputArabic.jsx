import { useTheme } from "@emotion/react";
import React, { useState } from "react";
import { FaKeyboard } from "react-icons/fa";

const arabicCharacters = [
  "ا",
  "ب",
  "ت",
  "ث",
  "ج",
  "ح",
  "خ",
  "د",
  "ذ",
  "ر",
  "ز",
  "س",
  "ش",
  "ص",
  "ض",
  "ط",
  "ظ",
  "ع",
  "غ",
  "ف",
  "ق",
  "ك",
  "ل",
  "م",
  "ن",
  "ه",
  "و",
  "ي",
  "ء",
  "أ",
  "إ",
  "ؤ",
  "ئ",
];

const LabelAndInputArabic = ({
  label,
  handleInput,
  onBlur,
  value,
  placeholder,
  ErrorMessage,
  id,
  ...rest
}) => {
  const theme = useTheme();
  const isLightMode = theme.palette.mode === "light";
  const [isFocused, setIsFocused] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);

  // Function to insert Arabic characters into the input
  const insertCharacter = (char) => {
    handleInput({ target: { value: (value || "") + char } });
  };

  // Function to handle delete (removing the last character)
  const handleDelete = () => {
    handleInput({ target: { value: value?.slice(0, -1) || "" } });
  };

  // Function to insert a space character
  const handleSpace = () => {
    insertCharacter(" ");
  };

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
          position: "relative",
        }}
      >
        <input
          {...rest}
          id={id}
          value={value ?? ""}
          style={{
            width: "calc(100% - 2rem)", // Leave space for the icon
            height: "2.75rem",
            backgroundColor: "transparent",
            border: "none",
            color: isLightMode ? "#333" : "#fff",
            fontSize: "12px",
            paddingTop: "10px",
            paddingBottom: "10px",
            paddingLeft: "12px",
            paddingRight: "2rem", // Add padding for the icon space
            borderRadius: "5px",
            fontWeight: "normal",
            outline: "none",
            alignSelf: "stretch",
          }}
          pattern="[ء-ي\s]+" // Arabic character pattern
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur && onBlur(e);
          }}
          onChange={handleInput}
          placeholder={placeholder}
        />
        <FaKeyboard
          onClick={() => setShowKeyboard(!showKeyboard)}
          style={{
            position: "absolute",
            right: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            color: isLightMode ? "#333" : "#fff",
          }}
        />
      </div>
      {showKeyboard && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: "0",
            width: "100%",
            backgroundColor: isLightMode ? "#f8f9fa" : "#343a40",
            padding: "0.5rem",
            borderRadius: "5px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            zIndex: "50",
          }}
        >
          {arabicCharacters.map((char, index) => (
            <button
              key={index}
              style={{
                padding: "0.5rem",
                fontSize: "16px",
                backgroundColor: isLightMode ? "#deeaff" : "#495057",
                color: isLightMode ? "#000" : "#fff",
                border: "none",
                borderRadius: "3px",
                cursor: "pointer",
              }}
              onClick={() => insertCharacter(char)}
            >
              {char}
            </button>
          ))}
          {/* Add Space button */}
          <button
            style={{
              padding: "0.5rem",
              fontSize: "16px",
              backgroundColor: isLightMode ? "#deeaff" : "#495057",
              color: isLightMode ? "#000" : "#fff",
              border: "none",
              borderRadius: "3px",
              cursor: "pointer",
              flexGrow: 1,
            }}
            onClick={handleSpace}
          >
            Space
          </button>

          {/* Add Delete button */}
          <button
            style={{
              padding: "0.5rem",
              fontSize: "16px",
              backgroundColor: isLightMode ? "#f8d7da" : "#dc3545",
              color: isLightMode ? "#000" : "#fff",
              border: "none",
              borderRadius: "3px",
              cursor: "pointer",
              flexGrow: 1,
            }}
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
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

export default LabelAndInputArabic;
