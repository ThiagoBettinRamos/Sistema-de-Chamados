import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* Reset Global */
  body, html {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  body {
    font-family: "Arial", sans-serif;
    background-color: #1e1e1e; /* Cor de fundo escuro */
    color: #f5f5f5; /* Cor do texto */
  }
`;

export default GlobalStyle;
