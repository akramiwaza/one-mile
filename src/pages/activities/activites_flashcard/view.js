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
  ManageAcitvitiesFlashcard,
  DeleteAcitvitiesFlashcard,
  GetAcitivitiesFlashcard,
  EditAcitvitiesFlashcard,
} from "./actions";
import DynamicModal from "src/components/modal/DynamicModal";
import { CommonAlert } from "src/components/alert/CommonAlert";
import { useLocation, useParams } from "react-router";
import * as Yup from "yup";
import { GetFlashCardByCategory } from "src/pages/flashCard/flashCard/actions";

const ActivitiesFlashcard = () => {
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
  const Schema = Yup.object().shape({
    description_ar: Yup.string().trim().required("required"),
    description_en: Yup.string().trim().required("required"),
    description_fr: Yup.string().trim().required("required"),
    flash_card_id: Yup.number().required("required"),
  });

  const AddData = ({ flash_card }) => {
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

      flash_card?.length > 0 && {
        failed: "flash_card_id",
        type: inputType.dropdown,
        title: "Flashcard",
        placeholder: "",
        fullwidth: true,
        datadropdown: flash_card,
        faileddropdown: {
          name: "title_en",
          value: "id",
        },
      },
    ]);
  };

  const GetData = ({ tableName = null, type = null }) => {
    setLoadingData(true);
    setData([]);
    dispatch(
      GetAcitivitiesFlashcard({
        id,
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
      dispatch(
        GetFlashCardByCategory({
          callback: (data) => {
            AddData({ flash_card: data.data });
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
    { type: columntype.text, name: "description_en" },
    { type: columntype.text, name: "description_fr" },
    { type: columntype.text, name: "description_ar" },
    { type: columntype.text, name: "title_en" },
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
      label: "Flashcard name",
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
                    DeleteAcitvitiesFlashcard({
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
      EditAcitvitiesFlashcard({
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
                    DeleteAcitvitiesFlashcard({
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
        nameTable={`${dataActivite?.title_ar ?? ""} flashcards`}
      />
      {showModal ? (
        <DynamicModal
          show={showModal}
          setShow={setShowModal}
          faileds={array}
          values={values}
          title={"Flashcard"}
          editMode={editMode}
          description={editMode ? "Edit" : "Add new flashcard to activity"}
          buttonTitle={editMode ? "Edit" : "Add"}
          onSubmit={(valuess) => {
            dispatch(
              ManageAcitvitiesFlashcard({
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

export default ActivitiesFlashcard;
