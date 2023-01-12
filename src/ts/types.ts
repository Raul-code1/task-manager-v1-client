import { AppDispatch } from '../store';
import { ErrorMessage } from './interfaces';


/*//!Types for  user  */

export  type UserState={
    name:string,
    email:string,
    password?:string,
    isMember?:boolean | null ,
    lastName:string,
    token:string | null
}


export type UserProfileForm={
    name?:string,
    email?:string,
    lastName?:string ,
}

//!Types for props 

/* //* Type for inputs components props */
export type InputProps={
    name:string,
    labelText?:string,
    type:string,
    value:any,
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void
}

//!Slices state types

/* //* type for User slice state    */
export type UserSliceState = {
    isLoading:boolean,
    user:UserState | null,
}

export type BoardsState = {
    isLoading:boolean,
    boards: Board[],
    activeBoard:Board | null,
    isEditing:boolean,
    isModalOpen:boolean,
}




export type Board = {
    _id:       string;
    name:      string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    __v:       number;
}

//!Redux toolkit types


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


  