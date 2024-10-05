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
import "../../components/modal/DynamicModal.css";
import EditorComponent from "src/components/editor/Editor";
const Settings = () => {
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
              <div style={{ marginTop: 10, marginBottom: 10, width: "100%" }}>
                <CustomFormLabel>{"Impact media"}</CustomFormLabel>
                <FileUploader
                  disabled={!canEdit}
                  multiple={false}
                  label={"Drag & Drop Image here or click to select image"}
                  name={"image_impact_page"}
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
                    setFieldValue("image_impact_page", file);
                  }}
                >
                  <div className="custom-dropzone" style={{ width: "100%" }}>
                    {values.image_impact_page ? (
                      <>
                        <div style={{ width: "100%" }}>
                          {CheckTypeFile({
                            name:
                              values.image_impact_page.name ??
                              values.image_impact_page,
                          }) == "video" ? (
                            <video
                              src={ChackImageIsFile({
                                data: values.image_impact_page,
                                IsBoolean: false,
                              })}
                              width="200"
                              height="200"
                              controls
                            />
                          ) : (
                            <img
                              src={ChackImageIsFile({
                                data: values.image_impact_page,
                                IsBoolean: false,
                              })}
                              alt="image"
                              style={{ width: 100, height: 100 }}
                            />
                          )}
                          {ChackImageIsFile({
                            data: values.image_impact_page,
                            IsBoolean: true,
                          }) == false ? null : (
                            <p style={{ width: "100%" }}>
                              {`File name: ${values.image_impact_page.name}`}
                            </p>
                          )}
                        </div>
                        <Button
                          onClick={async () => {
                            setFieldValue("image_impact_page", "");
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
              <Field
                component={CustomTextField}
                disabled={!canEdit}
                Title={"Link video home page"}
                name={"video_home_page"}
                multiline={false}
                numberOfLines={5}
                value={values.video_home_page}
                onChange={handleChange("video_home_page")}
                placeholder={""}
                fullWidth={true}
                id={"video_home_page"}
                variant="outlined"
              />
              <Field
                component={CustomTextField}
                disabled={!canEdit}
                Title={"General keywords"}
                name={"general_keywords"}
                multiline={false}
                numberOfLines={5}
                value={values.general_keywords}
                onChange={handleChange("general_keywords")}
                placeholder={""}
                fullWidth={true}
                id={"general_keywords"}
                variant="outlined"
              />
              <Field
                component={CustomTextField}
                disabled={!canEdit}
                Title={"General description"}
                name={"general_description"}
                multiline={true}
                customeStyleText={{ height: 100, width: "100%" }}
                numberOfLines={5}
                value={values.general_description}
                onChange={handleChange("general_description")}
                placeholder={""}
                fullWidth={true}
                id={"general_description"}
                variant="outlined"
              />
              <div style={{ marginTop: 10, marginBottom: 10, width: "100%" }}>
                <CustomFormLabel>{"General image"}</CustomFormLabel>
                <FileUploader
                  disabled={!canEdit}
                  multiple={false}
                  label={"Drag & Drop Image here or click to select image"}
                  name={"General image"}
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
                    setFieldValue("general_image", file);
                  }}
                >
                  <div className="custom-dropzone" style={{ width: "100%" }}>
                    {values.general_image ? (
                      <>
                        <div style={{ width: "100%" }}>
                          {CheckTypeFile({
                            name:
                              values.general_image.name ?? values.general_image,
                          }) == "video" ? (
                            <video
                              src={ChackImageIsFile({
                                data: values.general_image,
                                IsBoolean: false,
                              })}
                              width="200"
                              height="200"
                              controls
                            />
                          ) : (
                            <img
                              src={ChackImageIsFile({
                                data: values.general_image,
                                IsBoolean: false,
                              })}
                              alt="image"
                              style={{ width: 100, height: 100 }}
                            />
                          )}
                          {ChackImageIsFile({
                            data: values.general_image,
                            IsBoolean: true,
                          }) == false ? null : (
                            <p style={{ width: "100%" }}>
                              {`File name: ${values.general_image.name}`}
                            </p>
                          )}
                        </div>
                        <Button
                          onClick={async () => {
                            setFieldValue("general_image", "");
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
              <Field
                component={CustomTextField}
                disabled={!canEdit}
                Title={"Main phone number"}
                name={"phonenumber"}
                multiline={false}
                numberOfLines={5}
                value={values.phonenumber}
                onChange={handleChange("phonenumber")}
                placeholder={""}
                fullWidth={true}
                id={"phonenumber"}
                variant="outlined"
              />
              <Field
                component={CustomTextField}
                disabled={!canEdit}
                Title={"Main email"}
                name={"email"}
                multiline={false}
                numberOfLines={5}
                value={values.email}
                onChange={handleChange("email")}
                placeholder={""}
                fullWidth={true}
                id={"email"}
                variant="outlined"
              />
              <Field
                component={CustomTextField}
                disabled={!canEdit}
                Title={"Apple store link"}
                name={"apple_store_link"}
                multiline={false}
                numberOfLines={5}
                value={values.apple_store_link}
                onChange={handleChange("apple_store_link")}
                placeholder={""}
                fullWidth={true}
                id={"apple_store_link"}
                variant="outlined"
              />
              <Field
                component={CustomTextField}
                disabled={!canEdit}
                Title={"Google play link"}
                name={"google_play_link"}
                multiline={false}
                numberOfLines={5}
                value={values.google_play_link}
                onChange={handleChange("google_play_link")}
                placeholder={""}
                fullWidth={true}
                id={"google_play_link"}
                variant="outlined"
              />
              <Field
                component={CustomTextField}
                disabled={!canEdit}
                Title={"Huawei store link"}
                name={"huawei_store_link"}
                multiline={false}
                numberOfLines={5}
                value={values.huawei_store_link}
                onChange={handleChange("huawei_store_link")}
                placeholder={""}
                fullWidth={true}
                id={"huawei_store_link"}
                variant="outlined"
              />
              <Field
                component={CustomTextField}
                disabled={!canEdit}
                Title={"Facebook link"}
                name={"facebook_link"}
                multiline={false}
                numberOfLines={5}
                value={values.facebook_link}
                onChange={handleChange("facebook_link")}
                placeholder={""}
                fullWidth={true}
                id={"facebook_link"}
                variant="outlined"
              />
              <Field
                component={CustomTextField}
                disabled={!canEdit}
                Title={"Instgram link"}
                name={"instgram_link"}
                multiline={false}
                numberOfLines={5}
                value={values.instgram_link}
                onChange={handleChange("instgram_link")}
                placeholder={""}
                fullWidth={true}
                id={"instgram_link"}
                variant="outlined"
              />
              <Field
                component={CustomTextField}
                disabled={!canEdit}
                Title={"X link"}
                name={"x_link"}
                multiline={false}
                numberOfLines={5}
                value={values.x_link}
                onChange={handleChange("x_link")}
                placeholder={""}
                fullWidth={true}
                id={"x_link"}
                variant="outlined"
              />
              <Field
                component={CustomTextField}
                disabled={!canEdit}
                Title={"Youtube link"}
                name={"youtube_link"}
                multiline={false}
                numberOfLines={5}
                value={values.youtube_link}
                onChange={handleChange("youtube_link")}
                placeholder={""}
                fullWidth={true}
                id={"youtube_link"}
                variant="outlined"
              />
              <Field
                component={CustomTextField}
                disabled={!canEdit}
                Title={"Linkedin link"}
                name={"linkedin_link"}
                multiline={false}
                numberOfLines={5}
                value={values.linkedin_link}
                onChange={handleChange("linkedin_link")}
                placeholder={""}
                fullWidth={true}
                id={"linkedin_link"}
                variant="outlined"
              />
              <Field
                component={CustomTextField}
                disabled={!canEdit}
                Title={"Webapp link"}
                name={"webapp_link"}
                multiline={false}
                numberOfLines={5}
                value={values.webapp_link}
                onChange={handleChange("webapp_link")}
                placeholder={""}
                fullWidth={true}
                id={"webapp_link"}
                variant="outlined"
              />
              <Field
                component={CustomTextField}
                disabled={!canEdit}
                Title={"Text maintenance (EN)"}
                name={"text_maintenance_en"}
                multiline={true}
                customeStyleText={{ height: 100, width: "100%" }}
                numberOfLines={5}
                value={values.text_maintenance_en}
                onChange={handleChange("text_maintenance_en")}
                placeholder={""}
                fullWidth={true}
                id={"text_maintenance_en"}
                variant="outlined"
              />
              <Field
                component={CustomTextField}
                disabled={!canEdit}
                Title={"Text maintenance (AR)"}
                name={"text_maintenance_ar"}
                multiline={true}
                customeStyleText={{ height: 100, width: "100%" }}
                numberOfLines={5}
                value={values.text_maintenance_ar}
                onChange={handleChange("text_maintenance_ar")}
                placeholder={""}
                fullWidth={true}
                id={"text_maintenance_ar"}
                variant="outlined"
              />

              <Field
                component={CustomTextField}
                disabled={!canEdit}
                Title={"Text update (EN)"}
                name={"text_update_en"}
                multiline={true}
                customeStyleText={{ height: 100, width: "100%" }}
                numberOfLines={5}
                value={values.text_update_en}
                onChange={handleChange("text_update_en")}
                placeholder={""}
                fullWidth={true}
                id={"text_update_en"}
                variant="outlined"
              />
              <Field
                component={CustomTextField}
                disabled={!canEdit}
                Title={"Text update (AR)"}
                name={"text_update_ar"}
                multiline={true}
                customeStyleText={{ height: 100, width: "100%" }}
                numberOfLines={5}
                value={values.text_update_ar}
                onChange={handleChange("text_update_ar")}
                placeholder={""}
                fullWidth={true}
                id={"text_update_ar"}
                variant="outlined"
              />
              <Field
                component={CustomTextField}
                disabled={!canEdit}
                Title={"App version"}
                name={"app_version"}
                multiline={false}
                numberOfLines={5}
                value={values?.app_version}
                onChange={handleChange("app_version")}
                placeholder={""}
                fullWidth={true}
                id={"app_version"}
                variant="outlined"
              />
              <Field
                component={CustomTextField}
                disabled={!canEdit}
                Title={"Force update"}
                name={"force_update"}
                multiline={false}
                numberOfLines={5}
                value={values?.force_update}
                onChange={handleChange("force_update")}
                placeholder={""}
                fullWidth={true}
                id={"force_update"}
                variant="outlined"
              />

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

export default Settings;
