import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { BoardsState } from '../../ts/types';
import { getAllBoard } from './boardThunk';

const initialState:BoardsState ={
    isLoading:false,
    boards:[],
    activeBoard:null,
    isEditing:false,
    isModalOpen:false,
}

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        increment: (state ) => {
            state.isLoading = false;
        },
        openBoardModal: (state) => {
            state.isModalOpen = true;
        },
        closeBoardModal: (state) => {
            state.isModalOpen = false;
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllBoard.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getAllBoard.fulfilled,(state,{payload})=>{
            state.isLoading = false;
            state.boards=payload;
        })
        .addCase(getAllBoard.rejected,(state,{payload})=>{
            state.isLoading = false;
            toast.error(payload)
        })
    }
});



export const { increment,openBoardModal ,closeBoardModal } = boardSlice.actions;