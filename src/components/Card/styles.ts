import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  height: ${RFValue(150)}px;
  width: 100%;
  margin-bottom: ${RFValue(16)}px;
  margin-top: -${RFValue(140)}px;
  background: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  padding: ${RFValue(16)}px;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.mediun};
  font-size: ${RFValue(16)}px;
`;

export const Valor = styled.Text`
  font-size: ${RFValue(36)}px;
  text-align: right;
  color: ${({ theme }) => theme.colors.success};
`;

export const Month = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.secundary};
`;

