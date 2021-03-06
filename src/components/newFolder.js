import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { newFolder } from "../redux/actions";

const NewFolder = (props) => {
  const classes = useStyles();
  const [folderName, useFolderName] = useState("");

  function exists() {
    return props.folders.find((f) => {
      return f.name == folderName;
    });
  }

  return (
    <TextField
      id="new-folder"
      value={folderName}
      onChange={(e) => {
        useFolderName(e.target.value);
      }}
      error={exists()}
      onKeyDown={(ev) => {
        if (ev.key === "Enter") {
          if (!exists()) {
            props.newFolder({ name: folderName });
            props.onNewFolderCreated();
          }
        } else if (ev.key === "Escape") {
          props.onNewFolderCreated();
        }
      }}
      placeholder="Enter new folder name"
      margin="normal"
      inputProps={{ "aria-label": "bare" }}
      className={classes.textField}
      inputProps={{ autoFocus: true }}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: 0,
    padding: 8,
    backgroundColor: "rgba(0,0,0,0.08)"
  }
}));

const mapStateToProps = (state) => {
  return {
    folders: state.folders
  };
};

const mapDispatchToProps = { newFolder };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewFolder);
