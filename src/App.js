/* eslint-disable no-template-curly-in-string */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
const App = () => {
  const [museus, setMuseus] = useState([]);
  const [selectedMuseu, setSelectedMuseu] = useState('');
  const [obras, setObras] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3307/api/museus')
      .then(response => {
        setMuseus(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar dados da API:', error);
      });
  }, []);

  const fetchObras = (museuId) => {
    axios.get(`http://localhost:3307/api/obras/${museuId}`)
      .then(response => {
        setObras(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar obras da API:', error);
      });
  };

  const museuSelecionado = museus.find(museu => museu.idMuseu === parseInt(selectedMuseu, 10));

  return (
    <div className="App">
      <h1>Selecione um Museu:</h1>
      <select value={selectedMuseu} onChange={e => handleSelectChange(e.target.value)}>
        <option value="">Selecione um museu</option>
        {museus.map(museu => (
          <option key={museu.idMuseu} value={museu.idMuseu}>
            {museu.nome}
          </option>
        ))}
      </select>

      {selectedMuseu && museuSelecionado && (
        <div>
          <img className="imagem_museu" src={museuSelecionado.img} alt={museuSelecionado.nome} />
          <h2>Detalhes do Museu:</h2>
          <p>Nome: {museuSelecionado.nome}</p>
          <p>Endereço: {museuSelecionado.endereco}</p>
          <p>Email: {museuSelecionado.email}</p>
          <p>Número: {museuSelecionado.numero}</p>
          <p>Descrição: {museuSelecionado.descri}</p>
          <p>História: {museuSelecionado.historia}</p>
        </div>
      )}

      {selectedMuseu && (
        <div>
          <h2>Obras do Museu:</h2>
          <ul>
            {obras.map(obra => (
              <li key={obra.idObra}>
                <p>{obra.nome_obra} - {obra.descri_obra} - </p>
                 <br />
                 <img src={obra.imagem} alt={obra.nome_obra}/>
                 <p>{obra.data_obra}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  function handleSelectChange(museuId) {
    setSelectedMuseu(museuId);

    if (museuId) {
      fetchObras(museuId);
    } else {
      setObras([]);
    }
  }
};

export default App;
