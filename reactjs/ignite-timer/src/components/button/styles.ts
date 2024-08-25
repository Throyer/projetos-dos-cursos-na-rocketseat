import styled from "styled-components";

export type Variant = 'primary' | 'secondary' | 'danger' | 'success'

interface ContainerProps {
  variant: Variant
}

export const Container = styled.button<ContainerProps>`
  width: 100px;
  height: 40px;

  border-radius: 4px;
  border: 0;
  margin: 8px;
  
  background: ${({ theme }) => theme["green-500"]};
  color: ${({ theme }) => theme.white};
`;