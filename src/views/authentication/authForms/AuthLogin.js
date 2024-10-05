import React from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import CustomCheckbox from "../../../components/forms/theme-elements/CustomCheckbox";
import CustomTextField from "../../../components/forms/theme-elements/CustomTextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "src/store/data/user/actionsUser";

const AuthLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Define validation schema using Yup
  const LoginSchema = Yup.object().shape({
    email: Yup.string().trim().email("Invalid email").required("Required"),
    password: Yup.string().min(3, "Minimum 3 characters").required("Required"),
  });

  // Initialize useFormik hook
  const {
    errors,
    touched,
    setFieldValue,
    handleSubmit,
    setSubmitting,
    values,
    isSubmitting,
    handleChange,
    setFieldTouched
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      expire: false,
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      dispatch(
        login({
          email: values.email.trim(),
          password: values.password.trim(),
          expire: values.expire,
          callback: (data) => {
            if (data) {
              navigate("/");
              window.location.reload(false);
            }
          },
        })
      );
      setSubmitting(false)
    },
  });

  return (
    <>
      <Stack>
        <Box>
          <CustomTextField
            Title="Email"
            name="email"
            value={values.email}
            onBlur={()=>{
              setFieldTouched('email', true)
            }}
            onChange={handleChange("email")}
            placeholder="Enter your email"
            inputMode="email"
            fullWidth
            id="email"
            variant="outlined"
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
        </Box>
        <Box>
          <CustomTextField
            Title="Password"
            value={values.password}
            onChange={handleChange("password")}
            onBlur={()=>{
              setFieldTouched('password', true)
            }}
            placeholder="Enter your password"
            inputMode="password"
            name="password"
            fullWidth
            id="password"
            variant="outlined"
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
        </Box>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <CustomCheckbox
                  defaultChecked={values.expire}
                  onChange={(event) => {
                    setFieldValue("expire", event.target.checked);
                  }}
                />
              }
              label="Remember Me"
            />
          </FormGroup>
          <Typography
            component={Link}
            to="/auth/forgot-password"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Forgot Password ?
          </Typography>
        </Stack>
      </Stack>

      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          Sign In
        </Button>
      </Box>
    </>
  );
};

export default AuthLogin;
