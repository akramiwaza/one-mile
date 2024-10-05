import CircularProgress from "@mui/material/CircularProgress";

import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";

const LoadingModal = () => {
  const isOpen = useSelector((state) => state?.customizer?.loading) ?? "";
  return (
    <Modal
      disableAutoFocus={true}
      sx={{
        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        height: "100vh",

        width: "100vw",
      }}
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <CircularProgress
        color="primary"
        size={50}
        thickness={7}
        variant="indeterminate"
      />
    </Modal>
  );
};
export default LoadingModal;
