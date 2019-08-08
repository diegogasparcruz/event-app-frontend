import React, { Component } from 'react';
import { Form, Header, Button, Message } from 'semantic-ui-react';
import { DateInput, TimeInput } from 'semantic-ui-calendar-react';

import '../style.css';

export default class FormEvent extends Component {

  state = {
    title: '',
    location: '',
    date: '',
    time: '',
    error: {
      header: null,
      content: null
    }
  };

  handleChange = (e, {name, value}) =>{

    if(this.state.hasOwnProperty(name)){
      this.setState({ [name]: value });
    }

  }

  handleSubmit = e => {

    e.preventDefault();

    const { title, location, date, time } = this.state;

    if(!title || !location || !date || !time){
      this.setState({ error: { header: 'Campos vazios', content: 'Preencha todos os dados' } });
    }else{

      try {
        this.props.handleStore(this.state);
      } catch (error) {
        this.setState({ error: { header: 'Error', content: 'Ocorreu algum problema T.T' } });
      }

    }

  }

  render(){
    return (
      <div className="form-event">
      <Header textAlign="center" as="h3">
        <br />
        Form New Event
      </Header>

      <Form onSubmit={ this.handleSubmit } error>

        <Message
          error
          header={ this.state.error.header }
          content={ this.state.error.content }
        />

        <Form.Input
          name="title"
          placeholder="Title"
          value={ this.state.title }
          onChange={ this.handleChange }
          icon="text cursor"
          iconPosition="left"
        />

        <Form.Input
          name="location"
          placeholder="Location"
          value={ this.state.location }
          onChange={ this.handleChange }
          icon="location arrow"
          iconPosition="left"
        />

        <DateInput
          name="date"
          placeholder="Date"
          value={ this.state.date }
          onChange={ this.handleChange }
          icon="calendar alternate outline"
          iconPosition="left"
        />

        <TimeInput
          name="time"
          placeholder="Time"
          value={ this.state.time }
          onChange={ this.handleChange }
          icon="clock outline"
          iconPosition="left"
        />

        <center> <Button type="submit" content="Create Event" positive /> </center>

      </Form>
      </div>
    );
  }

}
