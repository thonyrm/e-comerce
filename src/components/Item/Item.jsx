import './Item.css'

const Item = ({id,nombre,precio,img,stock}) => {
    return (
        <div className='card'>
            <img src={img} alt={nombre} />
            <h3>Nombre : {nombre}</h3>
            <p>Precio : {precio}</p>
            <p>ID : {id}</p>
            <p>Stock : {stock}</p>

        </div>
    )
}

export default Item
