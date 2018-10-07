import React from "react";
import { Router, Link, Route, Switch } from "react-static";
import styled, { injectGlobal } from "react-emotion";
import { hot } from "react-hot-loader";
import Routes from "react-static-routes";
import { Provider, Subscribe } from "unstated";

import Auth from "./containers/auth";

let authContainer = new Auth();

injectGlobal`
  html, body {
    min-height: 100vh;
  }
  body {
    font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial,
      'Lucida Grande', sans-serif;
    font-weight: 300;
    font-size: 16px;
    margin: 0;
    padding: 0;
  }
  #root {
    flex: 1;
    width: 100%;
  }
  body, #root {
    display: flex;
    flex-direction: column;
  }
`;

const AppStyles = styled.div`
  flex: 1;
  a {
    text-decoration: none;
    color: #108db8;
    font-weight: bold;
  }

  nav {
    width: 100%;
    background: #108db8;

    a {
      color: white;
      padding: 1rem;
      display: inline-block;
    }
  }

  .content {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    max-width: 100%;
  }
`;

const Header = ({ token = "", logout = () => null }) => (
  <nav>
    <Link exact to="/">
      Github Commit Browser
    </Link>
    {token ? <button onClick={logout}>Log Out</button> : null}
  </nav>
);
const Repository = () => <div>dynamic!</div>;
class App extends React.Component {
  state = {
    injected: false
  };
  async componentDidMount() {
    await authContainer._getTokenFromLocal();
    this.setState({ injected: true });
  }
  render() {
    const { injected } = this.state;
    return injected ? (
      <Provider inject={[authContainer]}>
        <Router>
          <Switch>
            <Route path="/repository" component={Repository} />
            <AppStyles>
              <Subscribe to={[Auth]}>
                {auth => (
                  <Header token={auth.state.token} logout={auth.logout} />
                )}
              </Subscribe>
              <div className="content">
                <Routes />
              </div>
            </AppStyles>
          </Switch>
        </Router>
      </Provider>
    ) : null;
  }
}

export default hot(module)(App);
