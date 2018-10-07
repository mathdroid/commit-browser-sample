import { Container } from "unstated";
import fetch from "isomorphic-unfetch";

import { userStorage } from "../storage";

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
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

export class AuthContainer extends Container {
  state = {
    token: "",
    error: false,
    loading: false,
    isAuthenticated: false
  };

  isAuthenticated = () => this.state.token !== "";

  _getAccessToken = async ({ client_id, client_secret, code }) => {
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
    const { access_token: token = "", error = null } = decode(text);
    if (error) {
      throw new Error(error);
    }
    return { token };
  };

  login = async ({ client_id, client_secret, code }, cb = () => null) => {
    this.setState({ error: false, loading: true });
    if (this.state.isAuthenticated) {
      throw new Error("Already authenticated");
    }
    this.setState({ token: "" });
    try {
      const { token, error } = await this._getAccessToken({
        client_id,
        client_secret,
        code
      });
      await userStorage.setItem("token", token);
      cb(null, token);
      this.setState({ token, isAuthenticated: true });
    } catch (error) {
      this.setState({ error });
      cb(error, "");
      throw error;
    } finally {
      this.setState({ loading: false });
    }
  };

  logout = async () => {
    await userStorage.clear();
    await this.setState({ isAuthenticated: false, token: "" });
  };

  _getTokenFromLocal = async () => {
    const token = await userStorage.getItem("token");
    if (token) {
      await this.setState({ token, isAuthenticated: true });
    }
  };

  // getUser = async () => {
  //   const { user } = this.state;
  //   if (user !== null) {
  //     return user;
  //   } else {
  //     const oldUser = await storage.getItem("user");
  //     if (oldUser !== null) {
  //       this.setState({ user: oldUser });
  //       return oldUser;
  //     } else {
  //       throw new Error("No user/token found");
  //     }
  //   }
  // };
}

// const Auth = new AuthContainer();
// export default Auth;

export default AuthContainer;
