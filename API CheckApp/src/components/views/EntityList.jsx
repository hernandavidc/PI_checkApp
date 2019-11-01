import React from "react";
import axios from 'axios';
import { DatePicker } from 'antd';
import { TimePicker } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';

// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Col,
  Modal
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../charts.jsx";

import HeaderIndex from "../HeaderIndex.jsx";

class EventsList extends React.Component {
  constructor() {
    super();
    this.state = {
      entities:[],
      entity:{},
      pinEntidad: "",
      URI: "",
      exampleModal: false
    };
  }

  async componentDidMount() {
    this.fetchEntities();
  }

  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };
  fetchEntities() {
    axios.request({
      url: 'http://checkapp.bucaramanga.upb.edu.co/api/entityApi/list',
      method: 'get',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    })
      .then(res => {
        console.log(res.data['EntitiesApi']);
        this.setState({
          entities: res.data['EntitiesApi']
        });
      })
      .catch(err => {
        console.log("Error: " + err);
      })
  }
  deleteEntity(id) {
    console.log(id);
    axios.request({
      url: 'http://checkapp.bucaramanga.upb.edu.co/api/entityApi/delete/' + id,
      method: 'post',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    })
      .then(res =>
        this.fetchEntities()
      )
      .catch(err => {
        console.log("Error: " + err);
      })
  }
  loadEntity(id) {
    axios.request({
      url: 'http://checkapp.bucaramanga.upb.edu.co/api/entityApi/detail/' + id,
      method: 'get',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    })
      .then(res => {
        console.log("Entidad que se va a editar");
        console.log(res.data['entityApi']);
        this.setState({
          entity: res.data['entityApi']
        });
        this.setState({
          URI: this.state.entity.URI,
          pinEntidad: this.state.entity.pinEntidad
        });
        console.log(this.state.URI);
        this.toggleModal("exampleModal");
      })
      .catch(err => {
        console.log("Error: " + err);
      })
  };
  updateEntity(e) {
    e.preventDefault();
    console.log("Id de Entidad que se va a modificar");
    console.log(this.state.entity._id);
    console.log("Datos a modificar");
    console.log(this.state.entity)
    axios.request({
      url: 'http://checkapp.bucaramanga.upb.edu.co/api/entityApi/update/' + this.state.entity._id,
      method: 'post',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
      data: {
        URI: this.state.URI,
        pinEntidad: this.state.pinEntidad,
      }
    })
      .then(res => {
        console.log(res);
        this.fetchEntities();
        this.toggleModal("exampleModal");
      })
      .catch(err => {
        console.log("Error update: " + err);
      })
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }
  render() {
    return (
      <>
        {/* Ventana Edición de Entidades*/}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.exampleModal}
          toggle={() => this.toggleModal("exampleModal")}
        >
          <form onSubmit={this.updateEntity}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Entidad
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
              <div className="card card-body">
                {/* URI */}
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.handleInputChange}
                    name="URI"
                    value={this.state.URI}
                    required />
                </div>
                {/* pinEntidad */}
                <div className="form-group">
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Content"
                    name="pinEntidad"
                    onChange={this.handleInputChange}
                    value={this.state.pinEntidad}
                    required>
                  </textarea>
                </div>

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
                  .updateEntity
                  .bind(this)}
              >
                Save changes
            </Button>
            </div>
          </form>
        </Modal>
        
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8"></div>
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Entidades</h3>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">pinEntidad</th>
                      <th scope="col">URI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.entities.map(entity => {
                      return (
                        <tr key={entity._id}>
                          <td className="text-right">
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className="btn-icon-only text-light"
                                href="#pablo"
                                role="button"
                                size="sm"
                                color=""
                                onClick={e => e.preventDefault()}
                              >
                                <i className="fas fa-ellipsis-v" />
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-arrow" right>
                                <DropdownItem
                                  href="#"
                                  onClick={() => this.loadEntity(entity._id)}
                                  data-toggle="modal"
                                  data-target="#exampleModal"
                                >
                                  Editar
                                </DropdownItem>
                                <DropdownItem
                                  href="#"
                                  onClick={() => this.deleteEntity(entity._id)}
                                >
                                  Eliminar
                                  </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                          <td>{entity.pinEntidad}</td>
                          <td>{entity.URI}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default EventsList;
