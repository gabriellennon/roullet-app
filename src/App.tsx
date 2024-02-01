import './App.css'
import { AuthContextProvider } from './contexts/AuthContext'
import Router from './routes/router'

function App() {

  return ( 
    <AuthContextProvider>
      <Router /> 
    </AuthContextProvider>
  )
}

export default App
