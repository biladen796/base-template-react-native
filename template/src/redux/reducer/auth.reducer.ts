import {LoginUser} from 'src/models/AppModel';
import {AUTH_UPDATE_PROFILE} from '../action/actionTypes';
import {ActionType} from '../root.reducer';

export type AuthReducerState = {
  profileData?: LoginUser;
};

const initState: AuthReducerState = {};

export const createAuthReducer = (
  state = initState,
  action: ActionType,
): AuthReducerState => {
  switch (action.type) {
    case AUTH_UPDATE_PROFILE: {
      return {
        ...state,
        profileData: action.payload?.profile as LoginUser,
      };
    }
    default:
      return {...state};
  }
};
