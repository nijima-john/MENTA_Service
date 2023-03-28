import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../app/store';
import { completeTask, type Todo } from "../features/todo/todoSlice"



export const List: React.FunctionComponent = () => {

  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos)

  return (
    <>
      <h1>Todolist</h1>
      {todos.map((todo: Todo) => {
        return (
          <div key={todo.id}>
            <div>
              {todo.isCompleted ?
                <>
                  <input type="checkbox" onClick={() => { (dispatch(completeTask(todo))); }} />
                  <label style={{ marginLeft: "15px", }}>元に戻す</label>
                  <div style={{ opacity: "0" , marginBottom: "15px"}}></div>
                </>
                :
                <>
                  <input type="checkbox" onClick={() => { (dispatch(completeTask(todo))); }} />
                  <label style={{marginLeft: "15px"}}>完了済みにする</label>
                  <h3>内容: {todo.content}</h3>
                </>}
            </div>

          </div>
        )
      })}
    </>
  )
}
