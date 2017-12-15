import React from "react";
import { css } from "emotion";
import provideTooltip from "../TupleTooltip";

const Tuple = ({ id, resolved = false, rejected = false }) => {
  return (
    <div className={tupleStyle}>
      <span className={el}>
        {" "}
        {"{"} key: {id}, resolve(), reject() {"},"}
      </span>
    </div>
  );
};

export default provideTooltip(Tuple);

const el = css`color: white;`;

const tupleStyle = css`
  display: flex;
  padding: 5px 0px;
  width: 250px;
  font-size: 18px;
`;
