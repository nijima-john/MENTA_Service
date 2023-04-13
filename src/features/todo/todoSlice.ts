import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface Todo {
  id: string
  content: string
  isCompleted: boolean
}

export interface EditActionPayload {
  id: string
  content: string
}

const state = {
  todos: [
    {
      id: 'fc3e9096-1970-b847-e5af-428810dacd6a',
      content: 'テスト1の内容',
      isCompleted: false,
    },
    {
      id: '98705c6a-feee-9754-c953-94bd5d129390',
      content: 'テスト2の内容',
      isCompleted: true,
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
    toggleCompleteTask: (state, action: PayloadAction<Todo>) => {
      const { id } = action.payload
      state.todos = state.todos.map((todo) => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo))
    },
    toggleHideCompleted: (state) => {
      state.hideCompleted = !state.hideCompleted
    },
    editContent: (state, action: PayloadAction<EditActionPayload>) => {
      const { id, content } = action.payload
      state.todos = state.todos.map((todo) => (todo.id === id ? { ...todo, content } : todo))
    },
  },
})

export const { add, remove, toggleHideCompleted, toggleCompleteTask, editContent } = todosSlice.actions
