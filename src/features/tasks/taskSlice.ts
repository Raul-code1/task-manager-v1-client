import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TaskElement, TaskState } from '../../ts';
import { getAllTasks } from './taskThunk';
import { toast } from 'react-toastify';

const initialState:TaskState={
    isLoading:false,
    tasks:[],
    statusOptions:[],
    taskId:'',
    isEditing:false,
    activeTask:null,
    boardIdForTask:null
}



export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setIsEditingToFalse: (state ) => {
            state.isEditing = false;
        },
        setIsEditingToTrue: (state ) => {
            state.isEditing = true;
        },
        setBoardIdForTask: (state,{payload}:PayloadAction<string | null |undefined>)=>{
            state.boardIdForTask=payload
        },
        setActiveTask:(state,{payload}:PayloadAction<{id:string,task:TaskElement | null}>)=>{
            state.activeTask=payload.task
            state.taskId=payload.id;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllTasks.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getAllTasks.fulfilled,(state,{payload})=>{
            let tempTasksStatus=[...new Set(payload.map((task,index)=>task.status))]
            state.isLoading=false;
            state.tasks=payload;
            state.statusOptions=tempTasksStatus
        })
        .addCase(getAllTasks.rejected,(state,{payload})=>{
            state.isLoading=false;
            toast.error(payload);
        })
    }
});



export const { setIsEditingToFalse,setIsEditingToTrue,setBoardIdForTask,setActiveTask } = taskSlice.actions;