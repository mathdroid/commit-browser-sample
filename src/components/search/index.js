import React from "react";
import universal from "react-universal-component";

const loading = () => <span>Preparing Search Bar</span>;
const error = () => null;
const Search = universal(import("./search"), {
  loading,
  error
});

export default props => <Search {...props} />;
