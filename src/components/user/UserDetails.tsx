import React from 'react';
import {TextProps} from 'react-native';
import styled from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {DetailedUser} from '../../redux/types/userTypes';
import {Colors} from '../../styles/colors';

interface UserDetailsProps {
  user: DetailedUser;
}

interface InfoProps extends TextProps {
  bold?: boolean;
  color?: string;
}

const UserDetails = ({user}: UserDetailsProps) => {
  return (
    <Container>
      <Username>{user.name || user.login}</Username>
      {user?.location && <Location>{user.location}</Location>}

      <Info>{user.bio || 'Perfil sem bio'}</Info>

      <MaterialIcons name="groups" size={24} color={Colors.lightGray} />

      <RowSocial>
        <RowFollow>
          <Info color={Colors.lightGray}>Seguidores: </Info>
          <Info bold>{user.followers}</Info>
        </RowFollow>

        <RowFollow>
          <Info color={Colors.lightGray}>Seguindo: </Info>
          <Info bold>{user.following}</Info>
        </RowFollow>
      </RowSocial>

      {user.email && <Info>E-mail: {user.email}</Info>}

      <Line />

      <Info>Repositórios Públicos: {user.public_repos}</Info>
    </Container>
  );
};

export default UserDetails;

const Container = styled.View`
  align-items: center;
  width: 100%;
`;
const Username = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 6px;
  color: ${Colors.black};
`;

const Location = styled.Text`
  font-size: 18px;
  margin-bottom: 16px;
  color: ${Colors.lightGray};
`;

const Info = styled.Text<InfoProps>`
  font-size: 16px;
  color: ${({color}) => color || Colors.lightBlack};
  margin-bottom: 4px;
  text-align: center;
  font-weight: ${({bold}) => (bold ? 'bold' : 'normal')};
`;

const RowSocial = styled.View`
  padding-vertical: 8px;
  width: 70%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const RowFollow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Line = styled.View`
  width: 100%;
  height: 1px;
  margin-vertical: 16px;
  background-color: ${Colors.opacityGray};
`;
