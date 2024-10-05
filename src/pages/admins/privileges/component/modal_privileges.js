import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  TextField,
  FormLabel,
  DialogContent,
  DialogContentText,
  Grid,
  Stack,
  FormGroup,
  FormControlLabel,
  Typography,
  Select,
  MenuItem,
  useMediaQuery,
  Checkbox,
} from "@mui/material";
import { Field, Formik } from "formik";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import { editItemInArray } from "src/helper/publicFunction";

const ModalPrivileges = ({
  show,
  setShow,
  faileds,
  setfaileds,
  editMode,
  title,
  typeName,
  settypeName,
  onSubmit,
  handleSubmit,
  buttonTitle,
  Schema,
}) => {
  const isSmallScreen = useMediaQuery("(max-width:500px)");
  const onClose = () => {
    let OldData = faileds;
    for (var i = 0; i < OldData.length; ++i) {
      OldData[i].access_delete = 0;
      OldData[i].access_edit = 0;
      OldData[i].access_publish = 0;
      OldData[i].access_read = 0;
      OldData[i].access_write = 0;
    }
    setfaileds(OldData);
    settypeName("");
    setShow(false);
  };
  const onChange = async (olditem, failedName, value) => {
    let updatedArray = await editItemInArray(
      {
        id: olditem.id,
        [failedName]: olditem[failedName] == 1 ? 0 : 1,
      },
      faileds
    );

    setfaileds(updatedArray);
  };
  useEffect(() => {
    if (!show) {
      onClose();
    }
  }, [show]);
  return (
    <>
      <Dialog
        open={show}
        onClose={() => onClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth="m"
      >
        <IconButton
          style={{ justifyContent: "end" }}
          onClick={() => setShow(false)}
        >
          <CloseIcon />
        </IconButton>

        <DialogTitle id="alert-dialog-title" variant="h5">
          {title}
        </DialogTitle>

        <DialogContent>
          <>
            <Stack>
              <CustomTextField
                Title="Type name"
                placeholder=""
                inputMode="text"
                multiline={false}
                onChange={(value) => {
                  settypeName(value.target.value);
                }}
                value={typeName}
                onPress={() => {}}
                fullWidth
                Customestyle={{ width: "100%", marginBottom: "2%" }}
              />
              <Stack
                direction={"row"}
                spacing={1}
                justifyContent={"space-between"}
                sx={{ mb: 1 }}
              >
                <div
                  style={{
                    width: "100%",
                    textAlign: "start",
                    fontWeight: "bold",
                  }}
                >
                  {"Function name"}
                </div>
                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {"Access read"}
                </div>
                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {"Access write"}
                </div>
                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {"Access edit"}
                </div>
                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {"Access publish"}
                </div>
                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {"Access delete"}
                </div>
              </Stack>

              {faileds.map((res) => {
                return (
                  <Stack
                    direction={"row"}
                    spacing={1}
                    justifyContent={"space-between"}
                    sx={{ mb: 1 }}
                  >
                    <p
                      style={{
                        marginTop: "1%",
                        width: "100%",
                      }}
                    >
                      {res.name}
                    </p>
                    <FormControlLabel
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      control={
                        <Checkbox
                          color="primary"
                          icon={<CheckBoxOutlineBlankIcon />}
                          checkedIcon={<CheckBoxIcon />}
                          name="checkednormal"
                          onChange={(value) => {
                            onChange(res, "access_read", value.target.value);
                          }}
                          checked={
                            res?.access_read == 1 || res?.access_read
                              ? true
                              : false
                          }
                        />
                      }
                    />
                    <FormControlLabel
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      control={
                        <Checkbox
                          color="primary"
                          icon={<CheckBoxOutlineBlankIcon />}
                          checkedIcon={<CheckBoxIcon />}
                          name="checkednormal"
                          onChange={(value) => {
                            onChange(res, "access_write", value.target.value);
                          }}
                          checked={
                            res?.access_write == 1 || res?.access_write
                              ? true
                              : false
                          }
                        />
                      }
                    />
                    <FormControlLabel
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      control={
                        <Checkbox
                          color="primary"
                          icon={<CheckBoxOutlineBlankIcon />}
                          checkedIcon={<CheckBoxIcon />}
                          name="checkednormal"
                          onChange={(value) => {
                            onChange(res, "access_edit", value.target.value);
                          }}
                          checked={
                            res?.access_edit == 1 || res?.access_edit
                              ? true
                              : false
                          }
                        />
                      }
                    />
                    <FormControlLabel
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      control={
                        <Checkbox
                          color="primary"
                          icon={<CheckBoxOutlineBlankIcon />}
                          checkedIcon={<CheckBoxIcon />}
                          name="checkednormal"
                          onChange={(value) => {
                            onChange(res, "access_publish", value.target.value);
                          }}
                          checked={
                            res?.access_publish == 1 || res?.access_publish
                              ? true
                              : false
                          }
                        />
                      }
                    />

                    <FormControlLabel
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      control={
                        <Checkbox
                          color="primary"
                          icon={<CheckBoxOutlineBlankIcon />}
                          checkedIcon={<CheckBoxIcon />}
                          name="checkednormal"
                          onChange={(value) => {
                            onChange(res, "access_delete", value.target.value);
                          }}
                          checked={
                            res?.access_delete == 1 || res?.access_delete
                              ? true
                              : false
                          }
                        />
                      }
                    />
                  </Stack>
                );
              })}
              <Button
                onClick={() => onSubmit(faileds, typeName)}
                style={{ width: "100%" }}
              >
                {buttonTitle}
              </Button>
            </Stack>
          </>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default ModalPrivileges;
