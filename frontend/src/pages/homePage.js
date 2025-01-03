import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../img/images.png";
import { Container, LogoContainer, FormContainer, Form, Input, Button } from "./styles/homeStyle";

const HomePage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/users/login", {
        email,
        senha: password,
      });

      const { token } = response.data;

      const base64Payload = token.split(".")[1];
      const payload = JSON.parse(atob(base64Payload));
      const { isAdmin } = payload;

      localStorage.setItem("authToken", token);

      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/cliente");
      }

      toast.success("Login bem-sucedido!");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      if (error.response && error.response.status === 401) {
        toast.error("Credenciais inválidas.");
      } else if (error.response && error.response.status === 404) {
        toast.error("Usuário não encontrado.");
      } else {
        toast.error("Erro ao realizar login.");
      }
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <Container>
      <LogoContainer>
        <img src={logo} alt="Logo" style={{ maxWidth: "100%", maxHeight: "80%" }} />
      </LogoContainer>

      <FormContainer>
        <Form onSubmit={handleLogin}>
          <h1>Login</h1>
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
          <Button type="submit">Login</Button>
          <Button type="button" onClick={handleRegisterRedirect}>
            Registro
          </Button>
        </Form>
      </FormContainer>
      <ToastContainer />
    </Container>
  );
};

export default HomePage;
