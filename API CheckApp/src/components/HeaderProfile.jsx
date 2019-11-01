import React from "react";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

class HeaderProfile extends React.Component {
  render() {
    return (
      <>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "200px",
            backgroundImage:
              "url(" + require("../assets/img/brand/CheckApp-Brand.png") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center top"
          }}
        >
          {/* Mask */}
          <span className="mask bg-gradient-default opacity-8" />
        </div>
      </>
    );
  }
}

export default HeaderProfile;
