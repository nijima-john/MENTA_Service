
import { type Todo, add } from '../features/todo/todoSlice';
import { v4 as uuidv4 } from 'uuid';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useAppDispatch } from '../app/store';


export const Form = (): any => {

  const dispatch = useAppDispatch()
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


  return (
    <>
      <form>
        <TextField label="todoを入力してください" value={content}
          onChange={e => { setContent(e.target.value); }} >
        </TextField>
        <Button variant="contained"
          onClick={() => { addTodo(content) }}
          style={{ marginLeft: '25px', marginTop: '5px' }}>
          送信
        </Button>
      </form>
    </>
  )
}

