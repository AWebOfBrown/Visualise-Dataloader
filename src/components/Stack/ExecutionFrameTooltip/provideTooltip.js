import { withTooltip } from "react-tippy";
import React from "react";
import { css } from "react-emotion";

class EFTooltipContent extends React.Component {
  render() {
    return (
      <div className={contentStyle}>
        <a
          href="http://dmitrysoshnikov.com/ecmascript/javascript-the-core-2nd-edition/#execution-context"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3> Execution Frame </h3>
        </a>
        <ul>
          <li>Left click (tap on tablet) to jump to code.</li>
          <li>Right click (hold on tablet) to jump to call-site.</li>
        </ul>
      </div>
    );
  }
}

const contentStyle = css`
  width: 200px;
  height: 150px;
  border: none;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;

  & ul {
    font-size: 15px;
    margin-left: 5px;
    margin-top: 0px;
    padding-top: 0px;
    padding-left: 5px;

    & li {
      padding-top: 10px;
    }
  }

  & h3 {
    padding-bottom: 0px;
    margin-top: 10px;
    margin-bottom: 5px;
    border-bottom: 2px solid #646363;
    color: #56abff;
  }
`;

function provideTooltip(Component) {
  return withTooltip(Component, {
    position: "top",
    interactive: true,
    interactiveBorder: 5,
    trigger: "mouseenter",
    animation: "fade",
    arrow: true,
    arrowSize: "large",
    context: true,
    html: <EFTooltipContent />
  });
}

export default provideTooltip;
