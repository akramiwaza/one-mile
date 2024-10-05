import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Paper,
  Button,
} from "@mui/material";

// DynamicTable Component
const TableComponent = ({ fields, data, onToggleActive }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: "100%",
        overflowX: "auto",
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {fields.map((field, index) => (
              <TableCell key={index}>{field.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <DynamicTableRow
              key={index}
              item={item}
              fields={fields}
              onToggleActive={onToggleActive}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// DynamicTableRow Component
const DynamicTableRow = ({ item, fields, onToggleActive }) => {
  return (
    <TableRow>
      {fields.map((field, index) => (
        <TableCell key={index}>
          {field.type === "image" ? (
            <Avatar
              alt={field.label}
              src={item[field.key]}
              variant="square"
              sx={{ width: 50, height: 50, borderRadius: "5px" }}
            />
          ) : field.key === "name" ? (
            // Combine firstname and lastname into one field
            `${item.firstname} ${item.lastname}`
          ) : field.key === "phone" ? (
            // Combine phoneCode and phoneNumber into one field
            `${item.phoneCode}/${item.phoneNumber}`
          ) : field.key === "isActive" ? (
            // Conditionally render a button for isActive status
            onToggleActive ? (
              <Button
                variant="contained"
                color={item.isActive ? "error" : "success"}
                onClick={() => onToggleActive(item)}
              >
                {item.isActive ? "Deactivate" : "Activate"}
              </Button>
            ) : item.isActive ? (
              <Button
                variant="contained"
                color={"success"}
                sx={{ width: "90px" }}
              >
                Active
              </Button>
            ) : (
              <Button
                variant="contained"
                color={"error"}
                sx={{ width: "90px" }}
              >
                Inactive
              </Button>
            ) // Just display status if no onClick handler is provided
          ) : (
            item[field.key]
          )}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default TableComponent;


