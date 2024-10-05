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
const LegalInformation = () => {
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
                title={"Terms and conditions (EN)"}
                key={"Terms and conditions (EN)"}
                data={values?.terms_and_conditions_en}
                onChange={(data) => {
                  setFieldValue("terms_and_conditions_en", data);
                }}
              />
              <div style={{ height: 30 }} />
              <EditorComponent
                disabled={!canEdit}
                title={"Terms and conditions (AR)"}
                key={"Terms and conditions (AR)"}
                data={values?.terms_and_conditions_ar}
                onChange={(data) => {
                  setFieldValue("terms_and_conditions_ar", data);
                }}
              />
              <div style={{ height: 30 }} />
              <EditorComponent
                disabled={!canEdit}
                title={"Privacy policy (EN)"}
                key={"Privacy policy (EN)"}
                data={values?.privacy_policy_en}
                onChange={(data) => {
                  setFieldValue("privacy_policy_en", data);
                }}
              />
              <div style={{ height: 30 }} />
              <EditorComponent
                disabled={!canEdit}
                title={"Privacy policy (AR)"}
                key={"Privacy policy (AR)"}
                data={values?.privacy_policy_ar}
                onChange={(data) => {
                  setFieldValue("privacy_policy_ar", data);
                }}
              />
              <div style={{ height: 30 }} />
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

export default LegalInformation;
