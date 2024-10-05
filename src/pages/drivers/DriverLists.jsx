import React from "react";
import { useTheme } from "@emotion/react";
import {
  Box,
  Grid,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import TableComponent from "src/components/shared/TableComponent";

const driversData = [
  {
    car_id: "12345",
    profilePic:
      "data:image/jpeg;base64,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",
    firstname: "John",
    lastname: "Doe",
    phoneCode: "+1",
    phoneNumber: "123456789",
    username: "johndoe",
    email: "john@example.com",
    gender: "Male",
    driverCode: "DR123",
    driverLicenceFront: "https://example.com/path/to/licence-front.jpg",
    driverLicenceBack: "https://example.com/path/to/licence-back.jpg",
    driverIdFront: "https://example.com/path/to/id-front.jpg",
    driverIdBack: "https://example.com/path/to/id-back.jpg",
    licenceExpiryDate: "2025-12-31",
    isActive: true,
  },
  {
    car_id: "125",
    profilePic:
      "data:image/jpeg;base64,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",
    firstname: "John",
    lastname: "Doe",
    phoneCode: "+1",
    phoneNumber: "123456789",
    username: "johndoe",
    email: "john@example.com",
    gender: "Male",
    driverCode: "DR123",
    driverLicenceFront: "https://example.com/path/to/licence-front.jpg",
    driverLicenceBack: "https://example.com/path/to/licence-back.jpg",
    driverIdFront: "https://example.com/path/to/id-front.jpg",
    driverIdBack: "https://example.com/path/to/id-back.jpg",
    licenceExpiryDate: "2025-12-31",
    isActive: false,
  },
];

const fields = [
  { key: "profilePic", label: "Profile Picture", type: "image" },
  { key: "name", label: "Name" }, // Combined firstname and lastname
  { key: "phone", label: "Phone Number" }, // Combined phoneCode and phoneNumber
  { key: "email", label: "Email" },
  { key: "gender", label: "Gender" },
  { key: "driverCode", label: "Driver Code" },
  { key: "licenceExpiryDate", label: "Licence Expiry Date" },
  { key: "isActive", label: "Is Active", type: "boolean" },
];

const DriverLists = () => {
  const theme = useTheme();
  const isLightMode = theme.palette.mode === "light";
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        width: "100%",
      }}
    >
      <Box
        sx={{
          border: isLightMode ? "1px solid #dfe7ff" : "1px solid #6c757d",
          borderRadius: "4px;",
          marginBottom: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "start",
            justifyContent: "space-between",
            width: "100%",
            borderBottom: isLightMode
              ? "1px solid #dfe7ff"
              : "1px solid #6c757d",
            padding: "20px",
            borderRadius: "0px",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: isLightMode ? "#303030" : "#fff",
              fontWeight: "bold",
              fontSize: "1.44rem",
            }}
          >
            Drivers List
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/drivers/create")}
          >
            Add Driver
          </Button>
        </Box>
        <Box
          sx={{
            padding: "20px",
            width: "100%",
          }}
        >
          <Grid container spacing={2} alignItems="center">
            {/* Status dropdown */}
            <Grid item xs={12} md={6} lg={4}>
              <FormControl fullWidth>
                <InputLabel>Status(info)</InputLabel>
                <Select defaultValue="All" label="Status(info)">
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Submit Button */}
            <Grid item>
              <Button variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
          {/* Additional controls for entries and search */}
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            sx={{ marginTop: "20px" }}
          >
            {/* Entries dropdown */}
            <Grid item>
              <FormControl>
                <InputLabel>Show</InputLabel>
                <Select defaultValue={10} label="Show">
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Search Box */}
            <Grid item>
              <TextField placeholder="Search" variant="outlined" size="small" />
            </Grid>
          </Grid>
          <TableComponent fields={fields} data={driversData} />
        </Box>
      </Box>
    </Box>
  );
};

export default DriverLists;
