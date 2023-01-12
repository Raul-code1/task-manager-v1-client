import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { UserSliceState } from "../../ts/types";
import { registerUser, loginUser, updateUser } from "./userThunk";
import { toast } from "react-toastify";
import {
  addUserLocalStorage,
  getUserLocalStorage,
  deleteUserLocalStorage,
} from "../../utils/localStorageUser";

const initialState: UserSliceState = {
  isLoading: false,
  user: getUserLocalStorage(),
};

//*Testing user testing@gmail.com password: testing
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state, action: PayloadAction) => {
      deleteUserLocalStorage();
      state.user = null;
      toast("Login out");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
        addUserLocalStorage(payload);
        toast.success(`Welcome ${payload.name}`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
        addUserLocalStorage(payload);
        toast.success(`Welcome ${payload.name}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state,{payload}) => {
        state.isLoading = false;
        state.user=payload;
        toast.success('Updated successfully');
        addUserLocalStorage(payload);
      })
      .addCase(updateUser.rejected, (state,{payload}) => {
        state.isLoading = false;
        toast.error(payload);
      })
  },
});

export const { logoutUser } = userSlice.actions;
