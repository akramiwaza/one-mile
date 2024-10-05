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
import LabelAndInputArabic from "src/views/ui-components/LabelAndInputArabic";

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
  titleEn: Yup.string().required("Title (English) is required"),
  titleAr: Yup.string().required("Title (Arabic) is required"),
  carImage: Yup.mixed().required("Car Image is required"),
  capacity: Yup.number()
    .required("Capacity is required")
    .min(1, "Capacity must be at least 1"),
  centryId: Yup.number()
    .required("Centry ID is required")
    .positive("Centry ID must be positive"),
  minFee: Yup.number()
    .required("Minimum Fee is required")
    .positive("Minimum Fee must be a positive number"),
  perDistancePrice: Yup.number()
    .required("Price per Distance is required")
    .positive("Price per Distance must be positive"),
  perMinutePrice: Yup.number()
    .required("Price per Minute is required")
    .positive("Price per Minute must be positive"),
  isActive: Yup.boolean().required("Active Status is required"),
});

const AddCarTypes = () => {
  const theme = useTheme();
  const isLightMode = theme.palette.mode === "light";
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        titleEn: "",
        titleAr: "",
        carImage: null,
        capacity: "",
        centryId: "",
        minFee: "",
        perDistancePrice: "",
        perMinutePrice: "",
        isActive: false,
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
                  Add Car Type
                </Typography>
              </Box>

              <Box
                sx={{
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
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
                      values.carImage
                        ? URL.createObjectURL(values.carImage)
                        : ""
                    }
                    sx={{ width: 100, height: 100, marginBottom: 2 }}
                  />
                  {values.carImage ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        setFieldValue("carImage", null);
                      }}
                    >
                      Remove Image
                    </Button>
                  ) : (
                    <Button variant="contained" component="label">
                      Upload Car Type Image
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(event) => {
                          const file = event.currentTarget.files[0];
                          if (file) {
                            setFieldValue("carImage", file);
                          }
                        }}
                      />
                    </Button>
                  )}
                  {touched.carImage && errors.carImage && (
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
                      {errors.carImage}
                    </p>
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
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
                  Add Car Type Information
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
                    id="titleEn"
                    handleInput={(e) =>
                      setFieldValue("titleEn", e.target.value.trimStart())
                    }
                    label={"Title En"}
                    onBlur={() => setFieldTouched("titleEn", true)}
                    placeholder={"Enter Title En"}
                    value={values.titleEn ?? ""}
                    ErrorMessage={
                      touched.titleEn && errors.titleEn
                        ? errors.titleEn
                        : undefined
                    }
                  />
                  <LabelAndInputArabic
                    id="titleAr"
                    handleInput={(e) =>
                      setFieldValue("titleAr", e.target.value.trimStart())
                    }
                    label={"Title Ar"}
                    onBlur={() => setFieldTouched("titleAr", true)}
                    placeholder={"Enter Title Ar"}
                    value={values.titleAr ?? ""}
                    ErrorMessage={
                      touched.titleAr && errors.titleAr
                        ? errors.titleAr
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
                    id="capacity"
                    handleInput={(e) =>
                      setFieldValue("capacity", e.target.value.trimStart())
                    }
                    label={"Capacity"}
                    onBlur={() => setFieldTouched("capacity", true)}
                    placeholder={"Enter Capacity"}
                    value={values.capacity ?? ""}
                    ErrorMessage={
                      touched.capacity && errors.capacity
                        ? errors.capacity
                        : undefined
                    }
                  />
                  <LabelAndInput
                    id="centryId"
                    handleInput={(e) =>
                      setFieldValue("centryId", e.target.value.trimStart())
                    }
                    label={"Centry Id"}
                    onBlur={() => setFieldTouched("centryId", true)}
                    placeholder={"Enter centryId"}
                    value={values.centryId ?? ""}
                    ErrorMessage={
                      touched.centryId && errors.centryId
                        ? errors.centryId
                        : undefined
                    }
                  />
                  <LabelAndInput
                    id="minFee"
                    handleInput={(e) =>
                      setFieldValue("minFee", e.target.value.trimStart())
                    }
                    label={"minFee"}
                    onBlur={() => setFieldTouched("minFee", true)}
                    placeholder={"Enter Min Fee"}
                    value={values.minFee ?? ""}
                    ErrorMessage={
                      touched.minFee && errors.minFee
                        ? errors.minFee
                        : undefined
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
                  <LabelAndInput
                    id="perDistancePrice"
                    handleInput={(e) =>
                      setFieldValue(
                        "perDistancePrice",
                        e.target.value.trimStart()
                      )
                    }
                    label={"perDistancePrice"}
                    onBlur={() => setFieldTouched("perDistancePrice", true)}
                    placeholder={"Per Distance Price"}
                    value={values.perDistancePrice ?? ""}
                    ErrorMessage={
                      touched.perDistancePrice && errors.perDistancePrice
                        ? errors.perDistancePrice
                        : undefined
                    }
                  />
                  <LabelAndInput
                    id="perMinutePrice"
                    handleInput={(e) =>
                      setFieldValue(
                        "perMinutePrice",
                        e.target.value.trimStart()
                      )
                    }
                    label={"Per Minute Price"}
                    onBlur={() => setFieldTouched("perMinutePrice", true)}
                    placeholder={"Per Distance Price"}
                    value={values.perMinutePrice ?? ""}
                    ErrorMessage={
                      touched.perMinutePrice && errors.perMinutePrice
                        ? errors.perMinutePrice
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

export default AddCarTypes;
