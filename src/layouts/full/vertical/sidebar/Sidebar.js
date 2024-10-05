import { useMediaQuery, Box, Drawer, useTheme } from "@mui/material";
import SidebarItems from "./SidebarItems";
import Logo from "../../shared/logo/Logo";
import { useSelector, useDispatch } from "react-redux";
import {
  hoverSidebar,
  toggleMobileSidebar,
} from "src/store/customizer/CustomizerSlice";
import Scrollbar from "src/components/custom-scroll/Scrollbar";
import { dataLocalStorage, getLocalStorage } from "src/helper/publicFunction";

const Sidebar = () => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const customizer = useSelector((state) => state.customizer);
  const dispatch = useDispatch();
  const theme = useTheme();

  // Sidebar width based on collapse state
  const toggleWidth =
    customizer.isCollapse && !customizer.isSidebarHover
      ? customizer.MiniSidebarWidth
      : customizer.SidebarWidth;

  const userInfo = getLocalStorage(dataLocalStorage.userinfo);
  const isAuthenticated = !!(userInfo && userInfo?.id);

  const drawerStyles = {
    transition: theme.transitions.create(["width", "opacity"], {
      duration: theme.transitions.duration.standard,
    }),
    width: toggleWidth,
    boxSizing: "border-box",
  };

  if (lgUp) {
    return (
      <Box
        sx={{
          width: toggleWidth,
          flexShrink: 0,
          position: customizer.isCollapse ? "absolute" : "relative",
          transition: theme.transitions.create("width", {
            duration: theme.transitions.duration.standard,
          }),
        }}
      >
        {/* Sidebar for desktop */}
        <Drawer
          anchor="left"
          open
          variant="permanent"
          PaperProps={{
            sx: {
              ...drawerStyles,
              transition: theme.transitions.create("width", {
                duration: theme.transitions.duration.shortest,
              }),
            },
          }}
        >
          {/* Sidebar Box */}
          <Box
            sx={{
              backgroundColor:
                customizer.activeSidebarBg === "#ffffff" &&
                customizer.activeMode === "dark"
                  ? customizer.darkBackground900
                  : customizer.activeSidebarBg,
              color: customizer.activeSidebarBg === "#ffffff" ? "" : "white",
              height: "100%",
            }}
          >
            {/* Logo */}
            <Box px={3}>
              <Logo
                isAuthenticated={isAuthenticated}
                isSidebar
                isCollapsed={customizer.isCollapse}
              />
            </Box>
            <Scrollbar sx={{ height: "89.5%" }}>
              {/* Sidebar Items */}
              <SidebarItems />
            </Scrollbar>
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={customizer.isMobileSidebar}
      onClose={() => dispatch(toggleMobileSidebar())}
      variant="temporary"
      PaperProps={{
        sx: {
          width: customizer.SidebarWidth,
          backgroundColor:
            customizer.activeMode === "dark"
              ? customizer.darkBackground900
              : customizer.activeSidebarBg,
          color: customizer.activeSidebarBg === "#ffffff" ? "" : "white",
          border: "0 !important",
          boxShadow: (theme) => theme.shadows[8],
          transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      {/* Logo */}
      <Box px={2}>
        <Logo
          isAuthenticated={isAuthenticated}
          isSidebar
          isCollapsed={customizer.isCollapse}
        />
      </Box>
      {/* Sidebar For Mobile */}
      <SidebarItems />
    </Drawer>
  );
};

export default Sidebar;
