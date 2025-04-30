import { BASE_API_URL, DEFAULT_ERROR_MESSAGE } from "@/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const initialState = {
    loading: false,
    data: {},
    error: ""
}

export const getConversationMessagesFn = createAsyncThunk('message/conversation', async ({ token, otherUserId }: { token: string, otherUserId: number }, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${BASE_API_URL}/message/conversation/${otherUserId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return res.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data.message || DEFAULT_ERROR_MESSAGE);
            }
            return rejectWithValue(DEFAULT_ERROR_MESSAGE);
        }
    }
);

export const getAllMessageSlice = createSlice({
    name: 'get all messages',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getConversationMessagesFn.pending, (state) => {
            state.loading = true;
            state.data = {};
            state.error = '';
        });

        builder.addCase(getConversationMessagesFn.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = '';
        });

        builder.addCase(getConversationMessagesFn.rejected, (state, action) => {
            state.loading = false;
            state.data = {};
            state.error = String(action.payload);
        });
    }
});

