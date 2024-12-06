import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-top: 20px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  margin-bottom: 15px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const ChamadoForm = ({ onSubmit }) => {
  const [nome, setNome] = useState('');
  const [setor, setSetor] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nome, setor, descricao });
    setNome('');
    setSetor('');
    setDescricao('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>Nome:</Label>
      <Input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />

      <Label>Setor:</Label>
      <Input
        type="text"
        value={setor}
        onChange={(e) => setSetor(e.target.value)}
        required
      />

      <Label>Descrição:</Label>
      <Textarea
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        required
      />

      <Button type="submit">Enviar</Button>
    </Form>
  );
};

export default ChamadoForm;
