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
import PhoneNumberInput from "src/components/shared/PhoneNumberInput";

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
  profile_pic: Yup.mixed().required("Profile picture is required"), // Validation for profile picture
  f_name: Yup.string().required("First name is required"), // Validation for first name
  l_name: Yup.string().required("Last name is required"), // Validation for last name
  email: Yup.string().email("Invalid email").required("Email is required"), // Validation for email
  phone_code: Yup.string().required("Phone code is required"), // Validation for phone code
  phone_number: Yup.string().required("Phone number is required"), // Validation for phone number
  password: Yup.string().required("Password is required"), // Validation for password
  gender: Yup.string().required("Gender is required"), // Validation for gender
  is_active: Yup.boolean().required("Active status is required"), // Validation for active status
  connect_client_id: Yup.string(), // Optional client connection ID
  fb_id: Yup.string(), // Optional Facebook ID
  google_id: Yup.string(), // Optional Google ID
  loyalty_id: Yup.string(), // Optional loyalty ID
  is_deleted: Yup.boolean().required("Deleted status is required"), // Validation for deleted status
});

const countryCodes = [
  { code: "+961", label: "Lebanon", flag: "https://flagcdn.com/w320/lb.png" },
  { code: "+1", label: "USA", flag: "https://flagcdn.com/w320/us.png" },
  { code: "+44", label: "UK", flag: "https://flagcdn.com/w320/gb.png" },
];

const AddClient = () => {
  const theme = useTheme();
  const isLightMode = theme.palette.mode === "light";
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        profile_pic: null, // Profile picture (image)
        f_name: "", // First name
        l_name: "", // Last name
        email: "", // Email
        phone_code: "+961", // Phone code (e.g., country code)
        phone_number: "", // Phone number
        password: "", // Password (can be hashed or plain, depending on use case)
        gender: "", // Gender (e.g., Male, Female, etc.)
        is_active: true, // Active status (default set to true)
        connect_client_id: "", // Client connection ID (if applicable)
        fb_id: "", // Facebook ID (if applicable)
        google_id: "", // Google ID (if applicable)
        loyalty_id: "", // Loyalty ID (if applicable)
        is_deleted: false, // Deleted status (default false)
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
                  Add Client
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
                    alt="Client Image"
                    src={
                      values.profile_pic
                        ? URL.createObjectURL(values.profile_pic)
                        : ""
                    }
                    sx={{ width: 100, height: 100, marginBottom: 2 }}
                  />
                  {values.profile_pic ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        setFieldValue("profile_pic", null);
                      }}
                    >
                      Remove Image
                    </Button>
                  ) : (
                    <Button variant="contained" component="label">
                      Upload Client Image
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(event) => {
                          const file = event.currentTarget.files[0];
                          if (file) {
                            setFieldValue("profile_pic", file);
                          }
                        }}
                      />
                    </Button>
                  )}
                  {touched.profile_pic && errors.profile_pic && (
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
                      {errors.profile_pic}
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
                        checked={values.is_active}
                        onChange={(e) =>
                          setFieldValue("is_active", e.target.checked)
                        }
                      />
                    }
                    label="Is Active"
                  />
                  <FormControlLabel
                    sx={{ marginTop: "10px" }}
                    control={
                      <Switch
                        checked={values.is_deleted}
                        onChange={(e) =>
                          setFieldValue("is_deleted", e.target.checked)
                        }
                      />
                    }
                    label="Is Deleted"
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
                  Add Client Information
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
                    id="f_name"
                    handleInput={(e) =>
                      setFieldValue("f_name", e.target.value.trimStart())
                    }
                    label={"FirstName"}
                    onBlur={() => setFieldTouched("f_name", true)}
                    placeholder={"Enter FirstName"}
                    value={values.f_name ?? ""}
                    ErrorMessage={
                      touched.f_name && errors.f_name
                        ? errors.f_name
                        : undefined
                    }
                  />
                  <LabelAndInput
                    id="l_name"
                    handleInput={(e) =>
                      setFieldValue("l_name", e.target.value.trimStart())
                    }
                    label={"LastName"}
                    onBlur={() => setFieldTouched("l_name", true)}
                    placeholder={"Enter LastName"}
                    value={values.l_name ?? ""}
                    ErrorMessage={
                      touched.l_name && errors.l_name
                        ? errors.l_name
                        : undefined
                    }
                  />
                  <LabelAndInput
                    id="email"
                    handleInput={(e) => setFieldValue("email", e.target.value)}
                    placeholder={"Enter Email"}
                    label={"Email"}
                    value={values.email ?? ""}
                    ErrorMessage={
                      touched.email && errors.email ? errors.email : undefined
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
                    id="password"
                    handleInput={(e) =>
                      setFieldValue("password", e.target.value.trimStart())
                    }
                    label={"Password"}
                    onBlur={() => setFieldTouched("password", true)}
                    placeholder={"Enter Password"}
                    value={values.password ?? ""}
                    ErrorMessage={
                      touched.password && errors.password
                        ? errors.password
                        : undefined
                    }
                  />
                  <PhoneNumberInput
                    countryCodes={countryCodes}
                    onChangeData={(phoneCode, phoneNumber) => {
                      setFieldValue("phone_code", phoneCode);
                      setFieldValue("phone_number", phoneNumber);
                    }}
                    values={{
                      phoneCode: values.phone_code,
                      phoneNumber: values.phone_number,
                    }}
                    errors={
                      touched.phone_number && errors.phone_number
                        ? errors.phone_number
                        : touched.phone_code && errors.phone_code
                        ? errors.phone_code
                        : undefined
                    }
                    label={"Phone Number"}
                  />
                  <LabelAndInput
                    id="gender"
                    handleInput={(e) =>
                      setFieldValue("gender", e.target.value.trimStart())
                    }
                    label={"Gender"}
                    onBlur={() => setFieldTouched("gender", true)}
                    placeholder={"Enter Gender"}
                    value={values.gender ?? ""}
                    ErrorMessage={
                      touched.gender && errors.gender
                        ? errors.gender
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
                    id="connect_client_id"
                    handleInput={(e) =>
                      setFieldValue(
                        "connect_client_id",
                        e.target.value.trimStart()
                      )
                    }
                    label={"Connect Client"}
                    onBlur={() => setFieldTouched("connect_client_id", true)}
                    value={values.connect_client_id ?? ""}
                    ErrorMessage={
                      touched.connect_client_id && errors.connect_client_id
                        ? errors.connect_client_id
                        : undefined
                    }
                  />
                  <LabelAndInput
                    id="fb_id"
                    handleInput={(e) =>
                      setFieldValue("fb_id", e.target.value.trimStart())
                    }
                    label={"Facebook Id"}
                    onBlur={() => setFieldTouched("fb_id", true)}
                    value={values.fb_id ?? ""}
                    ErrorMessage={
                      touched.fb_id && errors.fb_id ? errors.fb_id : undefined
                    }
                  />
                  <LabelAndInput
                    id="google_id"
                    handleInput={(e) =>
                      setFieldValue("google_id", e.target.value.trimStart())
                    }
                    label={"Google Id"}
                    onBlur={() => setFieldTouched("google_id", true)}
                    value={values.google_id ?? ""}
                    ErrorMessage={
                      touched.google_id && errors.google_id
                        ? errors.google_id
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
                    id="loyalty_id"
                    handleInput={(e) =>
                      setFieldValue("loyalty_id", e.target.value.trimStart())
                    }
                    label={"Loyalty Id"}
                    onBlur={() => setFieldTouched("loyalty_id", true)}
                    value={values.loyalty_id ?? ""}
                    ErrorMessage={
                      touched.loyalty_id && errors.loyalty_id
                        ? errors.loyalty_id
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

export default AddClient;
