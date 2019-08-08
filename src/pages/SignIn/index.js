import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container, Segment, Form, Header, Button, Divider, Message } from 'semantic-ui-react';

import { login } from '../../services/auth';

import api from '../../services/api';

import './style.css';

class SignUp extends Component {

  state = {
    email: '',
    password: '',
    error: {
      header: null,
      content: null
    }
  };

  handleSignIn = async e => {

    e.preventDefault();

    const { email, password } = this.state;

    if(!email || !password){
      this.setState({ error: { header: 'Vazios', content: 'Preencha e-mail e senha para continuar!' } });
    } else {

      try {
        const response = await api.post("/sessions", { email, password });
        login(response.data.token);
        this.props.history.push("/app");
      } catch (err) {
        console.log(err);
        this.setState({ error: { header: 'Error', content: 'Houve um problema com o login, verifique suas credenciais. T.T' } });
      }

    }

  }

  render() {
    return (

      <Container>
        <div className="segment-signin">
        <Segment>

          <Header textAlign="center" as="h2">
            Form Login
          </Header>

          <Form error onSubmit={this.handleSignIn}>

            { this.state.error &&
            <Message
              error
              header={this.state.error.header}
              content={this.state.error.content}
            />
            }

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

            <Button type="submit" color="blue" content="Entrar" className="btn-signin" />

          </Form>

          <Divider />

          <center> <Link to="/signup"> Criar conta grátis </Link> </center>

        </Segment>
        </div>
      </Container>

    );
  }
}

export default withRouter(SignUp);
