import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import DynamicTable from "src/components/table";
import {
  columntype,
  dataLocalStorage,
  getLocalStorage,
  isValidArray,
  removeItemFromArray,
} from "src/helper/publicFunction";
import { EditAdminLogs, GetAdminLogs } from "./actions";
import { CommonAlert } from "src/components/alert/CommonAlert";
const AdminLogs = () => {
  const dispatch = useDispatch();
  const Commonalert = CommonAlert(); // Create an alert object using the function
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingEditdatatype, setloadingEditdatatype] = useState("");
  const [data, setData] = useState([]);
  const [TotalData, setTotalData] = useState(0);
  let dataPrivileges = getLocalStorage(dataLocalStorage.privileges);

  const GetData = ({ tableName = null, type = null }) => {
    setLoadingData(true);
    setData([]);
    dispatch(
      GetAdminLogs({
        page: page,
        rowsPerPage: rowsPerPage,
        orderBy: tableName,
        typeOrder: type,
        search: search,
        callback: (data) => {
          if (isValidArray(data?.data)) {
            setData(data?.data);
            setTotalData(data?.count);
          } else {
            setData([]);
            setTotalData(0);
          }
          setLoadingData(false);
        },
      })
    );
  };

  useEffect(() => {
    GetData({ tableName: null, type: null });
  }, [page, rowsPerPage, search]);

  const columns = [
    { type: columntype.text, name: "id" },
    { type: columntype.text, name: "username" },
    { type: columntype.status, name: "action_type" },
    { type: columntype.text, name: "description" },
    { type: columntype.dateAndtime, name: "created_date" },
  ];
  const headCells = [
    {
      id: "id",
      numeric: false,
      disablePadding: false,
      label: "id",
      withSort: true,
    },

    {
      id: "username",
      numeric: false,
      disablePadding: false,
      label: "Admin",
      withSort: false,
    },
    {
      id: "action_type",
      numeric: false,
      disablePadding: false,
      label: "Log action",
      withSort: true,
    },
    {
      id: "description",
      numeric: false,
      disablePadding: false,
      label: "Description",
      withSort: false,
    },

    {
      id: "created_date",
      numeric: false,
      disablePadding: false,
      label: "Date",
      withSort: true,
    },
    dataPrivileges["12"]?.access_edit == 1 && {
      id: "action",
      numeric: false,
      disablePadding: false,
      label: "Action",
      withSort: false,
    },
  ];
  const List = [
    dataPrivileges["12"]?.access_edit == 1 && {
      name: "Undo",
      function: async (data) => {
        Commonalert.show({
          title: "Are you sure?",
          message: "You won't be able to revert this!",
          type: "Undo",
          actions: [
            {
              name: "Yes",
              callback: () => updateDataApi({ row: data }),
              type: "Undo",
            },
            {
              name: "No",
              callback: () => {},
              type: "cancel",
            },
          ],
        });
      },
    },
  ];

  const updateDataApi = ({ row }) => {
    dispatch(
      EditAdminLogs({
        row,
        callback: () => {
          updateDataLocal({ idRow: row?.id });
        },
      })
    );
  };

  const updateDataLocal = ({ idRow }) => {
    let newData = removeItemFromArray(idRow, data);
    setData(newData);
  };

  return (
    <>
      <DynamicTable
        handleSearch={(event) => setSearch(event.target.value)} // call api
        onRequestSort={(tableName, type) => {
          if (tableName && type) {
            GetData({ tableName, type });
          }
        }} // call api
        onPressDelete={(ListIds) => {}} // call api
        onPressItem={(row) => {}} // when press item
        onPressAnyAction={(row, failedName, newData) => {}} // when press checkbox or switch
        onPressAdd={() => {}} // when press add new button show modal to add new item
        items={data} // all data
        columns={columns} // type of data
        headCells={headCells} // columns name
        page={page} // number of page from api
        setPage={setPage} // set number of page from api
        selected={selected} // selected items
        setSelected={setSelected} // set selected items
        search={search} // search failed
        rowsPerPage={rowsPerPage} // number show Data
        setRowsPerPage={setRowsPerPage} // set number show data
        Listdropdown={List} // list action with function
        withOption={true} // for remove action column
        loadingData={loadingData} // when load data from api
        rowsPerPageOptions={[5, 10, 25, 50]} // set option number of show data
        totalItem={TotalData} // total data without pagination
        loadingEditdatatype={loadingEditdatatype} // first failed (id) and second (failed Name) like ={"1-is_active"}
        withAddButton={false}
        withDeleteItem={false}
        withEditItem={dataPrivileges["12"]?.access_edit == 1 ? true : false}
        withPagination={true}
        withSearch={false}
        isLogs={true}
      />
    </>
  );
};

export default AdminLogs;
