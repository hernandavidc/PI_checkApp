//import 'index.css';
//import App from './App';

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";


import LayoutUser from "./components/LayoutUser.jsx";
import LayoutAuth from "./components/LayoutAuth.jsx";

import App from "./App.jsx";

ReactDOM.render(
<BrowserRouter>
      <Switch>
        <Route path="/auth" render={props => <LayoutAuth {...props} />} />
        <Route path="/admin" render={props => <LayoutUser {...props} />} />
        <Redirect from="/" to="/auth/login" />
      </Switch>
    </BrowserRouter>,
        document.getElementById("root")
  );