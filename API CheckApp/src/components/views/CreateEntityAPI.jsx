import React from "react";
import axios from 'axios';
import { DatePicker } from 'antd';
import { TimePicker } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import { Calendar, NumberPicker } from "react-dom";

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
    Col
} from "reactstrap";

// core components
import {
    chartOptions,
    parseOptions,
    chartExample1,
    chartExample2
} from "../charts.jsx";

import HeaderIndex from "../HeaderIndex.jsx";

class CreateEvent extends React.Component {

    constructor() {
        super();
        this.state = {
            URI: "",
            pinEntidad: "",
            author: ""
        };
    }

    async componentDidMount() {
        this.clearLocalStorage();
    }

    clearLocalStorage() {
        //localStorage.clear();
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log("Creating EntityAPI");
        axios.request({
            url: 'http://checkapp.bucaramanga.upb.edu.co/api/entityApi/create',
            method: 'post',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            data: {
                URI: this.state.URI,
                pinEntidad: this.state.pinEntidad
            }
        })
            .then(function (res) {
                console.log(res);
                const { history } = this.props;
                history.push('/admin/entityList');
            })
            .catch(function (error) {
                console.log(error);
            });
    };

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
                <Container className="mt--7" fluid>
                    <Row>
                        <Col className="mb-5 mb-xl-0" xl="8">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <Row className="align-items-center">
                                        <div className="col">
                                            <h3 className="mb-0">Crear Entidad</h3>
                                        </div>
                                    </Row>
                                </CardHeader>
                                <div className="col-md-8 align-self-center">
                                    <div className="card card-body">
                                        <form onSubmit={this.onSubmit}>
                                            {/* Event URI */}
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="URI"
                                                    onChange={this.handleInputChange}
                                                    name="URI"
                                                    value={this.state.URI}
                                                    required />
                                            </div>
                                            {/* Note PinEntidad */}
                                            <div className="form-group">
                                                <textarea
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="PIN Entidad"
                                                    name="pinEntidad"
                                                    onChange={this.handleInputChange}
                                                    value={this.state.pinEntidad}
                                                    required>
                                                </textarea>
                                            </div>
                                            <div>
                                                <Button
                                                    className="my-4"
                                                    color="primary"
                                                    type="button"
                                                    onClick={this
                                                        .onSubmit
                                                        .bind(this)}>
                                                    Aceptar
                  </Button>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default CreateEvent;
