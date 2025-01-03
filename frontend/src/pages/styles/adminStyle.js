import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #1e1e1e;
  color: #f5f5f5;
  min-height: 100vh;
  font-family: "Arial", sans-serif;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #e0e0e0;
`;

export const ChamadosContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 1200px;
`;

export const ChamadoColumn = styled.div`
  flex: 1;
  margin: 0 10px;
  background-color: #2c2c2c;
  border-radius: 8px;
  padding: 20px;
`;

export const ColumnTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #e0e0e0;
  text-align: center;
`;

export const ChamadoList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const ChamadoItem = styled.li`
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

export const ChamadoInfo = styled.p`
  margin: 5px 0;
  font-size: 1rem;

  strong {
    color: #e0e0e0;
  }
`;

export const Status = styled.span`
  font-weight: bold;
  ${({ status }) => {
    if (status === "Aberto") return "color: #e74c3c;";
    if (status === "Em Espera") return "color: #f39c12;";
    if (status === "Finalizado") return "color: #2ecc71;";
  }}
`;

export const Button = styled.button`
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