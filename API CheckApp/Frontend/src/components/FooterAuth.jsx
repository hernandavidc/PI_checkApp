import React from "react";

// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

class FooterAuth extends React.Component {
  render() {
    return (
      <>
        <footer className="py-5">
          <Container>
            <Row className="align-items-center justify-content-xl-between">
              <Col xl="6">
                <div className="copyright text-center text-xl-left text-muted">
                  © 2019{" "}
                  <a
                    className="font-weight-bold ml-1"
                    href="https://github.com/Xjeso/CheckApp"
                    target="_blank"
                  >
                    Creative by CheackApp
                  </a>
                </div>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default FooterAuth;
