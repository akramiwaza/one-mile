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
  reOrderItem,
} from "src/helper/publicFunction";
import { ManageTopics, DeleteTopics, EditTopics, GetTopics } from "./actions";
import DynamicModal from "src/components/modal/DynamicModal";
import * as Yup from "yup";
import { CommonAlert } from "src/components/alert/CommonAlert";
import { useNavigate } from "react-router";
const Topics = () => {
  const dispatch = useDispatch();
  const Commonalert = CommonAlert(); // Create an alert object using the function
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
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
    color_code: Yup.string().trim().required("required"),
    title_ar: Yup.string().trim().required("required"),
    title_en: Yup.string().trim().required("required"),
    title_fr: Yup.string().trim().required("required"),
  });

  const setDataModal = () => {
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
        failed: "title_en",
        type: inputType.text,
        title: "Title (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
        child: {
          failed: "title_fr",
          type: inputType.text,
          title: "Title (FR)",
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
      },
      {
        failed: "tag_en",
        type: inputType.text,
        title: "Tag (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
        child: {
          failed: "tag_fr",
          type: inputType.text,
          title: "Tag (FR)",
          placeholder: "",
          fullwidth: true,
          customdesign: { width: "100%" },
          child: {
            failed: "tag_ar",
            type: inputType.text,
            title: "Tag (AR)",
            placeholder: "",
            fullwidth: true,
            customdesign: { width: "100%" },
          },
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
          failed: "description_fr",
          type: inputType.textarea,
          title: "Description (FR)",
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
      },
      {
        failed: "order_number",
        type: inputType.number,
        title: "Order number",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      // {
      //   failed: "media_link",
      //   type: inputType.image,
      //   title: "Main image",
      //   placeholder: "",
      //   fullwidth: true,
      //   fileTypes: ["JPG", "PNG", "JPEG", "WEBP"],
      //   multiple: false,
      //   label: "Drag & Drop Image here or click to select image",
      //   fileOrFiles: "File", //Array or File or null
      // },
      // {
      //   failed: "media_link_two",
      //   type: inputType.image,
      //   title: "Image",
      //   placeholder: "",
      //   fullwidth: true,
      //   fileTypes: ["JPG", "PNG", "JPEG", "WEBP"],
      //   multiple: false,
      //   label: "Drag & Drop Image here or click to select image",
      //   fileOrFiles: "File", //Array or File or null
      //   child: {
      //     failed: "media_link_three",
      //     type: inputType.image,
      //     title: "Image",
      //     placeholder: "",
      //     fullwidth: true,
      //     fileTypes: ["JPG", "PNG", "JPEG", "WEBP"],
      //     multiple: false,
      //     label: "Drag & Drop Image here or click to select image",
      //     fileOrFiles: "File", //Array or File or null
      //   },
      // },
    ]);
  };

  const GetData = ({ tableName = null, type = null }) => {
    setLoadingData(true);
    setData([]);
    dispatch(
      GetTopics({
        callback: (data) => {
          if (isValidArray(data?.data)) {
            setData(data?.data);
            if (array.length == 0) {
              setDataModal();
            }
          } else {
            setDataModal();
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
    // { type: columntype.image, name: "media_link" },
    { type: columntype.text, name: "color_code" },
    { type: columntype.text, name: "title_en" },
    { type: columntype.text, name: "title_fr" },
    { type: columntype.text, name: "title_ar" },
    { type: columntype.text, name: "description_en" },
    { type: columntype.text, name: "description_fr" },
    { type: columntype.text, name: "description_ar" },
    { type: columntype.text, name: "order_number" },
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
    // {
    //   id: "media_link",
    //   numeric: false,
    //   disablePadding: false,
    //   label: "Image",
    //   withSort: false,
    // },
    {
      id: "color_code",
      numeric: false,
      disablePadding: false,
      label: "Color code",
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
      id: "title_fr",
      numeric: false,
      disablePadding: false,
      label: "Title (FR)",
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
      id: "description_fr",
      numeric: false,
      disablePadding: false,
      label: "Description (FR)",
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
    {
      id: "is_active",
      numeric: false,
      disablePadding: false,
      label: "Is active",
      withSort: true,
    },
    (dataPrivileges["8"]?.access_edit == 1 ||
      dataPrivileges["8"]?.access_delete == 1) && {
      id: "action",
      numeric: false,
      disablePadding: false,
      label: "Action",
      withSort: false,
    },
  ];
  const List = [
    dataPrivileges["8"]?.access_edit == 1 && {
      name: "Sub Topics",
      function: async (data) => {
        navigate(`/sub_topics/${data.id}`, {
          state: data,
        });
      },
    },
    dataPrivileges["8"]?.access_edit == 1 && {
      name: "Edit",
      function: async (data) => {
        setEditMode(true);
        setvalues(data);
        setShowModal(true);
      },
    },
    dataPrivileges["8"]?.access_delete == 1 && {
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
                    DeleteTopics({
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
  ];

  const updateDataApi = ({ row, failedName, newData }) => {
    setloadingEditdatatype(`${row?.id}-${failedName}`);
    dispatch(
      EditTopics({
        slidershowId: row?.id,
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
                    DeleteTopics({
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
        withAddButton={dataPrivileges["8"]?.access_write == 1 ? true : false}
        withDeleteItem={dataPrivileges["8"]?.access_delete == 1 ? true : false}
        withEditItem={dataPrivileges["8"]?.access_edit == 1 ? true : false}
        withPagination={false}
        withSearch={false}
        isDroppableEnabled={true}
        onDragEnd={({ newOrderNumber, oldOrderNumber, item_id }) => {
          dispatch(
            reOrderItem({
              tableName: "topic",
              oldOrderNumber,
              newOrderNumber,
              item_id,
              callback: () => {
                GetData({ tableName: null, type: null });
              },
            })
          );
        }}
      />
      {showModal ? (
        <DynamicModal
          show={showModal}
          setShow={setShowModal}
          faileds={array}
          values={values}
          title={"Topics"}
          editMode={editMode}
          description={editMode ? "Edit" : "Add new topic"}
          buttonTitle={editMode ? "Edit" : "Add"}
          onSubmit={(valuess) => {
            dispatch(
              ManageTopics({
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

export default Topics;
