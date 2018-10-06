import React from "react";
import { withSiteData } from "react-static";

import WithUser from "../components/with-user";

export default withSiteData(() => (
  <WithUser
    render={({ token }) => (
      <div>
        <h1 style={{ textAlign: "center" }}>
          Welcome to Github Commit Browser, {JSON.stringify(token)}
        </h1>
      </div>
    )}
  />
));
