import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import styled from 'styled-components/native';
import {useRoute} from '@react-navigation/native';
import {useAppDispatch} from '../hooks/hooks/useAppDispatch';
import {useAppSelector} from '../hooks/hooks/useAppSelector';
import {fetchSingleUser} from '../redux/slices/userSlice';
import {fetchRepos} from '../redux/slices/repoSlice';
import {User} from '../redux/types/userTypes';
import {Repository} from '../redux/types/repoTypes';
import Avatar from '../components/user/Avatar';
import Message from '../components/common/Message';
import UserDetails from '../components/user/UserDetails';
import RepoCard from '../components/repo/RepoCard';
import {Colors} from '../styles/colors';
import SortButton from '../components/common/SortButton';

const UserDetailsScreen: React.FC = () => {
  const route = useRoute();
  const dispatch = useAppDispatch();

  const [sortKey, setSortKey] = useState('stars-desc');

  const {user} = route.params as {user: User};

  const {
    selectedUser,
    status: userStatus,
    error: userError,
  } = useAppSelector(state => state.user);
  const {
    repos,
    status: repoStatus,
    error: repoError,
  } = useAppSelector(state => state.repo);

  useEffect(() => {
    if (user?.login) {
      Promise.all([
        dispatch(fetchSingleUser(user.login)),
        dispatch(fetchRepos(user.login)),
      ]);
    }
  }, [dispatch, user]);

  const loading = useMemo(
    () => userStatus === 'loading' || repoStatus === 'loading',
    [userStatus, repoStatus],
  );

  const sortedRepos = useMemo(() => {
    return [...repos].sort((a, b) => {
      switch (sortKey) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'stars-asc':
          return a.stargazers_count - b.stargazers_count;
        case 'stars-desc':
          return b.stargazers_count - a.stargazers_count;
        case 'updated':
          return (
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          );
        default:
          return 0;
      }
    });
  }, [repos, sortKey]);

  const keyExtractor = useCallback(
    (item: Repository) => item.id.toString(),
    [],
  );

  const renderItem = useCallback(
    ({item}: {item: Repository}) => (
      <RepoCard repo={item} />
    ),
    [],
  );

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color={Colors.info} />
      </LoadingContainer>
    );
  }

  return (
    <Scroll>
      <Container>
        {selectedUser && (
          <>
            <Avatar avatarUrl={selectedUser.avatar_url} />
            <UserDetails user={selectedUser} />
          </>
        )}

        <SortButton selectedSort={sortKey} onSortChange={setSortKey} />

        {repoStatus === 'succeeded' && (
          <FlatList
            data={sortedRepos}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            scrollEnabled={false}
            ListEmptyComponent={
              sortedRepos.length === 0 ? (
                <Message type="info" message="Nenhum repositório encontrado." />
              ) : null
            }
          />
        )}
      </Container>
    </Scroll>
  );
};

export default UserDetailsScreen;

const Scroll = styled.ScrollView`
  background-color: #ffffff;
`;

const Container = styled.View`
  flex: 1;

  padding: 16px;
  width: 100%;
  background-color: #ffffff;
`;

const LoadingContainer = styled(Container)`
  justify-content: center;
`;
