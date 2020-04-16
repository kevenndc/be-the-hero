import React from 'react';
import './styles.css';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: ''
    }

    this.handleLogin = this.handleLogin.bind(this);
  }

  async handleLogin(e) {
    e.preventDefault();

    try {

      const response = await api.post('sessions', this.state);
      localStorage.setItem('ongId', this.state.id);
      localStorage.setItem('ongName', response.data.name);
      this.props.history.push('/profile');

    } catch (error) {

      alert('Erro no login. Por favor, tente novamente');

    }
  }

  render() {
    return (
      <div className="login-container">
        <section className="form">
          <img src={logoImg} alt="Logo" />

          <form action="" onSubmit={this.handleLogin}>
            <h1>Faça seu login</h1>

            <input 
              type="text" 
              placeholder="Sua ID" 
              value={this.state.id}
              onChange={e => this.setState({ id: e.target.value })}
            />

            <button className="button" type="submit">Entrar</button>

            <Link className="back-link" to="/register">
              <FiLogIn size={16} color="#e02041" />
              Não tenho cadastro
            </Link>
          </form>
        </section>

        <img src={heroesImg} alt="Heroes" />
      </div>
    );
  }
}