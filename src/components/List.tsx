

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, type RootState } from '../app/store';
import { editContent, useFilteredList } from "../features/todo/todoSlice"
import { ListItemEdit } from './ListItemEdit';
import { ListItem } from './ListItem';
import { Button } from '@mui/material';

export const List: React.FunctionComponent = () => {

  const dispatch = useAppDispatch()
  const todos = useSelector((state: RootState) => state.todos.todos)
  const [isEditing, setIsEditing] = useState(false);
  const [searchContent, setSearchContent] = useState(""); // updateをsetに修正する.
  const [editingState, setEditingState] = useState({
    id: "",
    content: "",
    isCompleted: false,
  });
  const [sort, setSort] = useState<any>({
    key: 'content',
    order: 1,
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

  const hideCompleted = useSelector((state: RootState) => state.todos.hideCompleted)

  const editTodo = (): void => {
    if (content === '') {
      return;
    }
    dispatch(editContent({
      content, id
    }));
    setIsEditing(false);
  }

  const KEYS = Object.keys(todos[0])

  const handleSort = (key: string): void => {
    if (sort.key === key) {
      setSort({ ...sort, order: -sort.order });
    } else {
      setSort({
        key,
        order: 1
      })
    }
  };

  const filteredList = useFilteredList(searchContent, handleSort, sort)

  return (
    <>
      <input
        type="text"
        onInput={onInput}
        placeholder={"検索"}
      />

      {
        isEditing ?
          <ListItemEdit content={content} handleChange={handleChange} editTodo={editTodo} />
          :
          <>
            <h1>Todolist</h1>
            <div>
              {KEYS.map((key, index) => (
                <Button variant="contained"
                  style={{ margin: "5px" }}
                  key={index}
                  onClick={() => { handleSort(key) }}
                >
                  {key}で並び替え
                </Button>
              ))}

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