import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAppSelector, useAppDispatch } from '../../utils/storeHooks';
import { InputComponent } from "../../components";
import { createBoard, updateBoard,deleteBoard } from "../../features/boards/boardThunk";

const EditBoardPage = () => {
  const navigate = useNavigate()
  const dispatch=useAppDispatch();
  const { activeBoard, isEditing } = useAppSelector((store) => store.board)
  const [board, setBoard] = useState<string>(activeBoard);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const value = target.value;
    setBoard(value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!board)toast.error('please provide a board name');

    if (isEditing) {
        dispatch(updateBoard({name:board}))
      }else{
        dispatch(createBoard({name:board}))
    } 

    setTimeout(() => {
      navigate('/')
    }, 2000);
    

  };

  const handleDeleteBoard=()=>{
    dispatch(deleteBoard({}))
    setBoard('');
    setTimeout(() => {
      navigate('/')
    }, 2000);
  }

  return (
    <Wrapper className="section">
      <div className="edit-add-board-container">
        <h1>{isEditing ? "Edit board" : "Add new Board"}</h1>
        <div className="edit-add-board-form">
          <form onSubmit={handleSubmit}>
            <InputComponent
              name=""
              type="text"
              labelText={isEditing ? "Edit:" : "Add:"}
              value={board}
              onChange={handleChange}
            />
            <button type="submit" className="btn edit-add-btn">
              Submit
            </button>
          </form>
          {isEditing && (
            <button type="button" className=" delete-btn" onClick={handleDeleteBoard} >
              Delete
            </button>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default EditBoardPage;

const Wrapper = styled.section`
  .edit-add-board-container {
    h1 {
      text-align: center;
    }

    .edit-add-board-form {
      width: 80%;
      margin: 0 auto;

      .edit-add-btn {
        padding: 0.25rem 1.25rem;
        cursor: pointer;
      }
    }
    .delete-btn {
      cursor: pointer;
      padding: 0.25rem 1.5rem;
      margin-top: 1.25rem;
      background-color: red;
      color: var(--gray-50);
      border: 1px solid red;
      border-radius: var(--radius);
      transition: var(--transition);
      &:hover {
        background-color: var(--gray-50);
        color: red;
      }
    }
  }

  @media (min-width: 767px) {
    .edit-add-board-container {
      .edit-add-board-form {
        width: 40%;
      }
    }
  }
`;
