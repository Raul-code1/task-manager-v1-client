import styled from "styled-components";

import { useAppSelector } from "../utils/storeHooks";
import { TaskCard } from "./";

type Props = {
  status: string;
};

const TaskStatusColumn = ({ status }: Props) => {
  const { tasks } = useAppSelector((store) => store.task);

  let gridHelper =
    status === "in process"
      ? "col2-grid"
      : status === "done"
      ? "col3-grid"
      : "col1-grid";
  let tempStatus;
  if (status.indexOf(" ") != -1) {
    tempStatus = status.replace(" ", "-");
  } else {
    tempStatus = status;
  }

  return (
    <>
      <Wrapper className={`${gridHelper}`}>
        <h1 className={`${tempStatus}`}>{status}</h1>
        <div className="tasks-container">
          {tasks.map((task, index) => {
            return (
              task.status === status && <TaskCard task={task} key={task._id} />
            );
          })}
        </div>
      </Wrapper>
    </>
  );
};

export default TaskStatusColumn;

const Wrapper = styled.div`
  position: relative;
  .to-do {
    color: red;
  }

  .in-process {
    color: #67e2ae;
  }

  .done {
    color: var(--blue-sky-500);
  }
`;
