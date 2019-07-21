import React from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const Link = React.forwardRef((props, ref) => (
  <RouterLink {...props} innerRef={ref} />
));

function ListItemLink(props) {
  const { primary, to, icon, onClick, selected, secondary, onContextMenu } = props;
  return (
    <li>
      <ListItem
        button
        component={Link}
        to={to}
        onClick={onClick}
        selected={selected}
        onContextMenu={onContextMenu}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} secondary={secondary} />
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  primary: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired
};

export default ListItemLink;
