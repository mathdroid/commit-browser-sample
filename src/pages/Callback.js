import React from "react";
import { withSiteData, Redirect } from "react-static";
import fetch from "isomorphic-unfetch";
import { userStorage } from "../storage";

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

const decode = data => {
  const vars = data.split("&");
  let obj = {};
  for (let v of vars) {
    const [key, value] = v.split("=");
    obj = { ...obj, [key]: value };
  }
  return obj;
};

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

class CallbackPage extends React.Component {
  state = {
    token: "",
    error: null
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
    const text = await response.text();
    console.log({ text });
    const { token = "", error = null } = decode(text);
    console.log({
      token,
      error
    });
    if (token) {
      userStorage.setItem("token", token);
    }
    this.setState({ token, error });
  }
  render() {
    const { token, error } = this.state;
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Verifying...</h1>
        <h2>{token ? <Redirect to="/" /> : null}</h2>
        <h2>{error ? <Redirect to="/" /> : null}</h2>
      </div>
    );
  }
}

export default withSiteData(CallbackPage);
