import React from "react";
import {
  Grid,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  Avatar,
  Box,
  Typography,
  Switch,
} from "@mui/material";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { useTheme } from "@emotion/react";
import LabelAndInput from "src/views/ui-components/LabelAndInput";
import { FileUploader } from "react-drag-drop-files";
import CloudUploadIcon from "@mui/icons-material/CloudUpload"; // Import the Material-UI icon
import { useNavigate } from "react-router";

// Reusable ImageUploader Component
const ImageUploader = ({
  label,
  name,
  value,
  setFieldValue,
  errorMessage,
  isLightMode,
}) => (
  <FileUploader
    label={label}
    name={name}
    types={["JPG", "PNG", "JPEG", "WEBP"]}
    handleChange={(file) => setFieldValue(name, file)}
  >
    <div
      className={`${isLightMode ? "custom-dropzone" : "custom-dropzone-dark"}`}
      style={{ width: "100%", position: "relative" }}
    >
      {value ? (
        <div
          style={{
            width: "fit-content",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <img
            src={URL.createObjectURL(value)}
            alt={label}
            style={{ width: 50, height: 50 }}
          />
          <p
            style={{
              whiteSpace: "nowrap",
              maxWidth: "150px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {`File Name: ${value.name}`}
          </p>
          <Button onClick={() => setFieldValue(name, null)} variant="contained">
            Remove
          </Button>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <CloudUploadIcon
            sx={{
              color: isLightMode ? "#333" : "#fff",
              fontSize: "48px",
            }}
          />
          <p>{label}</p>
        </div>
      )}
      {errorMessage && (
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
          {errorMessage}
        </p>
      )}
    </div>
  </FileUploader>
);

// Validation Schema
const Schema = Yup.object().shape({
  name: Yup.string().required("Name is required"), // Validation for name
  logo: Yup.mixed().required("Logo is required"), // Validation for logo (image)
  value: Yup.number()
    .required("Value is required")
    .min(0, "Value must be a positive number"), // Validation for numeric value
  valuePercentage: Yup.string()
    .required("Value Percentage is required")
    .matches(/^\d+%$/, "Must be a percentage (e.g., 20%)"), // Ensures valid percentage
  isActive: Yup.boolean().required("Active Status is required"), // Validation for isActive
});

const AddCharity = () => {
  const theme = useTheme();
  const isLightMode = theme.palette.mode === "light";
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        name: "", // Name of the entity
        logo: null, // Image upload for the logo
        value: "", // Numeric value
        valuePercentage: "", // String representing percentage
        isActive: true, // Default status
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
            {/* Left section for image upload and status */}
            <Box
              sx={{
                background: "transparent",
                border: isLightMode ? "1px solid #deeaff" : "1px solid #6c757d",
                borderRadius: "4px",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "start",
                width: "28%",
                height: "fit-content",
              }}
            >
              <Box
                sx={{
                  background: "transparent",
                  borderBottom: isLightMode
                    ? "1px solid #deeaff"
                    : "1px solid #6c757d",
                  width: "100%",
                  padding: "20px",
                  borderRadius: "0px",
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
                  Add Charity
                </Typography>
              </Box>

              <Box
                sx={{
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  placeSelf: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    position: "relative",
                  }}
                >
                  {/* Display Avatar with uploaded image or placeholder */}
                  <Avatar
                    alt="Logo"
                    src={values.logo ? URL.createObjectURL(values.logo) : ""}
                    sx={{ width: 100, height: 100, marginBottom: 2 }}
                  />
                  {values.logo ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        setFieldValue("logo", null);
                      }}
                    >
                      Remove Logo
                    </Button>
                  ) : (
                    <Button variant="contained" component="label">
                      Upload Charity Logo
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(event) => {
                          const file = event.currentTarget.files[0];
                          if (file) {
                            setFieldValue("logo", file);
                          }
                        }}
                      />
                    </Button>
                  )}
                  {touched.logo && errors.logo && (
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
                      {errors.logo}
                    </p>
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <FormControlLabel
                    sx={{ marginTop: "10px" }}
                    control={
                      <Switch
                        checked={values.isActive}
                        onChange={(e) =>
                          setFieldValue("isActive", e.target.checked)
                        }
                      />
                    }
                    label="Is Active"
                  />
                </Box>
              </Box>
            </Box>

            {/* Right section for form fields */}
            <Box
              sx={{
                border: isLightMode ? "1px solid #deeaff" : "1px solid #6c757d",
                width: "70%",
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
                  Add Charity Information
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
                    id="value"
                    handleInput={(e) =>
                      setFieldValue("value", e.target.value.trimStart())
                    }
                    label={"Value"}
                    onBlur={() => setFieldTouched("value", true)}
                    placeholder={"Enter Value"}
                    value={values.value ?? ""}
                    ErrorMessage={
                      touched.value && errors.value ? errors.value : undefined
                    }
                  />
                  <LabelAndInput
                    id="valuePercentage"
                    handleInput={(e) =>
                      setFieldValue("valuePercentage", e.target.value)
                    }
                    label={"Value Percentage"}
                    value={values.valuePercentage ?? ""}
                    placeholder={"Enter Value Percentage"}
                    ErrorMessage={
                      touched.valuePercentage && errors.valuePercentage
                        ? errors.valuePercentage
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

export default AddCharity;
