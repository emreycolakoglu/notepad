import {
  DELETE_NOTE,
  EDIT_NOTE,
  NEW_NOTE,
  SELECT_NOTE,
  DELETE_FOLDER,
  EDIT_FOLDER,
  NEW_FOLDER,
  SELECT_FOLDER
} from "../actions/actionTypes";
import { combineReducers } from "redux";
import idAdapter from "../../adapters/id";
import slugAdapter from "../../adapters/slug";
import { getNotes, getFolders } from "../../services/storage";

const defaultNotes = getNotes();

const defaultFolders = getFolders();

function notes(state = defaultNotes, action) {
  switch (action.type) {
    case NEW_NOTE:
      action.data.id = idAdapter.createId();
      return [...state, action.data];
    case EDIT_NOTE:
      return state.map((todo) => {
        if (todo.id == action.data.id) {
          return Object.assign({}, todo, action.data);
        }
        return todo;
      });
    case DELETE_NOTE:
      const updatedNotes = state.filter((note) => {
        return note.id != action.id;
      });
      return [...updatedNotes];
    default:
      return state;
  }
}

function folders(state = defaultFolders, action) {
  switch (action.type) {
    case NEW_FOLDER:
      action.data.slug = slugAdapter.slugify(action.data.name);
      return [...state, action.data];
    case EDIT_FOLDER:
      return state.map((folder) => {
        if (folder.slug == action.data.slug) {
          return Object.assign({}, action.data);
        }
        return folder;
      });
    case DELETE_FOLDER:
      if (action.folder.slug == "") return state;
      const updatedFolders = state.filter((folder) => {
        return folder.slug != action.folder.slug;
      });
      return [...updatedFolders];
    default:
      return state;
  }
}

function selectedFolder(state = { name: "All", slug: "" }, action) {
  switch (action.type) {
    case SELECT_FOLDER:
      return action.folder;
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
  folders,
  selectedFolder,
  selectedNote
});

export default notesApp;
