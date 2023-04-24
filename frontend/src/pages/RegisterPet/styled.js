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
        width: 10rem;
    }
`;
