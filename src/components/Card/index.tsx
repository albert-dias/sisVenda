import React, { useMemo } from 'react';

import {
  Container,
  Title,
  Valor,
  Month,
} from './styles';

interface CardProps {
  amout: number;
  month: string
}

export function Card({ amout, month }: CardProps) {
  const total = useMemo(() => {
    if (amout === undefined) {
      return 0
    } else {
      return amout.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
    }
  }, [amout])
  return (
    <Container
      style={{
        shadowColor: '#1e1e1e',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      <Title>Total vendido em <Month>{month}</Month></Title>
      <Valor>{total}</Valor>
      <Month></Month>

    </Container>
  );
}