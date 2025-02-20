import { BASE_API_URL, DEFAULT_ERROR_MESSAGE } from '@/constants';
import { ICreateMessageBody } from '@/types/message';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

const initialState = {
    loading: false,
    data: {} as any,
    error: ''
};

export const createMessageFn = createAsyncThunk(
    'message/create',
    async (data: ICreateMessageBody, { rejectWithValue, getState }) => {
        const stateData: any = getState();
        const { token } = stateData?.loginSlice?.data;

        try {
            const res = await axios.post(`${BASE_API_URL}/message/create`, data, {
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

export const createMessageSlice = createSlice({
    name: 'create message',
    initialState,
    reducers: {
        resetcreateMessageFn: (state) => {
            state.loading = false;
            state.data = {} as any;
            state.error = '';
        }
    },
    extraReducers(builder) {
        builder.addCase(createMessageFn.pending, (state) => {
            state.loading = true;
            state.data = {} as any;
            state.error = '';
        });

        builder.addCase(createMessageFn.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload as any;
            state.error = '';
        });

        builder.addCase(createMessageFn.rejected, (state, action) => {
            state.loading = false;
            state.data = {} as any;
            state.error = String(action.payload);
        });
    }
});

export const { resetcreateMessageFn } = createMessageSlice.actions;
