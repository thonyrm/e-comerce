import { useContext, useState } from 'react'
import { CarritoContext } from '../../context/CarritoContext'
import { db } from '../../services/config';
import { addDoc, collection, getDoc, doc, updateDoc} from 'firebase/firestore';
import './Checkout.css'

const Checkout = () => {
    const {carrito, clearCart, total, cantidadTotal} = useContext(CarritoContext);

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirm, setEmailConfirm] = useState("");
    const [error, setError] = useState("");
    const [orderId, setOrderId] = useState("");

    const manejadorFormulario = (event) =>{
        event.preventDefault();
        if( !nombre || !apellido || !telefono || !email || !emailConfirm){
            setError("Por favor complete todos los campos");
            return;
        }
        if(email !== emailConfirm){
            setError("Los campos de email no coinciden");
            return;
        }
        const orden ={
            items : carrito.map(item =>({
                id: item.item.id,
                nombre: item.item.nombre,
                cantidad: item.cantidad
            })),
            total: total,
            nombre,
            apellido,
            telefono,
            email,
            fecha: new Date(),
        };

        Promise.all(orden.items.map(async (itemOrden)=>{
            const docRef = doc(db, "productos", itemOrden.id);
            // Por cada producto en la coleccion "productos", 
            //obtengo una referencia, y a partir de esa referencia obtengo el documento
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()){
                const stockActual = docSnap.data().stock;
                if (stockActual >= itemOrden.cantidad){
                    await updateDoc(docRef,{
                        stock: stockActual - itemOrden.cantidad
                    });
                } else {
                    throw new Error (`No hay stock suficiente del producto: ${itemOrden.nombre}`);
                }
            } else {
                throw new Error (` El producto con ID ${itemOrden.id} no existe`)
            }
        }))
        .then(()=>{
            addDoc(collection(db,"ordenes"), orden)
            .then((docRef)=>{
                setOrderId(docRef.id);
                clearCart();
                setNombre("");
                setApellido("");
                setTelefono("");
                setEmail("");
                setEmailConfirm("");
            })
            .catch((error) => {
                setError(error.messge);
            })
        })

    }

    return (
        <div className='checkout-container'>
            <h2 className='checkout-title'>Checkout</h2>
            <form onSubmit={manejadorFormulario}  className='checkout-item'>
                {
                    carrito.map((item)=>(
                        <div key={item.item.id} className='checkout-item'>
                            <p><strong>{item.item.nombre}</strong> x {item.cantidad}</p>
                            <p>Precio: ${item.item.precio}</p>
                            <p>Subtotal: ${item.item.precio * item.cantidad}</p>
                            <hr />
                        </div>
                    ))
                }
                <h3 className='checkout-total'> Total a pagar: ${total}</h3>
                <h3 className='checkout-total'> Cantidad total de productos: ${cantidadTotal}</h3>
                <div className='form-group'>
                    <label>Nombre</label>
                    <input 
                        type="text" 
                        value={nombre}
                        onChange={(e)=> setNombre(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>Apellido</label>
                    <input 
                        type="text" 
                        value={apellido}
                        onChange={(e)=> setApellido(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>Teléfono</label>
                    <input 
                        type="number" 
                        value={telefono}
                        onChange={(e)=> setTelefono(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>Email</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>Confirmar email</label>
                    <input 
                        type="email" 
                        value={emailConfirm}
                        onChange={(e)=> setEmailConfirm(e.target.value)}
                    />
                </div>
                <button type='submit' className='btn-checkout'>Confirmar compra</button>

            </form>
            { error && <p className='checkout-error'>{error}</p> }
            {
                orderId && 
                (
                    <strong className='checkout-success'>
                        ¡Gracias por tu compra! Tu número de orden es : <span> {orderId}</span> 
                    </strong>
                )
            }
        </div>
    )
}

export default Checkout
