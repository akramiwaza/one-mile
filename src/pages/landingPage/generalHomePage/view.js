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
import { Button } from "@mui/material";
import "../../../components/modal/DynamicModal.css";
import EditorComponent from "src/components/editor/Editor";
const GeneralHomePage = () => {
  const dispatch = useDispatch();
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
                key={"About app (EN)"}
                title={"About app (EN)"}
                data={values?.about_app_en}
                onChange={(data) => {
                  setFieldValue("about_app_en", data);
                }}
              />
              <div style={{ height: 30 }} />
              <EditorComponent
                key={"About app (AR)"}
                disabled={!canEdit}
                title={"About app (AR)"}
                data={values?.about_app_ar}
                onChange={(data) => {
                  setFieldValue("about_app_ar", data);
                }}
              />
              <div style={{ height: 30 }} />
              <div style={{ marginTop: 10, marginBottom: 10, width: "100%" }}>
                <CustomFormLabel>{"About app media"}</CustomFormLabel>
                <FileUploader
                  disabled={!canEdit}
                  multiple={false}
                  label={
                    "Drag & Drop Image or video here or click to select image or video"
                  }
                  name={"about_app_media"}
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
                    setFieldValue("about_app_media", file);
                  }}
                >
                  <div className="custom-dropzone" style={{ width: "100%" }}>
                    {values.about_app_media ? (
                      <>
                        <div style={{ width: "100%" }}>
                          {CheckTypeFile({
                            name:
                              values.about_app_media.name ??
                              values.about_app_media,
                          }) == "video" ? (
                            <video
                              src={ChackImageIsFile({
                                data: values.about_app_media,
                                IsBoolean: false,
                              })}
                              width="200"
                              height="200"
                              controls
                            />
                          ) : (
                            <img
                              src={ChackImageIsFile({
                                data: values.about_app_media,
                                IsBoolean: false,
                              })}
                              alt="image"
                              style={{ width: 100, height: 100 }}
                            />
                          )}
                          {ChackImageIsFile({
                            data: values.about_app_media,
                            IsBoolean: true,
                          }) == false ? null : (
                            <p style={{ width: "100%" }}>
                              {`File name: ${values.about_app_media.name}`}
                            </p>
                          )}
                        </div>
                        <Button
                          onClick={async () => {
                            setFieldValue("about_app_media", "");
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
                          Drag & Drop Image or video here or click to select
                          image or video
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

export default GeneralHomePage;
