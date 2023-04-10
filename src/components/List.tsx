/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, type RootState } from '../app/store';
import { editContent, remove } from "../features/todo/todoSlice"
import { ListItemEdit } from './ListItemEdit';
import { ListItem } from './ListItem';
import { Button } from '@mui/material';

export const List: React.FunctionComponent = () => {

  const dispatch = useAppDispatch()
  const todos = useSelector((state: RootState) => state.todos.todos)
  const [isEditing, setIsEditing] = useState(false);
  const [editingState, setEditingState] = useState({
    id: "",
    content: "",
    isCompleted: false,
  });
  const [sort, setSort] = useState<any>({
    key: 'content',
    order: 1,
  });
  const removeTodo = (id: string): void => {
    dispatch(remove(id))
  }
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
      // orderにマイナスをつけることで、ソートの並びを反転させる。
      setSort({ ...sort, order: -sort.order });
      console.log(sort)
    } else {
      // 昇順にするために、orderは1を設定。
      setSort({
        key,
        order: 1
      })
      console.log(sort)
    }
  };

  const sortedTodos = useMemo(() => {
    let _sortedTodos = todos;
    if (sort.key) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _sortedTodos = _sortedTodos.sort((a, b): any => {
        a = a[sort.key];
        b = b[sort.key];

        if (a === b) {
          return 0;
        }
        if (a > b) {
          return 1 * sort.order;
        }
        if (a < b) {
          return -1 * sort.order;
        }
      });
    }
    return _sortedTodos;
  }, [sort, todos]);


  return (
    <>

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
                  {key}

                </Button>
              ))}

              {sortedTodos.map(({ id, content, isCompleted }) => {
                return (
                  <div key={id}>
                    <ListItem listKey={id} isCompleted={isCompleted} content={content} removeTodo={removeTodo} handleEditButtonPushed={handleEditButtonPushed} />
                  </div>
                );
              })}
            </div>
          </>
      }
    </>
  )
}