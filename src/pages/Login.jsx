import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const { loginUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await API.post("/auth/login", { email, password })
            loginUser(res.data.user, res.data.token)
            navigate("/")
        } catch (err) {
            setError(err.response?.data?.error || "Error al iniciar sesión")
        }
    }

    return (
        <div className="container" style={{ maxWidth: "400px" }}>
            <h2>Iniciar Sesión</h2>
            {error && <p style={{ color: "var(--danger)", marginBottom: "1rem" }}>{error}</p>}
            <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
                <input
                    type="email"
                    placeholder="Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" style={{ width: "100%" }}>Ingresar</button>
            </form>
            <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
                ¿No tenés cuenta? <Link to="/register">Registrate aquí</Link>
            </p>
        </div>
    )
}