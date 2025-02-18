import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios"
import { IListUsersResponse } from "@/types/user.list";
import { BASE_API_URL, DAFAULT_ERROR_MESSAGE } from "@/constants";


const initialState = {
    loading: false,
    data: {} as IListUsersResponse,
    error: ""
}

export const userListFn = createAsyncThunk("users/list", async (_, {rejectWithValue}) => {
    try {
        
        const res = await axios.get(`${BASE_API_URL}/users/list`);
        
        return res.data
        
    } catch (error) {
        if(error instanceof AxiosError ) {
            return rejectWithValue(error.response?.data.Message || DAFAULT_ERROR_MESSAGE);
        }
        return rejectWithValue(DAFAULT_ERROR_MESSAGE);
    }

});

export const listSlice = createSlice({
    name: "list slice",
    initialState,
    reducers: {
        logout: (state) => {
            state.data = {} as IListUsersResponse;
            state.error = "";
            state.loading = false;
        }
    },
    extraReducers(builder) {
        builder.addCase(userListFn.pending, (state) => {
            state.loading = true;
            state.error = "";
            state.data = {} as IListUsersResponse;
        });
        builder.addCase(userListFn.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
            state.data = action.payload;
        });
        builder.addCase(userListFn.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.data = {} as IListUsersResponse;
        });
    }
});