import React from "react";
import { withSiteData } from "react-static";

import Button from "../components/button";

export default withSiteData(() => (
  <div>
    <h1 style={{ textAlign: "center" }}>Welcome to Github Commit Browser</h1>
    <Button onClick={() => alert("hehe")}>Connect to Github</Button>
  </div>
));
