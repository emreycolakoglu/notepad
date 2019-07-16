import {
  DELETE_NOTE,
  EDIT_NOTE,
  NEW_NOTE,
  SELECT_FOLDER,
  SELECT_NOTE
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

export function selectFolder(name) {
  return {
    type: SELECT_FOLDER,
    name
  };
}

export function selectNote(id) {
  return {
    type: SELECT_NOTE,
    id
  };
}
