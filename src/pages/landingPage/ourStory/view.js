import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  ChackImageIsFile,
  CheckTypeFile,
  dataLocalStorage,
  getLocalStorage,
} from "src/helper/publicFunction";
import { ManageSettings, GetSettings } from "./actions";
import * as Yup from "yup";
import { CommonAlert } from "src/components/alert/CommonAlert";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import { Field, Formik } from "formik";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import { FileUploader } from "react-drag-drop-files";
import CloudUploadIcon from "@mui/icons-material/CloudUpload"; // Import the Material-UI icon
import { Button, Switch } from "@mui/material";
import "../../../components/modal/DynamicModal.css";
import EditorComponent from "src/components/editor/Editor";
const OurStory = () => {
  const dispatch = useDispatch();
  const Commonalert = CommonAlert(); // Create an alert object using the function
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState();
  let dataPrivileges = getLocalStorage(dataLocalStorage.privileges);
  const Schema = Yup.object().shape({});
  const canEdit = dataPrivileges["5"]?.access_edit == 1;

  const GetData = () => {
    dispatch(
      GetSettings({
        callback: (data) => {
          setData(data?.data);
        },
      })
    );
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <>
      {data && (
        <Formik
          // validationSchema={Schema}
          initialValues={data}
          onSubmit={(values) => {
            dispatch(ManageSettings({ values, callback: () => {} }));
          }}
        >
          {({ handleChange, handleSubmit, setFieldValue, values }) => (
            <>
              <EditorComponent
                disabled={!canEdit}
                title={"Our story (EN) (first column)"}
                key={"Our story (EN)"}
                data={values?.our_story_text_en}
                onChange={(data) => {
                  setFieldValue("our_story_text_en", data);
                }}
              />
              <div style={{ height: 30 }} />
              <EditorComponent
                disabled={!canEdit}
                title={"Our story (EN) (second column)"}
                key={"Our story (EN)"}
                data={values?.our_story_text_two_en}
                onChange={(data) => {
                  setFieldValue("our_story_text_two_en", data);
                }}
              />
              <div style={{ height: 30 }} />
              <EditorComponent
                disabled={!canEdit}
                title={"Our story (AR) (first column)"}
                key={"Our story (AR)"}
                data={values?.our_story_text_ar}
                onChange={(data) => {
                  setFieldValue("our_story_text_ar", data);
                }}
              />
              <div style={{ height: 30 }} />
              <EditorComponent
                disabled={!canEdit}
                title={"Our story (AR) (second column)"}
                key={"Our story (AR)"}
                data={values?.our_story_text_two_ar}
                onChange={(data) => {
                  setFieldValue("our_story_text_two_ar", data);
                }}
              />
              <div style={{ height: 30 }} />
              <EditorComponent
                disabled={!canEdit}
                title={"Our story mobile (EN)"}
                key={"Our story mobile (EN)"}
                data={values?.our_story_text_mobile_en}
                onChange={(data) => {
                  setFieldValue("our_story_text_mobile_en", data);
                }}
              />
              <div style={{ height: 30 }} />
              <EditorComponent
                disabled={!canEdit}
                title={"Our story mobile (AR)"}
                key={"Our story mobile (AR)"}
                data={values?.our_story_text_mobile_ar}
                onChange={(data) => {
                  setFieldValue("our_story_text_mobile_ar", data);
                }}
              />
              <div style={{ height: 30 }} />
              <div style={{ marginTop: 10, marginBottom: 10, width: "100%" }}>
                <CustomFormLabel>{"Our story media"}</CustomFormLabel>
                <FileUploader
                  disabled={!canEdit}
                  multiple={false}
                  label={"Drag & Drop Image here or click to select image"}
                  name={"our_story_image"}
                  types={[
                    "jpeg",
                    "jpg",
                    "png",
                    "gif",
                    "mp4",
                    "mov",
                    "webm",
                    "avi",
                    "wmv",
                    "flv",
                  ]}
                  fileOrFiles={"File"}
                  handleChange={(file) => {
                    setFieldValue("our_story_image", file);
                  }}
                >
                  <div className="custom-dropzone" style={{ width: "100%" }}>
                    {values.our_story_image ? (
                      <>
                        <div style={{ width: "100%" }}>
                          {CheckTypeFile({
                            name:
                              values.our_story_image.name ??
                              values.our_story_image,
                          }) == "video" ? (
                            <video
                              src={ChackImageIsFile({
                                data: values.our_story_image,
                                IsBoolean: false,
                              })}
                              width="200"
                              height="200"
                              controls
                            />
                          ) : (
                            <img
                              src={ChackImageIsFile({
                                data: values.our_story_image,
                                IsBoolean: false,
                              })}
                              alt="image"
                              style={{ width: 100, height: 100 }}
                            />
                          )}
                          {ChackImageIsFile({
                            data: values.our_story_image,
                            IsBoolean: true,
                          }) == false ? null : (
                            <p style={{ width: "100%" }}>
                              {`File name: ${values.our_story_image.name}`}
                            </p>
                          )}
                        </div>
                        <Button
                          onClick={async () => {
                            setFieldValue("our_story_image", "");
                          }}
                          variant="contained"
                        >
                          Remove
                        </Button>
                      </>
                    ) : (
                      <div>
                        <CloudUploadIcon
                          style={{ fontSize: 48, color: "#333" }}
                        />
                        <p style={{ width: "100%", textAlign: "center" }}>
                          Drag & Drop Image here or click to select image
                        </p>
                      </div>
                    )}
                  </div>
                </FileUploader>
              </div>
              {canEdit && (
                <Button
                  onClick={handleSubmit}
                  style={{ width: "100%", marginTop: "2%" }}
                >
                  Save
                </Button>
              )}
            </>
          )}
        </Formik>
      )}
    </>
  );
};

export default OurStory;
