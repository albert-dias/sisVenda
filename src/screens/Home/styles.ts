import { Platform } from 'react-native';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.background};
`;

export const ContentTop = styled.View`
  background: ${({ theme }) => theme.colors.primary};
  height: ${RFPercentage(35)}px;
  padding: ${Platform.OS === 'ios' ? getStatusBarHeight() + RFValue(16) : RFValue(40)}px ${RFValue(16)}px ${RFValue(16)}px;
`;

export const ContentHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Photo = styled.Image`
  background: ${({ theme }) => theme.colors.place};
  width: ${RFValue(40)}px;
  height: ${RFValue(40)}px;
  border-radius: 5px;
  margin-right: ${RFValue(16)}px;
`;

export const Greating = styled.View`
`;

export const GreatingText = styled.Text`
  margin-right: ${RFValue(4)}px;
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
`;

export const UserName = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.shape};
`;

export const SignOutButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: 4px;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.shape};
`;

export const Content = styled.View`
  height: ${RFPercentage(75)}px;
  padding: ${RFValue(16)}px 0px 0px;
  `;

export const ContentPadding = styled.View`
  padding: 0px ${RFValue(16)}px;  
`;

export const ContentList = styled.ScrollView`
  padding-left: ${RFValue(16)}px;
  padding-right: ${RFValue(16)}px;
  margin-top: ${RFValue(16)}px;
  `;

export const ContentModal = styled.View`
    background-color: rgba(0,0,0,0.5);
    flex: 1;
    justify-content: flex-end;
    align-items: center;
`;

export const ViewModal = styled.View`
    width: 100%;
    height: ${RFPercentage(40)}px;
    background-color: white;
    padding: 16px;
    align-items: center;
    padding-bottom: ${getBottomSpace() + RFValue(8)}px;
`;


export const CloseButton = styled.TouchableOpacity`
    padding: ${RFValue(8)}px;
    margin-bottom: ${RFValue(16)}px;
`;

export const ViewButton = styled.View`
    width: ${RFValue(50)}px;
    height: ${RFValue(4)}px;
    border-radius: 2px;
    background: ${({ theme }) => theme.colors.place} ;
`;

export const ContentInfos = styled.View`
  flex: 1;
  width: 100%;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const Title = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color:${({ theme }) => theme.colors.primary};
  margin-bottom: ${RFValue(16)}px;
`;

export const Subtitle = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color:${({ theme }) => theme.colors.primary};
  text-align: center;
`;

export const ContentLoading = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;
