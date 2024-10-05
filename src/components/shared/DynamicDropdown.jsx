import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
} from "@mui/material";

// Dropdown Component
const DynamicDropdown = ({
  label,
  name,
  value,
  options,
  setFieldValue,
  errorMessage,
  isLightMode,
  multiple = false, // Option to select multiple or single
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        value={value}
        onChange={(e) => setFieldValue(name, e.target.value)}
        multiple={multiple}
        renderValue={(selected) => (multiple ? selected.join(", ") : selected)}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {multiple && <Checkbox checked={value.includes(option)} />}
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
      {errorMessage && (
        <p style={{ fontSize: "0.775rem", color: "#ff0000" }}>{errorMessage}</p>
      )}
    </FormControl>
  );
};

export default DynamicDropdown;
