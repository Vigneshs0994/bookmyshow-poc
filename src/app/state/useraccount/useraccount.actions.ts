import { createAction, props } from "@ngrx/store";

//export const getUsername = createAction('[Login Component] Username',props<{ username: string }>());
//export const getUsername = createAction('[Login Component] Get Username',props<{ username: string | null }>());
//
//export const getUsername = createAction('[Login Component] Username');

export const getUsername = createAction(
    '[Login Component] Username',
    props<{ username: string }>()
  );