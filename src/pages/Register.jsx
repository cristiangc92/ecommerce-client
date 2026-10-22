import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { name, email, password })
      // Iniciar sesión automático al registrarse
      const loginRes = await API.post("/auth/login", { email, password })
      loginUser(loginRes.data.user, loginRes.data.token)
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.error || "Error al registrarse")
    }
  }

  return (
    <div className="container" style={{ maxWidth: "400px" }}>
      <h2>Crear Cuenta</h2>
      {error && <p style={{ color: "var(--danger)", marginBottom: "1rem" }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
        <input
          type="text"
          placeholder="Nombre Completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button type="submit" style={{ width: "100%" }}>Registrarse</button>
      </form>
      <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
        ¿Ya tenés cuenta? <Link to="/login">Ingresá aquí</Link>
      </p>
    </div>
  )
}