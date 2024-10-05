import React from "react";
import {
  Grid,
  Button,
  FormControlLabel,
  Box,
  Typography,
  Switch,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useTheme } from "@emotion/react";
import LabelAndInput from "src/views/ui-components/LabelAndInput";
import { FileUploader } from "react-drag-drop-files";
import CloudUploadIcon from "@mui/icons-material/CloudUpload"; // Import the Material-UI icon
import { useNavigate } from "react-router";
import LabelAndTextArea from "src/views/ui-components/LabelAndTextArea";
import MapPicker from "src/views/ui-components/MapPicker";
import ZoneMap from "src/views/ui-components/ZoneMap";

// Validation Schema
const Schema = Yup.object().shape({
  client_id: Yup.string().required("Client ID is required"), // Validation for Client ID
  label: Yup.string().required("Label is required"), // Validation for Label
  location: Yup.object()
    .shape({
      lat: Yup.number().required("Latitude is required"),
      lng: Yup.number().required("Longitude is required"),
    })
    .required("Location is required"),
  country_id: Yup.string().required("Country ID is required"), // Validation for Country ID
  address: Yup.string().required("Address is required"), // Validation for Address
  notes: Yup.string(), // Notes are optional
  is_default: Yup.boolean().required("Default status is required"), // Validation for Default status
});

const AddClientAddress = () => {
  const theme = useTheme();
  const isLightMode = theme.palette.mode === "light";
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        client_id: "", // Client ID
        label: "", // Label (e.g., Main Office)
        location: { lat: "", lng: "" }, // Store location as an object with lat, lng
        country_id: "", // Country ID (e.g., USA)
        address: "", // Address
        notes: "", // Additional information or notes
        is_default: false, // Default status (initially false)
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
                  Add Client Address Information
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
                    id="client_id"
                    handleInput={(e) =>
                      setFieldValue("client_id", e.target.value.trimStart())
                    }
                    label={"Client ID"}
                    onBlur={() => setFieldTouched("client_id", true)}
                    placeholder={"Enter Client ID"}
                    value={values.client_id ?? ""}
                    ErrorMessage={
                      touched.client_id && errors.client_id
                        ? errors.client_id
                        : undefined
                    }
                  />
                  <LabelAndInput
                    id="label"
                    handleInput={(e) =>
                      setFieldValue("label", e.target.value.trimStart())
                    }
                    label={"Label"}
                    onBlur={() => setFieldTouched("label", true)}
                    placeholder={"Enter Label"}
                    value={values.label ?? ""}
                    ErrorMessage={
                      touched.label && errors.label ? errors.label : undefined
                    }
                  />
                  <LabelAndInput
                    id="country_id"
                    handleInput={(e) =>
                      setFieldValue("country_id", e.target.value)
                    }
                    label={"Country Id"}
                    value={values.country_id ?? ""}
                    ErrorMessage={
                      touched.country_id && errors.country_id
                        ? errors.country_id
                        : undefined
                    }
                  />
                </Box>
                <LabelAndInput
                  id="Location"
                  handleInput={() => {}}
                  label={"Location"}
                  value={`${values.location.lat ?? ""}, ${
                    values.location.lng ?? ""
                  }`} // Combine lat and lng as one value
                  ErrorMessage={
                    touched.location && errors.location
                      ? errors.location
                      : undefined
                  }
                  disabled={true}
                />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    width: "100%",
                  }}
                >
                  <LabelAndInput
                    id="address"
                    handleInput={(e) =>
                      setFieldValue("address", e.target.value.trimStart())
                    }
                    label={"Address"}
                    onBlur={() => setFieldTouched("address", true)}
                    placeholder={"Enter Address"}
                    value={values.address ?? ""}
                    ErrorMessage={
                      touched.address && errors.address
                        ? errors.address
                        : undefined
                    }
                  />
                  <LabelAndTextArea
                    id="notes"
                    handleInput={(e) =>
                      setFieldValue("notes", e.target.value.trimStart())
                    }
                    label={"Notes"}
                    onBlur={() => setFieldTouched("notes", true)}
                    placeholder={"Enter Notes"}
                    value={values.notes ?? ""}
                    ErrorMessage={
                      touched.notes && errors.notes ? errors.notes : undefined
                    }
                  />
                  <FormControlLabel
                    sx={{ marginTop: "10px", whiteSpace: "nowrap" }}
                    control={
                      <Switch
                        checked={values.is_default}
                        onChange={(e) =>
                          setFieldValue("is_default", e.target.checked)
                        }
                      />
                    }
                    label="Is Default"
                  />
                </Box>
                <MapPicker
                  onLocationSelect={(location) => {
                    setFieldValue("location.lat", location.lat);
                    setFieldValue("location.lng", location.lng);
                  }}
                />
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

export default AddClientAddress;
