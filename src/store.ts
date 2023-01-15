import { configureStore } from "@reduxjs/toolkit";

import { userSlice } from "./features/user/userSlice";
import { taskSlice } from "./features/tasks/taskSlice";
import { boardSlice } from "./features/boards/boardSlice";

 const store =configureStore({
    reducer:{
        user:userSlice.reducer,
        board:boardSlice.reducer,
        task:taskSlice.reducer,
    }
})


export type RootState=ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;