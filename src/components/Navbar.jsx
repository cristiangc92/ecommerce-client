import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, User, ShieldCheck } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

export default function Navbar() {
    const { user, logoutUser } = useContext(AuthContext)
    const { cart } = useContext(CartContext)
    const navigate = useNavigate()

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">TechStore Express</Link>
            <div className="nav-links">
                <Link to="/">Catálogo</Link>
                <Link to="/cart" style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <ShoppingCart size={18} />
                    Carrito {totalItems > 0 && <span className="badge">{totalItems}</span>}
                </Link>

                {user ? (
                    <>
                        {user.role === "admin" && (
                            <Link to="/admin" style={{ color: "#38bdf8", display: "flex", alignItems: "center", gap: "0.2rem" }}>
                                <ShieldCheck size={18} /> Admin
                            </Link>
                        )}
                        <span style={{ fontSize: "0.9rem", opacity: 0.8 }}><User size={14} /> {user.name}</span>
                        <button onClick={() => { logoutUser(); navigate("/login"); }} style={{ background: "transparent", padding: 0 }}>
                            <LogOut size={18} />
                        </button>
                    </>
                ) : (
                    <Link to="/login">Ingresar</Link>
                )}
            </div>
        </nav>
    )
}