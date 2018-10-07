import React from "react";
import styled from "react-emotion";

const onAttention = "&:hover, &:focus";
const CardStyles = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 0.3rem;
  ${onAttention}: {
      borderColor: "#96c8da",
      boxShadow: "0 2px 3px 0 rgba(34,36,38,.15)"
    }
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
