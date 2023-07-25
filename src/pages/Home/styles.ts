import styled from "styled-components";

export const HomerContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`;





export const Button = styled.button`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  color: ${props => props.theme['gray-100']};

 
  &:disabled{
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const StartCountDownButton = styled(Button)`
  background: ${props => props.theme['green-500']};
  color: ${props => props.theme['gray-100']};

  &:not(:disabled):hover{
    background: ${props => props.theme['green-700']};
  }
`
export const StoptCountDownButton = styled(Button)`
   background: ${props => props.theme['red-500']};
    
      &:not(:disabled):hover{
        background: ${props => props.theme['red-700']};
  }
`