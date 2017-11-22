import React from "react";
import { Provider } from "mobx-react";
import RouterContainer from "./RouterContainer.jsx";
import { UIStore } from "./mobX/stores/UIStore";
require("./globalStyles");

const App = () => (
  <Provider UIStore={UIStore}>
    <div>
      <RouterContainer />
    </div>
  </Provider>
);

export default App;
