import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./navbar";
import Drawer from "./drawer";
import clsx from "clsx";
import { CssBaseline } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
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
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  }
}));

export default function Layout(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);


  function handleDrawerClose() {
    setOpen(false);
  }

  function handleDrawerToggle() {
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
      <Drawer handleDrawerClose={handleDrawerClose} open={open} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        {props.children}
      </main>
    </>
  );
}
