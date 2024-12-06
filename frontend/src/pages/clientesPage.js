import React from 'react';
import styled from 'styled-components';
import ChamadoForm from '../components/chamadoForm';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2rem;
  margin-bottom: 20px;
`;

const ClientePage = () => {
  const handleSubmit = async (chamado) => {
    try {
      await axios.post('http://localhost:5000/api/chamados', chamado);
      alert('Chamado enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar chamado:', error);
      alert('Erro ao enviar chamado.');
    }
  };

  return (
    <Container>
      <Title>Cliente - Criar Chamado</Title>
      <ChamadoForm onSubmit={handleSubmit} />
    </Container>
  );
};

export default ClientePage;
