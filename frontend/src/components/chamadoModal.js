import React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const ModalContainer = styled.div`
  background: #1e1e1e;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: #f5f5f5;
  font-family: "Arial", sans-serif;
  animation: ${slideIn} 0.3s ease-in-out;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #ffffff;
  border-bottom: 2px solid #6a0dad;
  padding-bottom: 10px;
`;

const Info = styled.p`
  font-size: 1rem;
  margin-bottom: 10px;
  line-height: 1.5;

  strong {
    color: #6a0dad;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 20px;
  color: #d1d1d1;
  line-height: 1.6;
  font-style: italic;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;

  ${({ variant }) =>
    variant === "delete"
      ? `
    background-color: #e74c3c;
    color: #fff;

    &:hover {
      background-color: #c0392b;
    }
  `
      : `
    background-color: #2ecc71;
    color: #fff;

    &:hover {
      background-color: #27ae60;
    }
  `}
`;

const ChamadoModal = ({ chamado, onClose, onDelete, onConclude }) => {
  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Title>Detalhes do Chamado</Title>
        <Info>
          <strong>ID:</strong> {chamado.id}
        </Info>
        <Info>
          <strong>Nome:</strong> {chamado.nome}
        </Info>
        <Info>
          <strong>Setor:</strong> {chamado.setor}
        </Info>
        <Info>
          <strong>Data e Hora:</strong>{" "}
          {new Date(chamado.dataHora).toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Info>
        <Description>
          <strong>Descrição:</strong> {chamado.descricao}
        </Description>
        <ButtonsContainer>
          <Button variant="delete" onClick={() => onDelete(chamado.id)}>
            Excluir
          </Button>
          <Button onClick={() => onConclude(chamado.id)}>Concluir</Button>
        </ButtonsContainer>
      </ModalContainer>
    </Overlay>
  );
};

export default ChamadoModal;
