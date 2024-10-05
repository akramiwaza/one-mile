import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  TextField,
  TextareaAutosize,
  IconButton,
  InputAdornment,
} from "@mui/material";
import CustomFormLabel from "./CustomFormLabel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const CustomTextField = styled((props) => {
  const {
    Title = "",
    placeholder = "",
    inputMode = "text",
    maxLength = 99,
    multiline = false,
    numberOfLines = 1,
    onChange = () => {},
    readOnly = false,
    Customestyle,
    value = "",
    onPress = () => {},
    field,
    form,
    customeStyleText,
    errors,
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={Customestyle} onClick={() => onPress()}>
      {Title ? <CustomFormLabel>{Title}</CustomFormLabel> : null}
      {multiline ? (
        <TextareaAutosize
          placeholder={placeholder}
          maxLength={maxLength}
          type={inputMode}
          value={value}
          rows={numberOfLines}
          cols={numberOfLines * 10}
          style={customeStyleText}
          disabled={readOnly}
          onChange={(event) => onChange(event.target.value)}
          {...props}
        />
      ) : (
        <TextField
          placeholder={placeholder}
          maxLength={maxLength}
          type={
            inputMode == "password" && !showPassword
              ? "password"
              : inputMode == "password" && showPassword
              ? "text"
              : inputMode
          }
          style={customeStyleText}
          value={value}
          disabled={readOnly}
          onChange={(event) => onChange(event.target.value)}
          InputProps={{
            // Wrap TextField with InputAdornment
            endAdornment: (props.type == "password" ||
              inputMode == "password") && ( // Conditional rendering of password toggle
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...props}
        />
      )}
      {errors && <div style={{ color: "red" }}>{errors}</div>}
    </div>
  );
})(({ theme }) => ({
  "& .MuiOutlinedInput-input::-webkit-input-placeholder": {
    color: theme.palette.text.secondary,
    opacity: "0.8",
  },
  "& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder": {
    color: theme.palette.text.secondary,
    opacity: "1",
  },
  "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.grey[200],
  },
}));

export default CustomTextField;
