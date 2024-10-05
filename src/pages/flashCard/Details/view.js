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
import {
  DeleteFlashCardDetails,
  EditFlashCardDetails,
  GetFlashcardDetailsPage,
  ManageFlashCardDetails,
} from "./actions";
import DynamicModal from "src/components/modal/DynamicModal";
import * as Yup from "yup";
import { useLocation, useParams } from "react-router";
import { CommonAlert } from "src/components/alert/CommonAlert";
const FlashcardDetailsPage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const { id } = useParams();
  const location = useLocation();
  const dataFlashCard = location.state;
  const Commonalert = CommonAlert();
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
  let dataPrivileges = getLocalStorage(dataLocalStorage.privileges);
  const [TotalData, setTotalData] = useState(0);
  const Schema = Yup.object().shape({
    title_en: Yup.string().required("required"),
    image_en: Yup.string().required("required"),
    image_ar: Yup.string().required("required"),
    image_fr: Yup.string().required("required"),
    image_not_text: Yup.string().required("required"),
    image_colored_en: Yup.string().required("required"),
    image_colored_ar: Yup.string().required("required"),
    image_colored_fr: Yup.string().required("required"),
    image_colored_not_text: Yup.string().required("required"),
    order_number: Yup.number().positive().required("required"),
  });

  const GetData = ({ tableName = null, type = null }) => {
    setData([]);
    setLoadingData(true);
    dispatch(
      GetFlashcardDetailsPage({
        id: id,
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
        value: "",
        type: inputType.text,
        title: "Title (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
        child: {
          failed: "title_fr",
          value: "",
          type: inputType.text,
          title: "Title (FR)",
          placeholder: "",
          fullwidth: true,
          customdesign: { width: "100%" },
          child: {
            failed: "title_ar",
            value: "",
            type: inputType.text,
            title: "Title (AR)",
            placeholder: "",
            fullwidth: true,
            customdesign: { width: "100%" },
          },
        },
      },
      {
        failed: "order_number",
        value: "",
        type: inputType.number,
        title: "Order number",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "image_en",
        value: "",
        type: inputType.image,
        title: "Image (EN)",
        placeholder: "",
        fullwidth: true,
        fileTypes: ["JPG", "PNG", "JPEG", "WEBP"],
        multiple: false,
        label: "Drag & Drop Image here or click to select image",
        fileOrFiles: "File", //Array or File or null
        child: {
          failed: "image_fr",
          value: "",
          type: inputType.image,
          title: "Image (FR)",
          placeholder: "",
          fullwidth: true,
          fileTypes: ["JPG", "PNG", "JPEG", "WEBP"],
          multiple: false,
          label: "Drag & Drop Image here or click to select image",
          fileOrFiles: "File", //Array or File or null
          child: {
            failed: "image_ar",
            value: "",
            type: inputType.image,
            title: "Image (AR)",
            placeholder: "",
            fullwidth: true,
            fileTypes: ["JPG", "PNG", "JPEG", "WEBP"],
            multiple: false,
            label: "Drag & Drop Image here or click to select image",
            fileOrFiles: "File", //Array or File or null
            child: {
              failed: "image_not_text",
              value: "",
              type: inputType.image,
              title: "Image (NO TEXT)",
              placeholder: "",
              fullwidth: true,
              fileTypes: ["JPG", "PNG", "JPEG", "WEBP"],
              multiple: false,
              label: "Drag & Drop Image here or click to select image",
              fileOrFiles: "File", //Array or File or null
            },
          },
        },
      },
      {
        failed: "image_colored_en",
        value: "",
        type: inputType.image,
        title: "Image colored (EN)",
        placeholder: "",
        fullwidth: true,
        fileTypes: ["JPG", "PNG", "JPEG", "WEBP"],
        multiple: false,
        label: "Drag & Drop Image here or click to select image",
        fileOrFiles: "File", //Array or File or null
        child: {
          failed: "image_colored_fr",
          value: "",
          type: inputType.image,
          title: "Image colored (FR)",
          placeholder: "",
          fullwidth: true,
          fileTypes: ["JPG", "PNG", "JPEG", "WEBP"],
          multiple: false,
          label: "Drag & Drop Image here or click to select image",
          fileOrFiles: "File", //Array or File or null
          child: {
            failed: "image_colored_ar",
            value: "",
            type: inputType.image,
            title: "Image colored (AR)",
            placeholder: "",
            fullwidth: true,
            fileTypes: ["JPG", "PNG", "JPEG", "WEBP"],
            multiple: false,
            label: "Drag & Drop Image here or click to select image",
            fileOrFiles: "File", //Array or File or null
            child: {
              failed: "image_colored_not_text",
              value: "",
              type: inputType.image,
              title: "Image colored (NO TEXT)",
              placeholder: "",
              fullwidth: true,
              fileTypes: ["JPG", "PNG", "JPEG", "WEBP"],
              multiple: false,
              label: "Drag & Drop Image here or click to select image",
              fileOrFiles: "File", //Array or File or null
            },
          },
        },
      },
    ]);
  };

  useEffect(() => {
    GetData({ tableName: null, type: null });
  }, [page, rowsPerPage, search]);

  const columns = [
    { type: columntype.text, name: "id" },
    { type: columntype.text, name: "title_en" },
    { type: columntype.text, name: "title_fr" },
    { type: columntype.text, name: "title_ar" },
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
      id: "order_number",
      numeric: false,
      disablePadding: false,
      label: "Order number",
      withSort: false,
    },
    {
      id: "is_active",
      numeric: false,
      disablePadding: false,
      label: "Is active",
      withSort: true,
    },
    {
      id: "created_date",
      numeric: false,
      disablePadding: false,
      label: "Created date",
      withSort: true,
    },

    (dataPrivileges["3"]?.access_delete == 1 ||
      dataPrivileges["3"]?.access_edit == 1) && {
      id: "action",
      numeric: false,
      disablePadding: false,
      label: "Action",
      withSort: false,
    },
  ];
  const List = [
    dataPrivileges["3"]?.access_delete == 1 && {
      name: "Delete",
      function: (row) => {
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
                    DeleteFlashCardDetails({
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
    dataPrivileges["3"]?.access_edit == 1 && {
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
      EditFlashCardDetails({
        editMode: editMode,
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
                    DeleteFlashCardDetails({
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
        withAddButton={dataPrivileges["3"]?.access_write == 1 ? true : false}
        withDeleteItem={dataPrivileges["3"]?.access_delete == 1 ? true : false}
        withEditItem={dataPrivileges["3"]?.access_edit == 1 ? true : false}
        canBack
        nameTable={dataFlashCard?.title_en ?? dataFlashCard?.title_ar}
        isDroppableEnabled={true}
        onDragEnd={({ newOrderNumber, oldOrderNumber, item_id }) => {
          dispatch(
            reOrderItem({
              tableName: "flash_cards_details",
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
          title={"Details"}
          editMode={editMode}
          description={editMode ? "Edit" : "Add new details"}
          buttonTitle={editMode ? "Edit" : "Add"}
          onSubmit={(valuess) => {
            dispatch(
              ManageFlashCardDetails({
                flash_card_id: id,
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

export default FlashcardDetailsPage;
