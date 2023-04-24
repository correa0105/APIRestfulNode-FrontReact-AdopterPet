import styled from 'styled-components';

export const ContainerMyPets = styled.div`
    button {
        margin-top: 1.5rem;
    }

    p {
        font-size: 1.5rem;
        margin-top: 1.5rem;
    }

    section {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        margin-top: 1.5rem;
        gap: .5rem;

        div {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            border: 1px solid #eee;
            padding: 1rem;

            span {
                font-size: 2rem;
                font-weight: 500;
                display: flex;
                gap: 1rem;
                align-items: center;

                a {
                    font-size: 1.3rem;
                    outline: none;
                    cursor: pointer;
                    padding: .8rem 1rem;
                    border: 0;
                    background-color: #bd8608;
                    border-radius: .5rem;
                    color: #fff;

                    :hover {
                        background-color: #dea931;
                    }
                }

                button {
                    margin-top: 0;
                    font-size: 1.3rem;
                }

                button:nth-child(3n) {
                    margin-top: 0;
                    font-size: 1.3rem;
                    background-color: #f2908d;

                    :hover {
                        background-color: #fa6864;
                    }
                }

                p {
                    color: var(--azul);
                }
            }
        }
    }
`;
