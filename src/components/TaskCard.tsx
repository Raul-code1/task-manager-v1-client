import moment from "moment";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { TaskElement } from "../ts/types";
import { useAppDispatch } from '../utils/storeHooks';
import { setActiveTask, setIsEditingToTrue } from "../features/tasks/taskSlice";

type Props = {
  task: TaskElement;
};

const TaskCard = ({ task }: Props) => {

  const dispatch=useAppDispatch();

  let createAtDate = moment(task.createdAt).format("DD / MM / YYYY");
  let tempStatus;
  if (task.status.indexOf(" ") != -1) {
    tempStatus = task.status.replace(" ", "-");
  } else {
    tempStatus = task.status;
  }

  const handleEditBtn=(taskHelp:TaskElement)=>{
    dispatch(setIsEditingToTrue())
    dispatch(setActiveTask({id:taskHelp._id,task:taskHelp}))
  }

  return (
    <Wrapper>
      <div className={`bar-color ${tempStatus} `}></div>
      <Link to={`/task`} className='edit-task' onClick={()=>handleEditBtn(task)} >Edit task  </Link>
      <div className="info-task-container">
        <p className="title" >{task.title}</p>
        <p className="date" >{createAtDate}</p>
      </div>
    </Wrapper>
  );
};

export default TaskCard;

const Wrapper = styled.div`
  position: relative;
  border: 1px solid black;
  background-color: var(--gray-100);
  width: 50%;
  border-radius: var(--radius);
  box-shadow: var(--box-shadow);
  text-align: center;
  margin-top: 20px;
  .bar-color {
    width: 50%;
    height: 4px;
    margin: 0 auto;
    margin-bottom: 5px;
    border-radius: var(--radius);
  }


  .title{
    font-weight: bold;
    text-transform: capitalize;
    font-size: 1.25rem;
  }

  .date{
    font-size: .8125rem;
  }

  .to-do {
    background-color: red;
  }

  .in-process {
    background-color: #67e2ae;
  }

  .done {
    background-color: var(--blue-sky-500);
  }
  .edit-task{
    color: var(--gray-900);
    text-decoration: underline;
  }
`;
