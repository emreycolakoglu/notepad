import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItemLink from "./routerLink";
import PageIcon from "@material-ui/icons/Pages";
import { useDrag } from "react-dnd";
import { connect } from "react-redux";
import { selectNote, deleteNote } from "../redux/actions";
import slug from "../adapters/slug";
import dayjs from "dayjs";
import DeleteIcon from "@material-ui/icons/Delete";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const Note = ({ note, ...props }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const [{ isDragging }, drag] = useDrag({
    item: { type: "NOTE", note },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  });

  /**
   * fired when a note is clicked
   * @param {*} event
   * @param {*} value
   */
  function handleListItemClick(event, value) {
    console.log(value);
    props.selectNote(value);
  }

  /**
   * if updated today, display time
   */
  function renderSecondaryLine(lastUpdate, folder = null) {
    const format = dayjs().isSame(dayjs(lastUpdate), "day")
      ? "HH:mm"
      : "D MMMM";
    return (
      <React.Fragment>
        <span className={classes.secondary}>
          {dayjs(lastUpdate).format(format)}
        </span>
        {folder ? (
          <>
            <span> | </span>
            <span className={classes.secondary}>{folder}</span>
          </>
        ) : null}
      </React.Fragment>
    );
  }

  function handleRightClick(e) {
    if (e.type === "contextmenu") {
      e.preventDefault();
      setAnchorEl(e.target);
    }
  }

  function handleDeleteNote(e) {
    e.preventDefault();
    props.deleteNote(note);
    handleContextMenuClose();
  }

  function handleContextMenuClose() {
    setAnchorEl(null);
  }

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1
      }}
      onContextMenu={handleRightClick}
    >
      <ListItemLink
        selected={props.selectedNote === note.id}
        onClick={(event) => handleListItemClick(event, note.id)}
        button
        to={`/${slug.slugify(note.folderName)}/${note.id}`}
        icon={<PageIcon />}
        primary={`${note.text.substring(0, 20)}..`}
        secondary={renderSecondaryLine(note.lastUpdate, note.folderName)}
      />
      <Menu
        id="simple-note-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleContextMenuClose}
      >
        <MenuItem onClick={handleDeleteNote}>
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
    selectedFolder: state.selectedFolder,
    selectedNote: state.selectedNote
  };
};
const mapDispatchToProps = { selectNote, deleteNote };

const useStyles = makeStyles((theme) => ({
  secondary: {
    fontSize: "10px"
  }
}));

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Note);
