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

class AssistantList extends React.Component {
  constructor() {
    super();
    this.state = {
      idEvento: "",
      assistants: []
    };
  }

  componentDidMount() {
    console.log("Evento Seleccionado: " + localStorage.getItem("eventoSeleccionado"));

    console.log(this.state.idEvento);
    this.fetchAssistants();
  }

  fetchAssistants() {
    console.log(this.state.idEvento);
    axios.request({
      url: 'http://checkapp.bucaramanga.upb.edu.co/api/assistant/list/' + localStorage.getItem("eventoSeleccionado"),
      method: 'get',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    })
      .then(res => {
        console.log(res.data);
        console.log(res.data['assistans']);
        this.setState({
          assistants: res.data['assistans']
        });
      })
      .catch(err => {
        console.log("Error: " + err);
      })
  }

  deleteAssistant(id) {
    console.log(id);
    axios.request({
      url: 'http://checkapp.bucaramanga.upb.edu.co/api/assistant/' + id + '/delete/' + localStorage.getItem("eventoSeleccionado"),
      method: 'post',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    })
      .then(res =>
        this.fetchAssistants()
      )
      .catch(err => {
        console.log("Error: " + err);
      })
  }

/*loadEvent(id) {
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
};*/

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
};
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
}*/

handleInputChange = (event) => {
  const { value, name } = event.target;
  this.setState({
    [name]: value
  });
}
render() {
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8"></div>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Asistentes</h3>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Facultad</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.assistants.map(assistant => {
                    return (
                      <tr key={assistant._id}>
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              href="#"
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
                                onClick={() => this.deleteAssistant(assistant._id)}
                              >
                                Eliminar
                                  </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                        <td>{assistant.id}</td>
                        <td>{assistant.name}</td>
                        <td>{assistant.grade}</td>
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

export default AssistantList;
