import React from "react";
import {
  TextField,
  MenuItem,
  Select,
  Box,
  Avatar,
  InputAdornment,
  FormControl,
} from "@mui/material";
import { Field } from "formik";
import { useTheme } from "@emotion/react";

// Custom Phone Number Input with Country Code Dropdown
const PhoneNumberInput = ({
  countryCodes,
  onChangeData,
  values,
  errors,
  label,
}) => {
  const theme = useTheme();
  const isLightMode = theme.palette.mode === "light";
  console.log(" values.phoneCode : ", values);

  return (
    <FormControl fullWidth>
      <Box
        sx={{
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #ced4da", // Single border for the whole box
            borderRadius: "4px",
            overflow: "hidden", // Prevent border radius from being disrupted,
            width: "100%",
            height: "45px",
          }}
        >
          {/* Dropdown for Country Codes */}
          <Select
            value={values.phoneCode}
            onChange={(e) => {
              const phoneCodeValue = e.target.value;
              onChangeData(phoneCodeValue, values.phoneNumber);
            }}
            sx={{
              width: "25%",
              borderRight: "1px solid #ced4da", // Separate dropdown from input
              display: "flex",
              alignItems: "center",
              borderRadius: "0px !important",
              border: "none",
            }}
            renderValue={(selected) => {
              const country = countryCodes.find((c) => c.code === selected);
              if (!country) return selected; // Fallback in case country is not found

              return (
                <Box
                  sx={{ display: "flex", alignItems: "center", width: "100%" }}
                >
                  <Avatar
                    alt={country.label}
                    src={country.flag}
                    sx={{ width: 24, height: 24, marginRight: 1 }}
                  />
                </Box>
              );
            }}
          >
            {countryCodes &&
              countryCodes.map((option) => (
                <MenuItem key={option.code} value={option.code}>
                  {/* Assigning the full country dial code */}
                  <Avatar
                    alt={option.label}
                    src={option.flag}
                    sx={{ width: 24, height: 24, marginRight: 1 }}
                  />
                  {option.code}
                </MenuItem>
              ))}
          </Select>

          {/* Phone Number Input Field */}
          <Field
            as={TextField}
            name="phoneNumber"
            placeholder="xxx xxx xxxx"
            fullWidth
            value={values.phoneNumber}
            onChange={(e) => {
              const phoneNumber = e.target.value;
              onChangeData(values.phoneCode, phoneNumber);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {values.phoneCode}
                </InputAdornment>
              ),
              disableUnderline: true, // Remove default underline
              sx: {
                border: "none !important",
                borderRadius: "0px !important",
                "& .MuiInputBase-input": {
                  paddingLeft: "12px", // Adjust padding for the input field
                },
              },
            }}
            sx={{
              border: "none !important", // Remove the border to combine with the dropdown
              padding: "0",
              "& .MuiOutlinedInput-root": {
                border: "none !important", // Keep the TextField's border off
              },
            }}
          />
        </Box>
      </Box>
    </FormControl>
  );
};

export default PhoneNumberInput;
