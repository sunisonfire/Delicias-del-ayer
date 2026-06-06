# 🍰 Delicias del Ayer

Una aplicación web interactiva de pastelería artesanal inspirada en la estética **Kawaii Vintage**, diseñada para ofrecer una experiencia visual acogedora y nostálgica mientras permite explorar productos, gestionar un carrito de compras y compartir recuerdos relacionados con los postres favoritos de los clientes.

---

## 📖 Descripción

**Delicias del Ayer** es una Single Page Application (SPA) desarrollada con tecnologías web nativas que simula el sitio web de una pastelería artesanal. El proyecto combina una estética inspirada en álbumes de recuerdos, fotografías Polaroid y scrapbooks vintage con funcionalidades dinámicas de búsqueda, filtrado, carrito de compras y participación de usuarios mediante un libro de recuerdos interactivo.

---

## 🎯 Objetivos del Proyecto

* Mostrar un catálogo dinámico de productos de repostería.
* Consumir información desde Google Sheets mediante una API.
* Implementar filtros y búsquedas en tiempo real.
* Gestionar un carrito de compras funcional.
* Aplicar persistencia de datos utilizando LocalStorage.
* Permitir a los usuarios compartir recuerdos y fotografías.
* Desarrollar una interfaz moderna, responsive y accesible utilizando únicamente HTML, CSS y JavaScript.

---

## 🛠 Tecnologías Utilizadas

* HTML5
* CSS3
* JavaScript Vanilla (ES6+)
* Google Sheets API
* Google Fonts
* LocalStorage

---

## ✨ Características Principales

### 🎨 Interfaz Kawaii Vintage

* Diseño inspirado en scrapbooks y álbumes de recuerdos.
* Tarjetas de productos estilo Polaroid.
* Paleta de colores pastel y tonos cálidos.
* Sombras tipo sticker y bordes decorativos.

### 🌙 Modo Noche Mágica

* Cambio dinámico entre tema claro y oscuro.
* Preferencia almacenada en LocalStorage.

### 🟢 Estado de la Tienda

* Indicador automático de tienda abierta o cerrada.
* Basado en el horario local del usuario (9:00 AM - 10:00 PM).

### 🍩 Catálogo Dinámico

* Carga automática de productos desde Google Sheets.
* Soporte para imágenes, precios, categorías y niveles de dulzor.
* Imágenes de respaldo cuando una URL no es válida.

### 🔍 Sistema de Filtros

* Búsqueda en tiempo real.
* Filtrado por categoría.
* Filtrado por nivel máximo de dulzor.

### 🛒 Carrito de Compras

* Agregar productos.
* Modificar cantidades.
* Eliminar artículos.
* Calcular subtotales y total general.
* Persistencia mediante LocalStorage.

### 📸 Libro de Recuerdos

* Publicación de experiencias de clientes.
* Carga de imágenes mediante Drag & Drop.
* Vista previa instantánea.
* Almacenamiento local de recuerdos.

---

## 📂 Estructura del Proyecto

```text
DeliciasDelAyer/
│
├── index.html
├── styles.css
├── script.js
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── backgrounds/
│
└── README.md
```

---

## 🚀 Funcionalidades Implementadas

### Catálogo

* Visualización dinámica de productos.
* Tarjetas responsivas.
* Indicador visual de dulzor mediante emojis 🍰.

### Filtros

* Búsqueda por nombre.
* Búsqueda por descripción.
* Búsqueda por sabor.
* Categorías dinámicas.

### Carrito

* Gestión completa de productos seleccionados.
* Actualización automática de precios.
* Simulación de confirmación de compra.

### Libro de Recuerdos

* Formulario interactivo.
* Carga de imágenes.
* Renderizado dinámico de publicaciones.
* Persistencia local.

---

## 💾 Persistencia de Datos

Se utiliza LocalStorage para almacenar:

* Preferencia de tema.
* Productos del carrito.
* Recuerdos publicados por usuarios.

Esto permite mantener la información incluso después de recargar la página.

---

## 📱 Diseño Responsive

La aplicación sigue una estrategia Mobile First y se adapta a:

* Teléfonos móviles.
* Tablets.
* Computadores de escritorio.

Utilizando:

* CSS Grid.
* Flexbox.
* Media Queries.

---

## 🎓 Conceptos Aplicados

Este proyecto permite demostrar conocimientos en:

* Manipulación del DOM.
* Eventos en JavaScript.
* Fetch API.
* Consumo de APIs externas.
* Renderizado dinámico de contenido.
* LocalStorage.
* Programación modular.
* Diseño Responsive.
* UX/UI.
* Validación de formularios.
* Manejo de archivos e imágenes.

---

## 👨‍💻 Autor

Proyecto académico desarrollado como práctica de desarrollo Frontend utilizando tecnologías web nativas.

---

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos y de aprendizaje.
