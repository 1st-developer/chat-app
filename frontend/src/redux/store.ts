import {configureStore} from "@reduxjs/toolkit"
import { loginSlice } from "./slices/auth/login.slice";
import { registerSlice } from "./slices/auth/register.slice";
import { listSlice } from "./slices/user.list.slice";

export const store = configureStore({
    reducer: {
        loginSlice: loginSlice.reducer,
        registerSlice: registerSlice.reducer,
        listSlice: listSlice.reducer,
    },
    devTools: true 
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch