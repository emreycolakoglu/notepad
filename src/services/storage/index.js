import storage from "../../adapters/storage";

export function getNotes() {
  const notes = storage.get("notes");
  if (!notes || notes.length == 0) {
    return [
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
  } else {
    return notes;
  }
}

export function getFolders() {
  const folders = storage.get("folders");
  if (!folders || folders.length == 0) {
    return [
      { name: "All", slug: "" },
      {
        name: "Default",
        slug: "default"
      }
    ];
  } else {
    return folders;
  }
}

export function saveNotes(notes){
  storage.set("notes", notes);
}

export function saveFolders(folders){
  storage.set("folders", folders);
}