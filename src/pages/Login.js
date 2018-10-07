import React, { Fragment } from "react";
import { withSiteData } from "react-static";

import { userStorage } from "../storage";
import WithUser from "../containers/user";
import Button from "../components/button";

// class WithTokenFromStorage extends React.Component {
//   state = {
//     tokenFromStorage: ''
//   }
//   async componentDidMount() {
//     const tokenFromStorage = await userStorage.getItem)
//   }
// }

export default withSiteData(({ githubClientId }) => (
  <Fragment>
    <h1 style={{ textAlign: "center" }}>Please Login</h1>

    <a
      href={`https://github.com/login/oauth/authorize?client_id=${githubClientId}`}
    >
      <Button>Connect to Github</Button>
    </a>
  </Fragment>
));
