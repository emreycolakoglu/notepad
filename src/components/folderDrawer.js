import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { selectFolder, selectNote } from "../redux/actions";
import Folder from "./folder";
import NewFolder from "./newFolder";

const PersistentDrawerLeft = (props) => {
  const classes = useStyles();
  const [newFolderVisible, useNewFolderVisible] = useState(false);

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

      {newFolderVisible ? (
        <NewFolder
          onNewFolderCreated={() => {
            useNewFolderVisible(false);
          }}
        />
      ) : null}

      <div className={classes.grow} />

      <div>
        <Button
          className={classes.newFolderButton}
          onClick={() => {
            useNewFolderVisible(true);
          }}
        >
          New Folder
        </Button>
      </div>
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
  },
  grow: {
    flexGrow: 1
  },
  newFolderButton: {
    width: "100%"
  }
}));

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersistentDrawerLeft);
