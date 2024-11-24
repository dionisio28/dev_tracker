import React, {useCallback} from 'react';
import styled from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../styles/colors';

interface SearchInputProps {
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = React.memo(
  ({value, placeholder = 'Search...', onChangeText}) => {
    const handleClear = useCallback(() => {
      onChangeText('');
    }, [onChangeText]);

    return (
      <Container>
        <LeftIcon>
          <MaterialIcons name="person-search" size={28} color={Colors.lightGray} />
        </LeftIcon>

        <Input
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          autoCorrect={false}
        />

        {value.length > 0 && (
          <RightIcon onPress={handleClear}>
            <MaterialIcons name="clear" size={28} color={Colors.darkGray} />
          </RightIcon>
        )}
      </Container>
    );
  },
);

export default SearchInput;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0 10px;
  height: 40px;
  background-color: ${Colors.white};
  margin-bottom: 16px;
`;

const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
  padding: 0 10px;
`;

const RightIcon = styled.TouchableOpacity`
  padding: 5px;
`;

const LeftIcon = React.memo(styled.View`
  opacity: 0.6;
`);
