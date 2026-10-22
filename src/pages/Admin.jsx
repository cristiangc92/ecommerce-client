import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';

export default function Admin() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const [categories, setCategories] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [image, setImage] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [msg, setMsg] = useState({ text: "", type: "" })

  useEffect(() => {
    // Proteger vista solo para Admin
    if (!user || user.role !== "admin") {
      navigate("/")
      return
    }
    fetchCategories()
  }, [user])

  const fetchCategories = async () => {
    try {
      const res = await API.get("/products/categories")
      setCategories(res.data)
      if (res.data.length > 0) setCategoryId(res.data[0].id)
    } catch (err) {
      console.error(err)
    }
  }

  const handleCreateProduct = async (e) => {
    e.preventDefault()
    setMsg({ text: "", type: "" })

    try {
      await API.post("/products", {
        title,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        image,
        categoryId
      })

      setMsg({ text: "✅ Producto creado con éxito", type: "success" })
      setTitle("")
      setDescription("")
      setPrice("")
      setStock("")
      setImage("")
    } catch (err) {
      setMsg({ text: err.response?.data?.error || "Error al crear producto", type: "error" })
    }
  }

  return (
    <div className="container" style={{ maxWidth: "600px" }}>
      <h2>Panel de Administración - Cargar Producto</h2>

      {msg.text && (
        <div
          style={{
            padding: "0.8rem",
            margin: "1rem 0",
            borderRadius: "6px",
            backgroundColor: msg.type === "success" ? "#dcfce7" : "#fee2e2",
            color: msg.type === "success" ? "#166534" : "#991b1b",
          }}
        >
          {msg.text}
        </div>
      )}

      <form onSubmit={handleCreateProduct} style={{ marginTop: "1.5rem", background: "white", padding: "1.5rem", borderRadius: "8px" }}>
        <label style={{ display: "block", marginBottom: "0.3rem", fontWeight: "bold" }}>Título del Producto</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label style={{ display: "block", marginBottom: "0.3rem", fontWeight: "bold" }}>Descripción</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />

        <div style={{ display: "flex", gap: "1rem" }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "0.3rem", fontWeight: "bold" }}>Precio ($)</label>
            <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "0.3rem", fontWeight: "bold" }}>Stock Inicial</label>
            <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
          </div>
        </div>

        <label style={{ display: "block", marginBottom: "0.3rem", fontWeight: "bold" }}>Categoría</label>
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <label style={{ display: "block", marginBottom: "0.3rem", fontWeight: "bold" }}>URL de Imagen</label>
        <input type="url" placeholder="https://..." value={image} onChange={(e) => setImage(e.target.value)} />

        <button type="submit" style={{ width: "100%", marginTop: "1rem" }}>
          Guardar Producto
        </button>
      </form>
    </div>
  )
}