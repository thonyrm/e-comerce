
import { Link, NavLink } from "react-router-dom"
import './NavBar.css'
import CartWidget from "../CartWidget/CartWidget"
const NavBar = () => {
    return (
        <header className="header">
            <Link to={"/"}>
                <img className="logo" src="../../../img/logo.jpg" alt="Logo" />
            </Link>
            <nav>
                <ul className="nav-links">
                    <li>
                        <NavLink to="categria/alimentos" >Alimentos</NavLink>
                    </li>
                    <li>
                        <NavLink to="categria/limpieza" >Limpieza</NavLink>
                    </li>
                </ul>
            </nav>
            <CartWidget/>
        </header>
    )
}

export default NavBar
