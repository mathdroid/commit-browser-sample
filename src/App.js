import React from "react";
import { Router, Link } from "react-static";
import styled, { injectGlobal } from "react-emotion";
import { hot } from "react-hot-loader";
import Routes from "react-static-routes";
import { Provider } from "unstated";

injectGlobal`
  body {
    font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial,
      'Lucida Grande', sans-serif;
    font-weight: 300;
    font-size: 16px;
    margin: 0;
    padding: 0;
  }
`;

const AppStyles = styled.div`
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
  }

  img {
    max-width: 100%;
  }
`;

class App extends React.Component {
  componentDidMount() {
    console.log("cdm");
  }
  render() {
    return (
      <Provider>
        <Router>
          <AppStyles>
            <nav>
              <Link exact to="/">
                Home
              </Link>
            </nav>
            <div className="content">
              <Routes />
            </div>
          </AppStyles>
        </Router>
      </Provider>
    );
  }
}

export default hot(module)(App);
