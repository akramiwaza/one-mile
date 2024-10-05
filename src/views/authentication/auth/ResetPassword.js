import React, { useEffect, useState } from "react";
import { Grid, Box, Card, Typography, Stack, Button } from "@mui/material";

import Logo from "src/layouts/full/shared/logo/Logo";
import PageContainer from "src/components/container/PageContainer";

import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Field, Formik } from "formik";
import {
  ForgotPasswordFunction,
  Logout,
  ResetPasswordFunction,
} from "src/store/data/user/actionsUser";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { dataLocalStorage, getLocalStorage } from "src/helper/publicFunction";
import { RouterName } from "src/routes/RouterName";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  let userInfo = getLocalStorage(dataLocalStorage.userinfo);

  const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(3, "Min 3 characters")
      .required("Password is required"),
    Confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });
  useEffect(() => {
    if (userInfo.token) {
      dispatch(Logout());
    }
  }, []);
  return (
    <PageContainer
      title="Reset Password"
      description="this is Reset Password page"
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
              <Formik
                validationSchema={ResetPasswordSchema}
                initialValues={{ password: "", Confirmpassword: "" }}
                onSubmit={(values) => {
                  dispatch(
                    ResetPasswordFunction({
                      newPassword: values.password.trim(),
                      token: token,
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
                        Customestyle={{ width: "100%" }}
                        fullWidth={true}
                        Title="New password"
                        name="password"
                        value={values.password}
                        onChange={handleChange("password")}
                        placeholder={"Enter your new password"}
                        id="password"
                        inputMode="password"
                        variant="outlined"
                        error={errors.password}
                      />
                      <Field
                        component={CustomTextField}
                        Customestyle={{ width: "100%" }}
                        fullWidth={true}
                        Title="Confirm new password"
                        name="Confirmpassword"
                        value={values.Confirmpassword}
                        onChange={handleChange("Confirmpassword")}
                        placeholder={"Enter your confirm new password"}
                        inputMode="password"
                        id="Confirmpassword"
                        variant="outlined"
                        error={errors.Confirmpassword}
                      />
                      <Button
                        color="primary"
                        variant="contained"
                        size="large"
                        fullWidth
                        component={Link}
                        onClick={handleSubmit}
                      >
                        Reset
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

export default ResetPassword;
