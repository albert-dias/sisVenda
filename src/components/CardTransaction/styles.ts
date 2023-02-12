import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';

interface Props {
  roaming: boolean;
}

export const Container = styled.View`
  height: ${RFValue(70)}px;
  width: 100%;
  margin-bottom: ${RFValue(16)}px;
  background: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  padding: ${RFValue(8)}px ${RFValue(16)}px;
  justify-content: space-between;
`;

export const Row = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Valor = styled.Text`
  font-size: ${RFValue(24)}px;
  text-align: right;
  color: ${({ theme }) => theme.colors.success};
`;

export const Roaming = styled.Text<Props>`
  font-size: ${RFValue(12)}px;
  color: ${({ theme, roaming }) => roaming ? theme.colors.primary : theme.colors.success};
`;

export const Icon = styled(FontAwesome) <Props>`
  color: ${({ theme, roaming }) => roaming ? theme.colors.secundary : theme.colors.success};
  font-size: ${RFValue(12)}px;
`;

