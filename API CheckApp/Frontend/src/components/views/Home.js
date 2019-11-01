import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import moment from 'moment'

export default class EventsList extends Component {

    state = {
        notes: []
    }

    async componentDidMount() {
        this.getNotes();
    }

    getNotes = async () => {
        const res = await axios.get('http://localhost:4000/api/notes')
        this.setState({
            notes: res.data
        });
    }

    deleteNote = async (noteId) => {
        await axios.delete('http://localhost:4000/api/notes/' + noteId);
        this.getNotes();
    }

    render() {
        return (
            <div className="row">

                <h1>
                    home
                </h1>

            </div>
        )
    }
}