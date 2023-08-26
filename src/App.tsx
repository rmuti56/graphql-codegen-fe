
import './App.css'
import { useCatsQuery } from './generated'

function App() {
  const { data, isLoading} = useCatsQuery()

  if (isLoading) {
    return '...'
  }
  
  return data?.cats?.map(cat => <div>
    {cat.description}
  </div>)
}

export default App
