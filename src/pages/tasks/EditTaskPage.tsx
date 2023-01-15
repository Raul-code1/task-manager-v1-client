import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useAppSelector } from '../../utils/storeHooks';
import { TaskElement } from '../../ts/types';
import { InputComponent } from '../../components';

const initialState={
  _id:'',
  title:'',
  description:null,
  status:'to do',
  boardId:'',
  createdBy:'',
  createdAt:'',
  updatedAt:'',
  __v:null,
}

const selectOptions=['to do','in process','done']

const EditTaskPage = () => {

  const [task, setTask] = useState<TaskElement | null>(initialState)
  
  
  const{ statusOptions,isEditing,activeTask }=useAppSelector((store)=>store.task)

  useEffect(() => {
    if (isEditing) {
      setTask(activeTask)
    }else{
      setTask(initialState);
    }
    
  }, [isEditing,activeTask])
  

  const handleChange = ({target}:React.ChangeEvent<HTMLInputElement>)=>{
    let name= target.name
    let value= target.value
   
  }

  return (
    <Wrapper className='section' >
      <h1>Add new task</h1>
      <div className="edit-add-task-container">
        <form className="edit-add-task-form">
            <InputComponent
              name='title'
              value={task?.title}
              type='text'
              onChange={handleChange}
            />
        </form>
      </div>
    </Wrapper>
  )
}

export default EditTaskPage


const Wrapper =styled.section`

  h1{
    text-align: center;
  }

`