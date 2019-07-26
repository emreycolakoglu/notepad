import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const Editor = (props) => {
  const classes = useStyles();
  //sn && setText(sn.text);

  return (
    <textarea
      className={classes.editorWrapper}
      value={props.text}
      onChange={(e) => {
        props.onChange(e.target.value);
      }}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  editorWrapper: {
    width: "100%",
    height: "100%",
    padding: 16,
    border: 0,
    "&:focus": {
      outline: "none"
    }
  }
}));

export default Editor;
