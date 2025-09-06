import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../../services/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import ItemList from '../ItemList/ItemList';
import './ItemListContainer.css'

const ItemListContainer = () => {
    const[productos, setProductos] = useState([]);
    const{categoria} = useParams();
    console.log(categoria)

    useEffect(()=>{
        const productRef = collection(db, "productos");
        const q = categoria ? query(productRef, where("categoria", "==" , categoria)) : productRef;
    
        getDocs(q)
            .then((res) => {
                const items = res.docs.map( (doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProductos(items);
               
            })
            .catch((error) =>{
                console.error("Error fetching products:", error)
            })
    },
    [categoria]);
    return (
        <div>
            <h2 className='textStyle'>
                Mis Productos
            </h2>
            <div>
                <ItemList productos={productos}/>
            </div>
        </div>
    )
}

export default ItemListContainer
