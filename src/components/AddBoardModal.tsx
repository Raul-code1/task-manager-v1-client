import styled from "styled-components";
import { useState } from "react";

import { InputComponent } from "./index";
import { useAppDispatch } from "../utils/storeHooks";
import { closeBoardModal } from "../features/boards/boardSlice";

const AddBoardModal = () => {
  const dispatch = useAppDispatch();
  const [boardData, setBoardData] = useState<String>("");
  const [showFormMessage, setShowFormMessage] = useState(false);

  const handleChangeBoard = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const value = target.value;
    setBoardData(value);
  };
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!boardData) {
      setShowFormMessage(true);
      return;
    }
    /* //todo:Dispatch create board */
    /* //todo:and update modal*/
    setShowFormMessage(false);
    dispatch(closeBoardModal());
  };

  return (
    <Wrapper className="animate__animated animate__fadeIn">
      <div className="add-board-form-container">
        <button onClick={()=>dispatch(closeBoardModal())} type="button" className="close-modal-btn">
          X
        </button>
        <form onSubmit={handleSubmit}>
          <h3>Add new Board</h3>
          <InputComponent
            name="newBoard"
            labelText="New Board"
            type="text"
            value={boardData}
            onChange={handleChangeBoard}
          />
          {showFormMessage && (
            <p style={{ color: "red" }}>Please provide a name</p>
          )}
          <button type="submit" className="btn add-board-btn">
            Add
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

export default AddBoardModal;

const Wrapper = styled.div`
  position: fixed;
  z-index: 999999999;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;

  .add-board-form-container {
    background-color: var(--gray-50);
    opacity: 1;
    width: 70%;
    height: 50%;
    border-radius: var(--radius);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .close-modal-btn {
      position: absolute;
      right: 1.25rem;
      top: 1.25rem;
      border: none;
      cursor: pointer;
    }
    form {
      margin: 0 auto;
      text-align: center;
      width: 90%;
      h3 {
        text-decoration: underline;
      }
    }
  }

  @media (min-width: 767px) {
    .add-board-form-container {
      width: 50%;
      height: 40%;

      form {
        width: 70%;
      }
    }
  }

  @media (min-width: 1100px) {
    .add-board-form-container {
      width: 30%;
      height: 40%;

      form {
        width: 50%;
        h3 {
          font-size: 1.5625rem;
        }
      }
    }
  }
`;
