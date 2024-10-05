import React, { useEffect, useState } from "react";
import DashboardCard from "../../shared/DashboardCard";
import { TextField, Grid, Button, useMediaQuery } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DynamicTable from "src/components/table";

const TopPerformers = ({ title, loading, getData, columns, headCells }) => {
  const [from, setFrom] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  const [To, setTo] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
  );
  const [data, setData] = useState([]);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

  useEffect(() => {
    getData({
      from: from,
      to: To,
      callback: (data) => {
        setData(data);
      },
    });
  }, []);

  return (
    <DashboardCard
      title={title}
      action={
        <div
          style={{
            display: lgUp ? "flex" : "grid",
            justifyContent: "space-between",
          }}
        >
          <Grid>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="From"
                color={"primary"}
                renderInput={(props) => (
                  <TextField
                    variant={"filled"}
                    sx={{ color: "blue" }}
                    {...props}
                  />
                )}
                value={from}
                onChange={(newValue) => setFrom(newValue)}
              />
            </LocalizationProvider>
          </Grid>
          <div style={{ width: 5 }} />
          <Grid>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                color={"primary"}
                label="To"
                renderInput={(props) => (
                  <TextField
                    variant={"filled"}
                    sx={{ color: "blue" }}
                    {...props}
                  />
                )}
                value={To}
                onChange={(newValue) => setTo(newValue)}
              />
            </LocalizationProvider>
          </Grid>
          <div style={{ width: 5 }} />
          <Button
            color={"primary"}
            onClick={() =>
              getData({
                from: from,
                to: To,
                callback: (data) => {
                  setData(data);
                },
              })
            }
          >
            Search
          </Button>
        </div>
      }
    >
      <div>
        <DynamicTable
          handleSearch={(event) => {}} // call api
          onRequestSort={(tableName, type) => {}} // call api
          onPressDelete={(ListIds) => {}} // call api
          onPressItem={(row) => {}} // when press item
          onPressAnyAction={(row, failedName, newData) => {}} // when press checkbox or switch
          onPressAdd={() => {}} // when press add new button show modal to add new item
          items={data} // all data
          columns={columns} // type of data
          headCells={headCells} // columns name
          page={""} // number of page from api
          setPage={""} // set number of page from api
          selected={""} // selected items
          setSelected={() => {}} // set selected items
          search={""} // search failed
          rowsPerPage={0} // number show Data
          setRowsPerPage={() => {}} // set number show data
          Listdropdown={[]} // list action with function
          withOption={true} // for remove action column
          loadingData={loading} // when load data from api
          rowsPerPageOptions={[5, 10, 25, 50]} // set option number of show data
          totalItem={0} // total data without pagination
          loadingEditdatatype={false} // first failed (id) and second (failed Name) like ={"1-is_active"}
          withAddButton={false}
          withDeleteItem={false}
          withEditItem={false}
          withPagination={false}
          withSearch={false}
          canBack={false}
          nameTable={``}
          customStyle={{ marginTop: "-5%", backgroundColor: "black" }}
        />
      </div>
    </DashboardCard>
  );
};

export default TopPerformers;
