import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from '@/modules/store'
import { fetchCount } from '@/modules/counter/counterAPI'
import App from 'next/app';

export interface CounterState{
    value: number;
    status: 'idle' | 'loading' | 'failed'
}

const initialState: CounterState = {
    value: 0,
    status: 'idle'
}

export const incrementAsync = createAsyncThunk(
    'counter/fetchCount',
   async (amount:number) => {
       const response = await fetchCount(amount)
       return response.data;
   }
)

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) =>{ state.value += 1},
        decrement: (state) =>{ state.value -= 1},
        incrementByAmount: (state, action: PayloadAction<number>) =>{
            state.value += action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(incrementAsync.pending, (state) =>{
            state.status = 'loading'
        })
        .addCase(incrementAsync.fulfilled, (state,action) => {
            state.status = 'idle';
            state.value += action.payload
        })
    }
})
export const { increment, decrement } = counterSlice.actions
export const selectCount = (state: AppState) => state.value

export default counterSlice.reducer
