import styled from 'styled-components';

export const Form = styled.form`
    button {
        margin-top: 25px;
        width: 100%;
    }

    p {
        font-size: 1.5rem;
        margin-top: 2rem;

        a {
            font-size: 1.5rem;
        }
    }
`;

export const ContainerPets = styled.div`
    p {
        font-size: 1.5rem;
        margin-top: 1.5rem;
    }

    section {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        margin-top: 1.5rem;
        gap: .5rem;

        .containerPet {
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
            }

            div {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: .5rem;
                background-color: #595959;
                border-radius: .8rem;
                padding: 1.2rem 5rem;

                span {
                    color: #eee;
                    font-size: 1.5rem;
                }

                a {
                    background-color: var(--azul);
                    padding: .5rem 2rem;
                    color: #fff;
                    border-radius: .5rem;
                    font-size: 1.3rem;
                    margin-top: .5rem;
                }
            }
        }
    }
`;
