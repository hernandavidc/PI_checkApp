import React from "react";

// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

class FooterUser extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="6">
            <div className="copyright text-center text-xl-left text-muted">
              © 2019{" "}
              <a
                className="font-weight-bold ml-1"
                href="https://github.com/Xjeso/CheckApp"
                rel="noopener noreferrer"
                target="_blank"
              >
                Created by CheckApp
              </a>
            </div>
          </Col>
        </Row>
      </footer>
    );
  }
}

export default FooterUser;
