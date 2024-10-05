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
  ManageAcitvities,
  DeleteAcitvities,
  GetAcitivities,
  EditAcitvities,
  SetField,
} from "./actions";
import DynamicModal from "src/components/modal/DynamicModal";
import * as Yup from "yup";
import { CommonAlert } from "src/components/alert/CommonAlert";
import { GetCategoryAcitivities } from "../category/actions";
import { useNavigate } from "react-router";
import { GetTopics } from "src/pages/topics/actions";
import { GetAgeRange } from "src/pages/flashCard/ageRange/actions";
import { GetLevelOfDifficulty } from "src/pages/flashCard/levelOfDifficulty/actions";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import { MenuItem, Select } from "@mui/material";
const Activities = () => {
  const dispatch = useDispatch();
  const Commonalert = CommonAlert(); // Create an alert object using the function
  const navigate = useNavigate();

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
  const [CategoryAcitivities, setCategoryAcitivities] = useState([]);
  const [AgeRange, setAgeRange] = useState([]);
  const [LevelOfDifficulty, setLevelOfDifficulty] = useState([]);
  const [Topics, setTopics] = useState([]);
  const [SubTopics, setSubTopics] = useState([]);
  const [selectedCategory, setselectedCategory] = useState();

  let dataPrivileges = getLocalStorage(dataLocalStorage.privileges);
  const Schema = Yup.object().shape({
    title_ar: Yup.string().trim().required("required"),
    title_en: Yup.string().trim().required("required"),
    category_id: Yup.number().required("required"),
    media_link: Yup.string().trim().required("required"),
  });

  const GetData = ({ tableName = null, type = null }) => {
    setLoadingData(true);
    setData([]);
    dispatch(
      GetAcitivities({
        page: page,
        rowsPerPage: rowsPerPage,
        orderBy: tableName ?? "title_en",
        typeOrder: type,
        search: search,
        category_id: selectedCategory,
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
        GetCategoryAcitivities({
          callback: (res) => {
            setCategoryAcitivities(res.data);
          },
        })
      );
      dispatch(
        GetAgeRange({
          callback: (res) => {
            setAgeRange(res?.data);
          },
        })
      );
      dispatch(
        GetLevelOfDifficulty({
          callback: (responseLevel) => {
            setLevelOfDifficulty(responseLevel.data);
          },
        })
      );
      dispatch(
        GetTopics({
          alphabetical: true,
          getSub: true,
          callback: (res) => {
            setSubTopics(res?.data);
          },
        })
      );
      dispatch(
        GetTopics({
          alphabetical: true,
          callback: (res) => {
            setTopics(res?.data);
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
        CategoryAcitivities && {
          failed: "category_id",
          type: inputType.dropdown,
          title: "Category",
          placeholder: "",
          fullwidth: true,
          datadropdown: CategoryAcitivities,
          faileddropdown: {
            name: "title_en",
            value: "id",
          },
        },
      ]);
    }
  };

  useEffect(() => {
    GetData({ tableName: null, type: null });
  }, [page, rowsPerPage, search, selectedCategory]);

  const columns = [
    { type: columntype.text, name: "id" },
    { type: columntype.image, name: "media_link" },
    { type: columntype.text, name: "title_en" },
    { type: columntype.text, name: "title_fr" },
    { type: columntype.text, name: "title_ar" },
    { type: columntype.text, name: "category" },
    { type: columntype.text, name: "order_number" },
    { type: columntype.switch, name: "is_feature" },
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
      id: "media_link",
      numeric: false,
      disablePadding: false,
      label: "Image",
      withSort: false,
    },
    {
      id: "title_en",
      numeric: false,
      disablePadding: false,
      label: "Title (EN)",
      withSort: true,
    },
    {
      id: "title_fr",
      numeric: false,
      disablePadding: false,
      label: "Title (FR)",
      withSort: true,
    },
    {
      id: "title_ar",
      numeric: false,
      disablePadding: false,
      label: "Title (AR)",
      withSort: true,
    },
    {
      id: "category",
      numeric: false,
      disablePadding: false,
      label: "Category",
      withSort: true,
    },
    {
      id: "order_number",
      numeric: false,
      disablePadding: false,
      label: "Order number",
      withSort: true,
    },
    {
      id: "is_feature",
      numeric: false,
      disablePadding: false,
      label: "is Feature",
      withSort: true,
    },
    {
      id: "is_active",
      numeric: false,
      disablePadding: false,
      label: "Is active",
      withSort: true,
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
    dataPrivileges["7"]?.access_edit == 1 && {
      name: "Chapters",
      function: async (data) => {
        navigate(`/activities/media/${data.id}`, { state: data });
      },
    },
    dataPrivileges["7"]?.access_edit == 1 && {
      name: "Flashcard",
      function: async (data) => {
        navigate(`/activities/flashcard/${data.id}`, { state: data });
      },
    },
    dataPrivileges["7"]?.access_edit == 1 && {
      name: "Edit",
      function: async (data) => {
        SetField({
          CategoryAcitivities: CategoryAcitivities,
          AgeRange: AgeRange,
          LevelOfDifficulty: LevelOfDifficulty,
          Topics: Topics,
          SubTopics: SubTopics,
          setarray: setarray,
          id: data.category_id,
          callback: () => {
            setEditMode(true);
            setvalues(data);
            setShowModal(true);
          },
        });
      },
    },
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
                    DeleteAcitvities({
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
      EditAcitvities({
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
      {CategoryAcitivities && (
        <div>
          <CustomFormLabel>Categories</CustomFormLabel>
          <Select
            style={{ width: "98%", marginLeft: "1%" }} // Set the width to 100% for full width
            value={selectedCategory}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200, // Set the desired height here
                },
              },
            }}
            onChange={(event) => {
              setselectedCategory(event.target.value);
            }}
          >
            {[{ title_en: "All", id: null }, ...CategoryAcitivities]?.map(
              (resdropdown) => {
                return (
                  <MenuItem value={resdropdown?.id}>
                    {resdropdown?.title_en}
                  </MenuItem>
                );
              }
            )}
          </Select>
        </div>
      )}
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
                    DeleteAcitvities({
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
          dispatch(
            GetCategoryAcitivities({
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
                  res && {
                    failed: "category_id",
                    type: inputType.dropdown,
                    title: "Category",
                    placeholder: "",
                    fullwidth: true,
                    datadropdown: res.data,
                    faileddropdown: {
                      name: "title_en",
                      value: "id",
                    },
                  },
                ]);
              },
            })
          );
          setEditMode(false);
          setShowModal(true);
        }} // when press add new button show modal to add new item
        items={data} // all data
        setItems={setData}
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
        withPagination={true}
        withSearch={true}
        isDroppableEnabled={true}
        onDragEnd={({ newOrderNumber, oldOrderNumber, item_id }) => {
          dispatch(
            reOrderItem({
              tableName: "activitie",
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
          title={"Activities"}
          editMode={editMode}
          description={editMode ? "Edit" : "Add new activite"}
          buttonTitle={editMode ? "Edit" : "Add"}
          onChange={({ value, failedName, setFieldValue }) => {
            if (failedName == "category_id") {
              SetField({
                CategoryAcitivities: CategoryAcitivities,
                AgeRange: AgeRange,
                LevelOfDifficulty: LevelOfDifficulty,
                Topics: Topics,
                SubTopics: SubTopics,
                setarray: setarray,
                id: value,
                callback: () => {},
              });
            }
          }}
          onSubmit={(valuess) => {
            dispatch(
              ManageAcitvities({
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

export default Activities;
