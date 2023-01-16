import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from '../utils/storeHooks';

import registerPageImg from "../assets/register-page-img.jpg";
import { InputComponent } from "../components";
import { loginUser, registerUser } from "../features/user/userThunk";
import { UserState } from "../ts";

const initialState:UserState ={
  name: "",
  email: "",
  password: "",
  isMember: true,
  lastName: null ,
  token: null
}

const RegisterPage = () => {

  const dispatch=useAppDispatch();
  const navigate=useNavigate();
  const { user }=useAppSelector((state)=>state.user)

  const [userData, setUserData] = useState<UserState>(initialState);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { email,password,name,isMember }=userData;
    
    if (!email || !password || (isMember===false && !name)) {
      toast.error('Please provide all the values')
      return
    }

    if (isMember) {
      dispatch(loginUser(userData))
      return
    }    
    
    dispatch(registerUser(userData))
    
 /* //?Just do this if someone put invalid values in not member form
    if (user){
     setUserData({...initialState,isMember:userData.isMember})
    }else{
      setUserData({...userData,isMember:userData.isMember})
    } */

  };
  
  const handleChange = ({ target}: React.ChangeEvent<HTMLInputElement>): void => {
    setUserData({
      ...userData,
      [target.name]: target.value,
    });
  };

  const toggleMember = () =>
    setUserData({ ...userData, isMember: !userData.isMember });

  const isMemberHelper = userData.isMember ? "Login" : "Sing up";

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 2000);
    }
  }, [user,navigate]);
  

  return (
    <Wrapper className="animate__animated animate__fadeIn " >
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>{isMemberHelper}</h1>
          {!userData.isMember && (
            <InputComponent
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
            />
          )}
          <InputComponent
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
          <InputComponent
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />

          <button type="submit" className="btn register-btn ">
            {isMemberHelper}
          </button>
          <p>
            {userData.isMember
              ? "Don't have any account?  "
              : "already have an account?  "}
            <span onClick={toggleMember} className='toggle-btn' >
              {userData.isMember ? "Sign up" : "Login"}
            </span>
          </p>
        </form>
      </div>

      <div className="register-img-container">
        <img src={registerPageImg} alt="Register" className="img" />
      </div>
    </Wrapper>
  );
};

export default RegisterPage;

const Wrapper = styled.section`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .form-container {
    height: 60%;
    width: 80%;

    .register-btn {
      padding: 0.3125rem 1.25rem;
    }

    p{
      color: var(--gray-400);
      font-weight: bold;
      letter-spacing: var(--letter-spacing);
    }
    .toggle-btn{
      color: var(--blue-sky-700);
      cursor: pointer;
      font-weight: bold;
      transition: var(--transition);
    }

    .toggle-btn:hover{
      text-decoration: underline;
    }
  }

  .register-img-container {
    display: none;
  }

  @media  ( min-width:767px ) {
    .form-container{
      width: 50%;
      height: 50%;
      h1{
        font-size: 2.625rem;
      }
    }
  }

  @media  ( min-width:1100px ) {
    
    .register-img-container{
      display:block;
      height: 90%;
      border-radius: var(--radius);
      width: 40%;
      overflow: hidden;
    }

    .form-container{
      height: 55%;
      form{
        width: 50%;
        margin: 0 auto;

      }
    }
  }

`;
