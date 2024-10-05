import React, { useEffect } from "react";
import Menuitems from "../../shared/MenuItems";
import { useLocation } from "react-router";
import { Box, List, useMediaQuery } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { toggleMobileSidebar } from "src/store/customizer/CustomizerSlice";
import NavItem from "./NavItem";
import NavCollapse from "./NavCollapse";
import NavGroup from "./NavGroup/NavGroup";

const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.substring(pathname.lastIndexOf("/") + 1);
  const customizer = useSelector((state) => state.customizer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const hideMenu = lgUp
    ? customizer.isCollapse && !customizer.isSidebarHover
    : "";
  const dispatch = useDispatch();

  return (
    <Box sx={{ px: 2 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {Menuitems.map((item, index) => {
          if (item?.id || item?.subheader) {
            if (item?.subheader) {
              // {/********SubHeader**********/}
              return (
                <NavGroup
                  item={item}
                  hideMenu={hideMenu}
                  key={item?.subheader}
                />
              );

              // {/********If Sub Menu**********/}
              /* eslint no-else-return: "off" */
            } else if (item?.children) {
              return (
                <NavCollapse
                  menu={item}
                  pathDirect={pathDirect}
                  hideMenu={hideMenu}
                  pathWithoutLastPart={pathWithoutLastPart}
                  level={1}
                  key={item?.id}
                  onClick={() => dispatch(toggleMobileSidebar())}
                />
              );

              // {/********If Sub No Menu**********/}
            } else {
              return (
                <NavItem
                  item={item}
                  key={item?.id}
                  pathDirect={pathDirect}
                  hideMenu={hideMenu}
                  onClick={() => dispatch(toggleMobileSidebar())}
                />
              );
            }
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
