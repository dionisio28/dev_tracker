import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { debounce } from 'lodash';

import { User } from '../redux/types/userTypes';
import SearchInput from '../components/common/SearchInput';
import { useAppDispatch } from '../hooks/hooks/useAppDispatch';
import { useAppSelector } from '../hooks/hooks/useAppSelector';
import UserCard from '../components/user/UserCard';
import { fetchUsers, resetUsers } from '../redux/slices/userSlice';
import Message from '../components/common/Message';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../styles/colors'

type SearchScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SearchScreen'
>;

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useAppDispatch();
  const { users, status, error } = useAppSelector((state) => state.user);
  const navigation = useNavigation<SearchScreenNavigationProp>();

  // Debounce fora do useEffect para evitar recriações
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query.trim() !== '') {
        dispatch(fetchUsers(query));
      }
    }, 400),
    [dispatch]
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchQuery, debouncedSearch]);

  useEffect(() => {
    if (searchQuery === '') {
      dispatch(resetUsers());
    }
  }, [searchQuery, dispatch]);

  const keyExtractor = useCallback((item: User) => item.id.toString(), []);

  const navigateToUserDetails = useCallback(
    (user: User) => {
      navigation.navigate('UserDetails', { user });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: { item: User }) => (
      <UserCard user={item} onPress={navigateToUserDetails} />
    ),
    [navigateToUserDetails]
  );

  return (
    <Container>
      <SearchInput
        placeholder="Buscar usuários do github..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {status === 'loading' && (
        <ActivityIndicator size="large" color={Colors.info} />
      )}
      {error && <Message type="error" message={error} />}
      {status === 'idle' && (
        <InstructionsText>
          Digite o nome de um usuário do GitHub para ver seus detalhes e
          repositórios. Você também pode explorar seus seguidores e projetos!
        </InstructionsText>
      )}
      {status === 'succeeded' && (
        <FlatList
          data={users}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListEmptyComponent={
            users.length === 0 ? (
              <Message type="info" message="Nenhum resultado encontrado." />
            ) : null
          }
        />
      )}
    </Container>
  );
};

export default SearchScreen;

export const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${Colors.white};
`;

const InstructionsText = styled.Text`
  font-size: 14px;
  color: ${Colors.lightGray};
  text-align: center;
  margin-top: 10px;
`;
