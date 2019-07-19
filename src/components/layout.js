import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./navbar";
import FolderDrawer from "./folderDrawer";
import NoteDrawer from "./noteDrawer";
import clsx from "clsx";
import { CssBaseline } from "@material-ui/core";
import storage from "../services/storage";

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
    <>
      <CssBaseline />
      <Navbar
        title={props.title || "NoteApp"}
        handleDrawerToggle={handleDrawerToggle}
        open={open}
      />
      <FolderDrawer handleDrawerClose={handleDrawerClose} open={open} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <NoteDrawer />
        <div>{props.children}</div>
      </main>
    </>
  );
}
