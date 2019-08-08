import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container, Segment, Form, Header, Button, Divider, Message } from 'semantic-ui-react';

import api from '../../services/api';

import './style.css';

class SignUp extends Component {

  state = {
    username: '',
    email: '',
    password: '',
    error: {
      header: null,
      content: null
    }
  };

  handleSignUp = async e => {

    e.preventDefault();

    const { username, email, password } = this.state;

    if(!username || !email || !password){
      this.setState({ error: { header: 'Vazios', content: 'Preencha todos os dados para se cadastrar' } });
    } else {

      try {
        await api.post("/users", { username, email, password });
        this.props.history.push("/");
      } catch (err) {
        console.log(err);
        this.setState({ error: { header: 'Error', content: 'Ocorreu um erro ao registrar sua conta. T.T' } });
      }

    }

  }

  render() {
    return (

      <Container>
        <div className="segment-signup">
        <Segment>

          <Header textAlign="center" as="h2">
            Form SignUp
          </Header>

          <Form error onSubmit={this.handleSignUp}>

            { this.state.error &&
            <Message
              error
              header={this.state.error.header}
              content={this.state.error.content}
            />
            }

            <Form.Input
              label="Username"
              placeholder="Nome de usuário"
              onChange={ e => this.setState({ username: e.target.value }) }
            />
            <Form.Input
              label="Email"
              placeholder="Endereço de e-mail"
              type="email"
              onChange={ e => this.setState({ email: e.target.value }) }
            />
            <Form.Input
              label="Password"
              placeholder="Senha"
              type="password"
              onChange={ e => this.setState({ password: e.target.value }) }
            />

            <Button type="submit" color="blue" content="Cadastrar grátis" className="btn-signup" />

          </Form>

          <Divider />

          <center> <Link to="/"> Fazer Login </Link> </center>

        </Segment>
        </div>
      </Container>

    );
  }
}

export default withRouter(SignUp);
