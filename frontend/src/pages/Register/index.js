import React from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

export default class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      whatsapp: '',
      city: '',
      uf: ''
    }

    this.handleRegister = this.handleRegister.bind(this);
  }

  async handleRegister(e) {
    e.preventDefault();

    try {

      const response = await api.post('ongs', this.state);
      alert(`Seu ID de acesso: ${response.data.id}`);
      this.props.history.push('/');

    } catch (error) {

      console.log('erro');

    }  
  }

  render() {
    return (
      <div className="register-container">
        <div className="content">
          <section>
            <img src={logoImg} alt="Logo" />

            <h1>Cadastro</h1>
            <p>Faça seu cadastro, entre na plataforma e ajude pessoas a econtrarem os casos da sua ONG.</p>

            <Link className="back-link" to="/">
              <FiArrowLeft size={16} color="#e02041" />
              Não tenho cadastro
            </Link>
          </section>
          <form action="" onSubmit={this.handleRegister}>
            <input 
              placeholder="Nome da ONG"
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
            />
            
            <input 
              type="email" 
              placeholder="E-mail" 
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />

            <input 
              placeholder="Whatsapp"
              value={this.state.whatsapp}
              onChange={e => this.setState({ whatsapp: e.target.value })}
            />
            
            <div className="input-group">
              <input 
                placeholder="Cidade"
                value={this.state.city}
                onChange={e => this.setState({city: e.target.value})}
              />

              <input 
                placeholder="UF" 
                style={{ with: 80 }}
                value={this.state.uf}
                onChange={e => this.setState({uf: e.target.value})}
              />
            </div>

            <button type="submit" className="button">Cadastrar</button>
          </form>
        </div>
      </div>
    );
  }
}