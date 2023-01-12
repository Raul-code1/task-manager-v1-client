import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from '../utils/storeHooks';
import { AiOutlineClose } from "react-icons/ai";
import { GrLogout } from "react-icons/gr";

import { options } from "../utils/navBarLinks";
import { logoutUser } from "../features/user/userSlice";

const SideBar = () => {
  
  const { user } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  return (
    <Wrapper  >
      <div className="side-bar-container">
        <div className="user-name">
          <h2>DashBoard</h2>
          <span className="close-side-bar-btn" >
            <AiOutlineClose />
          </span>
        </div>
        <div className="nav-links-container">
          {options.map(( { id, text, path, icon }) => {
            return (
              <Link key={id} to={path} className="bar-options">
                {text} <span>{icon}</span>{" "}
              </Link>
            );
          })}
        </div>
        <div className="log-out-btn-container">
          <button className="btn" onClick={() => dispatch(logoutUser())}>
            Log out
            <span><GrLogout /></span>
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default SideBar;

const Wrapper = styled.nav`
  height: 100%;
  width: 75%;
  padding: 0 0.625rem;
  background-color: var(--gray-100);
  transform: translateY(-200%);  
  position: relative;
  
  transition: opacity 0.3s ease-in-out;
  z-index: 999;
  .side-bar-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 1.875rem ;
    .user-name {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--black);
      font-weight: bold;
      .close-side-bar-btn {
        font-size: 1.375rem;
      }
    }
  }

  .nav-links-container {
    padding-top: 0.9375rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    font-size: 1.25rem;
  }

  .log-out-btn-container{
    position: absolute;
    bottom: 1.375rem;
    button{
      display: flex;
      align-items: center;
      gap: .625rem;
      padding: .5rem 1.5625rem;
    }
  }

  .toggle-open-bar-class{
    transform: translateY(0%);
  }
  .toggle-close-bar-class{
    transform: translateY(-200%);
  }
  
  
  
  @media  ( min-width:1100px ) {
    transform: translateY(0%);
    width:250px;
  .close-side-bar-btn{
    display: none;
  }
}
`;
