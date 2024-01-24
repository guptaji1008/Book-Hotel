import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IUserState {
    user: any;
    isAuth: boolean;
}

const initialState: IUserState = {
    user: null,
    isAuth: false
}

export const userSlice = createSlice({
    initialState,
    name: "user",
    reducers: {
        setUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload
        },
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        }
    }
});

export const { setUser, setIsAuth } = userSlice.actions;
export default userSlice.reducer;