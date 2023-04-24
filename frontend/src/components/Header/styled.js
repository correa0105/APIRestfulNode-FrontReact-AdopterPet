import styled from 'styled-components';

export const HeaderContainer = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 3rem;
    background-color: var(--azul);
    color: #fff;
    
    h1 {
        display: flex;
        align-items: center;
        gap: .5rem;
        font-weight: 500;
        font-size: 2rem;
    }

    ul {
        display: flex;
        align-items: center;
    }

    li {
        display: flex;

        a {
            padding: 2rem 2rem;
            color: #fff;
            transition: all 200ms ease-in;
            font-size: 1.7rem;
            font-weight: 500;
        }

        a:hover {
            background-color: var(--azul-claro);
        }

    }
`;
