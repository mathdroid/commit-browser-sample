import React from "react";
import { withSiteData } from "react-static";

import WithUser from "../components/with-user";
import Button from "../components/button";

export default withSiteData(({ githubClientId }) => (
  <WithUser
    redirectIfLoggedIn
    redirectTo="/"
    render={() => (
      <div>
        <h1 style={{ textAlign: "center" }}>Please Login</h1>

        <a
          href={`https://github.com/login/oauth/authorize?client_id=${githubClientId}`}
          target="_blank"
        >
          <Button>Connect to Github</Button>
        </a>
      </div>
    )}
  />
));
