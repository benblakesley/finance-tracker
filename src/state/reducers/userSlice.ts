import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface UserState
{
    id: string | undefined
}

const initialState: UserState = 
{
    id: undefined
}

const userSlice = createSlice({
    name: 'slice',
    initialState: initialState,
    reducers: {
        setUserId: (state: UserState, action: PayloadAction<string | undefined>) =>
        {
            state.id = action.payload;
        }
    }
})

export const {setUserId} = userSlice.actions;

export const userReducer =  userSlice.reducer;

