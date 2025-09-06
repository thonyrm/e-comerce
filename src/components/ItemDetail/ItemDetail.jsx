import { useContext, useState } from 'react'
import { CarritoContext } from '../../context/CarritoContext';
import { Link } from 'react-router-dom';
import ItemCount from '../ItemCount/ItemCount';
import { toast } from 'react-toastify';

import './ItemDetail.css'

const ItemDetail = ({id, nombre, precio, img,stock, descripcion}) => {
    const [agregarCantidad, setAgregarCantidad] = useState();
    const { addItem } = useContext(CarritoContext);
    
    const manejadorCantidad = (cantidad) => {
        setAgregarCantidad(cantidad);
        const item = {id, nombre, precio};
        addItem(item, cantidad);
        toast.success("Compra enviada al carrito", {autoClose:1000 , theme: 'light',position: 'top-right' })
    }

    return (
        <div className='item-detail'>
            <div className='item-detail__image'>
                <img src={img} alt={nombre}/>
            </div>
            <div className='item-detail__info'>
                <h2>{nombre}</h2>
                <h3>Precio: ${precio}</h3>
                <h4>ID : {id}</h4>
                <p>{descripcion}</p>
                {
                    agregarCantidad > 0 ? 
                    (<Link to='/cart'> <button className='btn-add'>Terminar compra</button> </Link>)
                    :
                    (<ItemCount inicial ={1} stock={stock} funcionAgregar ={manejadorCantidad}/>)
                }
            </div>
        </div>
    )
}

export default ItemDetail
