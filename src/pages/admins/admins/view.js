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
  ManageAdmin,
  DeleteAdmin,
  EditAdmin,
  GetAdmins,
  GetUserType,
} from "./actions";
import DynamicModal from "src/components/modal/DynamicModal";
import * as Yup from "yup";
import { CommonAlert } from "src/components/alert/CommonAlert";
const Admins = () => {
  const dispatch = useDispatch();
  const Commonalert = CommonAlert(); // Create an alert object using the function
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingEditdatatype, setloadingEditdatatype] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [array, setarray] = useState([]);
  const [values, setvalues] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState([]);
  const [TotalData, setTotalData] = useState(0);
  let dataPrivileges = getLocalStorage(dataLocalStorage.privileges);
  const Schema = Yup.object().shape({
    email: Yup.string().trim().email("invalid email").required("required"),
    username: Yup.string().required("required"),
    fullname: Yup.string().required("required"),
    user_type_id: Yup.number().required("required"),
    password: editMode
      ? null
      : Yup.string().min(3, "min 3 password").required("required"),
  });

  const GetData = ({ tableName = null, type = null }) => {
    setLoadingData(true);
    setData([]);
    dispatch(
      GetAdmins({
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
    if (array.length == 0) {
      dispatch(
        GetUserType({
          callback: (res) => {
            setarray([
              {
                failed: "id",
                type: inputType.text,
                title: "id",
                placeholder: "",
                fullwidth: true,
                customdesign: { display: "none" },
              },
              {
                failed: "username",
                type: inputType.text,
                title: "User name",
                placeholder: "",
                fullwidth: true,
                customdesign: { width: "100%" },
                child: {
                  failed: "fullname",
                  type: inputType.text,
                  title: "Full name",
                  placeholder: "",
                  fullwidth: true,
                  customdesign: { width: "100%" },
                },
              },
              {
                failed: "email",
                type: inputType.email,
                title: "Email",
                placeholder: "",
                fullwidth: true,
                customdesign: { width: "100%" },
                child: {
                  failed: "phone",
                  type: inputType.text,
                  title: "Phone",
                  placeholder: "",
                  fullwidth: true,
                  customdesign: { width: "100%" },
                },
              },

              {
                failed: "user_type_id",
                type: inputType.dropdown,
                title: "User type",
                placeholder: "",
                fullwidth: true,
                datadropdown: res,
                faileddropdown: {
                  name: "type_name",
                  value: "id",
                },
              },
              {
                failed: "password",
                type: inputType.password,
                title: "Password",
                placeholder: "",
                fullwidth: true,
              },
              {
                failed: "main_img",
                type: inputType.image,
                title: "Main image",
                placeholder: "",
                fullwidth: true,
                fileTypes: ["JPG", "PNG", "JPEG", "WEBP"],
                multiple: false,
                label: "Drag & Drop Image here or click to select image",
                fileOrFiles: "File", //Array or File or null
              },
              // {
              //   failed: "add",
              //   type: inputType.action,
              //   title: "Add",
              //   placeholder: "",
              //   fullwidth: true,
              //   onClick: () => {},
              // },
            ]);
          },
        })
      );
    }
  };

  useEffect(() => {
    GetData({ tableName: null, type: null });
  }, [page, rowsPerPage, search]);

  const columns = [
    { type: columntype.text, name: "id" },
    { type: columntype.image, name: "main_img" },
    { type: columntype.text, name: "fullname" },
    { type: columntype.text, name: "email" },
    { type: columntype.text, name: "phone" },
    { type: columntype.text, name: "typeName" },
    { type: columntype.text, name: "username" },
    { type: columntype.date, name: "created_date" },
    { type: columntype.switch, name: "is_active" },
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
      id: "main_img",
      numeric: false,
      disablePadding: false,
      label: "Image",
      withSort: false,
    },
    {
      id: "fullname",
      numeric: false,
      disablePadding: false,
      label: "Name",
      withSort: false,
    },
    {
      id: "username",
      numeric: false,
      disablePadding: false,
      label: "User name",
      withSort: false,
    },
    {
      id: "email",
      numeric: false,
      disablePadding: false,
      label: "Email",
      withSort: false,
    },
    {
      id: "phone",
      numeric: false,
      disablePadding: false,
      label: "Phone number",
      withSort: false,
    },
    {
      id: "typeName",
      numeric: false,
      disablePadding: false,
      label: "Role",
      withSort: false,
    },
    {
      id: "created_date",
      numeric: false,
      disablePadding: false,
      label: "Created date",
      withSort: true,
    },
    {
      id: "is_active",
      numeric: false,
      disablePadding: false,
      label: "Is active",
      withSort: true,
    },
    (dataPrivileges["1"]?.access_delete == 1 ||
      dataPrivileges["1"]?.access_edit == 1) && {
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
                    DeleteAdmin({
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
        setvalues(data);
        setShowModal(true);
      },
    },
  ];

  const updateDataApi = ({ row, failedName, newData }) => {
    setloadingEditdatatype(`${row?.id}-${failedName}`);
    dispatch(
      EditAdmin({
        adminId: row?.id,
        dataFailed: newData,
        nameFailed: failedName,
        callback: () => {
          updateDataLocal({ id: row.id, failedName, newData });
        },
      })
    );
  };

  const updateDataLocal = ({ id, failedName, newData }) => {
    setData((prevData) => {
      return prevData.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            [failedName]: newData,
          };
        }
        return item;
      });
    });
    setloadingEditdatatype("");
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
                    DeleteAdmin({
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
        onPressAnyAction={(row, failedName, newData) => {
          updateDataApi({ row, failedName, newData });
        }} // when press checkbox or switch
        onPressAdd={() => {
          setvalues({});
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
        rowsPerPage={rowsPerPage} // number show Data
        setRowsPerPage={setRowsPerPage} // set number show data
        Listdropdown={List} // list action with function
        withOption={true} // for remove action column
        loadingData={loadingData} // when load data from api
        rowsPerPageOptions={[5, 10, 25, 50]} // set option number of show data
        totalItem={TotalData} // total data without pagination
        loadingEditdatatype={loadingEditdatatype} // first failed (id) and second (failed Name) like ={"1-is_active"}
        withAddButton={dataPrivileges["1"]?.access_write == 1 ? true : false}
        withDeleteItem={dataPrivileges["1"]?.access_delete == 1 ? true : false}
        withEditItem={dataPrivileges["1"]?.access_edit == 1 ? true : false}
      />
      {showModal ? (
        <DynamicModal
          show={showModal}
          setShow={setShowModal}
          faileds={array}
          values={values}
          title={"Admins"}
          editMode={editMode}
          description={editMode ? "Edit" : "Add new admin"}
          buttonTitle={editMode ? "Edit" : "Add"}
          onSubmit={(valuess) => {
            dispatch(
              ManageAdmin({
                editMode: editMode,
                values: valuess,
                callback: (res) => {
                  if (res) {
                    setShowModal(false);
                    GetData({ tableName: null, type: null });
                  }
                },
              })
            );
          }}
          Schema={Schema}
        />
      ) : null}
    </>
  );
};

export default Admins;
