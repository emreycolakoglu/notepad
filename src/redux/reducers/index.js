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
import idAdapter from "../../services/id";
import slugAdapter from "../../services/slug";

const defaultNotes = [
  {
    id: "12312312312312",
    text: "Hello, thank you for trying NoteApp",
    folderName: "Default",
    lastUpdate: 1563534588776
  },
  {
    id: "12312312312313",
    text: "Sometimes I write code, sometimes I dont",
    folderName: "Random Thoughts",
    lastUpdate: 1563530588776
  }
];

const defaultFolders = [
  { name: "All", slug: "" },
  {
    name: "Default",
    slug: "default"
  }
];

function notes(state = defaultNotes, action) {
  switch (action.type) {
    case NEW_NOTE:
      action.data.id = idAdapter.createId();
      return [...state, action.data];
    case EDIT_NOTE:
      return state.map((todo) => {
        if (todo.id == action.data.id) {
          return Object.assign({}, action.data);
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
      const updatedFolders = state.filter((note) => {
        return note.slug != action.slug;
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
