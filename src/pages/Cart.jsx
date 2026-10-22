import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalAmount } = useContext(CartContext)
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const handleCheckout = async () => {
    if (!user) {
      alert("Debes iniciar sesión para finalizar la compra")
      return navigate("/login")
    }

    if (cart.length === 0) return

    setLoading(true)
    setMessage("")

    try {
      const items = cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity
      }))

      await API.post("/orders", { items })
      
      setMessage("🎉 ¡Compra realizada con éxito!")
      clearCart()
    } catch (err) {
      console.error(err)
      setMessage(err.response?.data?.error || "Error al procesar la compra")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container" style={{ maxWidth: "800px" }}>
      <h2>Tu Carrito de Compras</h2>

      {message && (
        <div style={{ padding: "1rem", backgroundColor: "#dcfce7", color: "#166534", borderRadius: "6px", margin: "1rem 0" }}>
          {message}
        </div>
      )}

      {cart.length === 0 ? (
        <div style={{ textAlign: "center", margin: "3rem 0", color: "#64748b" }}>
          <ShoppingBag size={48} style={{ marginBottom: "1rem" }} />
          <p>Tu carrito está vacío.</p>
          <button onClick={() => navigate("/")} style={{ marginTop: "1rem" }}>Volver al Catálogo</button>
        </div>
      ) : (
        <div style={{ marginTop: "1.5rem" }}>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
                backgroundColor: "white",
                borderRadius: "8px",
                marginBottom: "1rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <img
                  src={item.image ||"https://via.placeholder.com/60"}
                  alt={item.title}
                  style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "4px" }}
                />
                <div>
                  <h4>{item.title}</h4>
                  <p style={{ color: "var(--primary)", fontWeight: "bold" }}>${Number(item.price).toFixed(2)}</p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <button onClick={() => updateQuantity(item.id, -1)} style={{ padding: "0.2rem 0.5rem" }}>
                    <Minus size={14} />
                  </button>
                  <span style={{ fontWeight: "bold" }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} style={{ padding: "0.2rem 0.5rem" }}>
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{ backgroundColor: "transparent", color: "var(--danger)", padding: 0 }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "2rem",
              paddingTop: "1rem",
              borderTop: "2px solid #e2e8f0",
            }}
          >
            <h3>Total: ${totalAmount.toFixed(2)}</h3>
            <button onClick={handleCheckout} disabled={loading} style={{ padding: "0.8rem 1.5rem", fontSize: "1rem" }}>
              {loading ? "Procesando..." : "Finalizar Compra"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}