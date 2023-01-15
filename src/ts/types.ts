import { AppDispatch } from '../store';
import { ErrorMessage } from './interfaces';




export type UserProfileForm={
    name?:string,
    email?:string,
    lastName?:string ,
}

//Types for props 

/* //* Type for inputs components props */
export type InputProps={
    name:string,
    labelText?:string | null,
    type:string,
    value:any,
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void
}

//Slices state types

/* //* type  slices state    */
export type UserSliceState = {
    isLoading:boolean,
    user:UserState | null,
}

export type BoardsState = {
    isLoading:boolean,
    boards: Board[],
    activeBoard:string,
    isEditing:boolean,
    boardId:string | null,
}

export type TaskState={
    isLoading:boolean,
    tasks: TaskElement[];
    statusOptions:string[];
    taskId:string;
    isEditing:boolean;
    activeTask:TaskElement | null;
    boardIdForTask?:string| null;
}


/*//Types for  user  */

export  type UserState={
    name:string,
    email:string,
    password?:string,
    isMember?:boolean | null ,
    lastName:any,
    token:string | null
}



/*//Types for  board  */
export type Board = {
    _id:       string;
    name:      string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    __v:       number;
}

/*Types for tasks */

export type TaskElement= {
    _id:         string;
    title:       string;
    description: null | string;
    status:      string;
    boardId:     string;
    createdBy:   string;
    createdAt:   string;
    updatedAt:   string;
    __v:         number | null;
}




//Redux toolkit types


/*//* ThunkApi type */
export type AsyncThunkConfig = {
    state?: unknown
    dispatch?: AppDispatch
    extra?: unknown
    rejectValue?: ErrorMessage
    serializedErrorType?: unknown
    pendingMeta?: unknown
    fulfilledMeta?: unknown
    rejectedMeta?: unknown
  }


  