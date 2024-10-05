import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import {
  ListItemIcon,
  ListItem,
  List,
  styled,
  ListItemText,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";

const NavItem = ({ item, level, pathDirect, onClick, hideMenu, isChild }) => {
  const theme = useTheme();
  const isLightMode = theme.palette.mode === "light";
  console.log("isLightMode : ", isLightMode);

  const ListItemStyled = styled(ListItem)(
    ({ theme, open, level, pathname, menu, hideMenu, customizer }) => ({
      marginBottom: "2px",
      padding: "8px 10px",
      backgroundColor: "transparent", // Default background is transparent
      whiteSpace: "nowrap",
      color: isLightMode ? "#535f6b" : "#fff",
      position: "relative", // For positioning the pseudo-element

      "& .MuiListItemIcon-root": {
        color: isLightMode ? "#535f6b" : "#fff",
      },

      // Hover state
      "&:hover": {
        backgroundColor: "rgba(71, 136, 255, .1)", // Hover background color
        border: isChild ? "" : isLightMode ? "1px solid #deeaff" : "none",
        color: "#4788ff", // Hover text color
        "& .MuiListItemIcon-root": {
          color: "#4788ff", // Hover icon color
        },

        // Add the border using ::before pseudo-element
        "&::before": {
          content: '""',
          position: "absolute",
          top: "5px", // Padding at the top
          bottom: "5px", // Padding at the bottom
          left: 0,
          width: "4px", // Width of the left border
          backgroundColor: "#4788ff", // Border color
          borderRadius: "10px", // Full rounded border
        },
      },

      // Selected state
      "&.Mui-selected": {
        backgroundColor: isChild ? "transparent" : "rgba(71, 136, 255, .1)", // Background when selected
        border: isChild ? "" : isLightMode ? "1px solid #deeaff" : "none",
        color: "#4788ff", // Text color when selected
        "& .MuiListItemIcon-root": {
          color: "#4788ff", // Icon color when selected
        },
        "&:hover": {
          backgroundColor: "rgba(71, 136, 255, .1)", // Keep background on hover when selected
          color: "#4788ff", // Keep text color on hover when selected
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: "5px",
          bottom: "5px",
          left: 0,
          width: "4px",
          backgroundColor: "#4788ff",
          borderRadius: "10px",
        },
      },
    })
  );

  const ListItemIconStyled = styled(ListItemIcon)({
    minWidth: "36px",
    display: "flex",
    justifyContent: hideMenu ? "center" : "space-between",
  });

  return (
    <List component="li" disablePadding key={item.id}>
      <ListItemStyled
        button
        component={NavLink}
        to={item.href}
        selected={pathDirect === item.href}
        onClick={onClick}
      >
        <ListItemIconStyled>
          {<item.icon stroke={1.5} size={level > 1 ? "1rem" : "1.3rem"} />}
        </ListItemIconStyled>
        <ListItemText>{hideMenu ? "" : item.title}</ListItemText>
        {item.subtitle && (
          <Typography variant="caption">
            {hideMenu ? "" : item.subtitle}
          </Typography>
        )}
      </ListItemStyled>
    </List>
  );
};

NavItem.propTypes = {
  item: PropTypes.object.isRequired,
  level: PropTypes.number,
  pathDirect: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  hideMenu: PropTypes.bool,
  isChild: PropTypes.bool,
};

export default NavItem;
