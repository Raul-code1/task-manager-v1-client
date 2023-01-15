import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { BoardsState } from "../../ts/types";
import { getAllBoard, createBoard, updateBoard,deleteBoard } from "./boardThunk";

const initialState: BoardsState = {
  isLoading: false,
  boards: [],
  activeBoard: '',
  isEditing: false,
  boardId: null,
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setActiveBoard: (
      state,
      { payload }: PayloadAction<{ name: string; id: string | null }>
    ) => {
      state.activeBoard = payload.name;
      state.boardId = payload.id;
    },
    setIsEditingToFalse: (state) => {
      state.isEditing = false;
    },
    setIsEditingToTrue: (state) => {
      state.isEditing = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBoard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBoard.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.boards = payload;
      })
      .addCase(getAllBoard.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(createBoard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBoard.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success(`${payload.name} created`);
      })
      .addCase(createBoard.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateBoard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBoard.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success(`${payload.name} updated`);
      })
      .addCase(updateBoard.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deleteBoard.pending,(state)=>{
        state.isLoading = true;
      })
      .addCase(deleteBoard.fulfilled,(state,{payload})=>{
        const {msg}=payload
        state.isLoading = false;
        toast.success(msg);
      })
      .addCase(deleteBoard.rejected,(state,{payload})=>{
        state.isLoading = false;
        toast.success(payload);
      })
  },
});

export const {
  setActiveBoard,
  setIsEditingToFalse,
  setIsEditingToTrue,
} = boardSlice.actions;
