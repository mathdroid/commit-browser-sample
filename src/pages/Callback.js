import React from "react";
import { withSiteData, Redirect } from "react-static";
import fetch from "isomorphic-unfetch";
import { Subscribe } from "unstated";

import { userStorage } from "../storage";
import Auth from "../containers/auth";

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

class CallbackPage extends React.Component {
  state = {
    token: "",
    error: null,
    redirect: false
  };
  async componentDidMount() {
    const {
      githubClientId: client_id,
      githubClientSecret: client_secret,
      location: { search },
      login
    } = this.props;
    const code = getQueryVariable(search, "code");
    try {
      await login(
        {
          client_id,
          client_secret,
          code
        },
        this.redirect
      );
    } catch (error) {
      console.error(error.message);
      this.redirect(error);
    }
  }
  redirect = (error, token) => {
    this.setState({ error, token, redirect: true });
  };
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

const Enhanced = withSiteData(CallbackPage);

export default ({ location }) => (
  <Subscribe to={[Auth]}>
    {auth => <Enhanced location={location} login={auth.login} />}
  </Subscribe>
);
