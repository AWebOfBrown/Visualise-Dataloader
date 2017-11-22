import React from "react";
import styled from "react-emotion";
import Loadable from "react-loadable";

import { BrowserRouter, Route } from "react-router-dom";
import { observer } from "mobx-react";

import Home from "./pages/Home";
import Header from "./components/Header";
const LoadableAbout = Loadable({
  loader: () => import("./components/Modal"),
  loading: "loading"
});
window.onload = LoadableAbout.preload();

const Router = () => {
  return (
    <BrowserRouter>
      <div>
        <Route
          path="/"
          render={({ location }) => <Header location={location} />}
        />

        <Row>
          <Route path="/" component={Home} />
          <Route exact path="/about" component={LoadableAbout} />
        </Row>
      </div>
    </BrowserRouter>
  );
};

export default observer(Router);

const Row = styled("div")`
  overflow: hidden;
  display: flex;
`;
