import { BrowserRouter , Routes, Route } from 'react-router-dom'
import NavBar from './components/NabBar/NavBar'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import Error from './components/Error/Error'
import { CarritoProvider } from './context/CarritoContext'

import './App.css'


function App() {

  return (
    <>
      <BrowserRouter>
        <CarritoProvider>
          <NavBar/>
          <Routes>
            <Route path='/' element={<ItemListContainer/>} />
            <Route path='/categoria/:categoria' element={<ItemListContainer/>}/>
            
            <Route path='*' element={<Error/>}/>
          </Routes>
        </CarritoProvider>
      </BrowserRouter>
    </>
  
  )
}

export default App
