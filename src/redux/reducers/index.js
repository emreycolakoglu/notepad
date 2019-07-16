import {
  DELETE_NOTE,
  EDIT_NOTE,
  NEW_NOTE,
  SELECT_FOLDER,
  SELECT_NOTE
} from "../actions/actionTypes";
import { combineReducers } from "redux";

const defaultNotes = [
  {
    id: "12312312312312",
    text: "Hello, thank you for trying NoteApp",
    folderName: "Default"
  },
  {
    id: "12312312312313",
    text: "Sometimes I write code, sometimes I dont",
    folderName: "Random Thoughts"
  }
];

function notes(state = defaultNotes, action) {
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

function selectedNote(state = "", action) {
  switch (action.type) {
    case SELECT_NOTE:
      return action.id;
    default:
      return state;
  }
}

const notesApp = combineReducers({
  notes,
  selectedFolder,
  selectedNote
});

export default notesApp;
