import {User} from '../redux/types/userTypes';

export type RootStackParamList = {
  SearchScreen: undefined;
  UserDetails: {user: User};
};
