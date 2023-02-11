import { RFValue } from 'react-native-responsive-fontsize';
import { FontAwesome5 } from '@expo/vector-icons'
import styled, { css } from 'styled-components/native';
import { TextInput } from 'react-native';

interface Props {
  filled: boolean;
  focus: boolean;
}

export const Container = styled.View`
  margin-bottom: ${RFValue(16)}px;
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.bold};
  margin-bottom: ${RFValue(4)}px;
  font-size: ${RFValue(16)}px;
`;

export const Content = styled.View<Props>`
  background-color: ${({ theme }) => theme.colors.shape};
  padding: ${RFValue(8)}px;
  border-radius: 5px;
  align-items: center;
  flex-direction: row;
  height: ${RFValue(40)}px;
  border: 1px solid ${({ theme }) => theme.colors.place};

  ${props => (props.focus) && css`
    border-color: ${({ theme }) => theme.colors.primary};
  `};
`;

export const InputText = styled(TextInput) <Props>`
  color: ${({ theme }) => theme.colors.primary};
  flex:1;
`;

export const ButtonEye = styled.TouchableOpacity``

export const Icon = styled(FontAwesome5)`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.primary};
`;