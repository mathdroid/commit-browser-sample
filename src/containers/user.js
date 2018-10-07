import React from "react";
import { Redirect } from "react-static";

import { userStorage } from "../storage";

var onStorage = function(data) {
  console.log({ data });
  // Receive changes in the localStorage
};

class WithUser extends React.Component {
  state = {
    token: "",
    error: null,
    loaded: false
  };

  async componentDidMount() {
    await this.getTokenFromLocal();

    if (window.addEventListener) {
      window.addEventListener("storage", onStorage, false);
    } else {
      window.attachEvent("onstorage", onStorage);
    }
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
      noRedirect = false,
      redirectIfLoggedIn = false,
      redirectTo = "/login",
      ...rest
    } = this.props;
    const { token, error, loaded } = this.state;
    const shouldRedirect = redirectIfLoggedIn ? !!token : !!error;
    return loaded ? (
      shouldRedirect ? (
        noRedirect ? (
          <Redirect to={redirectTo} />
        ) : null
      ) : (
        render({ token, ...rest })
      )
    ) : null;
  }
}

export default WithUser;
