import React from "react";
import axios from 'axios';
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

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pinEntidad: "",
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

  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      pinEntidad: this.state.pinEntidad,
      email: this.state.email,
      password: this.state.password
    });
    await axios.post('http://checkapp.bucaramanga.upb.edu.co/api/user/create/', this.state)
      .then(function (res) {
        //console.log(res);
        //localStorage.setItem("message", response.data.message);
        //localStorage.setItem("token", response.data.token);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  render() {
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-4">
                <big>Sign up</big>
              </div>
            </CardHeader>

            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form" onSubmit={this.onSubmit}>

                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-badge" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="PIN"
                      type="text"
                      name="pinEntidad"
                      value={this.state.pinEntidad}
                      onChange={this.handleInputChange}
                      required />
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
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
                    className="mt-4"
                    color="primary"
                    type="button"
                    onClick={this
                      .onSubmit
                      .bind(this)}>
                    Create account
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

export default Register;
