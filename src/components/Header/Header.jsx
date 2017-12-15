import React from "react";
import styled, { css } from "react-emotion";
import { NavLink } from "react-router-dom";
import ToggleAbout from "./ToggleAbout";

const Header = ({ location }) => {
  return (
    <div className={style}>
      <div className={interiorContainer}>
        <span className={title}>Visualise DataLoader</span>
        <span className={twitterStyle}>
          <a
            data-size="large"
            className="twitter-share-button"
            href={`https://twitter.com/intent/tweet?text=Visualise%20DataLoader:%20an%20interactive%20tutorial%20to%20Facebook's%20caching/batching%20utility%20library%20for%20Node.js%20(requires%20>1024px%20viewport).&url=http%3A%2F%2Fawebofbrown.github.io/visualise-dataloader&hashtags=javascript,node,graphQL&via=awebofbrown`}
          />
          <ToggleAbout location={location} />
        </span>
        <span className={followStyle}>
          <a
            className="twitter-follow-button"
            href="https://twitter.com/awebofbrown"
            data-size="large"
            data-show-count={false}
          />
        </span>
      </div>
    </div>
  );
};

export default Header;

const hideOnSmallDevices = css`
  @media (max-device-width: 1023px) {
    display: none;
  }
`;

const title = css`
  font-size: 24px;
  margin-right: 5px;
`;

const followStyle = css`
  margin-left: auto;
  display: flex;
  align-items: center;
  height: 100%;
  ${hideOnSmallDevices};
`;

const twitterStyle = css`
  margin: 0 0 0 10px;
  height: 100%;
  display: flex;
  align-items: center;
  ${hideOnSmallDevices};
`;

const style = css`
  display: flex;
  justify-content: flex-start;
  background-color: #071829;
  height: 5vh;
  min-height: 35px;
  color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
`;

const interiorContainer = css`
  height: 100%;
  width: 100%;
  padding: 0 20px 0 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media (min-width: 1080px) {
    max-width: 980px;
    margin: 0 auto 0 auto;
  }
`;
