import styled from 'styled-components';

export const Form = styled.form`
    margin-top: 1.5rem;

    button {
        margin-top: 25px;
        width: 100%;
    }
`;

export const InputColor = styled.label`
    display: flex;
    margin-top: 20px;
    cursor: pointer;

    span {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 9rem;
        font-size: 1.3rem;
        background-color: var(--azul);
        color: #fff;
    }

    select {
        padding: 6px;
        height: 33px;
        border: none;
        flex-grow: 1;
        background-color: #eee;
        outline: none;
        font-size: 1.3rem;
    }
`;

export const ImageContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 1.5rem;
    justify-content: center;

    img {
        margin-top: 2rem;
        width: 20rem;
    }
`;

export const ContainerDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 1.5rem;

    ul {
        display: flex;
        flex-direction: column;
        gap: .5rem;
        margin-bottom: 1.5rem;
        width: 100%;
        background-color: #d8ffcc;
        padding: 2rem;
        border-radius: .8rem;
    }

    ul li {
        font-size: 1.5rem;
    }

    p {
        font-size: 1.5rem;

        a {
            font-weight: 500;
        }
    }
`;
