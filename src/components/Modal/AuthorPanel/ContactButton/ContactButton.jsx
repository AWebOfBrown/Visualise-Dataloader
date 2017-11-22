import React from "react";
import { css } from "emotion";

import SVG from "../../../SVG";

const ContactButton = ({ href, media, mediaColor, size }) => {
  return (
    <a
      className={linkStyle}
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <div className={SVGContainer}>
        <SVG size={30} iconName={media} fill={mediaColor} />
      </div>
    </a>
  );
};

export default ContactButton;

const linkStyle = css`
  text-decoration: none;
  margin-top: 5px;
  &:hover {
    transform: translateY(-1px);
  }
`;

const SVGContainer = css`
  color: white;
  text-decoration: none;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #071829;
  border-radius: 50px;
  height: 80px;
`;
