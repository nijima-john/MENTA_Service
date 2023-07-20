import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { type RootState } from '../../app/store'
import escapeStringRegexp from 'escape-string-regexp'
import axios from 'axios'

export interface Todo {
  id: string
  content: string
  isCompleted: boolean
}

export interface EditActionPayload {
  id: string
  content: string
}

export interface SearchPayload {
  searchContent: string
}

export interface SortPayload {
  key: string
  order: number
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
  sort: [
    {
      key: 'content',
      order: 1,
    },
  ],
  searchContent: '',
  hideCompleted: false,
}

const POST = 'http://localhost:8000/posts'

export const fetchAPI = createAsyncThunk('api/fetchAPI', async () => {
  const response = await axios.get(POST)
  console.log(response.data)
})

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

export const useFilteredList = (): Todo[] => {
  const todos = useSelector((state: RootState) => state.todos.todos)
  const searchContent = useSelector((state: RootState) => state.todos.searchContent)
  const sort = useSelector((state: RootState) => state.todos.sort)
  // const hideCompleted = useSelector((state: RootState) => state.todos.hideCompleted)
  // const { isCompleted } = todos

  const filteredArray = todos.filter((item) => {
    const escapedText = escapeStringRegexp(searchContent.toLowerCase())
    return new RegExp(escapedText).test(item.content.toLowerCase())
  })

  sort.map((sort) => {
    if (sort.key.length > 0) {
      const sortedArray = filteredArray.sort((a, b) => {
        if (sort.key === 'isCompleted') {
          const valueA = a.isCompleted
          const valueB = b.isCompleted
          return valueA > valueB ? 1 * sort.order : -1 * sort.order
        } else if (sort.key === 'content') {
          const valueA = a.content
          const valueB = b.content
          return valueA < valueB ? 1 * sort.order : -1 * sort.order
        } else if (sort.key === 'id') {
          const valueA = a.id
          const valueB = b.id
          return valueA > valueB ? 1 * sort.order : -1 * sort.order
        } else {
          return 0
        }
      })
      return sortedArray
    }
    return []
  })

  // return (!hideCompleted || !isCompleted) && todos
  return todos
}
