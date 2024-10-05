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

const charityData = [
  {
    name: "Product A",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz9CmCKI9tj5ZoJIjgWecUIDKo-_bk53FSnsoLYsWSOLLLQ5UgSIBiTdGhnrNaWeyCOWc&usqp=CAU",
    value: 100,
    valuePercentage: "20%",
    isActive: true,
  },
  {
    name: "Product B",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz9CmCKI9tj5ZoJIjgWecUIDKo-_bk53FSnsoLYsWSOLLLQ5UgSIBiTdGhnrNaWeyCOWc&usqp=CAU",
    value: 200,
    valuePercentage: "15%",
    isActive: false,
  },
  {
    name: "Product C",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz9CmCKI9tj5ZoJIjgWecUIDKo-_bk53FSnsoLYsWSOLLLQ5UgSIBiTdGhnrNaWeyCOWc&usqp=CAU",
    value: 150,
    valuePercentage: "10%",
    isActive: true,
  },
];

const fields = [
  { key: "name", label: "Name" },
  { key: "logo", label: "Logo", type: "image" }, // Special field for images
  { key: "value", label: "Value" },
  { key: "valuePercentage", label: "Value Percentage" },
  { key: "isActive", label: "Is Active", type: "boolean" }, // Boolean for active status
];

const CharityList = () => {
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
            Charity List
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/charity/create")}
          >
            Add Charity
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
          <TableComponent fields={fields} data={charityData} />
        </Box>
      </Box>
    </Box>
  );
};

export default CharityList;
