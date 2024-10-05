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
  title_en: Yup.string().required("Title in English is required"), // Validation for title in English
  title_ar: Yup.string().required("Title in Arabic is required"), // Validation for title in Arabic
  unit: Yup.string().required("Unit is required"), // Validation for unit (e.g., piece, kg, liter)
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price must be greater than or equal to 0"), // Validation for price
});

const AddAdditionalCharges = () => {
  const theme = useTheme();
  const isLightMode = theme.palette.mode === "light";
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        title_en: "", // Title in English
        title_ar: "", // Title in Arabic
        unit: "", // Unit (e.g., piece, kg, liter)
        price: "", // Price
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
                  Add Additional Charges Information
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
                    id="title_en"
                    handleInput={(e) =>
                      setFieldValue("title_en", e.target.value.trimStart())
                    }
                    label={"title En"}
                    onBlur={() => setFieldTouched("title_en", true)}
                    placeholder={"Enter title En"}
                    value={values.title_en ?? ""}
                    ErrorMessage={
                      touched.title_en && errors.title_en
                        ? errors.title_en
                        : undefined
                    }
                  />
                  <LabelAndInputArabic
                    id="title_ar"
                    handleInput={(e) =>
                      setFieldValue("title_ar", e.target.value.trimStart())
                    }
                    label={"Title Ar"}
                    onBlur={() => setFieldTouched("title_ar", true)}
                    placeholder={"Enter Title Ar"}
                    value={values.title_ar ?? ""}
                    ErrorMessage={
                      touched.title_ar && errors.title_ar
                        ? errors.title_ar
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
                    id="unit"
                    handleInput={(e) =>
                      setFieldValue("unit", e.target.value.trimStart())
                    }
                    label={"Unit"}
                    onBlur={() => setFieldTouched("unit", true)}
                    placeholder={"Enter Unit"}
                    value={values.unit ?? ""}
                    ErrorMessage={
                      touched.unit && errors.unit ? errors.unit : undefined
                    }
                  />
                  <LabelAndInput
                    id="price"
                    handleInput={(e) => setFieldValue("price", e.target.value)}
                    label={"Price"}
                    placeholder={"Enter Price"}
                    value={values.price ?? ""}
                    ErrorMessage={
                      touched.price && errors.price ? errors.price : undefined
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

export default AddAdditionalCharges;
