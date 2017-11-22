import React from "react";
import styled from "react-emotion";
import { css } from "emotion";

import Cache from "../Cache";
import CodeEditor from "../CodeEditor";
import Queue from "../Queue";
import Stack from "../Stack";
import PromiseQueue from "../PromiseQueue";

const AnimationStage = () => {
  return (
    <SectionStyle>
      <div className={topHalf}>
        <Row>
          <Column width={"65%"}>
            <PromiseQueue />
          </Column>
          <Column width={"35%"}>
            <Cache />
          </Column>
        </Row>
      </div>
      <div className={bottomHalf}>
        <Row height={"calc(100% - 50px)"}>
          <Stack />
          <CodeEditor />
        </Row>
        <Row>
          <Queue label="Micro-Task Queue" />
          <Queue global label="Global Task Queue" />
        </Row>
      </div>
    </SectionStyle>
  );
};

const topHalf = css`
  ${Row};
  width: 100%;
  height: 50%;
`;

const bottomHalf = css`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 50%;
`;

const Column = styled("div")`
  width: ${props => props.width};
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
`;

const SectionStyle = styled("div")`
  width: calc(100vw - 350px);
  margin: 0;
  height: 95vh;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  @media (min-width: 1200px) {
    width: calc(100vw - 470px);
  }
`;

const Row = styled("div")`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  width: 100%;
  height: ${props => props.height || null};
  flex-wrap: nowrap;
`;

export default AnimationStage;
