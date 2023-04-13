
import { type Todo, add, toggleHideCompleted } from '../features/todo/todoSlice';
import { v4 as uuidv4 } from 'uuid';
import { Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { type RootState } from '../app/store';

export const Form = (): any => {

  const dispatch = useDispatch();
  const hideCompleted = useSelector((state: RootState) => state.todos.hideCompleted)
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
    dispatch(toggleHideCompleted())
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
      >{hideCompleted ? "完了リストを表示する" : "完了リストを非表示にする"}
      </Button>
    </>
  )
}

