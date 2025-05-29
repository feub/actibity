import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

export default function SetMenu() {
  const [anchorMenuEl, setAnchorMenuEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorMenuEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorMenuEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorMenuEl(null);
  };

  return (
    <>
      <Button
        id="workout-menu-button"
        aria-controls={openMenu ? "worlout-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? "true" : undefined}
        onClick={handleClick}
        sx={{ margin: 0, padding: 0, minWidth: "auto" }}
      >
        <MoreVertOutlinedIcon className="self-center text-gray-400" />
      </Button>
      <Menu
        id="worlout-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorMenuEl}
        open={openMenu}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={() => null} className="bg-gray-300">
          <ListItemIcon>
            <EditOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => null} className="bg-gray-300">
          <ListItemIcon>
            <DeleteOutlineIcon className="text-red-700" />
          </ListItemIcon>
          <ListItemText className="text-red-700">Delete</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
