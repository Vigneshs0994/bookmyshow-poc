import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
 

export const selectUserAccountState = (state: AppState) => state.username;

export const selectUsername = createSelector(
    selectUserAccountState,
  (state)=> state.username
)