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
import { Formik, Form, ErrorMessage, Field, useFormik } from "formik";
import * as Yup from "yup";
import { useTheme } from "@emotion/react";
import LabelAndInput from "src/views/ui-components/LabelAndInput";
import { FileUploader } from "react-drag-drop-files";
import CloudUploadIcon from "@mui/icons-material/CloudUpload"; // Import the Material-UI icon
import { useNavigate } from "react-router";
import PhoneNumberInput from "src/components/shared/PhoneNumberInput";

const countryCodes = [
  { code: "+961", label: "Lebanon", flag: "https://flagcdn.com/w320/lb.png" },
  { code: "+1", label: "USA", flag: "https://flagcdn.com/w320/us.png" },
  { code: "+44", label: "UK", flag: "https://flagcdn.com/w320/gb.png" },
];

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
  car_id: Yup.string().required("Card ID is required"),
  profile_image: Yup.string().required("required"),
  firstname: Yup.string().required("First Name is required"),
  lastname: Yup.string().required("Last Name is required"),
  phoneCode: Yup.string().required("Phone Code is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().email().required("Email is required"),
  gender: Yup.string().required("Gender is required"),
  driverCode: Yup.string().required("Driver Code is required"),
  driverLicenceFront: Yup.mixed().required("Driver Licence Front is required"),
  driverLicenceBack: Yup.mixed().required("Driver Licence Back is required"),
  driverIdFront: Yup.mixed().required("Driver ID Front is required"),
  driverIdBack: Yup.mixed().required("Driver ID Back is required"),
  licenceExpiryDate: Yup.date().required("Licence Expiry Date is required"),
  isActive: Yup.boolean(),
  isOnline: Yup.boolean(),
  commissionRate: Yup.string().required("required"),
});

const AddDriver = () => {
  const theme = useTheme();
  const isLightMode = theme.palette.mode === "light";
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        car_id: "",
        profile_image: "",
        firstname: "",
        lastname: "",
        phoneCode: "+961",
        phoneNumber: "",
        username: "",
        email: "",
        gender: "",
        driverCode: "",
        driverLicenceFront: null,
        driverLicenceBack: null,
        driverIdFront: null,
        driverIdBack: null,
        licenceExpiryDate: "",
        isActive: true,
        isOnline: false,
        commissionRate: "",
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
                  Add Driver
                </Typography>
              </Box>

              <Box
                sx={{
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  placeSelf: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    position: "relative",
                  }}
                >
                  {/* Display Avatar with uploaded image or placeholder */}
                  <Avatar
                    alt="Car Image"
                    src={
                      values.profile_image
                        ? URL.createObjectURL(values.profile_image)
                        : ""
                    }
                    sx={{ width: 100, height: 100, marginBottom: 2 }}
                  />
                  {values.profile_image ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        setFieldValue("profile_image", null);
                      }}
                    >
                      Remove Image
                    </Button>
                  ) : (
                    <Button variant="contained" component="label">
                      Upload Profile Image
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(event) => {
                          const file = event.currentTarget.files[0];
                          if (file) {
                            setFieldValue("profile_image", file);
                          }
                        }}
                      />
                    </Button>
                  )}
                  {touched.profile_image && errors.profile_image && (
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
                      {errors.profile_image}
                    </p>
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    gap: "10px",
                  }}
                >
                  <FormControlLabel
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
                  <FormControlLabel
                    control={
                      <Switch
                        checked={values.isOnline}
                        onChange={(e) =>
                          setFieldValue("isOnline", e.target.checked)
                        }
                      />
                    }
                    label="Is Online"
                  />
                </Box>
                {/* Upload Driver Licence Front */}
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
                  Add Driver Information
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
                    id="firstname"
                    handleInput={(e) =>
                      setFieldValue("firstname", e.target.value.trimStart())
                    }
                    label={"First Name"}
                    value={values.firstname ?? ""}
                    ErrorMessage={
                      touched.firstname && errors.firstname
                        ? errors.firstname
                        : undefined
                    }
                  />
                  <LabelAndInput
                    id="lastname"
                    handleInput={(e) =>
                      setFieldValue("lastname", e.target.value.trimStart())
                    }
                    label={"Last Name"}
                    value={values.lastname ?? ""}
                    ErrorMessage={
                      touched.lastname && errors.lastname
                        ? errors.lastname
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
                    id="username"
                    handleInput={(e) =>
                      setFieldValue("username", e.target.value.trimStart())
                    }
                    label={"Username"}
                    value={values.username ?? ""}
                    ErrorMessage={
                      touched.username && errors.username
                        ? errors.username
                        : undefined
                    }
                  />
                  <PhoneNumberInput
                    countryCodes={countryCodes}
                    onChangeData={(phoneCode, phoneNumber) => {
                      setFieldValue("phoneCode", phoneCode);
                      setFieldValue("phoneNumber", phoneNumber);
                    }}
                    values={{
                      phoneCode: values.phoneCode,
                      phoneNumber: values.phoneNumber,
                    }}
                    errors={
                      touched.phoneNumber && errors.phoneNumber
                        ? errors.phoneNumber
                        : touched.phoneCode && errors.phoneCode
                        ? errors.phoneCode
                        : undefined
                    }
                    label={"Phone Number"}
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
                    id="email"
                    handleInput={(e) =>
                      setFieldValue("email", e.target.value.trimStart())
                    }
                    label={"Email"}
                    value={values.email ?? ""}
                    ErrorMessage={
                      touched.email && errors.email ? errors.email : undefined
                    }
                  />
                  <LabelAndInput
                    id="driverCode"
                    handleInput={(e) =>
                      setFieldValue("driverCode", e.target.value.trimStart())
                    }
                    label={"Driver Code"}
                    value={values.driverCode ?? ""}
                    ErrorMessage={
                      touched.driverCode && errors.driverCode
                        ? errors.driverCode
                        : undefined
                    }
                  />
                </Box>
                <LabelAndInput
                  id="licenceExpiryDate"
                  handleInput={(e) =>
                    setFieldValue("licenceExpiryDate", e.target.value)
                  }
                  label={"Licence Expiry Date"}
                  value={values.licenceExpiryDate ?? ""}
                  ErrorMessage={
                    touched.licenceExpiryDate && errors.licenceExpiryDate
                      ? errors.licenceExpiryDate
                      : undefined
                  }
                  type="date"
                />

                {/* isActive and isOnline Switches */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <ImageUploader
                    label="Upload Driver Licence Front"
                    name="driverLicenceFront"
                    value={values.driverLicenceFront}
                    setFieldValue={setFieldValue}
                    errorMessage={
                      touched.driverLicenceFront && errors.driverLicenceFront
                        ? errors.driverLicenceFront
                        : undefined
                    }
                    isLightMode={isLightMode}
                  />
                  <ImageUploader
                    label="Upload Driver Licence Back"
                    name="driverLicenceBack"
                    value={values.driverLicenceBack}
                    setFieldValue={setFieldValue}
                    errorMessage={
                      touched.driverLicenceBack && errors.driverLicenceBack
                        ? errors.driverLicenceBack
                        : undefined
                    }
                    isLightMode={isLightMode}
                  />
                  <ImageUploader
                    label="Upload Driver Id Front"
                    name="driverIdFront"
                    value={values.driverIdFront}
                    setFieldValue={setFieldValue}
                    errorMessage={
                      touched.driverIdFront && errors.driverIdFront
                        ? errors.driverIdFront
                        : undefined
                    }
                    isLightMode={isLightMode}
                  />
                  <ImageUploader
                    label="Upload Driver Id Back"
                    name="driverIdFront"
                    value={values.driverIdBack}
                    setFieldValue={setFieldValue}
                    errorMessage={
                      touched.driverIdBack && errors.driverIdBack
                        ? errors.driverIdBack
                        : undefined
                    }
                    isLightMode={isLightMode}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <LabelAndInput
                    id="licenceExpiryDate"
                    handleInput={(e) =>
                      setFieldValue("licenceExpiryDate", e.target.value)
                    }
                    label={"Licence Expiry Date"}
                    value={values.licenceExpiryDate ?? ""}
                    ErrorMessage={
                      touched.licenceExpiryDate && errors.licenceExpiryDate
                        ? errors.licenceExpiryDate
                        : undefined
                    }
                    type="date"
                  />
                  <LabelAndInput
                    id="commissionRate"
                    handleInput={(e) =>
                      setFieldValue(
                        "commissionRate",
                        e.target.value.trimStart()
                      )
                    }
                    label={"Commission Rate :"}
                    onBlur={() => setFieldTouched("commissionRate", true)}
                    placeholder={"Enter Commission Rate"}
                    value={values.commissionRate ?? ""}
                    ErrorMessage={
                      touched.commissionRate && errors.commissionRate
                        ? errors.commissionRate
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

export default AddDriver;
