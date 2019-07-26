import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./navbar";
import FolderDrawer from "./folderDrawer";
import NoteDrawer from "./noteDrawer";
import clsx from "clsx";
import { CssBaseline } from "@material-ui/core";
import storage from "../adapters/storage";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flex: 1
  },
  content: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    paddingTop: 48,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  editorWrapper: {
    width: "100%",
    height: "100%",
    overflowY: "hidden"
  }
}));

export default function Layout(props) {
  const classes = useStyles();
  const folderDrawerOpen = storage.get("folderDrawerOpen") || false;
  const [open, setOpen] = React.useState(folderDrawerOpen);

  function handleDrawerClose() {
    storage.set("folderDrawerOpen", false);
    setOpen(false);
  }

  function handleDrawerToggle() {
    storage.set("folderDrawerOpen", !open);
    setOpen(!open);
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <CssBaseline />
      <Navbar
        title={props.title || "NoteApp"}
        handleDrawerToggle={handleDrawerToggle}
        open={open}
        desktopButtons={props.desktopButtons}
      />
      <FolderDrawer handleDrawerClose={handleDrawerClose} open={open} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <NoteDrawer />
        <div className={classes.editorWrapper}>{props.children}</div>
      </main>
    </DndProvider>
  );
}
