import React, {  useState } from "react";
import Layout from "../components/layout";
import { connect } from "react-redux";
import { deleteNote, newNote, editNote, selectFolder } from "../redux/actions";
import Editor from "../components/editor";
import IconButton from "@material-ui/core/IconButton";
import FullScreenIcon from "@material-ui/icons/Fullscreen";
import TrashIcon from "@material-ui/icons/Delete";
import NewIcon from "@material-ui/icons/Create";
import ShareIcon from "@material-ui/icons/Share";

const Home = (props) => {
  const [fullScreen, setFullScreen] = useState(false);

  function newNoteCallback() {
    props.newNote({
      text: "",
      folderName: "Default",
      lastUpdate: Date.now()
    });
  }

  function deleteNoteCallback() {
    props.deleteNote(props.selectedNote);
  }

  function shareNoteCallback() {
    // TODO share functionality
  }

  function fullScreenCallback() {
    /**
     * docs
     * https://www.w3schools.com/howto/howto_js_fullscreen.asp
     */
    const elem = document.documentElement;
    if (fullScreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE/Edge */
        document.msExitFullscreen();
      }
      setFullScreen(false);
    } else {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elem.msRequestFullscreen();
      }
      setFullScreen(true);
    }
  }

  function renderDesktopButtons() {
    return (
      <>
        <IconButton
          aria-label="Create Note"
          color="inherit"
          onClick={newNoteCallback}
        >
          <NewIcon />
        </IconButton>
        <IconButton
          aria-label="Delete Note"
          color="inherit"
          onClick={deleteNoteCallback}
        >
          <TrashIcon />
        </IconButton>
        <IconButton
          aria-label="Share Note"
          color="inherit"
          onClick={shareNoteCallback}
        >
          <ShareIcon />
        </IconButton>
        <IconButton
          aria-label="Fullscreen"
          color="inherit"
          onClick={fullScreenCallback}
        >
          <FullScreenIcon />
        </IconButton>
      </>
    );
  }

  return (
    <Layout desktopButtons={renderDesktopButtons()}>
      <Editor />
    </Layout>
  );
};

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
