import { Link } from "react-router-dom";
import styled from "styled-components";
import { GrLogout } from "react-icons/gr";

import { options } from "../utils/navBarLinks";
import { useAppDispatch, useAppSelector } from '../utils/storeHooks';
import { logoutUser } from "../features/user/userSlice";

const NavBar = () => {
  const dispatch = useAppDispatch();
  const { user }=useAppSelector((store)=>store.user)

  return (
    <Wrapper>
      <div className="nav-bar-container section ">
        <div className="options-container">
          {options.map(({ id, path, icon, text }) => {
            return (
              <Link key={id} to={path} className="options-links">
                <span className="nav-options-text">{text}</span>
                <span className="nav-options-icons">{icon}</span>
              </Link>
            );
          })}
        </div>
        <div>
          <span className="user-name" >{user?.name}</span>
          <button
            className="nav-bar-logout-btn btn "
            onClick={() => dispatch(logoutUser())}
          >
            Logout <GrLogout />
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default NavBar;

const Wrapper = styled.nav`
  background-color: var(--gray-200);

  .nav-bar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.625rem 0rem;
  }

  .nav-options-icons {
    margin-right: 1.25rem;
    font-size: 1.4375rem;
  }

  .nav-options-text {
    display: none;
  }

  .nav-bar-logout-btn {
    padding: 5px 0.875rem;
    margin-left: 15px;
  }

  @media (min-width: 767px) {
    .options-container {
      display: flex;
      align-items: center;
      width: 50%;
      font-size: 1.4375rem;
      gap: 3.125rem;
      
      .options-links {
        display: flex;
        color: var(--gray-900);
        gap: .625rem;

        .nav-options-icons {
          margin-right: 0;
        }

        .nav-options-text {
          display: block;
        }
      }
    }

    .user-name{
      font-size: 20px;
    }

  }
`;
