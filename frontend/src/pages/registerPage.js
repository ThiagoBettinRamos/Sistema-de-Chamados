import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../img/images.png";

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const LogoContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white; /* Fundo branco */
  padding: 20px;
`;

const FormContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #007bff;
  color: white;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  color: black;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
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

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (username && password) {
      toast.success('Usuário registrado com sucesso!');
      navigate('/');
    } else {
      toast.error('Por favor, preencha todos os campos!');
    }
  };

  return (
    <Container>
      <LogoContainer>
        <img src={logo} alt="Logo" style={{ maxWidth: '100%', maxHeight: '80%' }} />
      </LogoContainer>

      <FormContainer>
        <Form onSubmit={handleRegister}>
          <h1>Registro</h1>
          <label>Nome</label>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Senha</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Registrar</Button>
        </Form>
      </FormContainer>
      <ToastContainer />
    </Container>
  );
};

export default RegisterPage;
