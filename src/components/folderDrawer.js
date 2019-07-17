import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { connect } from "react-redux";
import FolderIcon from "@material-ui/icons/Folder";
import { groupBy, toPairs } from "lodash-es";
import { selectFolder, selectNote } from "../redux/actions";

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

  function handleListItemClick(event, value) {
    console.log(value);
    props.selectFolder(value);
    props.selectNote("");
  }

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
        <ListItem
          selected={props.selectedFolder === ""}
          onClick={(event) => handleListItemClick(event, "")}
          button
          key={""}
        >
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary={"All"} />
        </ListItem>
        
        {toPairs(groupBy(props.notes, "folderName"))
          .map((arrayPair) => {
            return {
              key: arrayPair[0],
              value: arrayPair[1]
            };
          })
          .map((folder) => (
            <ListItem
              selected={props.selectedFolder === folder.key}
              onClick={(event) => handleListItemClick(event, folder.key)}
              button
              key={folder.key}
            >
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary={folder.key} />
            </ListItem>
          ))}
      </List>
    </Drawer>
  );
};
const mapStateToProps = (state) => {
  return {
    notes: state.notes,
    selectedFolder: state.selectedFolder
  };
};
const mapDispatchToProps = { selectFolder, selectNote };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersistentDrawerLeft);
