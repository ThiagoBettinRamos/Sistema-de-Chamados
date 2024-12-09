import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { chamadosMock } from "../mock/mockData";
import ChamadoModal from "../components/chamadoModal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #1e1e1e;
  color: #f5f5f5;
  min-height: 100vh;
  font-family: "Arial", sans-serif;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #e0e0e0;
`;

const ChamadosContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 1200px;
`;

const ChamadoColumn = styled.div`
  flex: 1;
  margin: 0 10px;
  background-color: #2c2c2c;
  border-radius: 8px;
  padding: 20px;
`;

const ColumnTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #e0e0e0;
  text-align: center;
`;

const ChamadoList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ChamadoItem = styled.li`
  background-color: #333;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ChamadoInfo = styled.p`
  margin: 5px 0;
  font-size: 1rem;

  strong {
    color: #e0e0e0;
  }
`;

const Status = styled.span`
  font-weight: bold;
  ${({ status }) => {
    if (status === "Aberto") return "color: #e74c3c;";
    if (status === "Em Espera") return "color: #f39c12;";
    if (status === "Finalizado") return "color: #2ecc71;";
  }}
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background: #6a0dad;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  font-family: "Roboto", sans-serif;
  font-weight: bold;

  &:hover {
    background: #4b0082;
  }
`;

const AdminPage = () => {
  const [chamados, setChamados] = useState([]);
  const [selectedChamado, setSelectedChamado] = useState(null);

  useEffect(() => {
    setChamados(chamadosMock);
  }, []);

  const handleDelete = (id) => {
    setChamados((prevChamados) => prevChamados.filter((chamado) => chamado.id !== id));
    setSelectedChamado(null);
  };

  const handleConclude = (id) => {
    setChamados((prevChamados) =>
      prevChamados.map((chamado) => {
        if (chamado.id === id) {
          if (chamado.status === "Em Espera") {
            return { ...chamado, status: "Aberto" };
          } else if (chamado.status === "Aberto") {
            return { ...chamado, status: "Finalizado" };
          }
        }
        return chamado;
      })
    );
    setSelectedChamado(null);
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Container>
      <Title>Administrador - Lista de Chamados</Title>
      <ChamadosContainer>
        <ChamadoColumn>
          <ColumnTitle>Aguardando</ColumnTitle>
          <ChamadoList>
            {chamados
              .filter((chamado) => chamado.status === "Em Espera")
              .map((chamado) => (
                <ChamadoItem key={chamado.id}>
                  <ChamadoInfo>
                    <strong>ID:</strong> {chamado.id}
                  </ChamadoInfo>
                  <ChamadoInfo>
                    <strong>Nome:</strong> {chamado.nome}
                  </ChamadoInfo>
                  <ChamadoInfo>
                    <strong>Setor:</strong> {chamado.setor}
                  </ChamadoInfo>
                  <ChamadoInfo>
                    <strong>Status:</strong> <Status status={chamado.status}>{chamado.status}</Status>
                  </ChamadoInfo>
                  <ChamadoInfo>
                    <strong>Data e Hora:</strong> {formatDateTime(chamado.dataHora)}
                  </ChamadoInfo>
                  <Button onClick={() => setSelectedChamado(chamado)}>Ver Mais Detalhes</Button>
                </ChamadoItem>
              ))}
          </ChamadoList>
        </ChamadoColumn>

        <ChamadoColumn>
          <ColumnTitle>Abertos</ColumnTitle>
          <ChamadoList>
            {chamados
              .filter((chamado) => chamado.status === "Aberto")
              .map((chamado) => (
                <ChamadoItem key={chamado.id}>
                  <ChamadoInfo>
                    <strong>ID:</strong> {chamado.id}
                  </ChamadoInfo>
                  <ChamadoInfo>
                    <strong>Nome:</strong> {chamado.nome}
                  </ChamadoInfo>
                  <ChamadoInfo>
                    <strong>Setor:</strong> {chamado.setor}
                  </ChamadoInfo>
                  <ChamadoInfo>
                    <strong>Status:</strong> <Status status={chamado.status}>{chamado.status}</Status>
                  </ChamadoInfo>
                  <ChamadoInfo>
                    <strong>Data e Hora:</strong> {formatDateTime(chamado.dataHora)}
                  </ChamadoInfo>
                  <Button onClick={() => setSelectedChamado(chamado)}>Ver Mais Detalhes</Button>
                </ChamadoItem>
              ))}
          </ChamadoList>
        </ChamadoColumn>

        <ChamadoColumn>
          <ColumnTitle>Finalizados</ColumnTitle>
          <ChamadoList>
            {chamados
              .filter((chamado) => chamado.status === "Finalizado")
              .map((chamado) => (
                <ChamadoItem key={chamado.id}>
                  <ChamadoInfo>
                    <strong>ID:</strong> {chamado.id}
                  </ChamadoInfo>
                  <ChamadoInfo>
                    <strong>Nome:</strong> {chamado.nome}
                  </ChamadoInfo>
                  <ChamadoInfo>
                    <strong>Setor:</strong> {chamado.setor}
                  </ChamadoInfo>
                  <ChamadoInfo>
                    <strong>Status:</strong> <Status status={chamado.status}>{chamado.status}</Status>
                  </ChamadoInfo>
                  <ChamadoInfo>
                    <strong>Data e Hora:</strong> {formatDateTime(chamado.dataHora)}
                  </ChamadoInfo>
                  <Button onClick={() => setSelectedChamado(chamado)}>Ver Mais Detalhes</Button>
                </ChamadoItem>
              ))}
          </ChamadoList>
        </ChamadoColumn>
      </ChamadosContainer>

      {selectedChamado && (
        <ChamadoModal
          chamado={selectedChamado}
          onClose={() => setSelectedChamado(null)}
          onDelete={handleDelete}
          onConclude={handleConclude}
        />
      )}
    </Container>
  );
};

export default AdminPage;
