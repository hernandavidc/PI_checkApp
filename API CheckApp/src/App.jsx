import React from "react";
class App extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        isLoginOpen: true,
        isRegisterOpen: false
      };
    }
    render() {
      return (
        <div className="root-container">
        </div>
      );
    }
  }

  export default App;