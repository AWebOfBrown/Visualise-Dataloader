import React from "react";
import { css } from "emotion";

const ScrollIndicator = ({ innerRef, onClick }) => {
  return (
    <div onClick={onClick} ref={innerRef} className={style}>
      <div className={innerContainer}>
        <span className={dot} />
        <span className={dot} />
        <span className={dot} />
      </div>
    </div>
  );
};

export default ScrollIndicator;

const dot = css`
  position: relative;
  top: 5;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: white;
  opacity: 0;
`;

const innerContainer = css`
  width: 75px;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
`;

const style = css`
  position: absolute;
  bottom: 15px;
  border-radius: 250px;
  box-shadow: 3px 8px 5px 1px rgba(0, 0, 0, 1);
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(7, 107, 207, 1);
  width: 150px;
  height: 50px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
