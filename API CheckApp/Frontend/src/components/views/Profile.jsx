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
  Container,
  Row,
  Col,
  Modal
} from "reactstrap";
// core components
import HeaderProfile from "../HeaderProfile.jsx";

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      email: "",
      name: "",
      pinEntidad: "",
      exampleModal: false
    };
  }

  async componentDidMount() {
    this.loadUser();
  }

  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };
  loadUser() {
    axios.request({
      url: 'http://checkapp.bucaramanga.upb.edu.co/api/user/detail/',
      method: 'get',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    })
      .then(res => {
        console.log("Usuario que trae");
        console.log(res.data['user']);
        this.setState({
          user: res.data['user']
        });
        this.setState({
          name: this.state.user.name,
          email: this.state.user.email,
          pinEntidad: this.state.user.pinEntidad
        });
        console.log("ggggggggg");
        console.log(this.state);
      })
      .catch(err => {
        console.log("Error: " + err);
      })
  };

  loadUserEdit() {
    this.toggleModal("exampleModal");
  };

  updateUser(e) {
    e.preventDefault();
    console.log("Id de usuario que se va a modificar");
    console.log(this.state.user._id);
    console.log("Datos a modificar");
    console.log(this.state.user);
    axios.request({
      url: 'http://checkapp.bucaramanga.upb.edu.co/api/user/update/' + this.state.user._id,
      method: 'post',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
      data: {
        name: this.state.name,
        email: this.state.email,
        pinEntidad: this.state.pinEntidad
      }
    })
      .then(res => {
        console.log(res);
        this.loadUser();
        this.toggleModal("exampleModal");
      })
      .catch(err => {
        console.log("Error update: " + err);
      })
  };

  handleInputChange = (user) => {
    const { value, name } = user.target;
    console.log(name);
    console.log(value);
    this.setState({
      [name]: value
    });
  }
  render() {
    return (
      <>
        {/* Ventana Edición de Eventos*/}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.exampleModal}
          toggle={() => this.toggleModal("exampleModal")}
        >
          <form onSubmit={this.updateUser}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Usuario
            </h5>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={() => this.toggleModal("exampleModal")}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className="modal-body">
              {/* Formulario Edición*/}
              <div className="pl-lg-4">
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                        Nombre
                            </label>
                      <Input
                        className="form-control-alternative"
                        placeholder="Nombre"
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-email"
                      >
                        Email
                            </label>
                      <Input
                        className="form-control-alternative"
                        placeholder="Email"
                        type="text"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-first-name"
                      >
                        PIN Entidad
                            </label>
                      <Input
                        className="form-control-alternative"
                        placeholder="Pin Entidad"
                        type="text"
                        name="pinEntidad"
                        value={this.state.pinEntidad}
                        onChange={this.handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-last-name"
                      >
                        Contraseña
                            </label>
                      <Input
                        className="form-control-alternative"
                        placeholder="Password"
                        type="password"
                        name="password"
                        value="*************"
                        onChange={this.handleInputChange}
                        disabled
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </div>
              {/* Fin Formulario */}
            </div>
            <div className="modal-footer">
              <Button
                color="secondary"
                data-dismiss="modal"
                type="button"
                onClick={() => this.toggleModal("exampleModal")}
              >
                Close
            </Button>
              <Button
                color="primary"
                type="button"
                onClick={this
                  .updateUser
                  .bind(this)}
              >
                Save changes
            </Button>
            </div>
          </form>
        </Modal>

        <HeaderProfile />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Mi cuenta</h3>
                      <Button
                        color="primary"
                        href="#"
                        onClick={() => this.toggleModal("exampleModal")}
                        size="sm"
                      >
                        Editar
                      </Button>
                    </Col>
                    <Col className="text-right" xs="4">
                      <div className="card-profile-image">
                        <a href="#" onClick={() => this.loadUserEdit()}>
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../../assets/img/theme/user.jpg")}
                          />
                        </a>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Información del Usuario
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Nombre
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-name"
                              placeholder="Nombre"
                              type="text"
                              disabled
                              value={this.state.user.name}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              placeholder="Email"
                              type="text"
                              disabled
                              value={this.state.user.email}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              PIN Entidad
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-pin"
                              placeholder="Pin Entidad"
                              type="text"
                              disabled
                              value={this.state.user.pinEntidad}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Contraseña
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-password"
                              placeholder="Password"
                              type="password"
                              disabled
                              value="*************"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Profile;
