import React from 'react';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';
import theme from '../../global/styles/theme';

import { Container, Title } from './styles';

interface Props extends TouchableOpacityProps{
  title: string;
  loading?: boolean;
  color?: string;
  textColor?:string;
  w?: string;
  mt?: number;
  mb?: number;
  mr?: number;
  ml?: number;
}

export function Button({title, loading, textColor, color, w, mt, mr, mb, ml,...rest}: Props){

  return(
    <Container {...rest} color={color} w={w} mt={mt} mr={mr} mb={mb} ml={ml}>
      {loading ?
      <ActivityIndicator size="small" color={ theme.colors.background} /> :
      <Title textColor={textColor}>{title}</Title>}
    </Container>
  );
}