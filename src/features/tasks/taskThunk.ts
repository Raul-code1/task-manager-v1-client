import { createAsyncThunk } from '@reduxjs/toolkit';

import customApi from '../../utils/axios';
import { TaskElement } from '../../ts/types';
import { RootState, AppDispatch } from '../../store';
import { logoutUser } from '../user/userSlice';


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


export const createTask=createAsyncThunk< TaskElement,{title:string,status:string},{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
} >('task/createTask',async({title,status},thunkApi)=>{

  const { boardIdForTask }=thunkApi.getState().task

  try {
    const {data} = await customApi.post(`/board/task/${boardIdForTask}`,{title,status},{
      headers:{
        authorization:`Bearer ${thunkApi.getState().user.user?.token}`
      }
    })

    const { task } =data
    
    return task;
  } catch (error) {
    const {
      response: { data, status },
    }: any = error;
    if (status === 401) {
      thunkApi.dispatch(logoutUser())
      return thunkApi.rejectWithValue(data.msg);
    }
    return thunkApi.rejectWithValue('Something went wrong');
  }
})



export const editTask=createAsyncThunk< TaskElement,{title:string,status:string},{ state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;} >('task/editTask',async({title,status},thunkApi)=>{

    const{ boardIdForTask,taskId }=thunkApi.getState().task

  try {

    const {data}= await customApi.patch(`/board/task/${boardIdForTask}/${taskId}`,{title,status},{
      headers:{
        authorization:`Bearer ${thunkApi.getState().user.user?.token}`
      }
    })

    const {task}=data
    return task
  } catch (error) {
    const {
      response: { data, status },
    }: any = error;
    if (status === 401) {
      thunkApi.dispatch(logoutUser())
      return thunkApi.rejectWithValue(data.msg);
    }
    return thunkApi.rejectWithValue('Something went wrong');
    
  }
})


export const deleteTask=createAsyncThunk< { msg: string },
{},
{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
} >('task/deleteTask',async(_,thunkApi)=>{

    const {  boardIdForTask,taskId }=thunkApi.getState().task

  try {
    
    const {data}=await customApi.delete(`/board/task/${boardIdForTask}/${taskId}`,{
      headers:{
        authorization:`Bearer ${thunkApi.getState().user.user?.token}`
      }
    })

    return data

  } catch (error) {
    const {
      response: { data, status },
    }: any = error;
    if (status === 401) {
      thunkApi.dispatch(logoutUser())
      return thunkApi.rejectWithValue(data.msg);
    }
    return thunkApi.rejectWithValue('Something went wrong');
  }
})
