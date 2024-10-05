import { useDispatch } from "react-redux";
import {
  ChackImageIsFile,
  CheckTypeFile,
  dataLocalStorage,
  getLocalStorage,
} from "src/helper/publicFunction";
import { SendNotification } from "./actions";
import * as Yup from "yup";
import { CommonAlert } from "src/components/alert/CommonAlert";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import { Field, Formik } from "formik";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import { FileUploader } from "react-drag-drop-files";
import CloudUploadIcon from "@mui/icons-material/CloudUpload"; // Import the Material-UI icon
import { Button, MenuItem, Select } from "@mui/material";
import "../../components/modal/DynamicModal.css";
const NotificationController = () => {
  const dispatch = useDispatch();
  const Commonalert = CommonAlert(); // Create an alert object using the function
  let dataPrivileges = getLocalStorage(dataLocalStorage.privileges);
  const Schema = Yup.object().shape({
    title: Yup.string().trim().required("required"),
    description: Yup.string().trim().required("required"),
    topic_name: Yup.string().trim().required("required"),
  });
  const canEdit = dataPrivileges["14"]?.access_edit == 1;
  return (
    <>
      <Formik
        validationSchema={Schema}
        initialValues={{
          title: "",
          description: "",
          image: "",
          topic_name: "all",
        }}
        onSubmit={(values) => {
          Commonalert.show({
            title: "Are you sure",
            message: "you want to send this notifciation ?",
            type: "send",
            actions: [
              {
                name: "Yes",
                callback: () =>
                  dispatch(
                    SendNotification({
                      values,
                      callback: (data) => {
                        if (data) {
                          window.location.reload(false);
                        }
                      },
                    })
                  ),
                type: "send",
              },
              {
                name: "No",
                callback: () => {},
                type: "cancel",
              },
            ],
          });
        }}
      >
        {({ handleChange, handleSubmit, setFieldValue, values, errors }) => (
          <>
            <div style={{ marginTop: 10, marginBottom: 10, width: "100%" }}>
              <CustomFormLabel>{"Image"}</CustomFormLabel>
              <FileUploader
                disabled={!canEdit}
                multiple={false}
                label={"Drag & Drop Image here or click to select image"}
                name={"image"}
                types={["jpeg", "jpg", "png", "gif"]}
                fileOrFiles={"File"}
                handleChange={(file) => {
                  setFieldValue("image", file);
                }}
              >
                <div className="custom-dropzone" style={{ width: "100%" }}>
                  {values.image ? (
                    <>
                      <div style={{ width: "100%" }}>
                        {CheckTypeFile({
                          name: values.image.name ?? values.image,
                        }) == "video" ? (
                          <video
                            src={ChackImageIsFile({
                              data: values.image,
                              IsBoolean: false,
                            })}
                            width="200"
                            height="200"
                            controls
                          />
                        ) : (
                          <img
                            src={ChackImageIsFile({
                              data: values.image,
                              IsBoolean: false,
                            })}
                            alt="image"
                            style={{ width: 100, height: 100 }}
                          />
                        )}
                        {ChackImageIsFile({
                          data: values.image,
                          IsBoolean: true,
                        }) == false ? null : (
                          <p style={{ width: "100%" }}>
                            {`File name: ${values.image.name}`}
                          </p>
                        )}
                      </div>
                      <Button
                        onClick={async () => {
                          setFieldValue("image", "");
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
              Title={"Title"}
              name={"title"}
              multiline={false}
              numberOfLines={5}
              value={values.title}
              onChange={handleChange("title")}
              placeholder={""}
              fullWidth={true}
              id={"title"}
              variant="outlined"
              errors={errors.title}
            />
            <Field
              component={CustomTextField}
              disabled={!canEdit}
              Title={"Description"}
              name={"description"}
              multiline={true}
              numberOfLines={5}
              value={values.description}
              onChange={handleChange("description")}
              placeholder={""}
              fullWidth={true}
              id={"description"}
              variant="outlined"
              customeStyleText={{ height: 100, width: "100%" }}
              errors={errors.description}
            />
            <div>
              <CustomFormLabel>{"User type"}</CustomFormLabel>
              <Select
                style={{ width: "100%" }} // Set the width to 100% for full width
                value={values.topic_name}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 200, // Set the desired height here
                    },
                  },
                }}
                onChange={(event) => {
                  setFieldValue("topic_name", event.target.value);
                }}
              >
                {[
                  { name: "All", value: "all" },
                  { name: "Users", value: "user" },
                  { name: "Guests", value: "guest" },
                ].map((resdropdown) => {
                  return (
                    <MenuItem value={resdropdown.value}>
                      {resdropdown.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>

            {canEdit && (
              <Button
                onClick={handleSubmit}
                style={{ width: "100%", marginTop: "2%" }}
              >
                Send
              </Button>
            )}
          </>
        )}
      </Formik>
    </>
  );
};

export default NotificationController;
