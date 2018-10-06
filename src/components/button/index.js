import React from "react";
import universal from "react-universal-component";

const loading = props => <button {...props}>loading</button>;
const error = props => <button {...props}>error</button>;
const Button = universal(import("./button"), {
  loading,
  error
});

export default props => <Button {...props} />;
