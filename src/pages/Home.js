import React from "react";
import { withSiteData } from "react-static";

import WithUser from "../containers/user";
import Search from "../components/search";

export default withSiteData(() => (
  <WithUser
    render={({ token }) => (
      <React.Fragment>
        <h1 style={{ textAlign: "center" }}>
          Welcome to Github Commit Browser, {JSON.stringify(token)}
        </h1>
        <Search />
      </React.Fragment>
    )}
  />
));
