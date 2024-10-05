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
  ManageAcitvitiesMedia,
  DeleteAcitvitiesMedia,
  GetAcitivitiesMedia,
  EditAcitvitiesMedia,
} from "./actions";
import DynamicModal from "src/components/modal/DynamicModal";
import { CommonAlert } from "src/components/alert/CommonAlert";
import { useLocation, useParams } from "react-router";
import * as Yup from "yup";

const ActivitiesMedia = () => {
  const dispatch = useDispatch();
  const Commonalert = CommonAlert(); // Create an alert object using the function
  const { id } = useParams();
  const location = useLocation();
  const dataActivite = location.state;
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
  const Schema = Yup.object()
    .shape({
      media_name_en: Yup.string()
        .nullable()
        .transform((value) => (value === "" ? null : value)),
      media_link_en: Yup.string()
        .nullable()
        .transform((value) => (value === "" ? null : value)),
      media_name_fr: Yup.string()
        .nullable()
        .transform((value) => (value === "" ? null : value)),
      media_link_fr: Yup.string()
        .nullable()
        .transform((value) => (value === "" ? null : value)),
      media_name_ar: Yup.string()
        .nullable()
        .transform((value) => (value === "" ? null : value)),
      media_link_ar: Yup.string()
        .nullable()
        .transform((value) => (value === "" ? null : value)),
    })
    .test(
      "media-fields-check",
      "Fields must be filled correctly",
      function (values) {
        const {
          media_name_en,
          media_link_en,
          media_name_fr,
          media_link_fr,
          media_name_ar,
          media_link_ar,
        } = values;

        const errors = [];

        if (
          (media_name_en && !media_link_en) ||
          (!media_name_en && media_link_en)
        ) {
          errors.push(
            this.createError({
              path: "media_link_en",
              message:
                "Both Media name (EN) and Media link (EN) must be filled or empty",
            })
          );
        }

        if (
          (media_name_fr && !media_link_fr) ||
          (!media_name_fr && media_link_fr)
        ) {
          errors.push(
            this.createError({
              path: "media_link_fr",
              message:
                "Both Media name (FR) and Media link (FR) must be filled or empty",
            })
          );
        }

        if (
          (media_name_ar && !media_link_ar) ||
          (!media_name_ar && media_link_ar)
        ) {
          errors.push(
            this.createError({
              path: "media_link_ar",
              message:
                "Both Media name (AR) and Media link (AR) must be filled or empty",
            })
          );
        }

        if (errors.length > 0) {
          return new Yup.ValidationError(errors);
        }

        return true;
      }
    );

  const GetData = ({ tableName = null, type = null }) => {
    setLoadingData(true);
    setData([]);
    dispatch(
      GetAcitivitiesMedia({
        id,
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
          failed: "description_en",
          type: inputType.editor,
          title: "Description (EN)",
          placeholder: "",
          fullwidth: true,
          customdesign: { width: "100%" },
        },
        {
          failed: "description_fr",
          type: inputType.editor,
          title: "Description (FR)",
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
          failed: "media_name_en",
          type: inputType.text,
          title: "Media name (EN)",
          placeholder: "",
          fullwidth: true,
          customdesign: { width: "100%" },
        },
        {
          failed: "media_link_en",
          type: inputType.image,
          title: "Media (EN)",
          placeholder: "",
          fullwidth: true,
          fileTypes: ["MP3", "WAV", "MP4", "AAC", "FLAC", "OGG"],
          multiple: false,
          label: "Drag & Drop media file here or click to select",
          fileOrFiles: "File", //Array or File or null
        },
        {
          failed: "media_name_fr",
          type: inputType.text,
          title: "Media name (FR)",
          placeholder: "",
          fullwidth: true,
          customdesign: { width: "100%" },
        },
        {
          failed: "media_link_fr",
          type: inputType.image,
          title: "Media (FR)",
          placeholder: "",
          fullwidth: true,
          fileTypes: ["MP3", "WAV", "MP4", "AAC", "FLAC", "OGG"],
          multiple: false,
          label: "Drag & Drop media file here or click to select",
          fileOrFiles: "File", //Array or File or null
        },
        {
          failed: "media_name_ar",
          type: inputType.text,
          title: "Media name (AR)",
          placeholder: "",
          fullwidth: true,
          customdesign: { width: "100%" },
        },
        {
          failed: "media_link_ar",
          type: inputType.image,
          title: "Media (AR)",
          placeholder: "",
          fullwidth: true,
          fileTypes: ["MP3", "WAV", "MP4", "AAC", "FLAC", "OGG"],
          multiple: false,
          label: "Drag & Drop media file here or click to select",
          fileOrFiles: "File", //Array or File or null
        },
      ]);
    }
  };

  useEffect(() => {
    GetData({ tableName: null, type: null });
  }, [page, rowsPerPage, search]);

  const columns = [
    { type: columntype.text, name: "id" },
    { type: columntype.text, name: "title_en" },
    { type: columntype.text, name: "title_fr" },
    { type: columntype.text, name: "title_ar" },
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
      id: "is_active",
      numeric: false,
      disablePadding: false,
      label: "Is active",
      withSort: false,
    },
    (dataPrivileges["7"]?.access_edit == 1 ||
      dataPrivileges["7"]?.access_delete == 1) && {
      id: "action",
      numeric: false,
      disablePadding: false,
      label: "Action",
      withSort: false,
    },
  ];
  const List = [
    dataPrivileges["7"]?.access_delete == 1 && {
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
                    DeleteAcitvitiesMedia({
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
    dataPrivileges["7"]?.access_edit == 1 && {
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
      EditAcitvitiesMedia({
        CategoryAcitivitesId: row?.id,
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
                    DeleteAcitvitiesMedia({
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
        withAddButton={dataPrivileges["7"]?.access_write == 1 ? true : false}
        withDeleteItem={dataPrivileges["7"]?.access_delete == 1 ? true : false}
        withEditItem={dataPrivileges["7"]?.access_edit == 1 ? true : false}
        withPagination={false}
        withSearch={false}
        canBack
        nameTable={`${dataActivite?.title_en ?? ""} chapters`}
      />
      {showModal ? (
        <DynamicModal
          show={showModal}
          setShow={setShowModal}
          faileds={array}
          values={values}
          title={"Chapter"}
          editMode={editMode}
          description={editMode ? "Edit" : "Add new chapter"}
          buttonTitle={editMode ? "Edit" : "Add"}
          checkSchema={false}
          onSubmit={(valuess) => {
            dispatch(
              ManageAcitvitiesMedia({
                id,
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

export default ActivitiesMedia;
