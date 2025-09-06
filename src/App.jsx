import { BrowserRouter , Routes, Route } from 'react-router-dom'
import NavBar from './components/NabBar/NavBar'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import Error from './components/Error/Error'
import { CarritoProvider } from './context/CarritoContext'
import Checkout from './components/Cheackout/Checkout'
import ItemDetailsContainer from './components/ItemDetailsContainer/ItemDetailsContainer'
import Cart from './components/Cart/Cart'
import { ToastContainer } from 'react-toastify'

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
            <Route path='/item/:idItem' element ={<ItemDetailsContainer/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/*' element={<Error/>}/>
          </Routes>
        </CarritoProvider>
        <ToastContainer/>
      </BrowserRouter>
    </>
  
  )
}

export default App
