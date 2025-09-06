import { useEffect, useState } from "react"
import {  doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../services/config";
import ItemDetail from "../ItemDetail/ItemDetail";


const ItemDetailsContainer = () => {
    const [producto, setProducto] = useState([]);
    const {idItem} = useParams();

    useEffect(()=>{
        const docRef = doc(db,"productos", idItem);
        
        getDoc(docRef)
            .then((doc) => {
                if(doc.exists()){
                    setProducto( {id: doc.id, ...doc.data() })
                } else{
                    console.log("No such document!")
                }
                
            })
            .catch((error) =>{
                console.log("Error fetching product :", error );
            })


    },[idItem])

    return (
        <div>
            <ItemDetail {...producto}/>
        </div>
    )
}

export default ItemDetailsContainer
