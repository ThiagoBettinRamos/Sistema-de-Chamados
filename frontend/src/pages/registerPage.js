import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../img/images.png";
import { Container, LogoContainer, Form, FormContainer, Input, Button } from "./styles/registerStyle";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      if (!name || !email || !password) {
        toast.error("Por favor, preencha todos os campos!");
        return;
      }

      const response = await axios.post("http://localhost:3000/api/users", {
        nome: name,
        email,
        senha: password,
        isAdmin: false,
      });

      toast.success("Usuário registrado com sucesso!");
      console.log("Usuário criado com sucesso:", response.data);

      navigate("/");
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);

      if (error.response && error.response.status === 400) {
        toast.error("Email já está em uso!");
      } else {
        toast.error("Erro ao registrar usuário. Tente novamente mais tarde.");
      }
    }
  };

  return (
    <Container>
      <LogoContainer>
        <img src={logo} alt="Logo" style={{ maxWidth: "100%", maxHeight: "80%" }} />
      </LogoContainer>

      <FormContainer>
        <Form onSubmit={handleRegister}>
          <h1>Registro</h1>
          <label>Nome</label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label>Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
