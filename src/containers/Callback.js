import React from "react";
import { withSiteData } from "react-static";
import fetch from "isomorphic-unfetch";

import Button from "../components/button";

function getQueryVariable(searchString, variable) {
  const query = searchString.substring(1);
  const vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split("=");
    if (decodeURIComponent(pair[0]) == variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  console.log("Query variable %s not found", variable);
}

class CallbackPage extends React.Component {
  async componentDidMount() {
    const {
      githubClientId: client_id,
      githubClientSecret: client_secret,
      location: { search }
    } = this.props;
    const code = getQueryVariable(search, "code");
    const response = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        body: JSON.stringify({
          client_id,
          client_secret,
          code
        })
      }
    );
    console.log({ response });
  }
  render() {
    const { githubClientId, location } = this.props;
    const code = getQueryVariable(location.search, "code");
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>{code}</h1>

        <a
          href={`https://github.com/login/oauth/authorize?client_id=${githubClientId}`}
          target="_blank"
        >
          <Button>Connect to Github</Button>
        </a>
      </div>
    );
  }
}

export default withSiteData(CallbackPage);
