import React, { useRef, useEffect, useState } from 'react';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Generator from "views/generator"
import Accounts from "./views/accounts"

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path={process.env.PUBLIC_URL + '/'} component={Generator} />
        <Route path={process.env.PUBLIC_URL + '/:address'} component={Accounts} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;