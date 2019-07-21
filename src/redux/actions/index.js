import {
  DELETE_NOTE,
  EDIT_NOTE,
  NEW_NOTE,
  SELECT_NOTE,
  DELETE_FOLDER,
  EDIT_FOLDER,
  NEW_FOLDER,
  SELECT_FOLDER,
} from "./actionTypes";

export function deleteNote(id) {
  return {
    type: DELETE_NOTE,
    id
  };
}

export function editNote(data) {
  return {
    type: EDIT_NOTE,
    data
  };
}

export function newNote(data) {
  return {
    type: NEW_NOTE,
    data
  };
}

export function selectNote(id) {
  return {
    type: SELECT_NOTE,
    id
  };
}

export function deleteFolder(id) {
  return {
    type: DELETE_FOLDER,
    id
  };
}

export function editFolder(data) {
  return {
    type: EDIT_FOLDER,
    data
  };
}

export function newFolder(data) {
  return {
    type: NEW_FOLDER,
    data
  };
}

export function selectFolder(folder) {
  return {
    type: SELECT_FOLDER,
    folder
  };
}
