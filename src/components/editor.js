import React from "react";
import { connect } from "react-redux";

const Editor = (props) => {
  const sn = props.notes.find((note) => {
    return note.id == props.selectedNote;
  });
  // TODO text editor
  return (
    <div>
      <div>{sn ? sn.text : ""}</div>
    </div>
  );
};

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    notes: state.notes,
    selectedNote: state.selectedNote
  };
};

export default connect(mapStateToProps)(Editor);
