import styled from "styled-components";
import { AiFillEdit } from "react-icons/ai";
import { IoMdAddCircle } from "react-icons/io";
import { useAppDispatch } from "../utils/storeHooks";

import {
  setActiveBoard,
  setIsEditingToTrue,
} from "../features/boards/boardSlice";
import { Link } from "react-router-dom";

type Props = {
  name: string;
  color?: string;
  _id: string;
};

const BoardCard = ({ name, color, _id }: Props) => {

  const dispatch = useAppDispatch();

  const handleEdiButton=(name:string,id:string)=>{
    dispatch(setIsEditingToTrue())
    dispatch(setActiveBoard({name,id}))
  }
 
  return (
    <Wrapper>
      <h4 style={{ color }}>{name}</h4>
      <Link
        to={`/board/${_id}`}
        className="add-icon-btn"
        onClick={() =>{}}
      >
        <IoMdAddCircle />
      </Link>
      <Link 
        to={`/board`}
        className="edit-icon-btn"
        onClick={()=>handleEdiButton(name,_id)}
      >
        <AiFillEdit />
      </Link>
    </Wrapper>
  );
};

export default BoardCard;

const Wrapper = styled.article`
  border-radius: var(--radius);
  position: relative;
  text-align: center;
  background-color: var(--gray-900);
  box-shadow: var(--box-shadow);
  padding: 1.5625rem 5px;

  h4 {
    font-size: 1.5625rem;
  }

  .add-icon-btn,
  .edit-icon-btn {
    border: none;
    background-color: transparent;
    position: absolute;
    color: var(--gray-50);
    cursor: pointer;
    bottom: 0;
  }

  .add-icon-btn {
    right: 3px;
    font-size: 20px;
  }
  .edit-icon-btn {
    left: 3px;
  }

  @media (min-width: 1100px) {
  }
`;
