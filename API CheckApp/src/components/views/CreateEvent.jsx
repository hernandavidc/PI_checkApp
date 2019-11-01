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
            title: "",
            content: "",
            author: "",
            dateStart: new Date(),
            timeStart: new Date(),
            dateEnd: new Date(),
            timeEnd: new Date(),
            //capacity: 10
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
        console.log("1");
        axios.request({
            url: 'http://checkapp.bucaramanga.upb.edu.co/api/event/create/',
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
                //moment(this.state.timeEnd).format('HH:mm'),
                //capacity: this.capacity
            }
        })
            .then(function (res) {
                console.log(res);
                console.log("hiiiiiiiiiiiiiii");
                this.setState({
                    title: "",
                    content: "",
                    author: "",
                    dateStart: new Date(),
                    timeStart: new Date(),
                    dateEnd: new Date(),
                    timeEnd: new Date()
                    //capacity: 10
                });
                //localStorage.setItem("message", response.data.message);
                //localStorage.setItem("token", response.data.token);
                const { history } = this.props;
                history.push('/admin/eventList');
            })
            .catch(function (error) {
                console.log(error);
                console.log("erroooooooooor");
            });
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
                <div className="header bg-gradient-info pb-8 pt-5 pt-md-8"></div>
                <Container className="mt--7" fluid>
                    <Row>
                        <Col className="mb-5 mb-xl-0" xl="8">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <Row className="align-items-center">
                                        <div className="col">
                                            <h3 className="mb-0">Eventos</h3>
                                        </div>
                                    </Row>
                                </CardHeader>
                                <div className="col-md-8 align-self-center">
                                    <div className="card card-body">
                                        <form onSubmit={this.onSubmit}>
                                            {/* Event Title */}
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Title"
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
                                            {/* <div className="form-group">
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
                        </div>
                        {/* Note DateStart */}
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-5">
                                                        <DatePicker className="glyphicon glyphicon-calendar"
                                                            defaultValue={moment(new Date())}
                                                            selected={this.state.dateStart}
                                                            onChange={this.onChangeDateStart} />
                                                    </div>
                                                    <div className="col-md-4 offset-md-">
                                                        <TimePicker
                                                            className="glyphicon glyphicon-calendar"
                                                            use12Hours format="h:mm a"
                                                            defaultValue={moment('8:0', 'h:mm a')}
                                                            selected={this.state.timeStart}
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
                                                        selected={this.state.dateEnd}
                                                        onChange={this.onChangeDate} />
                                                </div>
                                                <div className="col-md-4 offset-md-">
                                                    <TimePicker
                                                        className="glyphicon glyphicon-calendar"
                                                        use12Hours format="h:mm a"
                                                        defaultValue={moment('10:0', 'h:mm a')}
                                                        selected={this.state.timeEnd}
                                                        onChange={this.onChangeDate}
                                                    />
                                                </div>
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
