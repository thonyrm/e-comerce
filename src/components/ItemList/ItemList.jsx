import Item from '../Item/Item'
import './ItemList.css'
const ItemList = ({productos}) => {
    return (
        <div className='card-container'>
            {productos.map( product => <Item key={product.id}{...product}/>)}
        </div>
    )
}

export default ItemList
