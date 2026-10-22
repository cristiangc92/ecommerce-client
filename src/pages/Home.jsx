import { useState, useEffect, useContext } from 'react';
import { ShoppingCart } from 'lucide-react';
import API from '../services/api';
import { CartContext } from '../context/CartContext';

export default function Home() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [search, setSearch] = useState("")
    const [selectedCat, setSelectedCat] = useState("")
    const { addToCart } = useContext(CartContext)

    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
        fetchProducts()
    }, [search, selectedCat])

    const fetchCategories = async () => {
        try {
            const res = await API.get("/products/categories")
            setCategories(res.data)
        } catch (err) {
            console.error(err)
        }
    };

    const fetchProducts = async () => {
        try {
            const res = await API.get("/products", {
                params: { search, categoryId: selectedCat },
            });
            setProducts(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="container">
            <h2>Catálogo de Productos</h2>

            <div style={{ display: "flex", gap: "1rem", margin: "1.5rem 0" }}>
                <input
                    type="text"
                    placeholder="Buscar producto por nombre..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ marginBottom: 0 }}
                />
                <select
                    value={selectedCat}
                    onChange={(e) => setSelectedCat(e.target.value)}
                    style={{ marginBottom: 0, maxWidth: "250px" }}
                >
                    <option value="">Todas las Categorías</option>
                    {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
            </div>

            <div className="grid">
                {products.map((p) => (
                    <div key={p.id} className="product-card">
                        <img
                            src={p.image || "https://via.placeholder.com/300x200?text=Sin+Imagen"}
                            alt={p.title}
                            className="product-img"
                        />
                        <div className="product-body">
                            <div>
                                <div className="product-title">{p.title}</div>
                                <p style={{ fontSize: "0.85rem", color: "#64748b" }}>{p.description}</p>
                            </div>
                            <div>
                                <div className="product-price">${Number(p.price).toFixed(2)}</div>
                                <button
                                    onClick={() => addToCart(p)}
                                    disabled={p.stock <= 0}
                                    style={{ width: "100%", display: "flex", justifyContent: "center", gap: "0.4rem" }}
                                >
                                    <ShoppingCart size={16} />
                                    {p.stock > 0 ? "Agregar al Carrito" : "Agotado"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}