import React from "react";
import {
  IconButton,
  Box,
  AppBar,
  useMediaQuery,
  Toolbar,
  styled,
  Stack,
} from "@mui/material";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleSidebar,
  toggleMobileSidebar,
  setDarkMode,
} from "src/store/customizer/CustomizerSlice";
import { IconMenu2 } from "@tabler/icons";
import WbSunnyTwoToneIcon from "@mui/icons-material/WbSunnyTwoTone";
import DarkModeTwoToneIcon from "@mui/icons-material/DarkModeTwoTone";
// components
import Notifications from "./Notifications";
import Profile from "./Profile";
import Cart from "./Cart";
import Search from "./Search";
import Language from "./Language";
import Navigation from "./Navigation";
import MobileRightSidebar from "./MobileRightSidebar";
import { useTheme } from "@emotion/react";
import { Icons } from "src/icons";

const Header = () => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const theme = useTheme();
  const isLightMode = theme.palette.mode === "light";
  // drawer
  const customizer = useSelector((state) => state.customizer);
  const dispatch = useDispatch();

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: theme.palette.background.paper,
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    [theme.breakpoints.up("lg")]: {
      minHeight: customizer.TopbarHeight,
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
  }));

  const handleSidebarToggle = () => {
    lgUp ? dispatch(toggleSidebar()) : dispatch(toggleMobileSidebar());
  };

  const StyledBox = styled(Box)(({ theme }) => ({
    boxShadow: theme.shadows[8],
    padding: "20px",
    cursor: "pointer",
    justifyContent: "center",
    display: "flex",
    transition: "0.1s ease-in",
    border: "1px solid rgba(145, 158, 171, 0.12)",
    "&:hover": {
      transform: "scale(1.05)",
    },
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        {/* ------------------------------------------- */}
        {/* Toggle Button Sidebar */}
        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}
        {/* Search Dropdown */}
        {/* ------------------------------------------- */}

        {/* <Search /> */}
        {lgUp ? (
          <>
            <Navigation />
          </>
        ) : (
          <div className="wrapperLeftNavbar">
            {!isLightMode ? (
              <Icons.DarkLogo className={`IconsSmall`} />
            ) : (
              <Icons.LightLogo className={`IconsSmall`} />
            )}
            <IconButton
              color="#4788ff"
              aria-label="menu"
              onClick={handleSidebarToggle}
            >
              <IconMenu2 size="40" color="#4788ff" />
            </IconButton>
          </div>
        )}

        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          {/* <Language /> */}

          {/* ------------------------------------------- */}
          {/* Ecommerce Dropdown */}
          {/* ------------------------------------------- */}
          {/* <Cart /> */}
          {/* ------------------------------------------- */}
          {/* End Ecommerce Dropdown */}
          {/* ------------------------------------------- */}
          {/* <Notifications /> */}
          {/* ------------------------------------------- */}
          {/* Toggle Theme Mode */}
          <Box
            display="flex"
            border="1px solid #4788ff"
            overflow="hidden"
            backgroundColor="transparent"
          >
            {/* Light Mode Box */}
            <Box
              onClick={() => dispatch(setDarkMode("light"))}
              display="flex"
              justifyContent="center"
              alignItems="center"
              padding={1}
              borderRight="1px solid #4788ff"
              borderRadius={"0px"}
              sx={{
                cursor: "pointer",
                width: "35px",
                height: "35px",
                backgroundColor:
                  customizer.activeMode === "light" ? "#4788ff" : "transparent",
              }}
            >
              <WbSunnyTwoToneIcon
                sx={{
                  borderRadius: "0px",
                  color: !isLightMode ? "#fff" : "#fff",
                }}
              />
            </Box>

            {/* Dark Mode Box */}
            <Box
              onClick={() => dispatch(setDarkMode("dark"))}
              display="flex"
              justifyContent="center"
              alignItems="center"
              padding={1}
              sx={{
                cursor: "pointer",
                width: "35px",
                borderRadius: "0px",
                height: "35px",
                backgroundColor:
                  customizer.activeMode === "dark" ? "#4788ff" : "inherit",
              }}
            >
              <DarkModeTwoToneIcon
                sx={{
                  borderRadius: "0px",
                  color: isLightMode ? "#4788ff" : "#fff",
                }}
              />
            </Box>
          </Box>
          {/* ------------------------------------------- */}
          {/* {lgDown ? <MobileRightSidebar /> : null} */}
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
  toggleSidebar: PropTypes.func,
};

export default Header;
