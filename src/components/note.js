import React from "react";
import ListItemLink from "./routerLink";
import PageIcon from "@material-ui/icons/Pages";
import { useDrag } from "react-dnd";
import { connect } from "react-redux";
import { selectNote } from "../redux/actions";
import slug from "../services/slug";
import dayjs from "dayjs";

const Note = ({ note, ...props }) => {
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
  function renderSecondaryLine(lastUpdate) {
    if (dayjs().isSame(dayjs(lastUpdate), "day")) {
      return dayjs(lastUpdate).format("HH:mm");
    } else {
      return dayjs(lastUpdate).format("D MMMM");
    }
  }

  function handleRightClick(e) {
    if (e.type === "contextmenu") {
      e.preventDefault();
      // TODO open note context menu here
    }
  }
  return (
    <div ref={drag}>
      <ListItemLink
        style={{
          opacity: isDragging ? 0.5 : 1
        }}
        selected={props.selectedNote === note.id}
        onClick={(event) => handleListItemClick(event, note.id)}
        button
        to={`/${slug.slugify(note.folderName)}/${note.id}`}
        icon={<PageIcon />}
        primary={`${note.text.substring(0, 20)}..`}
        secondary={renderSecondaryLine(note.lastUpdate)}
        onContextMenu={handleRightClick}
      />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Note);
