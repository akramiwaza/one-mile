import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import DynamicTable from "src/components/table";
import {
  columntype,
  dataLocalStorage,
  getLocalStorage,
  inputType,
  isValidArray,
} from "src/helper/publicFunction";
import {
  DeleteAdminPrivilege,
  EditAdmin,
  GetUserType,
  GetUserPrivileges,
  ManageAdminPrivileges,
} from "./actions";
import DynamicModal from "src/components/modal/DynamicModal";
import * as Yup from "yup";
import { CommonAlert } from "src/components/alert/CommonAlert";
import ModalPrivileges from "./component/modal_privileges";
const Privileges = () => {
  const dispatch = useDispatch();
  const Commonalert = CommonAlert(); // Create an alert object using the function
  const [page, setPage] = useState(0);
  const [functions, setFunctions] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingEditdatatype, setloadingEditdatatype] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState([]);
  const [TotalData, setTotalData] = useState(0);
  const [type_id, settype_id] = useState();
  const [type_name, settype_name] = useState();
  let dataPrivileges = getLocalStorage(dataLocalStorage.privileges);
  const Schema = Yup.object().shape({
    type_name: Yup.string().required("required"),
  });

  const updateValue = (value) => {
    setFunctions((prevData) => {
      return prevData.map((item) => {
        console.log({ item: item.id, index: value[0].id });
        let index = value.findIndex((x) => x.fct_id == item.id);
        if (index >= 0) {
          return {
            ...item,
            access_read: value[index]?.access_read ?? 0,
            access_write: value[index]?.access_write ?? 0,
            access_edit: value[index]?.access_edit ?? 0,
            access_publish: value[index]?.access_publish ?? 0,
            access_delete: value[index]?.access_delete ?? 0,
          };
        }
        return item;
      });
    });
  };

  const GetData = ({ tableName = null, type = null }) => {
    setLoadingData(true);
    setData([]);
    dispatch(
      GetUserType({
        callback: (data) => {
          if (isValidArray(data?.data)) {
            setData(data?.data);
            setTotalData(data?.data?.length);
          } else {
            setData([]);
            setTotalData(0);
          }
          let listFunciton = [];
          if (data?.function) {
            const arrayOfKeys = Object.keys(data?.function);
            for (var i = 0; i < arrayOfKeys.length; ++i) {
              listFunciton.push(data?.function[arrayOfKeys[i]]);
            }
            setFunctions(listFunciton);
          }
          setLoadingData(false);
        },
      })
    );
  };

  useEffect(() => {
    GetData({ tableName: null, type: null });
  }, []);

  const columns = [
    { type: columntype.text, name: "id" },
    { type: columntype.text, name: "type_name" },
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
      id: "type_name",
      numeric: false,
      disablePadding: false,
      label: "Type name",
      withSort: false,
    },
    (dataPrivileges["1"]?.access_edit == 1 ||
      dataPrivileges["1"]?.access_delete == 1) && {
      id: "action",
      numeric: false,
      disablePadding: false,
      label: "Action",
      withSort: false,
    },
  ];
  const List = [
    dataPrivileges["1"]?.access_delete == 1 && {
      name: "Delete",
      function: async (row) => {
        if (row) {
          Commonalert.show({
            title: `Are you sure to delete ${row?.username ?? ""}?`,
            message: "You won't be able to revert this!",
            type: "delete",
            actions: [
              {
                name: "Yes",
                callback: () =>
                  dispatch(
                    DeleteAdminPrivilege({
                      callback: () => {
                        GetData({ tableName: null, type: null });
                      },
                      id: [row.id],
                    })
                  ),
                type: "delete",
              },
              {
                name: "No",
                callback: () => {},
                type: "cancel",
              },
            ],
          });
        }
      },
    },
    dataPrivileges["1"]?.access_edit == 1 && {
      name: "Edit",
      function: async (data) => {
        setEditMode(true);
        dispatch(
          GetUserPrivileges({
            type_id: data?.id,
            callback: (dataPriv) => {
              if (dataPriv?.data) {
                updateValue(dataPriv?.data);
                settype_name(data.type_name);
                settype_id(data.id);
                setShowModal(true);
              }
            },
          })
        );
      },
    },
  ];

  return (
    <>
      <DynamicTable
        handleSearch={(event) => setSearch(event.target.value)} // call api
        onPressDelete={(ListIds) => {
          Commonalert.show({
            title: "Are you sure?",
            message: "You won't be able to revert this!",
            type: "delete",
            actions: [
              {
                name: "Yes",
                callback: () =>
                  dispatch(
                    DeleteAdminPrivilege({
                      callback: () => {
                        GetData({ tableName: null, type: null });
                      },
                      id: ListIds,
                    })
                  ),
                type: "delete",
              },
              {
                name: "No",
                callback: () => {},
                type: "cancel",
              },
            ],
          });
        }} // call api
        onPressItem={(row) => {}} // when press item
        onPressAnyAction={(row, failedName, newData) => {}} // when press checkbox or switch
        onPressAdd={() => {
          setEditMode(false);
          setShowModal(true);
        }} // when press add new button show modal to add new item
        items={data} // all data
        columns={columns} // type of data
        headCells={headCells} // columns name
        page={page} // number of page from api
        setPage={setPage} // set number of page from api
        selected={selected} // selected items
        setSelected={setSelected} // set selected items
        search={search} // search failed
        rowsPerPage={100} // number show Data
        setRowsPerPage={setRowsPerPage} // set number show data
        Listdropdown={List} // list action with function
        withOption={true} // for remove action column
        loadingData={loadingData} // when load data from api
        rowsPerPageOptions={[5, 10, 25, 50]} // set option number of show data
        totalItem={TotalData} // total data without pagination
        loadingEditdatatype={loadingEditdatatype} // first failed (id) and second (failed Name) like ={"1-is_active"}
        withPagination={false}
        withSearch={false}
        withAddButton={dataPrivileges["1"]?.access_write == 1 ? true : false}
        withDeleteItem={dataPrivileges["1"]?.access_delete == 1 ? true : false}
        withEditItem={dataPrivileges["1"]?.access_edit == 1 ? true : false}
      />

      <ModalPrivileges
        show={showModal}
        setShow={setShowModal}
        title={"Admins"}
        faileds={functions}
        setfaileds={setFunctions}
        editMode={editMode}
        typeName={type_name}
        settypeName={settype_name}
        description={editMode ? "Edit" : "Add new role"}
        buttonTitle={editMode ? "Edit" : "Add"}
        onSubmit={(valuess, privilegName) => {
          if (privilegName) {
            dispatch(
              ManageAdminPrivileges({
                type_id: type_id,
                editMode: editMode,
                values: valuess,
                privilegName: privilegName,
                callback: (res) => {
                  if (res) {
                    setShowModal(false);
                    GetData({ tableName: null, type: null });
                  }
                },
              })
            );
          }
        }}
        Schema={Schema}
      />
    </>
  );
};

export default Privileges;
