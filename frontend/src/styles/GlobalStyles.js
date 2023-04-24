import styled, { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`

    :root {
        --azul: #3db89c;
        --azul-claro: #39a399;
    }

    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: 'Inter';
    }

    html {
        font-size: 62.5%;
    }

    a {
       text-decoration: none; 
    }

    ul {
        list-style: none;
    }

    body {
        font-family: sans-serif;
        background-color: #bbb;
        min-height: 100vh;
        position: relative;
        padding-bottom: 7.5rem;
    }

`;

export const Container = styled.section`
    width: 80%;
    max-width: 900px;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 25px;
    padding: 23px;
    border-radius: 5px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.4)
`;
