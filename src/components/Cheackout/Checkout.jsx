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
    const [loading, setLoading] = useState(false);

    const manejadorFormulario = (event) =>{
        event.preventDefault();
        
        if( !nombre || !apellido || !telefono || !email || !emailConfirm){
            setError("Por favor complete todos los campos");
            return;
        }
        if (telefono.length < 8) {
            setError("El número de teléfono debe tener al menos 8 dígitos");
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
            setLoading(true); // 🔹 Activa spinner
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
            .finally(()=>{
                setLoading(false);
            })
        })
    }

    return (
        <div className='checkout-container'>
            <h2 className='checkout-title'>Checkout</h2>
            <form onSubmit={manejadorFormulario}  className='checkout-form'>
                {
                    carrito.map((item)=>(
                        <div key={item.item.id} className='checkout-item'>
                            <p><strong>{item.item.nombre}</strong> x {item.cantidad}</p>
                            <p>Precio: ${item.item.precio}</p>
                            <p>Subtotal: ${item.item.precio * item.cantidad}</p>
                            
                        </div>
                    ))
                }
                <div className='checkout-total'>
                    <h3> Total a pagar: ${total}</h3>
                    <h3> Cantidad total de productos: ${cantidadTotal}</h3>
                </div>
                
                <div className='form-group'>
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        value={nombre}
                        onChange={(e)=> {
                            setNombre(e.target.value);
                            setError("");
                        }}
                    />
                </div>
                <div className='form-group'>
                    <label>Apellido: </label>
                    <input 
                        type="text" 
                        value={apellido}
                        onChange={(e)=> {
                            setApellido(e.target.value);
                            setError("");
                        }}
                    />
                </div>
                
                <div className='form-group'>
                    <label>Teléfono: </label>
                    <input 
                        type="number" 
                        value={telefono}
                        onChange={(e)=> {
                            setTelefono(e.target.value);
                            setError(""); 
                        }}
                    />
                </div>
                <div className='form-group'>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e)=> {
                            setEmail(e.target.value);
                            setError(""); 
                        }}
                    />
                </div>
                <div className='form-group'>
                    <label>Confirmar email:</label>
                    <input 
                        type="email" 
                        value={emailConfirm}
                        onChange={(e)=> {
                            setEmailConfirm(e.target.value);
                            setError(""); 
                        }}
                    />
                </div>
                
                <button 
                    type='submit' 
                    className='btn-checkout'
                    disabled = {cantidadTotal === 0}
                >
                    {loading ? (
                        <span className="spinner"></span>  // 🔹 spinner
                    ) : (
                        "Confirmar compra"
                    )}
                    
                </button>

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
