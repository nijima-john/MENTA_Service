

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, type RootState } from '../app/store';
import { editContent, fetchAPI, useFilteredList } from "../features/todo/todoSlice"
import { ListItemEdit } from './ListItemEdit';
import { ListItem } from './ListItem';
import { Button } from '@mui/material';

export const List: React.FunctionComponent = () => {

  const dispatch = useAppDispatch()
  const hideCompleted = useSelector((state: RootState) => state.todos.hideCompleted)
  const [sort, setSort] = useState({
    key: 'content',
    order: 1,
  })
  const [searchContent, setSearchContent] = useState('')
  const [isEditing, setIsEditing] = useState(false);
  const [editingState, setEditingState] = useState({
    id: "",
    content: "",
    isCompleted: false,
  });


  const handleEditButtonPushed = (id: string, content: string): void => {
    setIsEditing(true)
    setEditingState({
      ...editingState, id, content
    })
  }

  const handleChange = (e: { target: { name: string; value: string; }; }): void => {
    setEditingState({
      ...editingState,
      [e.target.name]: e.target.value,
    })
  }

  const { content, id } = editingState;

  const onInput = (e: React.FormEvent<HTMLInputElement>): void => {
    setSearchContent(e.currentTarget.value);
  }

  const editTodo = (): void => {
    if (content === '') {
      return;
    }
    dispatch(editContent({
      content, id
    }));
    setIsEditing(false);
  }

  // const KEYS = Object.keys(todos[0])

  const fetchPostAPI = (): void => {
    void dispatch(fetchAPI());
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSort = (): void => {
    setSort({ ...sort, order: -sort.order });
  };

  const filteredList = useFilteredList(sort, searchContent)

  return (
    <>
      <input
        type="text"
        onInput={onInput}
        placeholder={"検索"}
      />
      <button onClick={fetchPostAPI}>api</button>

      {
        isEditing ?
          <ListItemEdit content={content} handleChange={handleChange} editTodo={editTodo} />
          :
          <>
            <h1>Todolist</h1>
            <div>
              <Button variant="contained" onClick={() => { handleSort() }} >内容で並び替え</Button>

              {filteredList.map((todo) => {
                const { id, isCompleted } = todo
                return (
                  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                  (!hideCompleted || !isCompleted) && (
                    <div key={id}>
                      <ListItem
                        todo={todo}
                        handleEditButtonPushed={handleEditButtonPushed} />
                    </div>
                  ));
              })}
            </div>
          </>
      }
    </>
  )
}