import { UserState } from "../ts";

export const addUserLocalStorage=(user:UserState)=>{
     localStorage.setItem('user',JSON.stringify(user));
}


export const getUserLocalStorage=()=>{
    const userLS =localStorage.getItem('user');

    return userLS ? JSON.parse(userLS) : null;
}

export const deleteUserLocalStorage=()=>{
    localStorage.removeItem('user');
}