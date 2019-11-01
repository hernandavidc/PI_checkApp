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
      events: [],
      event: {},
      title: "",
      content: "",
      author: "",
      dateStart: new Date(),
      timeStart: new Date(),
      dateEnd: new Date(),
      timeEnd: new Date(),
      //capacity: 10,
      exampleModal: false,
      assistans:[]
    };
  }

  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  async componentDidMount() {
    this.fetchEvents();
  }

  fetchEvents() {
    axios.request({
      url: 'http://checkapp.bucaramanga.upb.edu.co/api/event/list',
      method: 'get',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    })
      .then(res => {
        console.log(res.data['events']);
        this.setState({
          events: res.data['events']
        });
      })
      .catch(err => {
        console.log("Error: " + err);
      })
  }

  deleteEvent(id) {
    console.log(id);
    axios.request({
      url: 'http://checkapp.bucaramanga.upb.edu.co/api/event/delete/' + id,
      method: 'post',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    })
      .then(res =>
        this.fetchEvents()
      )
      .catch(err => {
        console.log("Error: " + err);
      })
  }

  loadEvent(id) {
    axios.request({
      url: 'http://checkapp.bucaramanga.upb.edu.co/api/event/detail/' + id,
      method: 'get',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    })
      .then(res => {
        console.log("Evento que se va a editar");
        console.log(res.data['event']);
        this.setState({
          event: res.data['event']
        });
        this.setState({
          title: this.state.event.title,
          content: this.state.event.content,
          author: this.state.event.author,
          dateStart: this.state.event.dateStart,
          //timeStart: this.state.event.timeStart,
          dateEnd: this.state.event.dateEnd,
          //timeEnd: this.state.event.timeEnd
        });
        this.toggleModal("exampleModal");
      })
      .catch(err => {
        console.log("Error: " + err);
      })
  };

  /*fetchAssistans(id) {
    axios.request({
      url: 'http://checkapp.bucaramanga.upb.edu.co/api/assistant/list' + id,
      method: 'get',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    })
      .then(res => {
        console.log(res.data['assistans']);
        this.setState({
          events: res.data['assistans']
        });
      })
      .catch(err => {
        console.log("Error: " + err);
      })
  };*/
  
  updateEvent(e) {
    e.preventDefault();
    console.log("Id de Evento que se va a modificar");
    console.log(this.state.event._id);
    console.log("Datos a modificar");
    console.log(this.state.event)
    axios.request({
      url: 'http://checkapp.bucaramanga.upb.edu.co/api/event/update/' + this.state.event._id,
      method: 'post',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
      data: {
        title: this.state.title,
        content: this.state.content,
        author: this.state.author,
        dateStart: moment(this.state.dateStart).format('YYYY-MM-DD'),
        dateEnd: this.timeEnd
      }
    })
      .then(res => {
        console.log(res);
        this.fetchEvents();
        this.toggleModal("exampleModal");
      })
      .catch(err => {
        console.log("Error update: " + err);
      })
  }

  assistantsList(id){
    localStorage.setItem("eventoSeleccionado", id);
    const { history } = this.props;
    history.push('/admin/assistantList');
  };

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onChangeDateStart = dateStart => {
    this.setState({ dateStart });
  }

  onChangeTimeStart = timeStart => {
    this.setState({ timeStart });
  }

  onChangeDate = date => {
    this.setState({ date });
  }

  onChangeTime = time => {
    this.setState({ time });
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
          <form onSubmit={this.updateEvent}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Evento
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
                {/* Event Title */}
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.handleInputChange}
                    name="title"
                    value={this.state.title}
                    required />
                </div>
                {/* Note Content */}
                <div className="form-group">
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Content"
                    name="content"
                    onChange={this.handleInputChange}
                    value={this.state.content}
                    required>
                  </textarea>
                </div>
                {/* Note Author */}
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Responsable"
                    name="author"
                    onChange={this.handleInputChange}
                    value={this.state.author}
                    required>
                  </input>
                </div>
                {/* Note Capacity */}
                {/*<div className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    placeholder=""
                    name="capacity"
                    min="1"
                    onChange={this.handleInputChange}
                    value={this.state.capacity}
                    required>
                  </input>
                </div>*/}
                {/* Note DateStart */}
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-5">
                      <DatePicker className="glyphicon glyphicon-calendar"
                        defaultValue={moment(new Date())}
                        //selected={this.state.event.dateStart}
                        onChange={this.onChangeDateStart} />
                    </div>
                    <div className="col-md-4 offset-md-">
                      <TimePicker
                        className="glyphicon glyphicon-calendar"
                        use12Hours format="h:mm a"
                        defaultValue={moment('8:0', 'h:mm a')}
                        //selected={this.state.event.timeStart}
                        onChange={this.onChangeTimeStart}
                      />
                    </div>
                  </div>
                </div>
                {/* Note DateEnd */}
                <div className="row">
                  <div className="col-md-5">
                    <DatePicker className="glyphicon glyphicon-calendar"
                      defaultValue={moment(new Date())}
                      //selected={this.state.event.dateEnd}
                      onChange={this.onChangeDate} />
                  </div>
                  <div className="col-md-4 offset-md-">
                    <TimePicker
                      className="glyphicon glyphicon-calendar"
                      use12Hours format="h:mm a"
                      defaultValue={moment('10:0', 'h:mm a')}
                      //selected={this.state.event.timeEnd}
                      onChange={this.onChangeDate}
                    />
                  </div>
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
                  .updateEvent
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
                      <h3 className="mb-0">Eventos</h3>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">Título</th>
                      <th scope="col">Contenido</th>
                      <th scope="col">Responsable</th>
                      <th scope="col">Fecha Inicio</th>
                      <th scope="col">Fecha Finalización</th>
                      {/*<th scope="col">Capacidad</th>*/}
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.events.map(event => {
                      return (
                        <tr name="rowTable" key={event._id}>
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
                                  onClick={()=> this.assistantsList(event._id)}
                                  data-target="#exampleModal"
                                >
                                  Ver asistententes
                                </DropdownItem>
                                <DropdownItem
                                  href="#"
                                  onClick={() => this.loadEvent(event._id)}
                                  data-toggle="modal"
                                  data-target="#exampleModal"
                                >
                                  Editar
                                </DropdownItem>
                                <DropdownItem
                                  href="#"
                                  onClick={() => this.deleteEvent(event._id)}
                                >
                                  Eliminar
                                  </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                          <td>{event.title}</td>
                          <td>{event.content}</td>
                          <td>{event.author}</td>
                          <td>{moment(event.dateStart).format('YYYY-MM-DD')}</td>
                          <td>{moment(event.dateEnd).format('YYYY-MM-DD')}</td>
                          {/*<td>{event.capacity}</td>*/}
                          <td>
                            <Button
                              color="primary"
                              type="button"
                              onClick={() => this.loadEvent(event._id)}
                            >
                              Editar
                            </Button>
                          </td>
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
