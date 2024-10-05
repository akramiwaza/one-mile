import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Stack,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
} from "@mui/material";
import { Field, Formik } from "formik";
import CustomTextField from "../forms/theme-elements/CustomTextField";
import CustomCheckbox from "../forms/theme-elements/CustomCheckbox";
import { ChackImageIsFile, inputType } from "src/helper/publicFunction";
import { FileUploader } from "react-drag-drop-files";
import CloudUploadIcon from "@mui/icons-material/CloudUpload"; // Import the Material-UI icon
import "./DynamicModal.css";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import CustomFormLabel from "../forms/theme-elements/CustomFormLabel";
import EditorComponent from "../editor/Editor";
import GoogleMapCoponent from "../googlemap/googlemap";
import { SketchPicker } from "react-color";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import { toast } from "react-toastify";

const DynamicModal = ({
  show,
  setShow,
  faileds,
  failedName = "child",
  title,
  description,
  onSubmit,
  Schema,
  values,
  editMode,
  buttonTitle,
  onChange = ({ value, failedName, setFieldValue }) => {},
  checkSchema = true,
}) => {
  const validate = (valuesFormik) => {
    const errors = {};
    const emptyFieldsList = [];

    let ListFields = Schema?._nodes; // array
    ListFields.forEach((field) => {
      if (!valuesFormik[field] && field != "password") {
        emptyFieldsList.push(field.replace("_", " "));
      }
    });
    if (checkSchema) {
      if (emptyFieldsList.length > 0) {
        toast.error(
          `Please fill in all required fields (${emptyFieldsList.join(", ")})`,
          {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      }
    }
  };

  const toggle = () => {
    setShow(!show);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setShow(!show);
  };

  let initialValues = {};

  function convertToInitialValues(faileds, values) {
    for (const item of faileds) {
      if (item.failed) {
        const key = item.failed;
        if (values.hasOwnProperty(key) && key != "password") {
          initialValues[key] = values[key];
        }
      }
      if (item?.child) {
        const childValues = convertToInitialValues([item.child], values);
        Object.assign(initialValues, childValues);
      }
    }
    return initialValues;
  }

  useEffect(() => {
    convertToInitialValues(faileds, values);
  }, []);

  const removeFile = (files, index) => {
    let updatedFiles = Array.from(files);
    updatedFiles.splice(index, 1);
    const newFileList = new FileList(updatedFiles);
    return newFileList;
  };

  const renderItem = ({
    res,
    handleChange,
    values,
    handleSubmit,
    setFieldValue,
    errors,
  }) => {
    if (
      res?.type == inputType.email ||
      res?.type == inputType.text ||
      res?.type == inputType.number ||
      res?.type == inputType.textarea ||
      res?.type == inputType.password
    ) {
      return (
        <Field
          component={CustomTextField}
          Title={res?.title}
          name={res?.failed}
          multiline={res?.type == inputType.textarea ? true : false}
          numberOfLines={5}
          maxLength={res?.type == inputType.textarea ? 10000 : 99}
          Customestyle={res?.customdesign ?? null}
          customeStyleText={
            res?.type == inputType.textarea
              ? { height: 100, width: "100%" }
              : null
          }
          value={values[res?.failed]}
          onChange={handleChange(res?.failed)}
          placeholder={res?.placeholder}
          inputMode={res?.type}
          fullWidth={res?.fullwidth}
          id={res?.failed}
          variant="outlined"
          errors={errors[res?.failed]}
        />
      );
    } else if (res?.type == inputType.dropdownSearch) {
      return (
        <div style={res?.customdesign ?? null}>
          <FormControl fullWidth={res?.fullwidth}>
            <CustomFormLabel>{res?.title}</CustomFormLabel>
            <Autocomplete
              options={res?.datadropdown}
              getOptionLabel={(option) =>
                option[res?.faileddropdown.name] || ""
              }
              value={values[res?.failed] || null}
              onChange={(event, newValue) => {
                onChange({
                  value: newValue ? newValue[res?.faileddropdown.value] : null,
                  failedName: res?.failed,
                  setFieldValue: setFieldValue,
                });
                setFieldValue(
                  res?.failed,
                  newValue ? newValue[res?.faileddropdown.value] : null
                );
              }}
              renderInput={(params) => {
                let data = params;
                delete data.inputProps.value;
                delete data.inputProps.defaultValue;
                return (
                  <CustomTextField
                    defaultValue={values[res?.failed] || null}
                    value={values[res?.failed] || null}
                    Customestyle={{ width: "100%" }}
                    onChange={(event, newValue) => {
                      onChange({
                        value: newValue
                          ? newValue[res?.faileddropdown.value]
                          : null,
                        failedName: res?.failed,
                        setFieldValue: setFieldValue,
                      });
                      setFieldValue(
                        res?.failed,
                        newValue ? newValue[res?.faileddropdown.value] : null
                      );
                    }}
                    {...data}
                    variant="outlined"
                    InputProps={{ ...params.InputProps, endAdornment: null }}
                  />
                );
              }}
            />
          </FormControl>
          {errors[res?.failed] && (
            <div style={{ color: "red" }}>{errors[res?.failed]}</div>
          )}
        </div>
      );
    } else if (res?.type == inputType.dropdown) {
      return (
        <div style={res?.customdesign ?? null}>
          <CustomFormLabel>{res?.title}</CustomFormLabel>
          <Select
            style={{ width: res?.fullwidth ? "100%" : null }} // Set the width to 100% for full width
            value={values[res?.failed]}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200, // Set the desired height here
                },
              },
            }}
            onChange={(event) => {
              onChange({
                value: event.target.value,
                failedName: res?.failed,
                setFieldValue: setFieldValue,
              });
              setFieldValue(res?.failed, event.target.value);
            }}
          >
            {res?.datadropdown.map((resdropdown) => {
              return (
                <MenuItem value={resdropdown[res?.faileddropdown.value]}>
                  {resdropdown[res?.faileddropdown.name]}
                </MenuItem>
              );
            })}
          </Select>
          {errors[res?.failed] && (
            <div style={{ color: "red" }}>{errors[res?.failed]}</div>
          )}
        </div>
      );
    } else if (res?.type == inputType.image) {
      return (
        <div style={{ marginTop: 10, marginBottom: 10, width: "100%" }}>
          <CustomFormLabel>{res?.title}</CustomFormLabel>
          <FileUploader
            multiple={res?.multiple}
            label={res?.label}
            name={res?.failed}
            types={res?.fileTypes}
            fileOrFiles={res?.fileOrFiles}
            handleChange={(file) => {
              setFieldValue(res?.failed, file);
            }}
          >
            <div className="custom-dropzone" style={{ width: "100%" }}>
              {values[res?.failed] ? (
                <>
                  {Array.isArray(values[res?.failed]) ||
                  values[res?.failed] instanceof FileList ? (
                    <div className="contanerModal">
                      {Array.from(values[res?.failed]).map(
                        (resarray, index) => {
                          return (
                            <div>
                              <img
                                alt={resarray}
                                src={ChackImageIsFile({
                                  data: resarray,
                                  IsBoolean: false,
                                })}
                                style={{ width: 100, height: 100 }}
                              />
                              {ChackImageIsFile({
                                data: resarray,
                                IsBoolean: true,
                              }) == false ? null : (
                                <p style={{ width: "100%" }}>
                                  {`File name: ${resarray.name}`}
                                </p>
                              )}
                            </div>
                          );
                        }
                      )}
                    </div>
                  ) : (
                    <div style={{ width: "100%" }}>
                      <img
                        src={ChackImageIsFile({
                          data: values[res?.failed],
                          IsBoolean: false,
                        })}
                        alt={values[res?.failed]}
                        style={{ width: 100, height: 100 }}
                      />
                      {ChackImageIsFile({
                        data: values[res?.failed],
                        IsBoolean: true,
                      }) == false ? null : (
                        <p style={{ width: "100%" }}>
                          {`File name: ${values[res?.failed].name}`}
                        </p>
                      )}
                    </div>
                  )}
                  <Button
                    onClick={async () => {
                      setFieldValue(res?.failed, "");
                    }}
                    variant="contained"
                  >
                    Remove
                  </Button>
                </>
              ) : (
                <div>
                  <CloudUploadIcon style={{ fontSize: 48, color: "#333" }} />
                  <p style={{ width: "100%", textAlign: "center" }}>
                    {res.label}
                  </p>
                </div>
              )}
            </div>
          </FileUploader>
          {errors[res?.failed] && (
            <div style={{ color: "red" }}>{errors[res?.failed]}</div>
          )}
        </div>
      );
    } else if (res?.type == inputType.checkbox) {
      return (
        <div style={res.customdesign ?? null}>
          {res?.title && <CustomFormLabel>{res?.title}</CustomFormLabel>}
          <CustomCheckbox
            color="primary"
            checked={
              values[res?.failed] == 1 || values[res?.failed] == true
                ? true
                : false
            }
            onChange={(value) => {
              setFieldValue(res?.failed, value);
              onChange({
                value: value,
                failedName: res?.failed,
                setFieldValue: setFieldValue,
              });
            }}
            inputprops={{
              "aria-label": "select all desserts",
            }}
          />
          {errors[res?.failed] && (
            <div style={{ color: "red" }}>{errors[res?.failed]}</div>
          )}
        </div>
      );
    } else if (res?.type == inputType.action) {
      return (
        <div style={res.customdesign ?? null}>
          <Button
            onClick={() => res.onClick()}
            style={{ width: res?.fullwidth ? "100%" : null }}
          >
            {res?.title}
          </Button>
        </div>
      );
    } else if (res?.type == inputType.title) {
      return (
        <div style={res.customdesign ?? null}>
          {values[res?.failed] ?? res.title}
        </div>
      );
    } else if (res?.type == inputType.editor) {
      return (
        <>
          {res?.title && <CustomFormLabel>{res?.title}</CustomFormLabel>}
          <EditorComponent
            key={res?.failed}
            onChange={(value) => {
              setFieldValue(res?.failed, value);
            }}
            data={values[res?.failed]}
          />
          {errors[res?.failed] && (
            <div style={{ color: "red" }}>{errors[res?.failed]}</div>
          )}
        </>
      );
    } else if (res?.type == inputType.map) {
      return (
        <>
          {res?.title && <CustomFormLabel>{res?.title}</CustomFormLabel>}
          <GoogleMapCoponent values={values} />
          {errors[res?.failed] && (
            <div style={{ color: "red" }}>{errors[res?.failed]}</div>
          )}
        </>
      );
    } else if (res?.type == inputType.color) {
      return (
        <>
          {res?.title && <CustomFormLabel>{res?.title}</CustomFormLabel>}
          <div style={res?.customdesign ?? null}>
            <SketchPicker
              width="20%"
              onChange={(value) => {
                setFieldValue(res?.failed, value.hex);
              }}
              color={
                values[res?.failed] == null || !values[res?.failed]
                  ? "#000000"
                  : values[res?.failed]
              }
            />
            {errors[res?.failed] && (
              <div style={{ color: "red" }}>{errors[res?.failed]}</div>
            )}
          </div>
        </>
      );
    } else if (res?.type == inputType.multipleSelect) {
      return (
        <div>
          <CustomFormLabel>{res?.title}</CustomFormLabel>
          <Select
            style={{ width: res?.fullwidth ? "100%" : null }} // Set the width to 100% for full width
            value={values[res?.failed] ?? []}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200, // Set the desired height here
                },
              },
            }}
            multiple
            onChange={(event) => {
              setFieldValue(res?.failed, event.target.value);
              onChange({
                value: event.target.value,
                failedName: res?.failed,
                setFieldValue: setFieldValue,
              });
            }}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => {
                  let title = res?.datadropdown?.filter(
                    (responses) =>
                      responses.id === value[res?.faileddropdown.value] ||
                      responses.id === value
                  )[0];
                  return (
                    <Chip
                      key={value[res?.faileddropdown.value]}
                      label={title ? title[res?.faileddropdown.name] : ""}
                    />
                  );
                })}
              </Box>
            )}
          >
            {res?.datadropdown.map((resdropdown) => {
              return (
                <MenuItem value={resdropdown[res?.faileddropdown.value]}>
                  {resdropdown[res?.faileddropdown.name]}
                </MenuItem>
              );
            })}
          </Select>
          {errors[res?.failed] && (
            <div style={{ color: "red" }}>{errors[res?.failed]}</div>
          )}
        </div>
      );
    }
  };

  return (
    <>
      <Dialog
        open={show}
        onClose={toggle}
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
        {title ? (
          <DialogTitle id="alert-dialog-title" variant="h5">
            {title}
          </DialogTitle>
        ) : null}
        <DialogContent>
          {description ? (
            <DialogContentText id="alert-dialog-description">
              {description}
            </DialogContentText>
          ) : null}

          <Formik
            validationSchema={Schema ?? null}
            initialValues={initialValues}
            onSubmit={(values) => {
              onSubmit(values);
            }}
          >
            {({
              handleChange,
              handleSubmit,
              setFieldValue,
              values,
              errors,
            }) => (
              <>
                <Stack>
                  {faileds?.map((res) => {
                    if (res.child) {
                      return (
                        <div className="contanerModal">
                          {renderItem({
                            res: res,
                            handleChange,
                            values,
                            handleSubmit,
                            setFieldValue,
                            errors,
                          })}
                          <div style={{ width: 10 }} />
                          {renderItem({
                            res: res?.child,
                            handleChange,
                            values,
                            handleSubmit,
                            setFieldValue,
                            errors,
                          })}

                          {res?.child?.child ? (
                            <>
                              <div style={{ width: 10 }} />
                              {renderItem({
                                res: res?.child?.child,
                                handleChange,
                                values,
                                handleSubmit,
                                setFieldValue,
                                errors,
                              })}

                              {res?.child?.child?.child ? (
                                <>
                                  <div style={{ width: 10 }} />
                                  {renderItem({
                                    res: res?.child?.child?.child,
                                    handleChange,
                                    values,
                                    handleSubmit,
                                    setFieldValue,
                                    errors,
                                  })}

                                  {res?.child?.child?.child.child ? (
                                    <>
                                      <div style={{ width: 10 }} />
                                      {renderItem({
                                        res: res?.child?.child?.child.child,
                                        handleChange,
                                        values,
                                        handleSubmit,
                                        setFieldValue,
                                        errors,
                                      })}

                                      {res?.child?.child?.child?.child
                                        ?.child ? (
                                        <>
                                          <div style={{ width: 10 }} />
                                          {renderItem({
                                            res: res?.child?.child?.child.child
                                              ?.child,
                                            handleChange,
                                            values,
                                            handleSubmit,
                                            setFieldValue,
                                            errors,
                                          })}
                                        </>
                                      ) : null}
                                    </>
                                  ) : null}
                                </>
                              ) : null}
                            </>
                          ) : null}
                        </div>
                      );
                    } else {
                      return (
                        <Box>
                          {renderItem({
                            res,
                            handleChange,
                            values,
                            handleSubmit,
                            setFieldValue,
                            errors,
                          })}
                        </Box>
                      );
                    }
                  })}
                  <div style={{ height: 30 }} />
                  <Button
                    onClick={() => {
                      validate(values, errors);
                      handleSubmit();
                    }}
                    style={{ width: "100%" }}
                  >
                    {buttonTitle}
                  </Button>
                </Stack>
                {/* <Stack>
                    <Box>
                      <Field
                        component={CustomTextField}
                        Title="Email"
                        name="email"
                        value={values.email}
                        onChange={handleChange("email")}
                        placeholder={"Enter your email"}
                        type="email"
                        fullWidth
                        id="username"
                        variant="outlined"
                      />
                    </Box>
                    <Box>
                      <Field
                        component={CustomTextField}
                        Title="Password"
                        value={values.password}
                        onChange={handleChange("password")}
                        placeholder={"Enter your password"}
                        type="password"
                        name="password"
                        fullWidth
                        id="password"
                        variant="outlined"
                      />
                    </Box>
                    <Stack
                      justifyContent="space-between"
                      direction="row"
                      alignItems="center"
                      my={2}
                    >
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <CustomCheckbox
                              defaultChecked={values.expire}
                              onChange={(data) => {
                                setFieldValue("expire", data.target.checked);
                              }}
                            />
                          }
                          label="Remeber this Device"
                        />
                      </FormGroup>
                      <Typography
                        component={Link}
                        to="/auth/forgot-password"
                        fontWeight="500"
                        sx={{
                          textDecoration: "none",
                          color: "primary.main",
                        }}
                      >
                        Forgot Password ?
                      </Typography>
                    </Stack>
                  </Stack> */}
                {/* <Box>
                    <Button
                      color="primary"
                      variant="contained"
                      size="large"
                      fullWidth
                      onClick={handleSubmit}
                      component={Link}
                    >
                      Sign In
                    </Button>
                  </Box> */}
              </>
            )}
          </Formik>
          {/* <form onSubmit={handleSubmit}>
              <Grid spacing={3} container>
                <Grid item xs={12} lg={6}>
                  <FormLabel>FirstName</FormLabel>
                  <TextField
                    id="firstname"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.firstname}
                    onChange={(e) =>
                      setValues({ ...values, firstname: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormLabel>LastName</FormLabel>
                  <TextField
                    id="lastname"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.lastname}
                    onChange={(e) =>
                      setValues({ ...values, lastname: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormLabel>Department</FormLabel>
                  <TextField
                    id="department"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.department}
                    onChange={(e) =>
                      setValues({ ...values, department: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormLabel>Company</FormLabel>
                  <TextField
                    id="company"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.company}
                    onChange={(e) =>
                      setValues({ ...values, company: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormLabel>Phone</FormLabel>
                  <TextField
                    id="phone"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.phone}
                    onChange={(e) =>
                      setValues({ ...values, phone: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormLabel>Email</FormLabel>
                  <TextField
                    id="email"
                    type="email"
                    required
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.email}
                    onChange={(e) =>
                      setValues({ ...values, email: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <FormLabel>Address</FormLabel>
                  <TextField
                    id="address"
                    size="small"
                    multiline
                    rows="3"
                    variant="outlined"
                    fullWidth
                    value={values.address}
                    onChange={(e) =>
                      setValues({ ...values, address: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <FormLabel>Notes</FormLabel>
                  <TextField
                    id="notes"
                    size="small"
                    multiline
                    rows="4"
                    variant="outlined"
                    fullWidth
                    value={values.notes}
                    onChange={(e) =>
                      setValues({ ...values, notes: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mr: 1 }}
                    type="submit"
                    disabled={
                      values.firstname.length === 0 || values.notes.length === 0
                    }
                  >
                    Submit
                  </Button>
                  <Button variant="contained" color="error" onClick={toggle}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </form> */}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DynamicModal;
