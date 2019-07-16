import React, { Component } from "react";
import Layout from "../components/layout";
import { connect } from "react-redux";
import { deleteNote, newNote, editNote, selectFolder } from "../redux/actions";
import Editor from "../components/editor";

class Home extends Component {
  render() {
    return (
      <Layout>
        <Editor />
      </Layout>
    );
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    notes: state.notes,
    selectedFolder: state.selectedFolder
  };
};

const mapDispatchToProps = { deleteNote, newNote, editNote, selectFolder };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
