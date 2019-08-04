import React, { useState } from "react";
import ListItemLink from "./routerLink";
import { useDrop } from "react-dnd";
import FolderIcon from "@material-ui/icons/Folder";
import { connect } from "react-redux";
import {
  selectFolder,
  deleteFolder,
  selectNote,
  editNote
} from "../redux/actions";
import DeleteIcon from "@material-ui/icons/Delete";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const Folder = ({ folder, ...props }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "NOTE",
    canDrop: () => () => {
      return folder.name != "All";
    },
    drop: (received) => {
      const newNote = Object.assign({}, received.note, {
        folderName: folder.name
      });
      props.editNote(newNote);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  });
  const [anchorEl, setAnchorEl] = useState(null);

  function handleContextMenuClose() {
    setAnchorEl(null);
  }

  function handleListItemClick(event, value) {
    console.log(value);
    props.selectFolder(value);
    props.selectNote("");
  }

  function handleRightClick(e) {
    if (e.type === "contextmenu") {
      e.preventDefault();
      setAnchorEl(e.target);
    }
  }

  function handleDeleteFolder(e) {
    e.preventDefault();
    props.deleteFolder(folder);
    handleContextMenuClose();
  }

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: isOver ? "rgba(0,0,0,0.08)" : "white"
      }}
      onContextMenu={handleRightClick}
    >
      <ListItemLink
        key={folder.slug}
        selected={props.selectedFolder.slug === folder.slug}
        onClick={(event) => handleListItemClick(event, folder)}
        to={`/${folder.slug}`}
        icon={<FolderIcon />}
        primary={folder.name}
      />
      <Menu
        id="simple-folder-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleContextMenuClose}
      >
        <MenuItem onClick={handleDeleteFolder}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    notes: state.notes,
    folders: state.folders,
    selectedFolder: state.selectedFolder
  };
};
const mapDispatchToProps = { selectFolder, deleteFolder, selectNote, editNote };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Folder);
