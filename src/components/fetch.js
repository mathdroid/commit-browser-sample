import React from "react";
import fetch from "isomorphic-unfetch";
import debounce from "debounce-fn";
import isEqual from "react-fast-compare";
import { Subscribe } from "unstated";

import db from "../storage";
import Connection from "../containers/connection";

const encode = data => {
  return data
    ? Object.keys(data)
        .map(
          key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        )
        .join("&")
    : "";
};

class Fetch extends React.Component {
  state = {
    data: undefined,
    loading: false,
    error: false
  };
  mounted = false;
  componentDidMount() {
    this.mounted = true;
    this.fetchData();
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  componentDidUpdate({ children: _, ...prevProps }) {
    const { children, ...props } = this.props;
    if (!isEqual(prevProps, props)) {
      this.fetchData();
    }
  }
  undebounced = () => {
    const {
      url,
      method = "get",
      params,
      data: body,
      headers,
      offline
    } = this.props;
    const urlWithParam = `${url}${params ? "?" : ""}${encode(params)}`;
    return new Promise(async resolve => {
      if (offline) {
        const { data, fetched } = await db.getItem(urlWithParam);
        console.log(`Using data from ${fetched}`);
        return resolve(data);
      } else {
        return fetch(urlWithParam, {
          method,
          body,
          headers
        })
          .then(r => r.json())
          .then(resolve);
      }
    })
      .then(data => {
        console.log({ offline }, data);
        if (this.mounted) {
          db.setItem(urlWithParam, { data, fetched: new Date() });
          this.setState({
            data,
            loading: false,
            error: false
          });
        }
      })
      .catch(e => {
        if (this.mounted) {
          this.setState({ data: undefined, error: e.message, loading: false });
        }
        console.error(e);
      });
  };

  makeNetworkRequest = debounce(this.undebounced, { wait: 250 });

  fetchData = () => {
    this.setState({ error: false, loading: true });

    this.makeNetworkRequest();
  };

  render() {
    const { children } = this.props;
    const { data, loading, error } = this.state;

    return children({
      data,
      loading,
      error,
      refetch: this.fetchData
    });
  }
}

export default props => (
  <Subscribe to={[Connection]}>
    {connection => <Fetch {...props} offline={!connection.state.online} />}
  </Subscribe>
);
