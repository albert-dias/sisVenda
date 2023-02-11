import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import {
  Container,
  TopContent,
  Logo,
  Title,
  Subtitle,
  ContentForm
} from './styles';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [visible, setVisible] = useState(false);

  return (
    <Container>
      <TopContent>
        <Logo></Logo>
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
          filled={pass !== ""}
          keyboardType="email-address"
          onChangeText={setPass}
          value={pass}
          autoCapitalize="none"
          pass
          secureTextEntry={!visible}
          visible={visible}
          setVisible={setVisible}
        />
        <Button title='ENTRAR' />
      </ContentForm>

    </Container>
  );
}