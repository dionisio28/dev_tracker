import React from 'react';
import styled from 'styled-components/native';

interface AvatarProps {
  avatarUrl: string;
}

const Avatar = ({avatarUrl}: AvatarProps) => {
  return <UserAvatarImage source={{uri: avatarUrl}} />;
};

const UserAvatarImage = styled.Image`
  width: 160px;
  height: 160px;
  border-radius: 100px;
  margin-bottom: 16px;
  align-self: center;
`;

export default Avatar;
