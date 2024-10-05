import { CssBaseline, ThemeProvider } from "@mui/material";
import { useNavigate, useRoutes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThemeSettings } from "./theme/Theme";
import RTL from "./layouts/full/shared/customizer/RTL";
import ScrollToTop from "./components/shared/ScrollToTop";
import Router from "./routes/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingModal from "./components/loading/loading";
import {
  Checkuser,
  dataLocalStorage,
  getLocalStorage,
} from "./helper/publicFunction";
import { useEffect } from "react";
import CommonAlertComponent from "./components/alert/CommonAlert";
import "./app.css";
import { useJsApiLoader } from "@react-google-maps/api";

function App() {
  const routing = useRoutes(Router);
  const theme = ThemeSettings();
  const customizer = useSelector((state) => state.customizer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    Checkuser({ dispatch, navigate });

    // Add a beforeunload event listener to prompt the user
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleBeforeUnload = (event) => {
    if (getLocalStorage(dataLocalStorage.loading_check_user) ?? true) {
      event.preventDefault();
      // Prompt the user to confirm leaving the page
      event.returnValue =
        "You have an ongoing API request. Are you sure you want to leave?";
    }
  };
  const libraries = ["geometry", "drawing", "places"];

  useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyA803tGWjqiLXlzocmqqM0vqGyHxT2yOI0",
    libraries: libraries,
  });

  return (
    <ThemeProvider theme={theme}>
      <RTL direction={customizer.activeDir}>
        <CssBaseline />
        <ScrollToTop>
          <CommonAlertComponent />
          {routing}
        </ScrollToTop>
        <ToastContainer />

        <LoadingModal />
      </RTL>
    </ThemeProvider>
  );
}

export default App;
