import { applyMiddleware } from "redux";
import { saveFolders, saveNotes } from "../../services/storage";

const storage = (store) => (next) => (action) => {
  next(action);
  const data = store.getState();
  saveFolders(data.folders);
  saveNotes(data.notes);
};

const middleware = applyMiddleware(storage);

export default middleware;
