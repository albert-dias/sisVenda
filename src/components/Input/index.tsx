import React, { useCallback, useEffect, useState } from 'react';
import { TextInputProps } from 'react-native';
import theme from '../../global/styles/theme';

import { Container, Label, Content, InputText, ButtonEye, Icon } from './styles';

interface Props extends TextInputProps {
  filled: boolean;
  pass?: boolean;
  visible?: boolean;
  setVisible?: (visible: boolean) => void;
  label?: string;
}

export function Input({ filled, placeholder, pass, visible, setVisible, label, ...rest }: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(filled);
  }, [filled]);

  useEffect(() => {
    setIsFilled(filled)
  }, [filled])
  return (
    <Container >
      {label && <Label>{label}</Label>}
      <Content filled={isFilled} focus={isFocused}>
        <InputText
          filled={isFilled}
          focus={isFocused}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          {...rest}
          placeholderTextColor={theme.colors.place}
        />
        {pass &&
          <ButtonEye onPress={() => setVisible(!visible)}>
            <Icon name={visible ? "eye-slash" : "eye"} />
          </ButtonEye>
        }
      </Content>
    </Container>
  );
}
