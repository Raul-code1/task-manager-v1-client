import { useState } from 'react';
import styled from "styled-components"
import { useAppSelector, useAppDispatch } from '../utils/storeHooks';
import { toast } from 'react-toastify';

import { InputComponent } from "../components";
import { UserProfileForm } from '../ts';
import { updateUser } from '../features/user/userThunk';

const UserProfilePage = () => {

  const { user }=useAppSelector((store)=>store.user)
  const dispatch=useAppDispatch();
  
  const [userProfile, setUserProfile] = useState<UserProfileForm>({
    name:user?.name,
    email:user?.email,
    lastName:user?.lastName
  });

  const handleSubmit = (e:React.SyntheticEvent) => {
    e.preventDefault();
    const { name,email,lastName }=userProfile
    if (!name || !email || !lastName) {
      toast.error('Please provide all the values')
      return
    }

    dispatch(updateUser({name,email,lastName}))

  };

  const handleChange = ({target}: React.ChangeEvent<HTMLInputElement>)=>{
    const name=target.name;
    const value=target.value;
    setUserProfile({...userProfile,[name]:value})
  }

  

  return (
    <Wrapper className="section" >
      <div className="profile-page-container">
        <h1>Profile</h1>
      <div className="profile-page-form">
        <form onSubmit={handleSubmit}  >
          <InputComponent 
            name='name'
            type="text"
            value={userProfile.name} 
            onChange={handleChange}
          />
          <InputComponent 
            name='email'
            type="email"
            value={userProfile.email} 
            onChange={handleChange}
          />
          <InputComponent 
            labelText='Last name'
            name='lastName'
            type="text"
            value={userProfile.lastName} 
            onChange={handleChange}
          />
          <button className='btn profile-btn ' >Update profile</button>
        </form>
      </div>
      </div>
    </Wrapper>
  )
}

export default UserProfilePage


const Wrapper = styled.section`

  .profile-page-container{

    h1{
      font-size: 2.5rem;
      font-family: var(--secondary-font);
      text-align: center;
    }
  }

  .profile-page-form{
    .profile-btn{
      padding: .3125rem 1.25rem;
    }
  }

  @media  ( min-width:767px ) {
    .profile-page-form{
      margin: 0 auto;
      width: 60%;
      
    }
  }

  @media  ( min-width:1100px ) {
    .profile-page-form{
      width: 45%;
    }
  }

`