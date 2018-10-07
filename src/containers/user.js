import React from "react";
import { Redirect } from "react-static";

import { userStorage } from "../storage";

function logStorageChange(changes, area) {
  console.log("Change in storage area: ", { area });
  console.log("Changes: ", { changes });
}
class WithUser extends React.Component {
  state = {
    token: "",
    error: null,
    loaded: false
  };

  async componentDidMount() {
    await this.getTokenFromLocal();

    // if (localStorage.onChanged.hasListener(logStorageChange)) {
    //   localStorage.onChanged.addListener(logStorageChange);
    // }
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
