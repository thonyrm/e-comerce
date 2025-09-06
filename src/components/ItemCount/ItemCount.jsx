
import { useState } from 'react'
import './ItemCount.css'

const ItemCount = ({inicial, stock,funcionAgregar}) => {

    const [contador, setContador] = useState(1);
    const incrementar = () =>{
        if (contador < stock){
            setContador(contador + 1);
        }
    } 
    const decrementar = () =>{
        if (contador > inicial){
            setContador(contador - 1);
        }
    } 
    return (
        <div className='item-count'>
            <div className='item-count__controls'>
                <button className="btn-counter" onClick={decrementar}> - </button>
                <span className='item-count__number'> {contador}</span>
                <button className='btn-counter' onClick={incrementar}> + </button>

            </div>
            <button 
                className='btn-add' 
                onClick={() => funcionAgregar(contador)}
            > 
                Agregar al carrito
            </button>
        
        </div>
    )
}

export default ItemCount
