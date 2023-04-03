
import { type Todo, add, toddleHideCompleted } from '../features/todo/todoSlice';
import { v4 as uuidv4 } from 'uuid';
import { Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';


import { useState } from 'react';

export const Form = (): any => {

  const dispatch = useDispatch();
  const ID = uuidv4();
  const addTodo = (content: string): void => {
    const newTodo: Todo = {
      id: ID,
      content,
      isCompleted: false,
    }
    if (content === "") return;
    dispatch(add(newTodo))
    setContent("");
  }
  const [content, setContent] = useState("");

  const handleButton = (): void => {
    dispatch(toddleHideCompleted())
  }

  return (
    <>
      <form>
        <TextField label="todoを入力してください"
          value={content}
          onChange={e => { setContent(e.target.value); }} >
        </TextField>
        <Button variant="contained" onClick={() => { addTodo(content) }} style={{ marginLeft: '25px', marginTop: '5px' }}>送信</Button>
      </form>
      <Button variant="contained" onClick={handleButton}
        style={{ marginTop: "15px" }}
      >完了リストを非表示にする</Button>
    </>
  )
}

