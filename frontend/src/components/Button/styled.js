import styled from 'styled-components';

export const ButtonStyle = styled.button`
    font-size: 1.5rem;
    text-align: center;
    outline: none;
    cursor: pointer;
    padding: .8rem 1rem;
    border: 0;
    background-color: var(--azul);
    border-radius: .5rem;
    color: #fff;

    :hover {
        background-color: var(--azul-claro);
    }
`;
