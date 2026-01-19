import { useContext } from "react"
import { CarritoContext } from "../../context/CarritoContext"
import { Link } from "react-router-dom";
import CartItem from "../CartItem/CartItem";
import './Cart.css'

const Cart = () => {
    const {carrito, total, cantidadTotal, clearCart} = useContext(CarritoContext);

    if(cantidadTotal === 0){
        return (
            <div className="cart-empty">
                <h2>No hay productos en el carrito 🛒 </h2>
                <Link to='/'>
                    <button className="btn-primary">Ver productos</button>
                </Link>
            </div>
        )
    }
    
    return (
        <div className="cart">
            <div className="cart-items">
                {carrito.map(product => <CartItem key={product.item.id} {...product}/>)}
            </div>
            <div className="cart-summary">
                <h3><span>Total $ : {total}</span></h3>
                <h3><span>Cantidad Total : {cantidadTotal}</span></h3>
                <div className="cart-actions">
                    <button className="btn-secondary" onClick={()=>clearCart()}>Vaciar carrito</button>
                    <Link to= '/checkout'><button className="btn-primary">Finalizar compra</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Cart
