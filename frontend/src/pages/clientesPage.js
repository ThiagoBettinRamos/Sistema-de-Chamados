import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import ChamadoForm from "../components/chamadoForm";
import {
  Container,
  Title,
  Body,
  Section,
  SectionTitle,
  ChamadoList,
  ChamadoItem,
  ChamadoInfo,
} from "./styles/clientesStyle";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClientePage = () => {
  const [chamados, setChamados] = useState([]);
  const [usuarioId, setUsuarioId] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:3000");
    
    socket.on("novo-chamado", (novoChamado) => {
      if (novoChamado.usuario_id === usuarioId) {
        setChamados((prev) => [novoChamado, ...prev]);
        toast.info("Um novo chamado foi criado!");
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [usuarioId]);

  const getUsuarioIdFromToken = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const base64Payload = token.split(".")[1];
      const payload = JSON.parse(atob(base64Payload));
      return payload.id;
    }
    return null;
  };

  const fetchChamados = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/chamados?usuario_id=${id}`
      );
      setChamados(response.data.chamados);
    } catch (error) {
      console.error("Erro ao buscar chamados:", error);
      toast.error("Erro ao carregar chamados.");
    }
  };

  const handleSubmit = async (chamado) => {
    try {
      const chamadoData = { ...chamado, usuario_id: usuarioId };
      await axios.post("http://localhost:3000/api/chamados", chamadoData);
      toast.success("Chamado criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar chamado:", error);
      toast.error("Erro ao criar chamado. Tente novamente.");
    }
  };

  useEffect(() => {
    const userId = getUsuarioIdFromToken();
    if (userId) {
      setUsuarioId(userId);
      fetchChamados(userId);
    } else {
      console.error("Usuário não autenticado.");
      toast.error("Usuário não autenticado.");
    }
  }, []);

  return (
    <Container>
      <ToastContainer />
      <Title>Sistema de Chamados - Cliente</Title>
      <Body>
        <Section>
          <SectionTitle>Criar Novo Chamado</SectionTitle>
          <ChamadoForm onSubmit={handleSubmit} />
        </Section>
        <Section>
          <SectionTitle>Seus Chamados</SectionTitle>
          {chamados.length === 0 ? (
            <p>Nenhum chamado encontrado.</p>
          ) : (
            <ChamadoList>
              {chamados.map((chamado) => (
                <ChamadoItem key={chamado.id}>
                  <ChamadoInfo>
                    <strong>Setor:</strong> {chamado.setor}
                  </ChamadoInfo>
                  <ChamadoInfo>
                    <strong>Descrição:</strong> {chamado.descricao}
                  </ChamadoInfo>
                  <ChamadoInfo>
                    <strong>Status:</strong> {chamado.status}
                  </ChamadoInfo>
                  <ChamadoInfo>
                    <strong>Data:</strong>{" "}
                    {new Date(chamado.data_hora).toLocaleString("pt-BR")}
                  </ChamadoInfo>
                </ChamadoItem>
              ))}
            </ChamadoList>
          )}
        </Section>
      </Body>
    </Container>
  );
};

export default ClientePage;
