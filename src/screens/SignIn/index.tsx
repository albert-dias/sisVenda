import React, { useCallback, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  TopContent,
  Title,
  Subtitle,
  ContentForm
} from './styles';

import Logo from '../../assets/logo.svg'
export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const { signIn, loading } = useAuth();

  const handleSignIn = useCallback(async () => {
    if (email === "" || password === "") {
      return Alert.alert("Ops!", "Preencha todos os campos para fazer o login!")
    }

    try {
      await signIn({ email, password })
    } catch (err) {
      console.log(err);
    }
  }, [email, password])

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : RFValue(45)}
      behavior="position"
      enabled
    >
      <Container>
        <TopContent>
          <Logo />
          <Title>Sistema de vendas</Title>
          <Subtitle>Entregando os melhores produtos em qualquer lugar!</Subtitle>
        </TopContent>
        <ContentForm>
          <Input
            label='E-mail'
            placeholder="E-mail"
            filled={email !== ""}
            keyboardType="email-address"
            onChangeText={setEmail}
            value={email}
            autoCapitalize="none"
          />
          <Input
            label='Senha'
            placeholder="Senha"
            filled={password !== ""}
            keyboardType="email-address"
            onChangeText={setPassword}
            value={password}
            autoCapitalize="none"
            pass
            secureTextEntry={!visible}
            visible={visible}
            setVisible={setVisible}
          />
          <Button title='ENTRAR' loading={loading} onPress={handleSignIn} />
        </ContentForm>

      </Container>
    </KeyboardAvoidingView>
  );
}