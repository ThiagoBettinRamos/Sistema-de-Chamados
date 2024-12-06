import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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

const ChamadoList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 80%;
  max-width: 600px;
`;

const ChamadoItem = styled.li`
  background-color: #fff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ChamadoDetail = styled.p`
  margin: 5px 0;
  font-size: 1rem;
`;

const AdminPage = () => {
  const [chamados, setChamados] = useState([]);

  useEffect(() => {
    const fetchChamados = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/chamados');
        setChamados(response.data);
      } catch (error) {
        console.error('Erro ao buscar chamados:', error);
      }
    };

    fetchChamados();
  }, []);

  return (
    <Container>
      <Title>Administrador - Lista de Chamados</Title>
      {chamados.length === 0 ? (
        <p>Nenhum chamado encontrado.</p>
      ) : (
        <ChamadoList>
          {chamados.map((chamado) => (
            <ChamadoItem key={chamado.id}>
              <ChamadoDetail><strong>Nome:</strong> {chamado.nome}</ChamadoDetail>
              <ChamadoDetail><strong>Setor:</strong> {chamado.setor}</ChamadoDetail>
              <ChamadoDetail><strong>Descrição:</strong> {chamado.descricao}</ChamadoDetail>
              <ChamadoDetail><strong>Data:</strong> {new Date(chamado.data).toLocaleString()}</ChamadoDetail>
            </ChamadoItem>
          ))}
        </ChamadoList>
      )}
    </Container>
  );
};

export default AdminPage;
