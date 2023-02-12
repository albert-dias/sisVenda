import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, Keyboard, KeyboardAvoidingView, Modal, Platform, TouchableWithoutFeedback } from 'react-native';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import theme from '../../global/styles/theme';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  ContentTop,
  ContentHeader,
  UserInfo,
  Photo,
  Greating,
  GreatingText,
  UserName,
  SignOutButton,
  Icon,
  Content,
  ContentPadding,
  ContentList,
  ContentModal,
  ViewModal,
  CloseButton,
  ViewButton,
  ContentInfos,
  Title,
  Subtitle,
  Row,
  ContentLoading,
} from './styles';

import * as Location from 'expo-location';
import api from '../../services/api';
import { RFValue } from 'react-native-responsive-fontsize';
import { DataSalesProps, LocationProps } from '../../@types/interfaces';
import { CardTransaction } from '../../components/CardTransaction';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [valor, setValor] = useState('');
  const [loading, setLoading] = useState(true);
  const { user, signOut } = useAuth();

  const [location, setLocation] = useState<LocationProps>(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [mySales, setMySales] = useState<DataSalesProps>({} as DataSalesProps);
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const lastDay = new Date(year, month, 0).getDate()

  async function loadData() {
    api.get("/sales", {
      headers: {
        board: user.board_unit.board_id,
        salesman: user.name,
        unit: user.board_unit.unit_id,
        start_date: `${year}-${month}-01`,
        end_date: `${year}-${month}-${lastDay}`
      }
    }).then(res => {
      console.log(res.data)
      setMySales(res.data)
    }).finally(() => setLoading(false))
  }

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
    loadData()
  }, []);

  const sales = useMemo(() => {
    if (!loading && mySales?.sales.length > 0) {
      return mySales?.sales.sort(function compare(a, b) {
        if (a.date_of_sale < b.date_of_sale) return -1;
        if (a.date_of_sale > b.date_of_sale) return 1;
        if (a.date_of_sale === b.date_of_sale) {
          if (a.hour_of_sale < b.hour_of_sale) return -1;
          if (a.hour_of_sale > b.hour_of_sale) return 1;
        };
        return 0;
      })
    } else {
      return []
    }
  }, [mySales, loading])

  const handleSale = useCallback(async () => {
    Keyboard.dismiss()
    try {
      await api.post("/insert-sale", {
        latitude: `${location.coords.latitude}`,
        longitude: `${location.coords.longitude}`,
        sale_value: Number(valor.replace(',', '.'))
      }).then(async (res) => {
        if (res.status === 200) {
          await loadData()
          Alert.alert("Parabéns", "Venda salva com sucesso!")
          setModalVisible(false)
        }
      }).finally(() => {
        setValor('')
      })
    } catch (err) {
      console.error(err.response.data.message);
    }
  }, [location, valor])

  return (
    <Container>
      <ContentTop>
        <ContentHeader>
          <UserInfo>
            <Photo source={{ uri: (`https://ui-avatars.com/api/?background=FF872C&color=fff&name=${user?.name}`) }} />
            <Greating>
              <GreatingText>
                Olá,
              </GreatingText>
              <UserName>
                {user.name}
              </UserName>
            </Greating>
          </UserInfo>
          <SignOutButton onPress={signOut}>
            <Icon name="log-out" />
          </SignOutButton>
        </ContentHeader>
      </ContentTop>
      <Content>
        <ContentPadding>

          <Card amout={mySales.sales_amount} month={format(new Date(), "MMMM", { locale: ptBR })} />
          <Button title="Nova venda" onPress={() => setModalVisible(true)} />
        </ContentPadding>
        {!loading && <ContentList>
          {sales.length > 0 ? sales.map((sale) => (
            <CardTransaction
              key={sale.sale_id}
              amout={sale.sale_value}
              roaming={sale.roaming === 1 && true}
              date={sale.date_of_sale}
            />
          )) :
            <Subtitle>Ainda não há vendas nesse mês</Subtitle>
          }
        </ContentList>}
        {loading &&
          <ContentLoading>
            <ActivityIndicator size="large" color={theme.colors.secundary} />
          </ContentLoading>
        }
      </Content>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ContentModal >
            <KeyboardAvoidingView
              keyboardVerticalOffset={Platform.OS === "ios" ? 0 : RFValue(44)}
              behavior="position"
              enabled
            >
              <ViewModal style={{
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                alignItems: 'center',
                justifyContent: "flex-start"
              }}>
                <CloseButton onPress={() => setModalVisible(false)}>
                  <ViewButton />
                </CloseButton>

                <ContentInfos>
                  <Title>Nova venda</Title>
                  <Input
                    label='Valor'
                    placeholder="Valor"
                    filled={valor !== ""}
                    keyboardType="numeric"
                    onChangeText={setValor}
                    value={valor}
                    autoCapitalize="none"
                  />

                  <Row>
                    <Button title='Cancel' w="48%" color={theme.colors.attention} onPress={() => setModalVisible(false)} />
                    <Button title='Confirmar' w="48%" onPress={handleSale} />
                  </Row>
                </ContentInfos>

              </ViewModal>
            </KeyboardAvoidingView>

          </ContentModal>
        </TouchableWithoutFeedback>
      </Modal>
    </Container>
  );
}