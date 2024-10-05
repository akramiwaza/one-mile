import React, { useState } from "react";
import { Grid, Box, Card, Typography, Stack, Button } from "@mui/material";

import Logo from "src/layouts/full/shared/logo/Logo";
import PageContainer from "src/components/container/PageContainer";

import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import { Link, useNavigate } from "react-router-dom";
import { Field, Formik } from "formik";
import { ForgotPasswordFunction } from "src/store/data/user/actionsUser";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { RouterName } from "src/routes/RouterName";

const ForgotPassword2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().trim().email("invalid email").required("required"),
  });
  return (
    <PageContainer
      title="Forgot Password"
      description="this is Forgot Password page"
    >
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh" }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <Typography
                color="textSecondary"
                textAlign="center"
                variant="subtitle2"
                fontWeight="400"
              >
                Please enter the email address associated with your account and
                We will email you a link to reset your password.
              </Typography>
              <Formik
                validationSchema={ForgotPasswordSchema}
                initialValues={{ email: "" }}
                onSubmit={(values) => {
                  dispatch(
                    ForgotPasswordFunction({
                      email: values.email.trim(),
                      callback: (data) => {
                        if (data) {
                          navigate(RouterName.auth.login);
                        }
                      },
                    })
                  );
                }}
              >
                {({
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                  values,
                  errors,
                }) => (
                  <>
                    <Stack mt={4} spacing={2}>
                      <Field
                        component={CustomTextField}
                        Title="Email Adddress"
                        name="email"
                        value={values.email}
                        onChange={handleChange("email")}
                        placeholder={"Enter your email"}
                        inputMode="email"
                        fullWidth
                        id="email"
                        variant="outlined"
                        errors={errors.email}
                      />
                      <Button
                        color="primary"
                        variant="contained"
                        size="large"
                        fullWidth
                        component={Link}
                        onClick={handleSubmit}
                      >
                        Forgot Password
                      </Button>
                      <Button
                        color="primary"
                        size="large"
                        fullWidth
                        component={Link}
                        to="/auth/login"
                      >
                        Back to Login
                      </Button>
                    </Stack>
                  </>
                )}
              </Formik>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default ForgotPassword2;
