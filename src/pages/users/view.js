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
  ManageUsers,
  DeleteUsers,
  GetUsers,
  EditUsers,
  GetCountries,
} from "./actions";
import DynamicModal from "src/components/modal/DynamicModal";
import * as Yup from "yup";
import { CommonAlert } from "src/components/alert/CommonAlert";

const Users = () => {
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
    first_name: Yup.string().trim().required("required"),
    last_name: Yup.string().trim().required("required"),
    phone_code: Yup.string().trim().required("required"),
    phone: Yup.number().required("required"),
    country_id: Yup.number().required("required"),
    language_teach: Yup.string().trim().required("required"),
    language_read: Yup.string().trim().required("required"),
    email: Yup.string().trim().email("invalid email").required("required"),
    password: editMode
      ? null
      : Yup.string().min(3, "min 3 password").required("required"),
  });

  const GetData = ({ tableName = null, type = null }) => {
    setLoadingData(true);
    setData([]);
    dispatch(
      GetUsers({
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
        GetCountries({
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
                failed: "first_name",
                type: inputType.text,
                title: "First name",
                placeholder: "",
                fullwidth: true,
                customdesign: { width: "100%" },
                child: {
                  failed: "last_name",
                  type: inputType.text,
                  title: "Last name",
                  placeholder: "",
                  fullwidth: true,
                  customdesign: { width: "100%" },
                },
              },
              res && {
                failed: "phone_code",
                type: inputType.dropdownSearch,
                title: "Phone code",
                fullwidth: true,
                customdesign: { width: "20%" },
                datadropdown: res.data,
                faileddropdown: {
                  name: "phonecode",
                  value: "phonecode",
                },
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
                failed: "email",
                type: inputType.email,
                title: "Email",
                placeholder: "",
                fullwidth: true,
                customdesign: { width: "100%" },
              },
              {
                failed: "password",
                type: inputType.password,
                title: "Password",
                placeholder: "",
                fullwidth: true,
                customdesign: { width: "100%" },
              },
              res && {
                failed: "country_id",
                type: inputType.dropdown,
                title: "Country",
                placeholder: "",
                fullwidth: true,
                datadropdown: res.data,
                faileddropdown: {
                  name: "name",
                  value: "id",
                },
              },
              {
                failed: "language_teach",
                type: inputType.dropdown,
                title: "Language teach",
                placeholder: "",
                fullwidth: true,
                datadropdown: [
                  { title_en: "English", id: "en" },
                  { title_en: "Arabic", id: "ar" },
                  { title_en: "French", id: "fr" },
                ],
                faileddropdown: {
                  name: "title_en",
                  value: "id",
                },
              },
              {
                failed: "language_read",
                type: inputType.dropdown,
                title: "Language read",
                placeholder: "",
                fullwidth: true,
                datadropdown: [
                  { title_en: "English", id: "en" },
                  { title_en: "Arabic", id: "ar" },
                  { title_en: "French", id: "fr" },
                ],
                faileddropdown: {
                  name: "title_en",
                  value: "id",
                },
              },
              {
                failed: "profile_image",
                type: inputType.image,
                title: "Profile image",
                placeholder: "",
                fullwidth: true,
                fileTypes: ["JPG", "PNG", "JPEG", "WEBP"],
                multiple: false,
                label: "Drag & Drop Image here or click to select image",
                fileOrFiles: "File", //Array or File or null
              },
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
    { type: columntype.image, name: "profile_image" },
    { type: columntype.text, name: "first_name" },
    { type: columntype.text, name: "last_name" },
    { type: columntype.text, name: "phone_code" },
    { type: columntype.text, name: "phone" },
    { type: columntype.text, name: "email" },
    { type: columntype.text, name: "country_name" },
    { type: columntype.text, name: "language_teach" },
    { type: columntype.text, name: "language_read" },
    { type: columntype.switch, name: "is_active" },
  ];
  const headCells = [
    {
      id: "id",
      numeric: false,
      disablePadding: false,
      label: "id",
      withSort: false,
    },
    {
      id: "profile_image",
      numeric: false,
      disablePadding: false,
      label: "Image",
      withSort: false,
    },
    {
      id: "first_name",
      numeric: false,
      disablePadding: false,
      label: "First name",
      withSort: false,
    },
    {
      id: "last_name",
      numeric: false,
      disablePadding: false,
      label: "Last name",
      withSort: false,
    },
    {
      id: "phone_code",
      numeric: false,
      disablePadding: false,
      label: "Phone code",
      withSort: false,
    },
    {
      id: "phone",
      numeric: false,
      disablePadding: false,
      label: "Phone",
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
      id: "country_name",
      numeric: false,
      disablePadding: false,
      label: "Country name",
      withSort: false,
    },
    {
      id: "language_teach",
      numeric: false,
      disablePadding: false,
      label: "Language teach",
      withSort: false,
    },
    {
      id: "language_read",
      numeric: false,
      disablePadding: false,
      label: "Language read",
      withSort: false,
    },
    {
      id: "is_active",
      numeric: false,
      disablePadding: false,
      label: "Is active",
      withSort: false,
    },
    (dataPrivileges["2"]?.access_edit == 1 ||
      dataPrivileges["2"]?.access_delete == 1) && {
      id: "action",
      numeric: false,
      disablePadding: false,
      label: "Action",
      withSort: false,
    },
  ];
  const List = [
    dataPrivileges["2"]?.access_delete == 1 && {
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
                    DeleteUsers({
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
    dataPrivileges["2"]?.access_edit == 1 && {
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
      EditUsers({
        id: row?.id,
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
                    DeleteUsers({
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
        withAddButton={dataPrivileges["2"]?.access_write == 1 ? true : false}
        withDeleteItem={dataPrivileges["2"]?.access_delete == 1 ? true : false}
        withEditItem={dataPrivileges["2"]?.access_edit == 1 ? true : false}
        withPagination={true}
        withSearch={true}
      />
      {showModal ? (
        <DynamicModal
          show={showModal}
          setShow={setShowModal}
          faileds={array}
          values={values}
          title={"User"}
          editMode={editMode}
          description={editMode ? "Edit" : "Add new user"}
          buttonTitle={editMode ? "Edit" : "Add"}
          onSubmit={(valuess) => {
            dispatch(
              ManageUsers({
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

export default Users;
