import React from "react";
import { css } from "emotion";

const Tuple = ({ id, resolved = false, rejected = false }) => {
  return (
    <div>
      <span className={el}>{id}</span>
      <span className={el}> resolve </span>
      <span className={el}> reject </span>
    </div>
  );
};

export default Tuple;

const el = css`
  background-color: rgb(150, 150, 150);
  color: black;
  height: 100%;
  width: 50px;
`;

const tupleStyle = css`
  display: flex;
  height: 50px;
  width: 150px;
`;
