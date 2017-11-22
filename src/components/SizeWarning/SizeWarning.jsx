import React from "react";
import { css } from "emotion";

const SizeWarning = ({ header, content, button, ignore }) => {
  return (
    <div className={style}>
      <span className={headerStyle}> {header} </span>
      <p className={textStyle}> {content} </p>
      {button ? (
        <div className={buttonStyle} onClick={ignore}>
          {" "}
          Ignore{" "}
        </div>
      ) : null}
    </div>
  );
};

export default SizeWarning;

const headerStyle = css`
  font-size: 1.5em;
  margin-bottom: 20px;
  padding: 0px 20px 0px 20px;
`;

const textStyle = css`
  font-size: 1.3em;
  max-width: 480px;
  padding: 0px 10px 0px 10px;
`;

const buttonStyle = css`
  border: 2px solid white;
  width: 100px;
  height: 40px;
  padding: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.75);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0px 5px 15px 1px rgba(0, 0, 0, 0.75);
  }
`;

const style = css`
  width: 100vw;
  height: 100vh;
  background-color: #154a88;
  background: linear-gradient(
    45deg,
    rgb(5, 53, 110) 0%,
    rgb(0, 86, 172) 50%,
    rgb(8, 111, 213) 80%
  );
  position: fixed;
  z-index: 3;
  color: white;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;
