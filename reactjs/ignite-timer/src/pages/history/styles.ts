import styled from "styled-components";

export const Container = styled.main`
  flex: 1;
  padding: 3.5rem;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme['gray-100']};
  }
`;

export const Content = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;
`;
