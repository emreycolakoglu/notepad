import React, { Component } from "react";
import Layout from "../components/layout";
import { connect } from "react-redux";
import { deleteNote, newNote, editNote, selectFolder } from "../redux/actions";
import Editor from "../components/editor";
import IconButton from "@material-ui/core/IconButton";
import TrashIcon from "@material-ui/icons/Delete";
import NewIcon from "@material-ui/icons/Create";
import ShareIcon from "@material-ui/icons/Share";

class Home extends Component {
  constructor(props) {
    super(props);

    this.newNoteCallback = this.newNoteCallback.bind(this);
    this.deleteNoteCallback = this.deleteNoteCallback.bind(this);
  }
  newNoteCallback() {
    this.props.newNote({
      text: "",
      folderName: "Default",
      lastUpdate: Date.now()
    });
  }

  deleteNoteCallback() {
    this.props.deleteNote(this.props.selectedNote);
  }

  renderDesktopButtons() {
    return (
      <>
        <IconButton
          aria-label="Create Note"
          color="inherit"
          onClick={this.newNoteCallback}
        >
          <NewIcon />
        </IconButton>
        <IconButton
          aria-label="Delete Note"
          color="inherit"
          onClick={this.deleteNoteCallback}
        >
          <TrashIcon />
        </IconButton>
        <IconButton aria-label="Share Note" color="inherit">
          <ShareIcon />
        </IconButton>
      </>
    );
  }
  render() {
    return (
      <Layout desktopButtons={this.renderDesktopButtons()}>
        <Editor />
      </Layout>
    );
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    notes: state.notes,
    selectedFolder: state.selectedFolder,
    selectedNote: state.selectedNote
  };
};

const mapDispatchToProps = { deleteNote, newNote, editNote, selectFolder };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
