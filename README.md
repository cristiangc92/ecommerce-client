# 🛒 TechStore Express - Full Stack E-commerce

Plataforma de comercio electrónico de nicho desarrollada con el stack **PERN** (PostgreSQL, Express, React, Node.js) y **Vite**. Cuenta con autenticación por roles, gestión de carrito persistente y panel de administración para carga de catálogo.

🚀 **Demo en vivo:** [Link de Vercel](https://ecommerce-client-gold.vercel.app/)  
🔌 **API REST:** [Link de Railway](https://ecommerce-api-production-0ed5.up.railway.app/api/prueba)

---

## 🔑 Credenciales Demo para Pruebas

- **Rol Admin:** `admin@ecommerce.com` | `password123`
- **Rol Cliente:** `cliente@ecommerce.com` | `password123`

---

## 💻 Tecnologías Utilizadas

### Frontend
- **React 18** + **Vite**
- **React Router DOM** (Navegación SPA)
- **Context API** (Gestión global de Estado para Carrito y Autenticación)
- **Axios** (Interceptores para envío automático de Token JWT)
- **Lucide React** (Iconografía)

### Backend & Base de Datos
- **Node.js** & **Express**
- **PostgreSQL** & **Sequelize ORM**
- **JSON Web Tokens (JWT)** & **Bcryptjs** (Seguridad y Hash de contraseñas)
- **Transacciones SQL** (Checkout seguro y control de stock)

---

## ⚙️ Características Clave

- 🔐 **Autenticación JWT & RBAC:** Registro e inicio de sesión seguro con distinción de roles (`admin` y `customer`).
- 🛒 **Carrito Persistente:** Estado global sincrónico almacenado en `localStorage`.
- 📦 **Checkout Transaccional:** Validación y descuento en tiempo real del stock de productos mediante transacciones relacionales.
- 🛡️ **Panel Admin Protegido:** Vista exclusiva para que administradores gestionen categorías y nuevos productos.
- 🔍 **Filtros Dinámicos:** Búsqueda en tiempo real por palabra clave y filtrado por categoría.

---

## 🚀 Ejecución en Local

### Backend (`ecommerce-api`)
```bash
git clone https://github.com/cristiangc92/ecommerce-api.git
cd ecommerce-api
npm install
# Configurar .env con PORT, DATABASE_URL y JWT_SECRET
npm run dev
```

### Frontend (ecommerce-client)
```bash
git clone https://github.com/cristiangc92/ecommerce-client.git
cd ecommerce-client
npm install
# Configurar .env con VITE_API_URL
npm run dev
```