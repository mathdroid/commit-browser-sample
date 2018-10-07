import React, { Fragment } from "react";
import { withSiteData, Redirect } from "react-static";
import { Subscribe } from "unstated";

import Button from "../components/button";
import Auth from "../containers/auth";

export default withSiteData(({ githubClientId }) => (
  <Subscribe to={[Auth]}>
    {auth =>
      auth.state.token === "" ? (
        <Fragment>
          <h1 style={{ textAlign: "center" }}>
            Please Login {auth.state.token}
          </h1>

          <a
            href={`https://github.com/login/oauth/authorize?client_id=${githubClientId}`}
          >
            <Button>Connect to Github</Button>
          </a>
        </Fragment>
      ) : (
        <Redirect to="/" />
      )
    }
  </Subscribe>
));
