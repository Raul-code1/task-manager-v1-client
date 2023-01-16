import { useState, useEffect } from "react";
import styled from "styled-components";
import { toast } from 'react-toastify';

import { useAppSelector, useAppDispatch } from '../../utils/storeHooks';
import { InputComponent } from "../../components";
import { createTask,deleteTask,editTask } from "../../features/tasks/taskThunk";
import { useNavigate } from 'react-router-dom';

const initialState = {
  _id: "",
  title: "",
  description: null,
  status: "to do",
  boardId: "",
  createdBy: "",
  createdAt: "",
  updatedAt: "",
  __v: null,
};

const selectOptions = ["to do", "in process", "done"];

const EditTaskPage = () => {
  const [task, setTask] = useState<any>(initialState);

  const { isEditing, activeTask } = useAppSelector((store) => store.task);
  const dispatch=useAppDispatch();
  const navigate=useNavigate();

  useEffect(() => {
    if (isEditing) {
      setTask(activeTask);
    } else {
      setTask(initialState);
    }
  }, [isEditing, activeTask]);

  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    let name = target.name;
    let value = target.value;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit=(e:React.SyntheticEvent)=>{
    e.preventDefault();
    const{title,status}=task

    if (!title) {
      toast.error('Please provide all the values')
      return
    }

    if (isEditing) {
        if (task._id) {
          dispatch(editTask({title,status}))
        }

    }else{
      dispatch(createTask({title,status}))
    }

    setTimeout(() => {
      navigate(-1)
    }, 2000);


  }

  const handleDeleteBtn=()=>{
    setTask(initialState)
    dispatch(deleteTask({}))
    setTimeout(() => {
      navigate(-1)
    }, 2000);

  }

  return (
    <Wrapper className="section">
      <h1>Add new task</h1>
      <div className="edit-add-task-container">
        <form className="edit-add-task-form"  onSubmit={handleSubmit} >
          <InputComponent
            name="title"
            value={task?.title}
            type="text"
            onChange={handleChange}
          />
          <div>
            <label htmlFor="status">Status</label> <br /> <br />
            <select
              name="status"
              id="status"
              value={task?.status}
              onChange={handleChange}
            >
              {selectOptions.map((op, index) => {
                return (
                  <option value={op} key={index}>
                    {op}
                  </option>
                );
              })}
            </select>
          </div>
          <button type='submit' className="btn submit-task-btn " >Submit</button>
          <br />
          {isEditing && <button type="button" className="delete-btn" onClick={handleDeleteBtn} >Delete</button>}
        </form>
      </div>
    </Wrapper>
  );
};

export default EditTaskPage;

const Wrapper = styled.section`
  h1 {
    text-align: center;
  }

  .edit-add-task-container {
    width: 90%;
    margin: 0 auto;
  }
  .submit-task-btn{
    margin-top: 20px;
    padding: 0.25rem 1.5rem;
  }

  @media (min-width: 767px) {
    .edit-add-task-container {
      width: 50%;
    }
  }

  @media (min-width: 1100px) {
    .edit-add-task-container {
      width: 30%;
    }
  }
`;
