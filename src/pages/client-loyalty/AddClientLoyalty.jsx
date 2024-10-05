import React from "react";
import { Grid, Button, Box, Typography } from "@mui/material";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { useTheme } from "@emotion/react";
import LabelAndInput from "src/views/ui-components/LabelAndInput";
import { useNavigate } from "react-router";
import LabelAndInputArabic from "src/views/ui-components/LabelAndInputArabic";

// Validation Schema

const Schema = Yup.object().shape({
  name: Yup.string().required("Name is required"), // Validation for the name
  from: Yup.date().required("Start date (From) is required"), // Validation for start date
  to: Yup.date().required("End date (To) is required"), // Validation for end date
  value_discount: Yup.number()
    .required("Value Discount is required")
    .min(0, "Discount must be greater than or equal to 0"), // Validation for discount
  default_points: Yup.number()
    .required("Default Points are required")
    .min(0, "Points must be greater than or equal to 0"), // Validation for points
});
const AddClientLoyalty = () => {
  const theme = useTheme();
  const isLightMode = theme.palette.mode === "light";
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        name: "", // Name
        from: "", // Start date or range
        to: "", // End date or range
        value_discount: "", // Discount value (can be percentage or value)
        default_points: "", // Default points
      }}
      validationSchema={Schema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ setFieldValue, values, setFieldTouched, touched, errors }) => (
        <Form>
          {/* Main Grid for both sections */}
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              marginTop: "16px",
              paddingLeft: "16px",
            }}
          >
            {/* Right section for form fields */}
            <Box
              sx={{
                border: isLightMode ? "1px solid #deeaff" : "1px solid #6c757d",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                height: "fit-content",
              }}
            >
              <Box
                sx={{
                  background: "transparent",
                  borderBottom: isLightMode
                    ? "1px solid #deeaff"
                    : "1px solid #6c757d",
                  borderRadius: "0px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "20px",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    color: isLightMode ? "#303030" : "#fff",
                    fontWeight: "bold",
                    fontSize: "1.44rem",
                  }}
                >
                  Add Client Loyalty Information
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={() => navigate(-1)}
                  sx={{
                    padding: "2px 10px !important",
                    height: "30px",
                  }}
                >
                  Back
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "25px",
                  padding: "20px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    width: "100%",
                  }}
                >
                  <LabelAndInput
                    id="name"
                    handleInput={(e) =>
                      setFieldValue("name", e.target.value.trimStart())
                    }
                    label={"Name"}
                    onBlur={() => setFieldTouched("name", true)}
                    placeholder={"Enter Name"}
                    value={values.name ?? ""}
                    ErrorMessage={
                      touched.name && errors.name ? errors.name : undefined
                    }
                  />
                  <LabelAndInput
                    id="value_discount"
                    handleInput={(e) =>
                      setFieldValue(
                        "value_discount",
                        e.target.value.trimStart()
                      )
                    }
                    label={"Value Discount"}
                    onBlur={() => setFieldTouched("value_discount", true)}
                    placeholder={"Enter Value Discount"}
                    value={values.value_discount ?? ""}
                    ErrorMessage={
                      touched.value_discount && errors.value_discount
                        ? errors.value_discount
                        : undefined
                    }
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    width: "100%",
                  }}
                >
                  <LabelAndInput
                    id="from"
                    handleInput={(e) => setFieldValue("from", e.target.value)}
                    label={"From"}
                    value={values.from ?? ""}
                    ErrorMessage={
                      touched.from && errors.from ? errors.from : undefined
                    }
                    type="date"
                  />
                  <LabelAndInput
                    id="to"
                    handleInput={(e) => setFieldValue("to", e.target.value)}
                    label={"To"}
                    value={values.to ?? ""}
                    ErrorMessage={
                      touched.to && errors.to ? errors.to : undefined
                    }
                    type="date"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    width: "100%",
                  }}
                >
                  <LabelAndInput
                    id="default_points"
                    handleInput={(e) =>
                      setFieldValue("default_points", e.target.value)
                    }
                    placeholder={"Enter Point"}
                    label={"Default Points"}
                    value={values.default_points ?? ""}
                    ErrorMessage={
                      touched.default_points && errors.default_points
                        ? errors.default_points
                        : undefined
                    }
                  />
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Submit button positioned at the bottom-right */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "20px",
            }}
          >
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AddClientLoyalty;
