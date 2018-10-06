import React from "react";
import { withSiteData } from "react-static";
import fetch from "isomorphic-unfetch";

import Button from "../components/button";

const getQueryVariable = (searchString, variable) => {
  const query = searchString.substring(1);
  const vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split("=");
    if (decodeURIComponent(pair[0]) == variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  console.log("Query variable %s not found", variable);
};

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

class CallbackPage extends React.Component {
  state = {
    token: ""
  };
  async componentDidMount() {
    const {
      githubClientId: client_id,
      githubClientSecret: client_secret,
      location: { search }
    } = this.props;
    const code = getQueryVariable(search, "code");
    const query = encode({
      client_id,
      client_secret,
      code
    });
    const response = await fetch(
      `https://github-oauth-proxy.now.sh/?${query}`,
      {
        method: "POST"
      }
    );
    console.log({ response });
    const token = await response.text();
    console.log({ token });
    this.setState({ token });
  }
  render() {
    const { githubClientId, location } = this.props;
    const { token } = this.state;
    const code = getQueryVariable(location.search, "code");
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>{code}</h1>
        <h2>Token: {token}</h2>
      </div>
    );
  }
}

export default withSiteData(CallbackPage);
