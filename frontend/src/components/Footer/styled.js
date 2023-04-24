import styled from 'styled-components';

export const FooterContainer = styled.nav`
    position: absolute;
    display: flex;
    bottom: 0;
    align-items: center;
    justify-content: space-around;
    background-color: var(--azul);
    width: 100%;
    height: 5rem;
    margin-top: 2rem;

    p {
        font-size: 1.5rem;
        color: #FFF;
    }

    h1 {
        display: flex;
        align-items: center;
        gap: .5rem;
        font-size: 1.5rem;
        color: var(--azul);
    }
`;
