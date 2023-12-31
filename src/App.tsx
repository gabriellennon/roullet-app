import { Settings, User } from 'lucide-react'
import './App.css'
import SpinWheel from './components/SpinWheel'
import { Button } from './components/Button'

function App() {
  return (
    <main className='bg-[#00875F] min-h-screen flex flex-1 items-end justify-center flex-col px-12'>
      <div className='bg-[#202024] rounded-3xl px-[18px] py-[10px] flex items-center justify-center gap-4 mt-4'>
        <Button title='settings'>
            <Settings color='#E1E1E6'/>
        </Button>
        <Button title='profile'>
          <User color='#E1E1E6' />
        </Button>
      </div>
      <div 
        className='bg-[#202024] flex flex-1 flex-col items-center justify-center w-full max-w-[1340px] h-[calc(100vh - 10rem)] mt-4 mb-20 mx-auto rounded-lg'
      >
        <div className='mb-8 text-center'>
          <h1 className='font-bold text-4xl text-[#E1E1E6] uppercase'>Gire a roleta</h1>
          <p className='text-lg text-[#E1E1E6]'>E garanta o seu prêmio!</p>
        </div>
        <SpinWheel />
      </div>
    </main>
  )
}

export default App
