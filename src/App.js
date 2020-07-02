import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import store from "Redux/store";
import theme from "Styles/theme";

import Navbar from "Components/common/Navbar";
import Home from "Pages/Home";

export default () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact={true} path="/" component={Home} />
        </Switch>
      </Router>
    </ThemeProvider>
  </Provider>
);
