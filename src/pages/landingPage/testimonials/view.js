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
  ManageTestimonials,
  DeleteTestimonials,
  EditTestimonials,
  GetTestimonials,
} from "./actions";
import DynamicModal from "src/components/modal/DynamicModal";
import * as Yup from "yup";
import { CommonAlert } from "src/components/alert/CommonAlert";
const Testimonials = () => {
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
    title_en: Yup.string().trim().required("required"),
    title_ar: Yup.string().trim().required("required"),
    description_en: Yup.string().trim().required("required"),
    description_ar: Yup.string().trim().required("required"),
    position_en: Yup.string().trim().required("required"),
    position_ar: Yup.string().trim().required("required"),
    order_number: Yup.number().required("required"),
    image: Yup.string().trim().required("required"),
  });

  const GetData = ({ tableName = null, type = null }) => {
    setLoadingData(true);
    setData([]);
    dispatch(
      GetTestimonials({
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
          failed: "title_en",
          type: inputType.text,
          title: "Title (EN)",
          placeholder: "",
          fullwidth: true,
          customdesign: { width: "100%" },
          child: {
            failed: "title_ar",
            type: inputType.text,
            title: "Title (AR)",
            placeholder: "",
            fullwidth: true,
            customdesign: { width: "100%" },
          },
        },
        {
          failed: "description_en",
          type: inputType.textarea,
          title: "Description (EN)",
          placeholder: "",
          fullwidth: true,
          customdesign: { width: "100%" },
          child: {
            failed: "description_ar",
            type: inputType.textarea,
            title: "Description (AR)",
            placeholder: "",
            fullwidth: true,
            customdesign: { width: "100%" },
          },
        },
        {
          failed: "position_en",
          type: inputType.text,
          title: "Position (EN)",
          placeholder: "",
          fullwidth: true,
          customdesign: { width: "100%" },
          child: {
            failed: "position_ar",
            type: inputType.text,
            title: "Position (AR)",
            placeholder: "",
            fullwidth: true,
            customdesign: { width: "100%" },
          },
        },
        {
          failed: "type",
          type: inputType.dropdown,
          title: "Type",
          placeholder: "",
          fullwidth: true,
          datadropdown: [
            { title: "Home", id: "Home" },
            { title: "Impact", id: "Impact" },
          ],
          faileddropdown: {
            name: "title",
            value: "id",
          },
        },
        {
          failed: "order_number",
          type: inputType.number,
          title: "Order number",
          placeholder: "",
          fullwidth: true,
          customdesign: { width: "100%" },
        },
        {
          failed: "image",
          type: inputType.image,
          title: "Image",
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
    }
  };

  useEffect(() => {
    GetData({ tableName: null, type: null });
  }, [page, rowsPerPage, search]);

  const columns = [
    { type: columntype.text, name: "id" },
    { type: columntype.image, name: "image" },
    { type: columntype.text, name: "type" },
    { type: columntype.text, name: "title_en" },
    { type: columntype.text, name: "title_ar" },
    { type: columntype.text, name: "description_en" },
    { type: columntype.text, name: "description_ar" },
    { type: columntype.text, name: "position_en" },
    { type: columntype.text, name: "position_ar" },
    { type: columntype.text, name: "order_number" },
    { type: columntype.date, name: "created_date" },
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
      id: "image",
      numeric: false,
      disablePadding: false,
      label: "Image",
      withSort: false,
    },
    {
      id: "type",
      numeric: false,
      disablePadding: false,
      label: "Type",
      withSort: false,
    },
    {
      id: "title_en",
      numeric: false,
      disablePadding: false,
      label: "Title (EN)",
      withSort: false,
    },
    {
      id: "title_ar",
      numeric: false,
      disablePadding: false,
      label: "Title (AR)",
      withSort: false,
    },
    {
      id: "description_en",
      numeric: false,
      disablePadding: false,
      label: "Description (EN)",
      withSort: false,
    },
    {
      id: "description_ar",
      numeric: false,
      disablePadding: false,
      label: "Description (AR)",
      withSort: false,
    },
    {
      id: "position_en",
      numeric: false,
      disablePadding: false,
      label: "Position (EN)",
      withSort: false,
    },
    {
      id: "position_ar",
      numeric: false,
      disablePadding: false,
      label: "Position (AR)",
      withSort: false,
    },
    {
      id: "order_number",
      numeric: false,
      disablePadding: false,
      label: "Order number",
      withSort: false,
    },
    {
      id: "created_date",
      numeric: false,
      disablePadding: false,
      label: "Created date",
      withSort: true,
    },
    (dataPrivileges["4"]?.access_edit == 1 ||
      dataPrivileges["4"]?.access_delete == 1) && {
      id: "action",
      numeric: false,
      disablePadding: false,
      label: "Action",
      withSort: false,
    },
  ];
  const List = [
    dataPrivileges["4"]?.access_delete == 1 && {
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
                    DeleteTestimonials({
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
    dataPrivileges["4"]?.access_edit == 1 && {
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
      EditTestimonials({
        TestimonialsId: row?.id,
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
                    DeleteTestimonials({
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
        withAddButton={dataPrivileges["4"]?.access_write == 1 ? true : false}
        withDeleteItem={dataPrivileges["4"]?.access_delete == 1 ? true : false}
        withEditItem={dataPrivileges["4"]?.access_edit == 1 ? true : false}
        withPagination={false}
        withSearch={false}
      />
      {showModal ? (
        <DynamicModal
          show={showModal}
          setShow={setShowModal}
          faileds={array}
          values={values}
          title={"Testimonials"}
          editMode={editMode}
          description={editMode ? "Edit" : "Add new testimonials"}
          buttonTitle={editMode ? "Edit" : "Add"}
          onSubmit={(valuess) => {
            dispatch(
              ManageTestimonials({
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

export default Testimonials;
