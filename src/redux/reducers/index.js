import { deleteNote, newNote, editNote, selectFolder } from "../actions";
import { DELETE_NOTE, EDIT_NOTE, NEW_NOTE, SELECT_FOLDER } from "../actions/actionTypes";
import { combineReducers } from "redux";

function notes(state = [], action) {
  switch (action.type) {
    case NEW_NOTE:
      return [...state, data];
    case EDIT_NOTE:
      return state.map((todo) => {
        if (todo.id == data.id) {
          return Object.assign({}, data);
        }
        return todo;
      });
    case DELETE_NOTE:
      const updatedNotes = state.filter((note) => {
        return note.id != id;
      });
      return [...updatedNotes];
    default:
      return state;
  }
}

function selectedFolder(state = "", action) {
  switch (action.type) {
    case SELECT_FOLDER:
      return action.name;
    default:
      return state;
  }
}

const notesApp = combineReducers({
  notes,
  selectedFolder
});

export default notesApp;
