import styled from 'styled-components';

export const LabelContainer = styled.label`

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

    input {
        padding: 6px;
        height: 33px;
        border: none;
        flex-grow: 1;
        background-color: #eee;
        outline: none;
        font-size: 1.3rem;
    }
`;
