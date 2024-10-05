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
  model_id: Yup.string().required("Model ID is required"),
  car_type_id: Yup.string().required("Car Type ID is required"),
  plate_number: Yup.string().required("Plate Number is required"),
  car_image: Yup.mixed().required("Car Image is required"),
  car_year: Yup.number()
    .required("Car Year is required")
    .min(1900, "Year must be later than 1900")
    .max(new Date().getFullYear(), `Year can't be in the future`),
  color: Yup.string().required("Car Color is required"),
  car_license_front: Yup.mixed().required("Car License Front is required"),
  car_license_back: Yup.mixed().required("Car License Back is required"),
  insurance_image: Yup.mixed().required("Insurance Image is required"),
  expiry_date: Yup.date().required("Expiry Date is required"),
  isActive: Yup.boolean().required("Active Status is required"),
  insuranceExpiryDate: Yup.date().required("Insurance Expiry Date is required"),
});

const AddCar = () => {
  const theme = useTheme();
  const isLightMode = theme.palette.mode === "light";
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        model_id: "",
        car_type_id: "",
        plate_number: "",
        car_image: null,
        car_year: "",
        color: "",
        car_license_front: null,
        car_license_back: null,
        insurance_image: null,
        expiry_date: "",
        isActive: true, // default status
        insuranceExpiryDate: "",
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
                  Add Car
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
                    alt="Car Image"
                    src={
                      values.car_image
                        ? URL.createObjectURL(values.car_image)
                        : ""
                    }
                    sx={{ width: 100, height: 100, marginBottom: 2 }}
                  />
                  {values.car_image ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        setFieldValue("car_image", null);
                      }}
                    >
                      Remove Image
                    </Button>
                  ) : (
                    <Button variant="contained" component="label">
                      Upload Car Image
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(event) => {
                          const file = event.currentTarget.files[0];
                          if (file) {
                            setFieldValue("car_image", file);
                          }
                        }}
                      />
                    </Button>
                  )}
                  {touched.car_image && errors.car_image && (
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
                      {errors.car_image}
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
                  Add Car Information
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
                    id="model_id"
                    handleInput={(e) =>
                      setFieldValue("model_id", e.target.value.trimStart())
                    }
                    label={"Model ID"}
                    onBlur={() => setFieldTouched("model_id", true)}
                    placeholder={"Enter Model ID"}
                    value={values.model_id ?? ""}
                    ErrorMessage={
                      touched.model_id && errors.model_id
                        ? errors.model_id
                        : undefined
                    }
                  />
                  <LabelAndInput
                    id="car_type_id"
                    handleInput={(e) =>
                      setFieldValue("car_type_id", e.target.value.trimStart())
                    }
                    label={"Car Type ID"}
                    onBlur={() => setFieldTouched("car_type_id", true)}
                    placeholder={"Enter Car Type ID"}
                    value={values.car_type_id ?? ""}
                    ErrorMessage={
                      touched.car_type_id && errors.car_type_id
                        ? errors.car_type_id
                        : undefined
                    }
                  />
                  <LabelAndInput
                    id="insuranceExpiryDate"
                    handleInput={(e) =>
                      setFieldValue("insuranceExpiryDate", e.target.value)
                    }
                    label={"Insurance Expiry Date"}
                    value={values.insuranceExpiryDate ?? ""}
                    ErrorMessage={
                      touched.insuranceExpiryDate && errors.insuranceExpiryDate
                        ? errors.insuranceExpiryDate
                        : undefined
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
                    id="plate_number"
                    handleInput={(e) =>
                      setFieldValue("plate_number", e.target.value.trimStart())
                    }
                    label={"Plate Number"}
                    onBlur={() => setFieldTouched("plate_number", true)}
                    placeholder={"Enter Plate Number"}
                    value={values.plate_number ?? ""}
                    ErrorMessage={
                      touched.plate_number && errors.plate_number
                        ? errors.plate_number
                        : undefined
                    }
                  />
                  <LabelAndInput
                    id="car_year"
                    handleInput={(e) =>
                      setFieldValue("car_year", e.target.value.trimStart())
                    }
                    label={"Car Year"}
                    onBlur={() => setFieldTouched("car_year", true)}
                    placeholder={"Enter Car Year"}
                    value={values.car_year ?? ""}
                    ErrorMessage={
                      touched.car_year && errors.car_year
                        ? errors.car_year
                        : undefined
                    }
                  />
                  <LabelAndInput
                    id="color"
                    handleInput={(e) =>
                      setFieldValue("color", e.target.value.trimStart())
                    }
                    label={"Color"}
                    onBlur={() => setFieldTouched("color", true)}
                    placeholder={"Enter Color"}
                    value={values.color ?? ""}
                    ErrorMessage={
                      touched.color && errors.color ? errors.color : undefined
                    }
                  />
                </Box>

                {/* Upload License and Insurance Images */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    width: "100%",
                  }}
                >
                  <ImageUploader
                    label="Upload Car License Front"
                    name="car_license_front"
                    value={values.car_license_front}
                    setFieldValue={setFieldValue}
                    errorMessage={
                      touched.car_license_front && errors.car_license_front
                        ? errors.car_license_front
                        : undefined
                    }
                    isLightMode={isLightMode}
                  />
                  <ImageUploader
                    label="Upload Car License Back"
                    name="car_license_back"
                    value={values.car_license_back}
                    setFieldValue={setFieldValue}
                    errorMessage={
                      touched.car_license_back && errors.car_license_back
                        ? errors.car_license_back
                        : undefined
                    }
                    isLightMode={isLightMode}
                  />
                  <ImageUploader
                    label="Upload Insurance Image"
                    name="insurance_image"
                    value={values.insurance_image}
                    setFieldValue={setFieldValue}
                    errorMessage={
                      touched.insurance_image && errors.insurance_image
                        ? errors.insurance_image
                        : undefined
                    }
                    isLightMode={isLightMode}
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

export default AddCar;
