import React from "react";
import { Redirect } from "react-static";

import { userStorage } from "../storage";

class WithUser extends React.Component {
  state = {
    token: "",
    error: null,
    loaded: false
  };

  componentDidMount() {
    this.getTokenFromLocal();
  }

  async getTokenFromLocal() {
    try {
      const token = await userStorage.getItem("token");
      if (typeof token === "string") {
        this.setState({ token, loaded: true });
      } else {
        this.setState({ error: new Error("Token is empty"), loaded: true });
      }
    } catch (error) {
      console.error("No token found in storage. Redirecting.");
      this.setState({ error, loaded: true });
    }
  }

  render() {
    const {
      render,
      redirectIfLoggedIn = false,
      redirectTo = "/login",
      ...rest
    } = this.props;
    const { token, error, loaded } = this.state;
    const shouldRedirect = redirectIfLoggedIn ? !!token : !!error;
    return loaded ? (
      shouldRedirect ? (
        <Redirect to={redirectTo} />
      ) : (
        render({ token, ...rest })
      )
    ) : null;
  }
}

export default WithUser;
