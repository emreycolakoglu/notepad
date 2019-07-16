import React, { Component } from "react";
import Layout from "../components/layout";
import { connect } from "react-redux";
import { deleteNote, newNote, editNote, selectFolder } from "../redux/actions";

class Dummy extends Component {
  render() {
    return (
      <Layout>
        <div>{JSON.stringify(this.props.notes)} </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    notes: state.notes
  };
};

const mapDispatchToProps = { deleteNote, newNote, editNote, selectFolder };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dummy);
