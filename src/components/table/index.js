import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  IconButton,
  Tooltip,
  FormControlLabel,
  Typography,
  TextField,
  InputAdornment,
  Paper,
  Skeleton,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { visuallyHidden } from "@mui/utils";

import { IconFilter, IconPlus, IconSearch, IconTrash } from "@tabler/icons";
import CustomCheckbox from "../forms/theme-elements/CustomCheckbox";
import CustomSwitch from "../forms/theme-elements/CustomSwitch";
import { useEffect, useRef, useState } from "react";

import RowTable from "./RowTable";
import { useNavigate } from "react-router";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
    withDeleteItem,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {withDeleteItem && (
          <TableCell padding="checkbox">
            <CustomCheckbox
              color="primary"
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputprops={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell>
        )}
        {headCells.map((headCell) => {
          if (headCell.hide) {
            return;
          }
          return (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={
                headCell?.withSort
                  ? orderBy === headCell.id
                    ? order
                    : false
                  : null
              }
            >
              {headCell?.withSort ? (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id && headCell?.withSort ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              ) : (
                <>
                  {headCell.label}
                  {orderBy === headCell.id && headCell?.withSort ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </>
              )}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = (props) => {
  const {
    numSelected,
    handleSearch,
    search,
    onPressDelete,
    selected,
    onPressAdd,
    setSelected,
    withSearch,
    withAddButton,
    withDeleteItem,
    canBack,
    nameTable,
  } = props;
  const navigate = useNavigate();
  return (
    <>
      {
        numSelected == 0 &&
          (canBack ? (
            <IconButton
              style={{ justifyContent: "start", width: "50%" }}
              onClick={() => {
                navigate(-1);
              }}
            >
              <ArrowBackIcon />
              <b style={{ fontSize: 20, color: "black", marginLeft: 10 }}>
                {nameTable}
              </b>
            </IconButton>
          ) : (
            <b style={{ fontSize: 20, width: "50%" }}>{nameTable}</b>
          ))

        // <div style={{ width: "50%" }}>
        //   <b style={{ fontSize: 20 }}>{nameTable}</b>
        // </div>
      }
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 &&
            withDeleteItem && {
              bgcolor: (theme) =>
                alpha(
                  theme.palette.primary.main,
                  theme.palette.action.activatedOpacity
                ),
            }),
        }}
      >
        {numSelected > 0 && withDeleteItem ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle2"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Box sx={{ flex: "1 1 100%" }}>
            {withSearch && (
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch size="1.1rem" />
                    </InputAdornment>
                  ),
                }}
                placeholder="Search"
                size="small"
                onChange={handleSearch}
                value={search}
              />
            )}
          </Box>
        )}

        {numSelected > 0 && withDeleteItem ? (
          <Tooltip title="Delete">
            <IconButton>
              <IconTrash
                onClick={() => {
                  onPressDelete(selected);
                  setSelected([]);
                }}
                width="18"
              />
            </IconButton>
          </Tooltip>
        ) : withAddButton ? (
          <Button
            style={{ width: "25%" }}
            onClick={() => onPressAdd()}
            variant="outlined"
          >
            <IconPlus />
            <div style={{ marginLeft: "5%" }}>Add new</div>
          </Button>
        ) : null}
      </Toolbar>
    </>
  );
};

const DynamicTable = ({
  handleSearch,
  search,
  selected,
  setSelected,
  setPage,
  page,
  setRowsPerPage,
  rowsPerPage,
  items,
  headCells,
  onPressDelete,
  Listdropdown,
  onPressItem,
  onRequestSort,
  columns,
  withOption,
  loadingData,
  rowsPerPageOptions,
  totalItem,
  onPressAnyAction,
  onPressAdd,
  loadingEditdatatype,
  withPagination = true,
  withSearch = true,
  withAddButton = true,
  withDeleteItem = true,
  withEditItem = true,
  canBack = false,
  nameTable,
  isLogs = false,
  setItems = () => {},
  onDragEnd = () => {},
  isDroppableEnabled = false,
}) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

  const reorderList = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      // Drop outside the droppable area
      return;
    }
    let indexitem = items.findIndex((res) => res.id == result.draggableId); // this item
    let newOrderNumber = items[result.destination.index]?.order_number;
    let oldOrderNumber = items[indexitem]?.order_number;

    const reorderedItems = reorderList(
      items,
      result.source.index,
      result.destination.index
    );
    if (setItems) {
      setItems(reorderedItems); // Update the reordered items
    }
    if (onDragEnd) {
      onDragEnd({
        newOrderNumber,
        oldOrderNumber,
        item_id: items[indexitem]?.id,
      });
    }
  };

  // This is for the sorting
  const handleRequestSort = (event, property) => {
    setSelected([]);
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    onRequestSort(property, isAsc ? "desc" : "asc");
  };

  // This is for select all the row
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = items.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  // This is for the single row sleect
  const handleClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setSelected([]);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setSelected([]);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - items.length) : 0;
  const ref = useRef(null);

  const numberData = new Array(rowsPerPage).fill(null);
  const [offsetWidth, setOffsetWidth] = useState(0);

  useEffect(() => {
    // Check if the ref is available
    if (ref.current) {
      // Access the offsetWidth and update the state
      setOffsetWidth(ref.current.offsetWidth);
    }
  }, [ref]);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Box>
        <Box>
          <EnhancedTableToolbar
            numSelected={selected.length}
            withSearch={withSearch}
            search={search}
            handleSearch={(event) => {
              setSelected([]);
              handleSearch(event);
            }}
            setSelected={setSelected}
            onPressDelete={onPressDelete}
            selected={selected}
            onPressAdd={onPressAdd}
            withAddButton={withAddButton}
            withDeleteItem={withDeleteItem}
            canBack={canBack}
            nameTable={nameTable}
          />
          <Paper variant="outlined" sx={{ mx: 2, mt: 1 }}>
            <TableContainer ref={ref}>
              <Droppable droppableId="table-droppable">
                {(provided) => (
                  <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={"medium"}
                    ref={provided.innerRef} // Proper ref setting
                    {...provided.droppableProps} // Pass droppableProps
                  >
                    <EnhancedTableHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                      rowCount={items.length}
                      withDeleteItem={withDeleteItem}
                      headCells={headCells}
                    />
                    <TableBody>
                      {!loadingData &&
                        items.map((row, index) => {
                          return (
                            <Draggable
                              key={row.id}
                              draggableId={row.id.toString()}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <RowTable
                                  provided={
                                    !isDroppableEnabled ? null : provided
                                  }
                                  headCells={headCells}
                                  row={row}
                                  index={index}
                                  columns={columns}
                                  handleClick={handleClick}
                                  onPressItem={onPressItem}
                                  isSelected={isSelected}
                                  Listdropdown={Listdropdown}
                                  isLogs={isLogs}
                                  withOption={withOption}
                                  onPressAnyAction={onPressAnyAction}
                                  loadingEditdatatype={loadingEditdatatype}
                                  withDeleteItem={withDeleteItem}
                                  withEditItem={withEditItem}
                                  snapshot={snapshot}
                                />
                              )}
                            </Draggable>
                          );
                        })}

                      {loadingData ? (
                        <>
                          <div
                            style={{
                              width: offsetWidth,
                              position: "absolute",
                            }}
                          >
                            {numberData.map((res) => {
                              return (
                                <>
                                  <Skeleton height={40} animation="wave" />
                                  <div style={{ height: "1vh" }} />
                                </>
                              );
                            })}
                          </div>
                          <div
                            style={{ height: `${numberData.length * 5.5}vh` }}
                          />
                        </>
                      ) : items.length == 0 ? (
                        <TableRow
                          style={{
                            height: 53 * emptyRows,
                          }}
                        >
                          <TableCell colSpan={6}>
                            <div
                              style={{
                                width: offsetWidth,
                                position: "absolute",
                                textAlign: "center",
                              }}
                            >
                              No data found
                            </div>
                            <div style={{ height: 20 }} />
                          </TableCell>
                        </TableRow>
                      ) : null}
                    </TableBody>
                  </Table>
                )}
              </Droppable>
            </TableContainer>
            {withPagination && (
              <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={totalItem}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
          </Paper>
        </Box>
      </Box>
    </DragDropContext>
  );
};

export default DynamicTable;
