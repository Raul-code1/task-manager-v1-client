import styled from "styled-components";
import { useEffect } from "react";
import randomColor from "randomcolor";

import { useAppDispatch, useAppSelector } from "../../utils/storeHooks";
import { getAllBoard } from "../../features/boards/boardThunk";
import { BoardCard } from "../../components";
import { Link } from "react-router-dom";
import { setActiveBoard, setIsEditingToFalse } from "../../features/boards/boardSlice";

const AllBoardsPage = () => {
  const { boards, isLoading } = useAppSelector((store) => store.board);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllBoard({}));
  }, []);

  const handleAddBtn=()=>{
    dispatch(setIsEditingToFalse());
    dispatch(setActiveBoard({name:'',id:null}));
  }

  if (isLoading)
    return (
      <Wrapper>
        <div className="all-boards-container">
          <h1>Loading...</h1>
        </div>
      </Wrapper>
    );

  if (boards.length === 0) {
    return (
      <Wrapper>
        <div className="all-boards-container">
          <h1>You don`t have any boards</h1>
          <div className="add-board-btn">
            <Link to={`/board`} className="btn" onClick={handleAddBtn} >
              Add New Board
            </Link>
          </div>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper className="section content-section ">
      <div className="all-boards-container">
        <h1>All your boards</h1>
        <div className="add-board-btn">
          <Link to={`/board`} className="btn" onClick={handleAddBtn} >
            Add New Board
          </Link>
        </div>
        <div className="boards-grid-container">
          {boards.map((board) => {
            let tempColor = randomColor();
            return <BoardCard key={board._id} {...board} color={tempColor} />;
          })}
        </div>
      </div>
    </Wrapper>
  );
};

export default AllBoardsPage;

const Wrapper = styled.section`
  height: 100%;
  .all-boards-container {
    position: relative;
    h1 {
      text-align: center;
    }
    .add-board-btn {
      width: 50%;
      margin: 0 auto;
      text-align: center;
      .btn {
        padding: 0.25rem 0.875rem;
      }
    }
    .boards-grid-container {
      display: grid;
      grid-template-columns: 1fr;
      row-gap: 20px;
      padding-top: 1.25rem;
    }
  }

  @media (min-width: 767px) {
    .all-boards-container {
      h1 {
        font-size: 2.1875rem;
      }

      .boards-grid-container {
        grid-template-columns: repeat(3, 1fr);
        column-gap: 15px;
      }
    }
  }

  @media (min-width: 1100px) {
    .all-boards-container {
      .boards-grid-container {
        grid-template-columns: repeat(5, 1fr);
      }
    }
  }
`;
