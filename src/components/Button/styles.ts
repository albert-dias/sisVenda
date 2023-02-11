import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface Props {
  color?: string;
  textColor?: string;
  w?: string;
  mt?: number;
  mr?: number;
  mb?: number;
  ml?: number;
}

export const Container = styled(TouchableOpacity) <Props>`
  border-radius: 5px;
  margin-bottom: ${RFValue(16)}px;
  background-color: ${({ theme, color }) => color ? color : theme.colors.primary};
  align-items: center;
  justify-content: center;
  height: ${RFValue(40)}px;
  width: ${({ w }) => w ? w : "100%"};
  margin: ${({ mt }) => mt ? mt : 0}px ${({ mr }) => mr ? mr : 0}px ${({ mb }) => mb ? mb : 0}px ${({ ml }) => ml ? ml : 0}px;
`;

export const Title = styled.Text<Props>`
  color: ${({ theme, textColor }) => textColor ? textColor : theme.colors.background};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;
