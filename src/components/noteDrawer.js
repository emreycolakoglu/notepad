import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { connect } from "react-redux";
import { selectNote } from "../redux/actions";
import Note from "./note";

const NoteDrawer = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="Main mailbox folders">
        {props.notes
          .filter((note) => {
            if (props.selectedFolder && props.selectedFolder.slug != "") {
              return note.folderName == props.selectedFolder.name;
            }
            return note;
          })
          .sort((a, b) => {
            return b.lastUpdate - a.lastUpdate;
          })
          .map((note, index) => (
            <Note note={note} index={index} key={index} />
          ))}
      </List>
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
const mapDispatchToProps = { selectNote };

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 240,
    height: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteDrawer);
