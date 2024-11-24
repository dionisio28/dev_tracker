import React from 'react';
import styled from 'styled-components/native';
import { User } from '../../redux/types/userTypes';

interface UserCardProps {
  user: User;
  onPress: (user: User) => void;
}

const UserCard: React.FC<UserCardProps> = React.memo(({ user, onPress }) => {
  return (
    <TouchableCard onPress={() => onPress(user)}>
      <Avatar source={{ uri: user.avatar_url }} />
      <Details>
        <Username>{user.login}</Username>
      </Details>
    </TouchableCard>
  );
}, areEqual);

function areEqual(prevProps: UserCardProps, nextProps: UserCardProps) {
  return prevProps.user.id === nextProps.user.id;
}

export default UserCard;

// Styled Components
const TouchableCard = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  border-bottom-width: 1px;
  border-color: #ddd;
  background-color: #fff;
`;

const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 30px;
  margin-right: 16px;
`;

const Details = styled.View`
  flex: 1;
`;

const Username = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const Info = styled.Text`
  font-size: 14px;
  color: #666;
`;
