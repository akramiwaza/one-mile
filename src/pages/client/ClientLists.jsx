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

const userData = [
  {
    profile_pic: "https://example.com/profile-pic1.jpg", // URL to profile picture
    f_name: "John", // First name
    l_name: "Doe", // Last name
    email: "john.doe@example.com", // Email address
    phone_code: "+1", // Phone code (e.g., country code)
    phone_number: "1234567890", // Phone number
    password: "hashed_password", // User's password (hashed)
    gender: "Male", // Gender (e.g., Male, Female, etc.)
    is_active: false, // Whether the user is active
    is_credit: true, // Whether the user is active
    connect_client_id: "abc123", // Client connection ID (if applicable)
    fb_id: "facebook123", // Facebook ID (if connected)
    google_id: "google123", // Google ID (if connected)
    date_joined: "2023-01-01", // Date the user joined
    last_login: "2024-01-15", // Last login date
    loyalty_id: "loyalty123", // Loyalty ID (if applicable)
    is_deleted: true, // Whether the user is deleted
  },
  {
    profile_pic: "https://example.com/profile-pic2.jpg",
    f_name: "Jane",
    l_name: "Smith",
    email: "jane.smith@example.com",
    phone_code: "+44",
    phone_number: "9876543210",
    password: "hashed_password",
    gender: "Female",
    is_active: true,
    is_credit: false, // Whether the user is active
    connect_client_id: "def456",
    fb_id: "facebook456",
    google_id: "google456",
    date_joined: "2022-05-01",
    last_login: "2024-02-01",
    loyalty_id: "loyalty456",
    is_deleted: false,
  },
];

const fields = [
  { key: "profile_pic", label: "Profile Picture", type: "image" }, // Profile picture (image)
  { key: "f_name", label: "First Name" }, // First name
  { key: "l_name", label: "Last Name" }, // Last name
  { key: "email", label: "Email" }, // Email
  { key: "phone_code", label: "Phone Code" }, // Phone code
  { key: "phone_number", label: "Phone Number" }, // Phone number
  { key: "password", label: "Password", type: "password" }, // Password (hashed or encrypted)
  { key: "gender", label: "Gender" }, // Gender
  { key: "is_active", label: "Is Active", type: "boolean" }, // Active status
  { key: "connect_client_id", label: "Connect Client ID" }, // Client connection ID
  { key: "fb_id", label: "Facebook ID" }, // Facebook ID
  { key: "google_id", label: "Google ID" }, // Google ID
  { key: "date_joined", label: "Date Joined", type: "date" }, // Date joined
  { key: "last_login", label: "Last Login", type: "date" }, // Last login
  { key: "loyalty_id", label: "Loyalty ID" }, // Loyalty ID
  { key: "is_deleted", label: "Is Deleted", type: "boolean" }, // Deleted status
];

const ClientLists = () => {
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
            Clients List
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/client/create")}
          >
            Add Client
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
          <TableComponent fields={fields} data={userData} />
        </Box>
      </Box>
    </Box>
  );
};

export default ClientLists;
