import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ChamadoForm from "../components/chamadoForm";
import axios from "axios";

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
  color: #e0e0e0;
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Body = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  gap: 20px;
`;

const LeftSection = styled.div`
  flex: 1;
  background-color: #2c2c2c;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const RightSection = styled.div`
  flex: 1;
  background-color: #2c2c2c;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const SectionTitle = styled.h2`
  color: #e0e0e0;
  font-size: 1.5rem;
  margin-bottom: 20px;
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

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ChamadoInfo = styled.p`
  font-size: 1rem;
  margin: 5px 0;

  strong {
    color: #6a0dad;
  }
`;

const ClientePage = () => {
  const [chamados, setChamados] = useState([]);

  const handleSubmit = async (chamado) => {
    try {
      await axios.post("http://localhost:5000/api/chamados", chamado);
      alert("Chamado enviado com sucesso!");
      fetchChamados(); // Atualiza a lista após enviar o chamado
    } catch (error) {
      console.error("Erro ao enviar chamado:", error);
      alert("Erro ao enviar chamado.");
    }
  };

  const fetchChamados = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/chamados");
      setChamados(response.data);
    } catch (error) {
      console.error("Erro ao buscar chamados:", error);
    }
  };

  useEffect(() => {
    fetchChamados();
  }, []);

  return (
    <Container>
      <Title>Cliente - Sistema de Chamados</Title>
      <Body>
        {/* Formulário */}
        <LeftSection>
          <SectionTitle>Criar Novo Chamado</SectionTitle>
          <ChamadoForm onSubmit={handleSubmit} />
        </LeftSection>

        {/* Lista de chamados */}
        <RightSection>
          <SectionTitle>Seus Chamados</SectionTitle>
          {chamados.length === 0 ? (
            <p>Nenhum chamado encontrado.</p>
          ) : (
            <ChamadoList>
              {chamados.map((chamado) => (
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
                    <strong>Status:</strong> {chamado.status}
                  </ChamadoInfo>
                  <ChamadoInfo>
                    <strong>Data e Hora:</strong>{" "}
                    {new Date(chamado.dataHora).toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </ChamadoInfo>
                </ChamadoItem>
              ))}
            </ChamadoList>
          )}
        </RightSection>
      </Body>
    </Container>
  );
};

export default ClientePage;
