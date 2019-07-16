import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PageIcon from "@material-ui/icons/Pages";
import { connect } from "react-redux";
import { selectNote } from "../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 240,
    height: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

const NoteDrawer = (props) => {
  const classes = useStyles();

  function handleListItemClick(event, value) {
    console.log(value);
    props.selectNote(value);
  }

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="Main mailbox folders">
        {props.notes
          .filter((note) => {
            if (props.selectedFolder) {
              return note.folderName == props.selectedFolder;
            }
            return note;
          })
          .map((note, index) => (
            <ListItem
              selected={props.selectedNote === note.id}
              onClick={(event) => handleListItemClick(event, note.id)}
              button
              key={index}
            >
              <ListItemIcon>
                <PageIcon />
              </ListItemIcon>
              <ListItemText primary={`${note.text.substring(0, 20)}..`} />
            </ListItem>
          ))}
      </List>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    notes: state.notes,
    selectedFolder: state.selectedFolder
  };
};
const mapDispatchToProps = { selectNote };

export default connect(mapStateToProps, mapDispatchToProps)(NoteDrawer);
