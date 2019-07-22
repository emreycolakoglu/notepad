import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import FolderIcon from "@material-ui/icons/Folder";
import { selectFolder, selectNote } from "../redux/actions";
import ListItemLink from "./routerLink";
import Folder from "./folder";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar
  }
}));

const PersistentDrawerLeft = (props) => {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={props.open}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerHeader}>
        <h3>Folders</h3>
      </div>
      <Divider />
      <List>
        {props.folders.map((folder, index) => (
          <Folder folder={folder} key={index} />
        ))}
      </List>
      {/**
       * // TODO New Folder button
       */}
    </Drawer>
  );
};
const mapStateToProps = (state) => {
  return {
    notes: state.notes,
    folders: state.folders,
    selectedFolder: state.selectedFolder
  };
};
const mapDispatchToProps = { selectFolder, selectNote };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersistentDrawerLeft);
