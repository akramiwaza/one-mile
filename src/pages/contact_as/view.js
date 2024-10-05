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
  ManageContactAs,
  DeleteContactAs,
  EditContactAs,
  GetContactAs,
} from "./actions";
import DynamicModal from "src/components/modal/DynamicModal";
import * as Yup from "yup";
import { CommonAlert } from "src/components/alert/CommonAlert";
const ContactAs = () => {
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
    phone: Yup.string().trim().required("required"),
    whatsapp: Yup.string().trim().required("required"),
    description_ar: Yup.string().trim().required("required"),
    description_en: Yup.string().trim().required("required"),
    link_map: Yup.string().trim().required("required"),
    color_code: Yup.string().trim().required("required"),
  });

  const GetData = () => {
    setLoadingData(true);
    setData([]);
    dispatch(
      GetContactAs({
        callback: (data) => {
          if (isValidArray(data?.data)) {
            setData(data?.data);
          } else {
            setData([]);
          }
          setLoadingData(false);
        },
      })
    );
    if (array.length == 0) {
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
          failed: "color_code",
          type: inputType.color,
          title: "Color code",
          placeholder: "",
          fullwidth: true,
          customdesign: {
            width: "100%",
            display: "flex",
            justifyContent: "center",
            justifyItems: "center",
            alignContent: "center",
            alignItems: "center",
          },
        },
        {
          failed: "country_en",
          type: inputType.text,
          title: "Country name (EN)",
          placeholder: "",
          fullwidth: true,
          customdesign: { width: "100%" },
          child: {
            failed: "country_ar",
            type: inputType.text,
            title: "Country name (AR)",
            placeholder: "",
            fullwidth: true,
            customdesign: { width: "100%" },
          },
        },
        {
          failed: "phone",
          type: inputType.text,
          title: "Phone number",
          placeholder: "",
          fullwidth: true,
          customdesign: { width: "100%" },
          child: {
            failed: "whatsapp",
            type: inputType.text,
            title: "Whatsapp",
            placeholder: "",
            fullwidth: true,
            customdesign: { width: "100%" },
          },
        },
        {
          failed: "email",
          type: inputType.text,
          title: "Email",
          placeholder: "",
          fullwidth: true,
          customdesign: { width: "100%" },
        },
        {
          failed: "description_en",
          type: inputType.editor,
          title: "Description (EN)",
          placeholder: "",
          fullwidth: true,
          customdesign: { width: "100%" },
        },
        {
          failed: "description_ar",
          type: inputType.editor,
          title: "Description (AR)",
          placeholder: "",
          fullwidth: true,
          customdesign: { width: "100%" },
        },
        {
          failed: "link_map",
          type: inputType.text,
          title: "link google map embed",
          placeholder: "",
          fullwidth: true,
          customdesign: { width: "100%" },
        },
      ]);
    }
  };

  useEffect(() => {
    GetData({ tableName: null, type: null });
  }, [page, rowsPerPage, search]);

  const columns = [
    { type: columntype.text, name: "id" },
    { type: columntype.text, name: "country_en" },
    { type: columntype.text, name: "country_ar" },
    { type: columntype.text, name: "phone" },
    { type: columntype.text, name: "whatsapp" },
    { type: columntype.text, name: "email" },
    { type: columntype.text, name: "description_ar" },
    { type: columntype.text, name: "description_en" },
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
      id: "country_en",
      numeric: false,
      disablePadding: false,
      label: "Country name (EN)",
      withSort: false,
    },
    {
      id: "country_ar",
      numeric: false,
      disablePadding: false,
      label: "Country name (AR)",
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
      id: "whatsapp",
      numeric: false,
      disablePadding: false,
      label: "Whatsapp",
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
    (dataPrivileges["9"]?.access_edit == 1 ||
      dataPrivileges["9"]?.access_delete == 1) && {
      id: "action",
      numeric: false,
      disablePadding: false,
      label: "Action",
      withSort: false,
    },
  ];
  const List = [
    dataPrivileges["9"]?.access_delete == 1 && {
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
                    DeleteContactAs({
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
    dataPrivileges["9"]?.access_edit == 1 && {
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
      EditContactAs({
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
                    DeleteContactAs({
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
        withAddButton={dataPrivileges["9"]?.access_write == 1 ? true : false}
        withDeleteItem={dataPrivileges["9"]?.access_delete == 1 ? true : false}
        withEditItem={dataPrivileges["9"]?.access_edit == 1 ? true : false}
        withPagination={false}
        withSearch={false}
      />
      {showModal ? (
        <DynamicModal
          show={showModal}
          setShow={setShowModal}
          faileds={array}
          values={values}
          title={"Contact us"}
          editMode={editMode}
          description={editMode ? "Edit" : "Add new contact us"}
          buttonTitle={editMode ? "Edit" : "Add"}
          onSubmit={(valuess) => {
            dispatch(
              ManageContactAs({
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

export default ContactAs;
