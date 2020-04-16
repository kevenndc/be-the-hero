import React from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default class NewIncident extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      value: ''
    }

    this.ongId = localStorage.getItem('ongId');

    this.handleNewIncident = this.handleNewIncident.bind(this);
  }

  async handleNewIncident(e) {
    e.preventDefault();

    try {

      await api.post('incidents', this.state, {
        headers: {
          Authorization: this.ongId
        }
      });

      this.props.history.push('/profile');
      
    } catch (error) {

      alert('Erro ao cadastrar caso. Tente novamente.');

    }
  }

  render() {
    return (
      <div className="new-incident-container">
        <div className="content">
          <section>
            <img src={logoImg} alt="Logo" />

            <h1>Cadastrar novo caso</h1>
            <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

            <Link className="back-link" to="/profile">
              <FiArrowLeft size={16} color="#e02041" />
              Voltar para home
            </Link>
          </section>
          <form action="" onSubmit={this.handleNewIncident}>
            <input 
              placeholder="Título do caso" 
              value={this.state.title}
              onChange={e => this.setState({ title: e.target.value })}
            />

            <textarea 
              placeholder="Descrição" 
              value={this.state.description}
              onChange={e => this.setState({ description: e.target.value })}  
            />

            <input 
              placeholder="Valor em reais" 
              value={this.state.value}
              onChange={e => this.setState({ value: e.target.value })}
            />

            <button type="submit" className="button">Cadastrar</button>
          </form>
        </div>
      </div>
    );
  }
}