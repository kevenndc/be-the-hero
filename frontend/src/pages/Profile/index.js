import React from 'react';
import logoImg from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      incidents: []
    }

    this.ongName = localStorage.getItem('ongName');
    this.ongId = localStorage.getItem('ongId');

    this.history = this.props.history;

    this.handleDeleteIncident = this.handleDeleteIncident.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    api.get('profile', {
      headers: {
        Authorization: this.ongId,
      },
    }).then(response => {
      this.setState({ incidents: response.data })
    })
  }

  async handleDeleteIncident(id) {
    try {

      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: this.ongId
        }
      });

      this.setState({
        incidents: this.state.incidents.filter(incident => incident.id !== id)
      });

    } catch (error) {

      alert(error);

    }
  }

  handleLogout() {
    localStorage.clear();
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="profile-container">
        <header>
          <img src={logoImg} alt="Logo" />
          <span>Bem vinda, {this.ongName}</span>

          <Link className="button" to="/incidents/new">
            Cadastrar novo caso
          </Link>

          <button type="button" onClick={this.handleLogout}>
            <FiPower size={18} color="#e02041" />
          </button>
        </header>

        <h1>Casos cadastrados</h1>

        <ul>
            {this.state.incidents.map(incident => (
              <li key={incident.id}>
                <strong>CASO: </strong>
                <p>{incident.title}</p>

                <strong>DESCRIÇÃO</strong>
                <p>{incident.description}</p>

                <strong>VALOR: </strong>
                <p>{Intl.NumberFormat('pt-BR', { 
                  style: 'currency', 
                  currency: 'BRL' }).format(incident.value)}
                </p>

                <button type="button" onClick={() => this.handleDeleteIncident(incident.id)}>
                  <FiTrash2 size={18} color="#a8a8b3" />
                </button>
              </li>
            ))}
        </ul>
      </div>
    ); 
  }
}