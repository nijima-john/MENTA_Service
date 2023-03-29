import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface Todo {
  id: string
  content: string
  isCompleted: boolean
}

const state = {
  todos: [
    {
      id: 'fc3e9096-1970-b847-e5af-428810dacd6a',
      content: 'テスト1の内容',
      isCompleted: true,
    },
    {
      id: '98705c6a-feee-9754-c953-94bd5d129390',
      content: 'テスト2の内容',
      isCompleted: false,
    },
  ],
  hideCompleted: false,
}

export const todosSlice = createSlice({
  name: 'todosSlice',
  initialState: state,
  reducers: {
    add: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload)
    },
    remove: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload)
    },
    completeTask: (state, action: PayloadAction<Todo>) => {
      const todo = state.todos.find((t) => t.id === action.payload.id)
      if (todo != null) {
        todo.isCompleted = !todo.isCompleted
      }
    },
    toggleHideCompleted: (state) => {
      state.hideCompleted = !state.hideCompleted
    },
    /*
    togleTodo: (state, action: PayloadAction<any>) => {
      // eslint-disable-next-line no-self-assign
      state.todos.map((todo) =>
        todo.id === action.payload ? (todo.isCompleted = !todo.isCompleted) : (todo.isCompleted = todo.isCompleted)
      )
    },
    */
  },
})

export const { add, remove, completeTask, toggleHideCompleted } = todosSlice.actions
