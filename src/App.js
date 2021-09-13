import React, { useRef, useEffect, useState } from 'react';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Generator from "views/generator"
import Accounts from "./views/accounts"

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/AccountDataGenerator/" component={Generator} />
        <Route path="/AccountDataGenerator/:address" component={Accounts} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;