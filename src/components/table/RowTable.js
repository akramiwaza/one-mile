import { format } from "date-fns";
import {
  Box,
  TableCell,
  TableRow,
  IconButton,
  Tooltip,
  Typography,
  Avatar,
  Switch,
  Checkbox,
  Skeleton,
  CircularProgress,
} from "@mui/material";

import { IconDotsVertical } from "@tabler/icons";
import CustomCheckbox from "../forms/theme-elements/CustomCheckbox";
import { useState } from "react";
import DropDown from "./DropDown";
import { columntype } from "src/helper/publicFunction";
import UrlApi from "src/utils/Url";

const RowTable = ({
  row,
  index,
  handleClick,
  onPressItem,
  isSelected,
  Listdropdown,
  columns,
  withOption,
  headCells,
  onPressAnyAction,
  loadingEditdatatype,
  withDeleteItem,
  withEditItem,
  isLogs,
  provided,
  snapshot,
}) => {
  const [openDropdown, setopenDropdown] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);
  const isItemSelected = isSelected(row.id);
  const labelId = `enhanced-table-checkbox-${index}`;

  const onChange = (row, column) => {
    if (!loadingEditdatatype) {
      let newData;
      if (row[column.name] == 1 || row[column.name] == 0) {
        newData = row[column.name] == 1 ? 0 : 1;
      } else if (row[column.name] == true || row[column.name] == false) {
        newData = row[column.name] == true ? false : true;
      } else if (row[column.name] == "true" || row[column.name] == "false") {
        newData = row[column.name] == "true" ? "false" : "true";
      }
      onPressAnyAction(row, column.name, newData);
    }
  };

  const loadingComponent = () => {
    return (
      <TableCell>
        <CircularProgress />
      </TableCell>
    );
  };

  return (
    <TableRow
      hover
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.id}
      selected={isItemSelected}
      {...provided?.draggableProps} // Apply draggableProps for drag-and-drop
      {...provided?.dragHandleProps} // Apply dragHandleProps for drag-and-drop
      ref={provided?.innerRef}
      sx={{
        backgroundColor: snapshot.isDragging ? "gray" : "white",
        width: "100%",
        flex: 1,
        color: snapshot.isDragging ? "white" : "black",
        transition: "background-color 0.2s ease",
      }}
    >
      {withDeleteItem && (
        <TableCell padding="checkbox">
          <CustomCheckbox
            color="primary"
            checked={isItemSelected}
            onChange={() => {
              handleClick(row.id);
            }}
            inputprops={{
              "aria-labelledby": labelId,
            }}
          />
        </TableCell>
      )}

      {headCells.map((title, indexheadCells) => {
        if (title.hide) {
          return;
        }
        return columns?.map((column, index) => {
          if (column.type == columntype.time && column.name == title.id) {
            return (
              <TableCell onClick={() => onPressItem(row)}>
                <Typography>
                  {row[column.name]
                    ? format(new Date(row[column.name]), "h:mm a")
                    : "-"}
                </Typography>
              </TableCell>
            );
          } else if (
            column.type == columntype.html &&
            column.name == title.id
          ) {
            return (
              <TableCell onClick={() => onPressItem(row)}>
                <Typography>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: row[column.name],
                    }}
                  />
                </Typography>
              </TableCell>
            );
          } else if (
            column.type == columntype.dateAndtime &&
            column.name == title.id
          ) {
            return (
              <TableCell onClick={() => onPressItem(row)}>
                <Typography>
                  {row[column.name]
                    ? format(new Date(row[column.name]), "E, MMM d yyyy h:mm a")
                    : "-"}
                </Typography>
              </TableCell>
            );
          } else if (
            column.type == columntype.date &&
            column.name == title.id
          ) {
            return (
              <TableCell onClick={() => onPressItem(row)}>
                <Typography>
                  {row[column.name]
                    ? format(new Date(row[column.name]), "E, MMM d yyyy")
                    : "-"}
                </Typography>
              </TableCell>
            );
          } else if (
            column.type == columntype.image &&
            column.name == title.id
          ) {
            return (
              <TableCell
                onClick={() => onPressItem(row)}
                style={
                  snapshot.isDragging
                    ? {}
                    : {
                        display: "flex",
                        justifyContent: "start",
                        alignContent: "center",
                        marginLeft: "-10px",
                      }
                }
              >
                <Avatar
                  src={
                    row[column.name]
                      ? row[column.name].startsWith("http")
                        ? row[column.name]
                        : UrlApi.baseUrlImage + row[column.name]
                      : row?.name
                      ? row?.name
                      : row?.title
                      ? row?.title
                      : row?.username
                      ? row?.username
                      : row[column.name]
                      ? row[column.name]
                      : ""
                  }
                  alt={
                    row?.name
                      ? row?.name
                      : row?.title
                      ? row?.title
                      : row?.username
                      ? row?.username
                      : row[column.name]
                      ? row[column.name]
                      : ""
                  }
                  variant="rounded"
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: "100%",
                    margin: 1,
                  }}
                />
              </TableCell>
            );
          } else if (
            column.type == columntype.status &&
            column.name == title.id
          ) {
            return (
              <TableCell onClick={() => onPressItem(row)}>
                <Box display="flex" alignItems="center">
                  <Box
                    sx={{
                      backgroundColor: row[column.name]
                        ? (theme) => theme.palette.success.main
                        : (theme) => theme.palette.error.main,
                      borderRadius: "100%",
                      height: "10px",
                      width: "10px",
                    }}
                  />
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    sx={{
                      ml: 1,
                    }}
                  >
                    {row[column.name] ? row[column.name] : "-"}
                  </Typography>
                </Box>
              </TableCell>
            );
          } else if (
            column.type == columntype.switch &&
            column.name == title.id
          ) {
            if (loadingEditdatatype == `${row.id}-${column.name}`) {
              return loadingComponent();
            } else {
              return (
                <TableCell>
                  <Switch
                    disabled={!withEditItem}
                    checked={
                      row[column.name] == 1 ||
                      row[column.name] == true ||
                      row[column.name] == "true"
                        ? true
                        : false
                    }
                    onChange={() => {
                      onChange(row, column);
                    }}
                  />
                </TableCell>
              );
            }
          } else if (
            column.type == columntype.checkbox &&
            column.name == title.id
          ) {
            if (loadingEditdatatype == `${row.id}-${column.name}`) {
              return loadingComponent();
            } else {
              return (
                <TableCell>
                  <Checkbox
                    checked={
                      row[column.name] == 1 ||
                      row[column.name] == true ||
                      row[column.name] == "true"
                        ? true
                        : false
                    }
                    onChange={() => {
                      onChange(row, column);
                    }}
                  />
                </TableCell>
              );
            }
          } else if (column.name == title.id) {
            return (
              <TableCell onClick={() => onPressItem(row)}>
                <Typography>
                  {row[column.name] ? row[column.name] : "-"}
                </Typography>
              </TableCell>
            );
          }
        });
      })}
      {withOption &&
      (withEditItem || withDeleteItem) &&
      (!isLogs || row.action_type == "delete") ? (
        <TableCell>
          <IconButton size="small">
            <DropDown
              Listdropdown={Listdropdown}
              open={openDropdown}
              setOpen={setopenDropdown}
              row={row}
              anchorEl={anchorEl}
            />
            <IconDotsVertical
              size="1.1rem"
              onClick={(event) => {
                setAnchorEl(event.currentTarget);
                setopenDropdown(true);
              }}
            />
          </IconButton>
        </TableCell>
      ) : null}
    </TableRow>
  );
};
export default RowTable;
