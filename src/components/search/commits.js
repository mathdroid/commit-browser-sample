import React, { Fragment } from "react";

import Fetch from "../fetch";
import { CardStyles } from "../repository-card";

const getBaseEndpoint = ({ owner, repo }) =>
  `https://api.github.com/repos/${owner}/${repo}/commits`;
export default ({ owner, repo, Authorization }) => (
  <Fetch
    headers={{
      Authorization
    }}
    url={getBaseEndpoint({ owner, repo })}
  >
    {({ loading, error, data = [] }) =>
      loading ? (
        <span>loading</span>
      ) : error ? (
        <span>error</span>
      ) : (
        <Fragment>
          {data.map(c => (
            <CardStyles key={c.sha}>
              <div className="author">
                <img src={c.author.avatar_url} />
                <h2>{c.author.login}</h2>
              </div>
              <p>{c.commit.message}</p>
            </CardStyles>
          ))}
        </Fragment>
      )
    }
  </Fetch>
);
