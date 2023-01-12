import { createAsyncThunk } from "@reduxjs/toolkit";

import customApi from "../../utils/axios";
import { AsyncThunkConfig, UserProfileForm, UserState } from "../../ts/types";
import { RootState, AppDispatch } from "../../store";
import { logoutUser } from "./userSlice";

/* //*User register */
export const registerUser = createAsyncThunk<
  UserState,
  UserState,
  {
    rejectValue: string;
  }
>("user/registerUser", async (user: UserState, thunkApi) => {
  const { name, email, password } = user;
  try {
    const { data } = await customApi.post("/auth/register", {
      name,
      email,
      password,
    });
    const { user: userRes } = data;
    return userRes;
  } catch (error) {
    const {
      response: { data },
    }: any = error;
    return thunkApi.rejectWithValue(data.msg);
  }
});

/* //*User login */
export const loginUser = createAsyncThunk<
  UserState,
  UserState,
  {
    rejectValue: string;
  }
>("user/loginUser", async (user, thunkApi) => {
  const { email, password } = user;

  try {
    const { data } = await customApi.post("auth/login", { email, password });
    const { user: userRes } = data;
    return userRes;
  } catch (error) {
    const {
      response: { data },
    }: any = error;
    return thunkApi.rejectWithValue(data.msg);
  }
});

/* //*Update user  */
export const updateUser = createAsyncThunk<
  UserState,
  {
    name:string,
    email:string,
    lastName:string,
  },
  {
    state: RootState;
    dispatch: AppDispatch;
    rejectValue: string;
  }
>("user/updateUser", async ({name,email,lastName}, thunkApi) => {
  try {

    const { data }=await customApi.patch('/auth/updateUser',{name,email,lastName},{
      headers:{
        authorization:`Bearer ${thunkApi.getState().user.user?.token}`
      }
    });

    const {user}=data;
    return user
  } catch (error) {
      const { response:{data,status} }:any=error

    if (status ===401) {
      thunkApi.dispatch(logoutUser());
      return thunkApi.rejectWithValue('Unauthorized')
    }

    return thunkApi.rejectWithValue(data.msg)
  }

});
