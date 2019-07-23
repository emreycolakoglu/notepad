import React from "react";
import ListItemLink from "./routerLink";
import { useDrop } from "react-dnd";
import FolderIcon from "@material-ui/icons/Folder";

import { connect } from "react-redux";
import { selectFolder, selectNote, editNote } from "../redux/actions";

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

  function handleListItemClick(event, value) {
    console.log(value);
    props.selectFolder(value);
    props.selectNote("");
  }

  function handleRightClick(e) {
    if (e.type === "contextmenu") {
      e.preventDefault();
      // TODO open folder context menu here
    }
  }

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: isOver ? "rgba(0,0,0,0.08)" : "white"
      }}
    >
      <ListItemLink
        key={folder.slug}
        selected={props.selectedFolder.slug === folder.slug}
        onClick={(event) => handleListItemClick(event, folder)}
        to={`/${folder.slug}`}
        icon={<FolderIcon />}
        primary={folder.name}
        onContextMenu={handleRightClick}
      />
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
const mapDispatchToProps = { selectFolder, selectNote, editNote };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Folder);
