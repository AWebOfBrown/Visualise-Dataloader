import { css } from "react-emotion";
import React from "react";
import { withTooltip } from "react-tippy";

const KeyValTooltip = () => {
  return (
    <div className={contentStyle}>
      <h3> Cached Key </h3>
      <p>
        {" "}
        If we have a key waiting to be dispatched, and another function wants
        the data for the same key, we want to return a reference to the pending
        promise representing that key. <br /> <br /> The promise in question was
        constructed on the first load of the key, and the reference will update
        when the promise is resolved or rejected.
      </p>
    </div>
  );
};

const contentStyle = css`
  width: 230px;
  height: 250px;
  border: none;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;

  & p {
    font-size: 15px;
    margin-top: 0px;
    padding-top: 0px;
    padding-left: 5px;
  }

  & h3 {
    padding-bottom: 0px;
    margin-top: 10px;
    margin-bottom: 5px;
    border-bottom: 2px solid #646363;
    color: white;
  }
`;

function provideTooltip(Component) {
  return withTooltip(Component, {
    position: "left",
    interactive: true,
    interactiveBorder: 5,
    trigger: "mouseenter",
    animation: "fade",
    arrow: true,
    arrowSize: "large",
    context: true,
    html: <KeyValTooltip />
  });
}

export default provideTooltip;
