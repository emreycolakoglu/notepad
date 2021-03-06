import React, { useState } from "react";
import Layout from "../components/layout";
import { connect } from "react-redux";
import {
  deleteNote,
  newNote,
  editNote,
  selectFolder,
  selectNote
} from "../redux/actions";
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
      folderName:
        props.selectedFolder.name != "All"
          ? props.selectedFolder.name
          : "Default",
      lastUpdate: Date.now()
    });
  }

  function selectFirstNoteOfFolder(folder) {
    let newNotes = props.notes.filter((note) => {
      return note.folderName == folder.name;
    });
    if (newNotes && newNotes.length > 0) {
      newNotes = newNotes.sort((a, b) => b.lastUpdate - a.lastUpdate);
      props.selectNote(newNotes[0].id);
    } else {
      props.selectNote("");
    }
  }

  function deleteNoteCallback() {
    props.deleteNote({ id: props.selectedNote });
    selectFirstNoteOfFolder(props.selectedFolder);
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

  function noteChanged(newText) {
    props.editNote({
      id: props.selectedNote,
      text: newText,
      lastUpdate: Date.now()
    });
  }

  const sn = props.notes.find((n) => {
    return n.id == props.selectedNote;
  });

  return (
    <Layout desktopButtons={renderDesktopButtons()}>
      <Editor text={sn && sn.text} onChange={(t) => noteChanged(t)} />
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

const mapDispatchToProps = {
  deleteNote,
  newNote,
  editNote,
  selectFolder,
  selectNote
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
