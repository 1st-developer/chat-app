import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios"
import { BASE_API_URL, DAFAULT_ERROR_MESSAGE } from "../../../constants";
import { IRegisterBody, IRegisterResponse } from "@/types/register";

const DAFAULT_USER_DATA = localStorage.getItem("registerData") ? JSON.parse(localStorage.getItem("registerData")!) : {}

const initialState = {
    loading: false,
    data: (DAFAULT_USER_DATA as IRegisterResponse) || ({} as IRegisterResponse),
    error: ""
}

export const registerFn = createAsyncThunk("auth/register", async (data : IRegisterBody, {rejectWithValue}) => {
    try {
        
        const res = await axios.post(`${BASE_API_URL}/users/register`, data);
        
        return res.data
        
    } catch (error) {
        if(error instanceof AxiosError ) {
            return rejectWithValue(error.response?.data.Message || DAFAULT_ERROR_MESSAGE);
        }
        return rejectWithValue(DAFAULT_ERROR_MESSAGE);
    }

});

export const registerSlice = createSlice({
    name: "register slice",
    initialState,
    reducers: {
        logout: (state) => {
            state.data = {} as IRegisterResponse;
            state.error = "";
            state.loading = false;

            // removing data from the storage
            localStorage.removeItem("registerData")
        }
    },
    extraReducers(builder) {
        builder.addCase(registerFn.pending, (state) => {
            state.loading = true;
            state.error = "";
            state.data = {} as IRegisterResponse;
        });
        builder.addCase(registerFn.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
            state.data = action.payload;
        });
        builder.addCase(registerFn.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.data = {} as IRegisterResponse;
        });
    }
});


export const {logout} = registerSlice.actions;