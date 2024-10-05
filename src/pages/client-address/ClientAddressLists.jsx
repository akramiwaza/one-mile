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

const clientData = [
  {
    client_id: "123",
    label: "Main Office",
    location: "New York",
    country_id: "USA",
    address: "123 5th Ave, New York, NY 10001",
    notes: "Main office for east coast operations",
    is_default: true,
  },
  {
    client_id: "456",
    label: "West Coast Office",
    location: "San Francisco",
    country_id: "USA",
    address: "456 Market St, San Francisco, CA 94103",
    notes: "Headquarters for west coast operations",
    is_default: false,
  },
  {
    client_id: "789",
    label: "European Branch",
    location: "London",
    country_id: "UK",
    address: "789 Kingsway, London WC2B 6NH",
    notes: "Primary office in Europe",
    is_default: false,
  },
];

const fields = [
  { key: "client_id", label: "Client ID" }, // Client ID
  { key: "label", label: "Label" }, // Label (e.g., Main Office)
  { key: "location", label: "Location" }, // Location (e.g., New York)
  { key: "country_id", label: "Country ID" }, // Country ID (e.g., USA)
  { key: "address", label: "Address" }, // Address
  { key: "notes", label: "Notes" }, // Notes (additional information)
  { key: "is_default", label: "Is Default", type: "boolean" }, // Boolean to indicate default
];

const ClientAddressLists = () => {
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
            Client Address List
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/client-address/create")}
          >
            Add Address
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
          <TableComponent fields={fields} data={clientData} />
        </Box>
      </Box>
    </Box>
  );
};

export default ClientAddressLists;
