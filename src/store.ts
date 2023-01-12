import { configureStore } from "@reduxjs/toolkit";
import { boardSlice } from "./features/boards/boardSlice";

import { userSlice } from "./features/user/userSlice";

 const store =configureStore({
    reducer:{
        user:userSlice.reducer,
        board:boardSlice.reducer
    }
})


export type RootState=ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;