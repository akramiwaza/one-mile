import React, { Fragment, useEffect, useState } from "react";
import "./CommonAlert.css";
import { useDispatch, useSelector } from "react-redux";
import { setShowModal } from "src/store/customizer/CustomizerSlice";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WarningIcon from "@mui/icons-material/Warning";
export const CommonAlert = () => {
  const dispatch = useDispatch();

  const show = ({ title, message, actions = [], component, type }) => {
    dispatch(
      setShowModal({
        show: true,
        title: title,
        message: message,
        action: actions,
        component:
          type == "delete" ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <WarningIcon
                fontSize="large"
                style={{ color: "#FFCC00", fontSize: 100 }}
              />
            </div>
          ) : (
            component
          ),
      })
    );
  };

  const hide = () => {
    dispatch(
      setShowModal({
        show: false,
        title: "",
        message: "",
        action: [],
        component: "",
      })
    );
  };

  const handleActionPress = (action) => {
    const { callback } = action;
    if (callback) callback();
    hide();
  };

  return {
    show,
    hide,
    handleActionPress,
  };
};

const CommonAlertComponent = () => {
  const alertComponent = CommonAlert();
  const modal = useSelector((state) => state.customizer.Modal);
  return (
    modal.show && (
      <div className="shade">
        <div className="dialogBox">
          <div className="row">
            <IconButton
              style={{ justifyContent: "end", flex: 1 }}
              onClick={() => alertComponent.hide()}
            >
              <CloseIcon />
            </IconButton>
          </div>
          {modal?.component && <>{modal.component}</>}
          <div className="titleText" style={{ flex: 2 }}>
            {modal.title}
          </div>
          <div className="dialogBody">{modal.message}</div>
          <div className="dialogActions">
            {modal?.action?.map((action, index) => {
              return (
                <>
                  {action?.type == "delete" ? (
                    <Button
                      key={index}
                      variant="outlined"
                      color="error"
                      style={{ margin: 10 }}
                      onClick={() => alertComponent.handleActionPress(action)}
                    >
                      {action.name}
                    </Button>
                  ) : (
                    <Button
                      key={index}
                      variant="contained"
                      style={{ margin: 10 }}
                      onClick={() => alertComponent.handleActionPress(action)}
                    >
                      {action.name}
                    </Button>
                  )}
                </>
              );
            })}
          </div>
        </div>
      </div>
    )
  );
};

export default CommonAlertComponent;
