import { Container } from "unstated";

class ConnectionContainer extends Container {
  state = {
    online: typeof navigator.onLine === "boolean" ? navigator.onLine : true
  };

  setOnlineStatus = online => {
    this.setState({ online });
  };
}

export default ConnectionContainer;
