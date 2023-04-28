

import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, type RootState } from '../app/store';
import { editContent } from "../features/todo/todoSlice"
import { ListItemEdit } from './ListItemEdit';
import { ListItem } from './ListItem';
import { Button } from '@mui/material';
import escapeStringRegexp from 'escape-string-regexp';

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
  // IDのkeyを消す

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

  const sortedTodos = useMemo(() => {
    const copy = [...todos]
    let _sortedTodos = copy;
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (sort.key) {
      _sortedTodos = _sortedTodos.sort((a, b) => {
        if (sort.key === "isCompleted") {
          const valueA = a.isCompleted;
          const valueB = b.isCompleted;
          return valueA > valueB ? 1 * sort.order : -1 * sort.order;
        } else if (sort.key === "content") {
          const valueA = a.content;
          const valueB = b.content;
          return valueA < valueB ? 1 * sort.order : -1 * sort.order;
        } else if (sort.key === "id") {
          const valueA = a.id;
          const valueB = b.id;
          return valueA > valueB ? 1 * sort.order : -1 * sort.order;
        }
        else {
          return 0;
        }
      });
    }
    return _sortedTodos;
  }, [sort, todos]);

  const filteredList = todos.filter((item) => {
    const escapedText = escapeStringRegexp(searchContent.toLowerCase());
    return new RegExp(escapedText).test(item.content.toLowerCase());
  })

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
              {/* {
                sortedTodos.map((todo) => {
                  const { id, isCompleted } = todo
                  return (
                    (!hideCompleted || !isCompleted) && (
                      <div key={id}>
                        <ListItem
                          todo={todo}
                          handleEditButtonPushed={handleEditButtonPushed} />
                      </div>
                    ));
                })}  */}

              {filteredList.map((todo) => {
                const { id, isCompleted } = todo
                return (
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