import { withTooltip } from "react-tippy";
import React from "react";
import { css } from "react-emotion";

class TupleTooltip extends React.Component {
  render() {
    return (
      <div className={contentStyle}>
        <h3> Array Element </h3>
        <p>
          Internally, DataLoader stores an array made up of tuples (each element
          stores the same three elements). These "tuples" are objects with three
          properties: the key, a resolve method and reject method for the
          promise representing the key.
          <br />
          <br />
          When dispatching, the keys of each tuple are extracted and sent to the
          Database, which looks up the key (id). Upon return of the data, if
          there is data, DataLoader resolves the promise with it, otherwise it
          is rejected. The settled promise is kept in the cache (DataLoader's
          internal ES6 Map) until you clear it manually, or it is garbage
          collected if e.g. you chose to use a new Dataloader per each HTTP
          request.
        </p>
      </div>
    );
  }
}

const contentStyle = css`
  width: 350px;
  height: 320px;
  border: none;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  text-align: left;

  & p {
    max-width: 100%;
    font-size: 15px;
    margin-left: 5px;
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
    position: "bottom",
    interactive: true,
    interactiveBorder: 5,
    trigger: "mouseenter",
    animation: "fade",
    arrow: true,
    arrowSize: "large",
    context: true,
    html: <TupleTooltip />
  });
}

export default provideTooltip;
