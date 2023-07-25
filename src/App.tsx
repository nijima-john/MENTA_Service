import { Form } from './components/Form'
import { List } from './components/List'

const App: React.FunctionComponent = () => {
  return (
    <>
      <div style={{ marginTop: '5%', marginLeft: '5%' }}>
        <Form />
        <div style={{ marginTop: '5%' }}>
          <List />
        </div>
      </div>
    </>
  )
}

export default App
