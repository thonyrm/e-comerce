import { useState, createContext } from "react"

export const CarritoContext = createContext({
    carrito:[],
    total:0,
    cantidadTotal:0
})

export const CarritoProvider = ({children}) => {

    const[carrito,setCarrito] = useState([]);
    const[total , setTotal] = useState(0);
    const[cantidadTotal ,setCantidadTotal] = useState(0);

    const addItem = (item , cantidad) =>{
        const existingItem = carrito.find(product => product.item.id === item.id);
        if (existingItem){
            const updatedCart = carrito.map(product =>{
                 console.log(product)
                if(product.item.id === item.id){
                    return{ ...product, cantidad: product.cantidad +cantidad}
                }else{
                    return product;
                }
            });
            setCarrito(updatedCart);
            setTotal(prev => prev + cantidad);
            setCantidadTotal(prev => prev + (item.precio * cantidad))

        } else{
            setCarrito(prev => [...prev, {item, cantidad}]);
            setTotal( prev => prev + (item.precio * cantidad));
            setCantidadTotal( prev => prev + cantidad)
        }

    }
    const deleteItem = (id) =>{
        const itemToDelete = carrito.find(product => product.item.id = id);
        setCarrito( carrito.filter(product => product.item.id !== id));
        setTotal(prev => prev - (itemToDelete.item.precio * itemToDelete.cantidad));
        setCantidadTotal(prev => prev - itemToDelete.cantidad);
    }

    const clearCart = () =>{
        setCarrito([]);
        setTotal(0);
        setCantidadTotal(0);
    }
 

    return(
        
        <CarritoContext.Provider value={{carrito, total, cantidadTotal, addItem, deleteItem, clearCart}}>
            {children}
        </CarritoContext.Provider>
        
    );
}