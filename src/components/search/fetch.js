import React from "react";
import fetch from "unfetch";
import debounce from "debounce-fn";
import isEqual from "react-fast-compare";

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

class Fetch extends React.Component {
  state = {
    data: undefined,
    loading: false,
    error: false
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate({ children: _, ...prevProps }) {
    const { children, ...props } = this.props;
    if (!isEqual(prevProps, props)) {
      this.fetchData();
    }
  }

  makeNetworkRequest = debounce(() => {
    const { url, method = "get", params, data: body, headers } = this.props;
    fetch(`${url}?${encode(params)}`, {
      method,
      body,
      headers
    })
      .then(r => r.json())
      .then(res => {
        this.setState({
          data: res.data,
          loading: false,
          error: false
        });
      })
      .catch(e => {
        this.setState({ data: undefined, error: e.message, loading: false });
        console.error(e);
      });
  }, 200);

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

export default Fetch;
