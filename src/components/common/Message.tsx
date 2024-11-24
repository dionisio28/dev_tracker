import React from 'react';
import styled from 'styled-components/native';
import { Colors } from '../../styles/colors';

interface MessageProps {
  type: 'error' | 'warning' | 'info';
  message: string;
}

const Message: React.FC<MessageProps> = React.memo(({type, message}) => {
  return <StyledText type={type}>{message}</StyledText>;
});

export default Message;

const StyledText = styled.Text<{type: 'error' | 'warning' | 'info'}>`
  font-size: 16px;
  text-align: center;
  color: ${props => getColor(props.type)};
  margin-top: 16px;
`;

const getColor = (type: 'error' | 'warning' | 'info') => {
  switch (type) {
    case 'error':
      return 'red';
    case 'warning':
      return Colors.warning;
    case 'info':
      return Colors.info;
    default:
      return Colors.black;
  }
};
