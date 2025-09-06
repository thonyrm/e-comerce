import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CarritoContext } from '../../context/CarritoContext'

import './CartWidget.css'

const CartWidget = () => {
    const {cantidadTotal} = useContext(CarritoContext)
    return (
        <div className='cart-widget'>
            <Link to='/cart' className='linkCarrito'>
                <img className='imgCarrito' src="../../../img/carrito.png" alt="Carrito de compras" />
            </Link>
            {
            cantidadTotal > 0 &&(
                <span className='cantidadCarrito'>{cantidadTotal}</span>
            )

        }
        
        </div>
        
    )
}

export default CartWidget
