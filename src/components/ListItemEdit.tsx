import { Button, TextField } from '@mui/material'
import React from 'react'

interface Props {
  content: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  editTodo: () => void
}

export const ListItemEdit: React.FunctionComponent<Props> = (props) => {
  const { content, handleChange, editTodo } = props
  return (
    <div>
      <h2>編集してください</h2>
      <TextField type="text" value={content} name="content" onChange={handleChange} />
      <Button
        style={{ marginLeft: '25px', marginTop: '5px' }}
        variant="contained"
        onClick={() => {
          editTodo()
        }}
      >
        更新する
      </Button>
    </div>
  )
}
