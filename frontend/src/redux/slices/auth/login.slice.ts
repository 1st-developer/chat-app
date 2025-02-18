import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ILoginBody, ILoginResponse } from "../../../types/login";
import axios, {AxiosError} from "axios"
import { BASE_API_URL, DAFAULT_ERROR_MESSAGE } from "../../../constants";

const DAFAULT_USER_DATA = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")!) : {}

const initialState = {
    loading: false,
    data: (DAFAULT_USER_DATA as ILoginResponse) || ({} as ILoginResponse),
    error: ""
}

export const loginFn = createAsyncThunk("auth/login", async (data : ILoginBody, {rejectWithValue}) => {
    try {
        
        const res = await axios.post(`${BASE_API_URL}/users/login`, data);
        
        return res.data
        
    } catch (error) {
        if(error instanceof AxiosError ) {
            return rejectWithValue(error.response?.data.Message || DAFAULT_ERROR_MESSAGE);
        }
        return rejectWithValue(DAFAULT_ERROR_MESSAGE);
    }

});

export const loginSlice = createSlice({
    name: "login slice",
    initialState,
    reducers: {
        logout: (state) => {
            state.data = {} as ILoginResponse;
            state.error = "";
            state.loading = false;

            // removing data from the storage
            localStorage.removeItem("userData");
            localStorage.removeItem("src");
        }
    },
    extraReducers(builder) {
        builder.addCase(loginFn.pending, (state) => {
            state.loading = true;
            state.error = "";
            state.data = {} as ILoginResponse;
        });
        builder.addCase(loginFn.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
            state.data = action.payload;
        });
        builder.addCase(loginFn.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.data = {} as ILoginResponse;
        });
    }
});


export const {logout} = loginSlice.actions;