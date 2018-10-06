import React from "react";
import { withSiteData } from "react-static";

import Button from "../components/button";

export default withSiteData(({ githubClientId }) => (
  <div>
    <h1 style={{ textAlign: "center" }}>Welcome to Github Commit Browser</h1>

    <a
      href={`https://github.com/login/oauth/authorize?client_id=${githubClientId}`}
      target="_blank"
    >
      <Button>Connect to Github</Button>
    </a>
  </div>
));
