import styled from 'styled-components';

const Button = styled.button`
    width: 100%;
    border: none;
    border-radius: 3px;
    padding: 8px;
    color: white;
    font-weight: bold;
    letter-spacing: 2px;
    background-color: ${({ theme }) => theme.colors.secondary};
    &:disabled{
        background-color: gray;
    }
`;

export default Button;