import { Link } from "react-router-dom";
import styled from "styled-components";
import { GrLogout } from "react-icons/gr";

import { options } from "../utils/navBarLinks";
import { useAppDispatch } from '../utils/storeHooks';
import { logoutUser } from "../features/user/userSlice";

const NavBar = () => {
  
  const dispatch=useAppDispatch()

  return (
    <Wrapper>
      <div className="nav-bar-container">
        {options.map(({ id, path, icon }) => {
          return (
            <Link key={id} to={path}>
              {icon}
            </Link>
          );
        })}
        <button className="nav-bar-logout-btn" onClick={()=>dispatch(logoutUser())} ><GrLogout /></button>
      </div>
    </Wrapper>
  );
};

export default NavBar;

const Wrapper = styled.nav`
  background-color: var(--gray-100);
  height: 8%;

  .nav-bar-container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: space-evenly;
    font-size: 22px;

    .nav-bar-logout-btn{
      border: none;
    }
  }

  @media (min-width: 1100px) {
    display: none;
  }
`;
