import { useEffect } from "react";
import styled from "styled-components";
import { BoardCard } from "../components";
import randomColor from "randomcolor";


import { useAppDispatch, useAppSelector } from "../utils/storeHooks";
import { getAllBoard } from "../features/boards/boardThunk";
import { openBoardModal } from '../features/boards/boardSlice'

const AllBoardsPage = () => {
  const dispatch = useAppDispatch();
  const { boards, isLoading } = useAppSelector((store) => store.board);

  useEffect(() => {
    dispatch(getAllBoard({}));
  }, []);

  if (isLoading)
    return (
      <Wrapper>
        {/* //todo:Loading component */}
        <h1>Loading...</h1>
      </Wrapper>
    );

  if (boards.length === 0)
    return (
      <Wrapper>
        <div className="header">
          <h1  >
            You don`t have any boards
          </h1>
          <span className="add-btn btn" onClick={()=>dispatch(openBoardModal())}  >Add board</span>
        </div>
      </Wrapper>
    );

  return (
    <Wrapper>
      <div className="header">
        <h1>All your boards </h1>
        <span className="add-btn btn" onClick={()=>dispatch(openBoardModal())}  >Add board</span>
      </div>
      <div className="boards-container">
        {boards.map((board, index) => {
          let colorRandom;
          colorRandom = randomColor({ hue: "#00FFFF", count: 18 });
          return (
            <BoardCard {...board} color={colorRandom[index]} key={board._id} />
          );
        })}
      </div>
    </Wrapper>
  );
};

export default AllBoardsPage;

const Wrapper = styled.section`
  position: relative;
  min-height: 100%;
  width: 90%;
  margin: 0 auto;

  .header {
    font-family: var(--secondary-font);
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-bottom:.9375rem;
    h1 {
      font-family: var(--secondary-font);
    }
     .add-btn {
      cursor: pointer;
      padding: .3125rem .75rem;
      
    } 

    
  }

  .boards-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 1.375rem;
    grid-column-gap: 0.625rem;
    height: 100%;
  }

  @media (min-width: 767px) {
    .boards-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (min-width: 1100px) {
    .boards-container {
      grid-column-gap: 1.5625rem;
      grid-template-columns: repeat(4, 1fr);
    }

  }
`;
