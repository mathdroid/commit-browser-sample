import React, { Fragment } from "react";
import { withSiteData } from "react-static";

import WithUser from "../containers/user";
import Button from "../components/button";

export default withSiteData(({ githubClientId }) => (
  <WithUser
    redirectIfLoggedIn
    redirectTo="/"
    render={() => (
      <Fragment>
        <h1 style={{ textAlign: "center" }}>Please Login</h1>

        <a
          href={`https://github.com/login/oauth/authorize?client_id=${githubClientId}`}
        >
          <Button>Connect to Github</Button>
        </a>
      </Fragment>
    )}
  />
));
