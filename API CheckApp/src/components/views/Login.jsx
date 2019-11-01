import React from "react";
import axios from 'axios';
//import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
//import LayoutUser from "../LayoutUser.jsx";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";


class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    axios.request({
      url: 'http://checkapp.bucaramanga.upb.edu.co/api/user/login/',
      method: 'post',
      data: {
        email: this.state.email,
        password: this.state.password
      }
    })
      .then(res => {
        console.log(res);
        localStorage.setItem("message", res.data.message);
        localStorage.setItem("token", res.data.token);
        console.log(localStorage.getItem("token"));
        console.log(localStorage.getItem("message"));
        //alert(localStorage.getItem("message"));
        //return <Route path="/admin" render={props => <LayoutUser {...props} />} />
        const { history } = this.props;
        history.push('/admin/index');
        //axios.get('/admin/index');
        //window.status = "Some text in the status bar!!";
      })
      .catch(err => {
        alert("Datos incorrectos");
      });
  };

  render() {
    return (
      <>
        <Col lg="5" md="7">

          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-2">
                <big>Sign in</big>
              </div>
              {/*<div className="alert alert-danger" role="alert">
                hola
    </div>*/}
            </CardHeader>

            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form" onSubmit={this.onSubmit}>

                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleInputChange}
                      required />
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Password"
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                      required />
                  </InputGroup>
                </FormGroup>

                <div className="text-center">
                  <Button
                    className="my-4"
                    color="primary"
                    type="button"
                    onClick={this
                      .onSubmit
                      .bind(this)}>
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>

        </Col>
      </>
    );
  }
}

export default Login;
