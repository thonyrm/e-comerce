import { Link } from 'react-router-dom'
import './CartWidget.css'

const CartWidget = () => {
    return (
        <div className='cart-widget'>
            <Link to='/cart' className='linkCarrito'>
                <img className='imgCarrito' src="../../../img/carrito.png" alt="Carrito de compras" />
            </Link>
        
        </div>
    )
}

export default CartWidget
