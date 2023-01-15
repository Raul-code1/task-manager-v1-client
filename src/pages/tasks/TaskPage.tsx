import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../../utils/storeHooks";
import { TaskStatusColumn } from "../../components";
import { useEffect } from "react";
import { getAllTasks } from "../../features/tasks/taskThunk";
import { setActiveTask, setBoardIdForTask, setIsEditingToFalse } from "../../features/tasks/taskSlice";

const TaskPage = () => {
  const { boardIdParam } = useParams();
  const { statusOptions, tasks, isLoading } = useAppSelector(
    (store) => store.task
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllTasks({ id: boardIdParam }));
    dispatch(setBoardIdForTask(boardIdParam))
  }, [boardIdParam]);

  const handleAddBtn=()=>{
    dispatch(setIsEditingToFalse())
    dispatch(setActiveTask({id:'',task:null}))
  }

  if (isLoading) {
    return (
      <Wrapper className="section">
        <h1>Loading..</h1>
      </Wrapper>
    );
  }

  if (tasks.length === 0) {
    return (
      <Wrapper className="section">
        <Link to={'/'} className="add-task-btn btn  " onClick={handleAddBtn} >Add new task</Link>
        <h1 style={{paddingTop:20}} >Yo don`t have any tasks</h1>
      </Wrapper>
    );
  }

  return (
    <Wrapper className="section">
      <Link to={'/task'} className="add-task-btn btn " onClick={handleAddBtn} >Add new task</Link>
      <div className="task-page-container">
        {statusOptions.map((item, index) => {
          return <TaskStatusColumn status={item} key={index} />;
        })}
      </div>
    </Wrapper>
  );
};

export default TaskPage;

const Wrapper = styled.section`
  min-height: 100%;
  overflow-x: scroll;
  position: relative;
  padding-top: 10px;
  .task-page-container {
    display: grid;
    grid-template-columns: repeat(3, 100%);
    column-gap: 20px;
    padding: 1.25rem 0rem;
  }

  .col2-grid {
    grid-column: 2/3;
    grid-row: 2/2;
  }
  .col3-grid {
    grid-column: 3/4;
    grid-row: 2/2;
  }
  .col1-grid {
    grid-column: 1/2;
    grid-row: 2/2;
  }

  .add-task-btn{
    padding: .3125rem 1.25rem;
    position: absolute;
  }

  @media (min-width: 767px) {
    .task-page-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;
