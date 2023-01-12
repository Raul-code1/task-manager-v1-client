import styled from "styled-components";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

type Props = {
  name: string;
  color: string;
};

const BoardCard = ({ name, color }: Props) => {
  return (
    <Wrapper>
      <h4 style={{ color }}>{name}</h4>
      {/* //todo:delete functions */}
      <button
        type="button"
        className="trash-icon-btn"
        onClick={() => console.log("delete board")}
      >
        <BsFillTrashFill />
      </button>
      <button
        type="button"
        className="edit-icon-btn"
        onClick={() => console.log("edit board")}
      >
        <AiFillEdit />
      </button>
    </Wrapper>
  );
};

export default BoardCard;

const Wrapper = styled.article`
  border-radius: var(--radius);
  position: relative;
  text-align: center;
  padding: 1.875rem;
  background-color: var(--gray-900);
  box-shadow: var(--box-shadow);
  transition: var(--transition);
  &:hover{
    scale: 1.1;
  }  

  cursor: pointer;
  h4 {
    font-size: 1.5625rem;
  }

  .trash-icon-btn,.edit-icon-btn {
    border: none;
    background-color: transparent;
    position: absolute;
    color: var(--gray-50);
    cursor: pointer;
  }

  .trash-icon-btn{
    right: 2%;

  }
  .edit-icon-btn{
    left: 2%;
  }

  @media (min-width: 1100px) {
  }
`;
