import dotenv from "dotenv";
import React, { Component } from "react";
import { renderStylesToString } from "emotion-server";

dotenv.config();
const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

if (!githubClientId || !githubClientSecret) {
  console.error("missing `GITHUB_CLIENT_ID` and/or `GITHUB_CLIENT_ID` in env");
  process.exit(1);
}

export default {
  getSiteData: () => ({
    title: "Github Commit Browser",
    githubClientId,
    githubClientSecret
  }),
  getRoutes: async () => {
    return [
      {
        path: "/",
        component: "src/pages/Home"
      },
      {
        path: "/login",
        component: "src/pages/Login"
      },
      {
        path: "/callback",
        component: "src/pages/Callback"
      },
      {
        is404: true,
        component: "src/pages/404"
      }
    ];
  },
  renderToHtml: (render, Comp) => renderStylesToString(render(<Comp />)),
  Document: class CustomHtml extends Component {
    render() {
      const { Html, Head, Body, children, renderMeta } = this.props;

      return (
        <Html>
          <Head>
            <meta charSet="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            {renderMeta.styleTags}
          </Head>
          <Body>{children}</Body>
        </Html>
      );
    }
  }
};
