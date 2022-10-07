import {LoginUser} from 'src/models/AppModel';
import {ActionType} from '../root.reducer';
import {AUTH_UPDATE_PROFILE} from './actionTypes';

export const updateProfile = (profile: LoginUser): ActionType => {
  return {
    type: AUTH_UPDATE_PROFILE,
    payload: {
      profile,
    },
  };
};
