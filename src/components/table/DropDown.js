import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import MenuList from "@mui/material/MenuList";
import { Divider } from "@mui/material";

const ITEM_HEIGHT = 48;

export default function DropDown({
  open,
  setOpen,
  Listdropdown,
  row,
  anchorEl,
}) {
  const onClick = (option) => {
    option.function(row);
    setOpen(false);
  };
  return (
    <Menu
      id="long-menu"
      MenuListProps={{
        "aria-labelledby": "long-button",
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        style: {
          position: "relative",
          maxHeight: ITEM_HEIGHT * 4.5,
          width: "20ch",
        },
      }}
    >
      {Listdropdown.map((option, index) =>
        option.name ? (
          <div key={index}>
            <MenuItem
              key={option.name}
              selected={false}
              onClick={() => {
                onClick(option);
              }}
            >
              {option.name}
            </MenuItem>
            {index != Listdropdown.length - 1 && Listdropdown.length != 1 ? (
              <Divider />
            ) : null}
          </div>
        ) : null
      )}
    </Menu>
  );
}
