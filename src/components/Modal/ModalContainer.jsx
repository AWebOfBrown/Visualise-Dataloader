import React from "react";
import { css } from "emotion";
import { Redirect } from "react-router-dom";
import Modal from "./Modal.jsx";

class ModalContainer extends React.Component {
  state = { redirect: false };

  dontToggle = e => e.stopPropagation();

  toggle = () => this.setState({ redirect: true });

  render() {
    return [
      <Modal toggle={this.toggle} dontToggle={this.dontToggle} />,
      this.state.redirect && <Redirect to="/" />
    ];
  }
}

export default ModalContainer;
