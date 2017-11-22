import React from "react";
import { css } from "emotion";

import InfoPanel from "./InfoPanel";
import AuthorPanel from "./AuthorPanel";

const Modal = ({ toggle, dontToggle }) => {
  return (
    <div
      className={modalStyle}
      onClick={toggle}
      onKeyDown={e => e.keyCode === 27 && toggle()}
      tabIndex="0"
    >
      <p className={label} />
      <div className={contentArea} onClick={dontToggle}>
        <AuthorPanel />
        <InfoPanel />
      </div>
    </div>
  );
};

export default Modal;

const label = css`
  position: absolute;
  bottom: 0%;
  left: 0;
  padding-left: 20px;
  transform: translate(-0%, -50%);
  color: rgba(24, 125, 246, 0.5);
  z-index: -1;
  font-size: 18px;
  font-weight: 100;
  margin: 0;
`;

const contentArea = css`
  width: 100%;
  min-width: 1024px;
  max-width: 1280px;
  height: 100%;
  display: flex;
  box-shadow: inset -2px 5px 20px rgba(5, 53, 110, 1);
`;

const modalStyle = css`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items; flex-start;
  height: 95vh;
  background-color: rgba(13,13,37,0.95);
  box-shadow: inset -2px 5px 20px rgba(5,53,110,1);
  width: 100vw;
  position: fixed;
  z-index: 10;
  color: white;
`;
