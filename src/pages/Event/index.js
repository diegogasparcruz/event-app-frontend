import React, { Component } from 'react';
import { Header, Button, Container } from 'semantic-ui-react';

import api from '../../services/api';
import {logout} from '../../services/auth';

import ListEvent from './components/ListEvent';
import FormEvent from './components/FormEvent';

import './style.css';

export default class Event extends Component {

  state = {
    events: [],
    showEventCreate: false
  };

  componentDidMount(){
    this.handleFetchEvents();
  }

  handleFetchEvents = async () =>{

    const response = await api.get('/events/list');
    this.setState({ events: response.data });
  }

  handleToggleShowEventCreate = () => {
    this.setState({ showEventCreate: !this.state.showEventCreate });
  }

  handleStore = async data => {

    const { title, location, date, time } = data;
    await api.post('/events/new', { title, location, date, time });
    this.handleFetchEvents();
    this.handleToggleShowEventCreate();
  }

  handleDeleteEvent = async id => {

    await api.delete(`/events/${id}`);
    this.handleFetchEvents();
  }

  handleLogout = () =>{
    logout();
    this.props.history.push('/');
  }

  render() {

    return (

      <Container>

        <Header textAlign="center" as="h2">
        <br />
        Events app - <a href="#" onClick={ this.handleLogout }> Sair </a>

          <Header.Subheader>
            <br />
            <Button onClick={ this.handleToggleShowEventCreate } className={ this.state.showEventCreate ? 'negative' : 'positive' }>
            { this.state.showEventCreate ? 'Cancel' : 'New Event' }
            </Button>
          </Header.Subheader>
        </Header>

        { this.state.showEventCreate && <FormEvent handleStore={ this.handleStore } /> }

        { !this.state.showEventCreate && <ListEvent events={ this.state.events } deleteEvent={ this.handleDeleteEvent } /> }
        {/* { !this.state.showEventCreate && this.state.events.map( event => ( <ListEvent key={ event.id } event={ event } /> ) ) } */}

      </Container>

    );
  }
}
