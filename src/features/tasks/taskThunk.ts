import { createAsyncThunk } from '@reduxjs/toolkit';

import customApi from '../../utils/axios';
import { TaskElement } from '../../ts/types';
import { RootState, AppDispatch } from '../../store';
import { logoutUser } from '../user/userSlice';


//todo:get all tasks
export const  getAllTasks=createAsyncThunk<TaskElement[],{id:any},{
    state: RootState;
    dispatch: AppDispatch;
    rejectValue: string;
  }>('task/getAllTasks',async({id},thunkApi)=>{

    try {
       const {data}=await customApi.get(`/board/task/${id}`,{
        headers:{
            authorization:`Bearer ${thunkApi.getState().user.user?.token}`
        }
       })
       const {tasks}=data
       
       return tasks;
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