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

const Data = [
  {
    name: "Product A",
    from: "2024-01-01", // Date or range start
    to: "2024-12-31", // Date or range end
    "value-discount": 20, // Discount percentage or value
    "default-points": 100, // Default points
  },
  {
    name: "Product B",
    from: "2024-02-01",
    to: "2024-11-30",
    "value-discount": 15,
    "default-points": 200,
  },
  {
    name: "Product C",
    from: "2024-03-01",
    to: "2024-10-31",
    "value-discount": 10,
    "default-points": 150,
  },
];

const fields = [
  { key: "name", label: "Name" },
  { key: "from", label: "From" }, // Date or start range
  { key: "to", label: "To" }, // Date or end range
  { key: "value-discount", label: "Value Discount" }, // Discount field
  { key: "default-points", label: "Default Points" }, // Points field
];

const ClientLoyalty = () => {
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
            Client Loyalty List
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/client-loyalty/create")}
          >
            Add Loyalty
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
          <TableComponent fields={fields} data={Data} />
        </Box>
      </Box>
    </Box>
  );
};

export default ClientLoyalty;
