import { format } from 'date-fns';
import React, { useMemo } from 'react';

import {
  Container,
  Title,
  Valor,
  Roaming,
  Row,
  Icon,
} from './styles';

interface CardTransacionProps {
  amout: number;
  date: string;
  roaming: boolean;
}

export function CardTransaction({ amout, date, roaming }: CardTransacionProps) {
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
      <Row>

        <Roaming roaming={roaming}>
          <Icon name="circle" roaming={roaming} />
          {roaming ? " Venda in Roaming" : " Venda local"}
        </Roaming>
        <Title>{format(new Date(date), "dd/MM/yyyy")}</Title>
      </Row>
      <Valor>{total}</Valor>

    </Container>
  );
}