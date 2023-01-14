import { createAsyncThunk } from "@reduxjs/toolkit";
import { Board } from "../../ts";

import customApi from "../../utils/axios";
import { AppDispatch, RootState } from "../../store";
import { logoutUser } from "../user/userSlice";

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
      thunkApi.dispatch(logoutUser())
      return thunkApi.rejectWithValue(data.msg);
    }
    return thunkApi.rejectWithValue(data.msg);
  }
});

export const createBoard = createAsyncThunk<
  Board,
  { name: string |null },
  {
    state: RootState;
    dispatch: AppDispatch;
    rejectValue: string;
  }
>("board/createBoard", async (name, thunkApi) => {
  try {
    const { data } = await customApi.post(
      "/board",
       name,
      {
        headers: {
          authorization: `Bearer ${thunkApi.getState().user.user?.token}`,
        },
      }
    );

      const {board}=data;
      return board;

  } catch (error) {
    console.log(error);
    const {
      response: { data, status },
    }: any = error;
    if (status === 401) {
      thunkApi.dispatch(logoutUser())
      return thunkApi.rejectWithValue(data.msg);
    }
    return thunkApi.rejectWithValue(data.msg);
  }
});

//todo:updateBoard

 export const updateBoard=createAsyncThunk<  Board,
 { name: string | null },
 {
   state: RootState;
   dispatch: AppDispatch;
   rejectValue: string;
 }>('board/updateBoard',async (name,thunkApi)=>{
    
  const { boardId }=thunkApi.getState().board


  try { 
    const {data}=await customApi.patch(`/board/${boardId}`,name,{
      headers:{
        authorization:`Bearer ${thunkApi.getState().user.user?.token}`
      }
    })

    
    const {board}=data;
    return board;

  } catch (error) {
    console.log(error);
    return thunkApi.rejectWithValue('Error')
  }



})
 




//todo:deleteBoard

