import React from "react";
import { Redirect } from "react-static";
import { Subscribe } from "unstated";

import Auth from "../containers/auth";
import Search from "../components/search";

export default () => (
  <Subscribe to={[Auth]}>
    {auth =>
      auth.state.token ? (
        <React.Fragment>
          <h1 style={{ textAlign: "center" }}>
            Welcome to Github Commit Browser.
          </h1>
          <Search Authorization={`token ${auth.state.token}`} />
        </React.Fragment>
      ) : (
        <Redirect to="/login" />
      )
    }
  </Subscribe>
);
