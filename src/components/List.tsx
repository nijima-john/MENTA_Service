import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '../app/store'
import { completeTask, type Todo } from '../features/todo/todoSlice'

export const List: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const todos = useSelector((state: RootState) => state.todos.todos)
  const hideCompleted = useSelector((state: RootState) => state.todos.hideCompleted)

  return (
    <>
      <h1>Todolist</h1>
      {todos.map(
        (todo: Todo) =>
          (!hideCompleted || !todo.isCompleted) && (
            <div key={todo.id}>
              <div>
                <input
                  type="checkbox"
                  onClick={() => {
                    dispatch(completeTask(todo))
                  }}
                  checked={todo.isCompleted}
                />
                <span>内容: {todo.content}</span>
              </div>
            </div>
          )
      )}
    </>
  )
}
