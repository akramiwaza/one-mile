import React, { useLayoutEffect, useState } from "react";
import { Grid, Box, Card } from "@mui/material";

// components
import PageContainer from "src/components/container/PageContainer";
import Logo from "src/layouts/full/shared/logo/Logo";
import AuthLogin from "../authForms/AuthLogin";
import {
  Checkuser,
  dataLocalStorage,
  getCookie,
  getLocalStorage,
} from "src/helper/publicFunction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const Login2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    Checkuser({ dispatch, navigate });

    // Add a beforeunload event listener to prompt the user
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleBeforeUnload = (event) => {
    if (getLocalStorage(dataLocalStorage.loading_check_user) ?? true) {
      event.preventDefault();
      // Prompt the user to confirm leaving the page
      event.returnValue =
        "You have an ongoing API request. Are you sure you want to leave?";
    }
  };

  return (
    <PageContainer title="Login" description="this is Login page">
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
            lg={5}
            xl={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "450px" }}
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <AuthLogin />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Login2;
