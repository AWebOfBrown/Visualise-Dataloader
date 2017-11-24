import React from "react";
import { Redirect } from "react-router-dom";
import Modal from "./Modal.jsx";

class ModalContainer extends React.Component {
  state = { redirect: false };

  dontToggle = e => e.stopPropagation();

  toggle = () => this.setState({ redirect: true });

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return <Modal toggle={this.toggle} dontToggle={this.dontToggle} />;
  }
}

export default ModalContainer;
