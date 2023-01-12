import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useAppSelector } from "../utils/storeHooks";

import { AddBoardModal, NavBar, SideBar } from "../components";

const HomePage = () => {
  
  const { isModalOpen } = useAppSelector((store) => store.board);
  
  return (
    <> 
     { isModalOpen && <AddBoardModal />}
      <Wrapper>
        <SideBar />
        <div className="content-home-page">
          <NavBar />
          <Outlet />
        </div>
      </Wrapper>
    </>
  );
};

export default HomePage;

const Wrapper = styled.main`
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  position: relative;
  .content-home-page {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 90;
    overflow-y: scroll;
  }

  @media (min-width: 1100px) {
    grid-template-columns: auto 1fr;

    .content-home-page {
      position: relative;
    }
  
  }
`;
