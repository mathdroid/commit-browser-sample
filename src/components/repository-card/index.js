import React from "react";

import styled from "react-emotion";

const CardStyles = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 0.3rem;
`;

export default ({
  fullName = "",
  externalLink = "https://github.com",
  updatedAt = "",
  children,
  ...props
}) => (
  <CardStyles>
    <h1>{fullName}</h1>
    <a href={externalLink}>{externalLink}</a>
    <code>Last Update: {updatedAt ? updatedAt : "unknown"}</code>
    <button>View Commits</button>
  </CardStyles>
);
