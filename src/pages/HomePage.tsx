import { Outlet } from "react-router-dom";
import styled from "styled-components";

import { NavBar } from "../components";

const HomePage = () => {
  return (
    <>
      <Wrapper>
        <NavBar />
        <Outlet />
      </Wrapper>
    </>
  );
};

export default HomePage;

const Wrapper = styled.main`
  height: 100vh;
  @media (min-width: 1100px) {
  }
`;
