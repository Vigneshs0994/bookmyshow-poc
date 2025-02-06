import {createReducer, on} from '@ngrx/store'
import { getUsername } from './useraccount.actions'

export interface UserAccountState {
    username: string
  }
  
  export const initialUserAccountState: UserAccountState = {
    username: ''
  }
  
  /*export const userAccountReducer = createReducer(
    initialUserAccountState,
    on(getUsername, state=> ({...state, username: state.username+"" })));
   */
    export const userReducer = createReducer(
        initialUserAccountState,
        on(getUsername, (state, { username }) => ({
          ...state,
          username
        }))
      );