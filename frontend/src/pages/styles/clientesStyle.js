import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #1e1e1e;
  color: #f5f5f5;
  min-height: 100vh;
`;

export const Title = styled.h1`
  color: #e0e0e0;
  font-size: 2rem;
  margin-bottom: 20px;
`;

export const Body = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  gap: 20px;
`;

export const Section = styled.div`
  flex: 1;
  background-color: #2c2c2c;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const SectionTitle = styled.h2`
  color: #e0e0e0;
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
`;

export const ChamadoList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ChamadoItem = styled.li`
  background-color: #333;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

export const ChamadoInfo = styled.p`
  margin: 5px 0;
`;