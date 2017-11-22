import React from "react";
import { NavLink } from "react-router-dom";
import { css } from "emotion";

const ToggleAbout = ({ location }) => {
  if (location.pathname === "/") {
    return (
      <NavLink to={"/about"}>
        <span unselectable="on" className={aboutStyle}>
          About
        </span>
      </NavLink>
    );
  } else {
    return (
      <NavLink to={"/"}>
        <span unselectable="on" className={aboutStyle}>
          Back
        </span>
      </NavLink>
    );
  }
};

export default ToggleAbout;

const aboutStyle = css`
  user-select: none;
  cursor: pointer;
  margin-left: 10px;
  width: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  height: 28px;
  border-radius: 4px;
  background-color: rgb(250, 250, 250);
  color: black;

  &:hover {
    background-color: rgb(200, 200, 200);
  }

  @media (max-device-width: 1023px) {
    display: none;
  }
`;
