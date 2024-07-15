import styled, { css } from "styled-components/native";

import FeatherIcon from "react-native-vector-icons/Feather";

import { ROBOTO_SLAB_REGULAR } from "../../utils/fonts";

interface ContainerProps {
  focused?: boolean;
  error?: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #232129;
  border-radius: 10px;
  margin-bottom: 8px;

  border-width: 2px;
  border-color: #232129;

  flex-direction: row;
  align-items: center;

  ${({ error }) =>
    error &&
    css`
      border-color: #c53030;
    `}

  ${({ focused }) =>
    focused &&
    css`
      border-color: #ff9000;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: "${ROBOTO_SLAB_REGULAR}";
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 10px;
`;
