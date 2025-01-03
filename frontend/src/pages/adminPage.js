import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import ChamadoModal from "../components/chamadoModal";
import {
  Container,
  Title,
  ChamadosContainer,
  ChamadoColumn,
  ColumnTitle,
  ChamadoList,
  ChamadoInfo,
  ChamadoItem,
  Status,
  Button,
} from "./styles/adminStyle";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPage = () => {
  const [chamados, setChamados] = useState([]);
  const [selectedChamado, setSelectedChamado] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("novo-chamado", (novoChamado) => {
      setChamados((prev) => [novoChamado, ...prev]);
      toast.info("Novo chamado criado!");
    });

    socket.on("atualizar-chamado", (chamadoAtualizado) => {
      setChamados((prev) =>
        prev.map((chamado) =>
          chamado.id === chamadoAtualizado.id ? chamadoAtualizado : chamado
        )
      );
      toast.success("Chamado atualizado!");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchChamados = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/chamados");
      setChamados(response.data.chamados);
    } catch (error) {
      console.error("Erro ao buscar chamados:", error);
      toast.error("Erro ao carregar chamados.");
    }
  };

  const updateStatus = async (id, novoStatus) => {
    try {
      await axios.patch(`http://localhost:3000/api/status/${id}`, {
        status: novoStatus,
      });
      toast.success("Status atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      toast.error("Erro ao atualizar status do chamado.");
    }
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

  useEffect(() => {
    fetchChamados();
  }, []);

  return (
    <Container>
      <ToastContainer />
      <Title>Administrador - Lista de Chamados</Title>
      <ChamadosContainer>
        {/* Coluna Em Espera */}
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
                    <strong>Nome:</strong> {chamado.usuario_nome}
                  </ChamadoInfo>
                  <ChamadoInfo>
                    <strong>Setor:</strong> {chamado.setor}
                  </ChamadoInfo>
                  <ChamadoInfo>
                    <strong>Status:</strong>{" "}
                    <Status status={chamado.status}>{chamado.status}</Status>
                  </ChamadoInfo>
                  <ChamadoInfo>
                    <strong>Data e Hora:</strong>{" "}
                    {formatDateTime(chamado.data_hora)}
                  </ChamadoInfo>
                  <Button onClick={() => setSelectedChamado(chamado)}>
                    Ver Mais Detalhes
                  </Button>
                </ChamadoItem>
              ))}
          </ChamadoList>
        </ChamadoColumn>

        {/* Coluna Abertos */}
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
                    <strong>Nome:</strong> {chamado.usuario_nome}
                  </ChamadoInfo>
                  <ChamadoInfo>
                    <strong>Setor:</strong> {chamado.setor}
                  </ChamadoInfo>
                  <ChamadoInfo>
                    <strong>Status:</strong>{" "}
                    <Status status={chamado.status}>{chamado.status}</Status>
                  </ChamadoInfo>
                  <ChamadoInfo>
                    <strong>Data e Hora:</strong>{" "}
                    {formatDateTime(chamado.data_hora)}
                  </ChamadoInfo>
                  <Button onClick={() => setSelectedChamado(chamado)}>
                    Ver Mais Detalhes
                  </Button>
                </ChamadoItem>
              ))}
          </ChamadoList>
        </ChamadoColumn>

        {/* Coluna Finalizados */}
        <ChamadoColumn>
          <ColumnTitle>Finalizados</ColumnTitle>
          <ChamadoList>
            {chamados
              .filter((chamado) => chamado.status === "Finalizado")
              .sort((a, b) => new Date(a.data_hora) - new Date(b.data_hora))
              .map((chamado) => (
                <ChamadoItem key={chamado.id}>
                  <ChamadoInfo>
                    <strong>ID:</strong> {chamado.id}
                  </ChamadoInfo>
                  <ChamadoInfo>
                    <strong>Nome:</strong> {chamado.usuario_nome}
                  </ChamadoInfo>
                  <ChamadoInfo>
                    <strong>Setor:</strong> {chamado.setor}
                  </ChamadoInfo>
                  <ChamadoInfo>
                    <strong>Status:</strong>{" "}
                    <Status status={chamado.status}>{chamado.status}</Status>
                  </ChamadoInfo>
                  <ChamadoInfo>
                    <strong>Data e Hora:</strong>{" "}
                    {formatDateTime(chamado.data_hora)}
                  </ChamadoInfo>
                  <Button onClick={() => setSelectedChamado(chamado)}>
                    Ver Mais Detalhes
                  </Button>
                </ChamadoItem>
              ))}
          </ChamadoList>
        </ChamadoColumn>
      </ChamadosContainer>

      {selectedChamado && (
        <ChamadoModal
          chamado={selectedChamado}
          onClose={() => setSelectedChamado(null)}
          onConclude={() =>
            updateStatus(
              selectedChamado.id,
              selectedChamado.status === "Em Espera"
                ? "Aberto"
                : "Finalizado"
            )
          }
        />
      )}
    </Container>
  );
};

export default AdminPage;
