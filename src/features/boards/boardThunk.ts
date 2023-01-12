import { createAsyncThunk } from "@reduxjs/toolkit";
import { Board } from "../../ts";

import customApi from "../../utils/axios";
import { AppDispatch, RootState } from "../../store";

//*All functions 
export const getAllBoard = createAsyncThunk<
  Board[],
  {},
  { state: RootState; dispatch: AppDispatch; rejectValue: string }
>("board/getAllBoard", async (_, thunkApi) => {
  try {
    const { data } = await customApi.get("/board", {
      headers: {
        authorization: `Bearer ${thunkApi.getState().user.user?.token}`,
      },
    });

    const { boards } = data;
    return boards;
  } catch (error) {
    const {
      response: { data, status },
    }: any = error;

    if (status === 401) {
      /* //TODO:MAKE LOGOUT DISPATCH */
      return thunkApi.rejectWithValue(data.msg);
    }
    return thunkApi.rejectWithValue(data.msg);
  }
});

//todo:getAllBoards

//todo:createBoard

//todo:deleteBoard

//todo:updateBoard
