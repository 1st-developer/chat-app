import { BASE_API_URL, DEFAULT_ERROR_MESSAGE } from '@/constants';
import {IListMessagesResponse } from '@/types/message';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

const initialState = {
    loading: false,
    data: {} as IListMessagesResponse,
    error: ''
};

export const getAllMessageFn = createAsyncThunk('message/list', async (token: string, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${BASE_API_URL}/message/list`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return res.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(
                    error.response?.data.message || DEFAULT_ERROR_MESSAGE
                );
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
        builder.addCase(getAllMessageFn.pending, (state) => {
            state.loading = true;
            state.data = {} as IListMessagesResponse;
            state.error = '';
        });

        builder.addCase(getAllMessageFn.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload as IListMessagesResponse;
            state.error = '';
        });

        builder.addCase(getAllMessageFn.rejected, (state, action) => {
            state.loading = false;
            state.data = {} as IListMessagesResponse;
            state.error = String(action.payload);
        });
    }
});
