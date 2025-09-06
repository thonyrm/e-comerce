# 🛒 Tienda E-commerce con React y Firebase

Este proyecto es una aplicación de **e-commerce básica**, desarrollada como práctica de un curso de **React**.  
La app permite explorar productos de supermercado, añadirlos a un carrito y finalizar la compra generando una orden almacenada en **Firebase**.

## 🚀 Características principales
- 📦 Visualización de productos disponibles según su stock en tiempo real.
- 🛍️ Carrito de compras dinámico con actualización de cantidades y totales.
- ✅ Validación de datos de cliente al confirmar la compra.
- 🔥 Integración con **Firebase** para persistencia de productos y órdenes.
- 🎉 Notificaciones amigables con **Toastify**.

## 🛠️ Tecnologías utilizadas
- [Vite](https://vitejs.dev/) — entorno de desarrollo rápido.
- [React](https://react.dev/) — librería principal.
- [React Router DOM](https://reactrouter.com/) — navegación de la app.
- [Firebase](https://firebase.google.com/) — base de datos y backend.
- [React-Toastify](https://fkhadra.github.io/react-toastify/) — notificaciones.

## 📂 Estructura del proyecto

```
├─ components/ # Componentes reutilizables (Navbar, ItemList, Loader, etc.)
├─ context/ # Contexto de carrito (CarritoContext)
├─ services/ # Configuración de Firebase
└─ App.jsx # Punto de entrada principal
```

## 🔧 Setup del proyecto

1. Clonar el repositorio:
   ```
   git clone https://github.com/tu-usuario/tu-repo.git
   ```
2. Instalar dependencias:

    ```
    npm install
    ```

3. Ejecutar en modo desarrollo:
    ```
    npm run dev
    ```

## 🌐 Demo en línea
Puedes probar el proyecto funcionando aquí:  
👉 [Tienda E-commerce en Netlify](https://cd-ecomerce-88010.netlify.app/)