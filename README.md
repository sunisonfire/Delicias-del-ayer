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

@sunisonfire
---

## Google Sheets:

https://docs.google.com/spreadsheets/d/1_MJcTO6xAbyx_-4e_w9hk-RZj3wWY8TYWRvrfUyaQF8/edit?gid=0#gid=0

## Prompt


## CONTEXTO

Imagina que vas a desarrollar una aplicación web con el nombre de "Delicias del ayer" que inspire una pasteleria artesanal que busca transmitir nostalgia y cercania con una experiencia visual inolvidable, donde el usuario pueda ver todo en modo de fotografias como polaroids. Debe incluir elementos vintage con un toque colorido de rosado, albumnes de recuerdos, fotos polaroid, papeleria decorativa y libros de recetas. La experiencia debe ser acogedora como si explorase las memorias de una persona que hacía postres caseros y tomaba fotografias de ello. Que priorice lo visual y la identidad visual para diferenciarla de una pasteleria o reposteria tradicional.

---

## INSTRUCCIÓN

Construye una landing page con completas funcionalidades y que sea responsive al mismo tiempo, esta solo puede usar HTML, CSS y JavaScript Vanilla. Debe consumir desde Google sheets para la creacion de targetas de productos a vender, renderizar productos, ofrecer filtros por categorias y nivel de dulce, que sean interactivos, permitir un carrito de compras mediante el local storage, e incluir una seccion llamada "Libro de recuerdos" que contendrá un form con nombre, forma en la que conoció la empresa, postre que probó, comentario, nivel de dulsura y apartado de foto para compartir experiencias de usuario sin parecer falsas, asi dando credibilidad a la página.Todo el contenido debe generarse desde JavaScript sin modificar la parte visual.

---

## ENTRADA

La página recibirá información desde una hoja de cálculo de Google Sheets conectada mediante una API. Los datos disponibles incluirán columnas para NOMBRE, IMAGEN, PRECIO, DULZOR, DESCRIPCION, SABOR y CATEGORIA. La posición de las columnas puede variar, por lo que el sistema deberá detectar los encabezados y mapear correctamente la información. Los usuarios interactuarán con el catálogo mediante búsquedas, filtros, botones de compra, formularios de recuerdos, controles de tema y carga de imágenes. También se utilizarán datos locales almacenados en LocalStorage para conservar el estado del carrito de compras, las publicaciones del Libro de Recuerdos y las preferencias visuales del usuario.

---

## SALIDA

La salida esperada es una aplicación web completamente funcional con una interfaz profesional de calidad:El resultado debe incluir un catálogo dinámico de productos, un sistema de filtros en tiempo real, un carrito de compras, un modo oscuro temático, integración con Google Sheets, una sección de recuerdos y responsive para dispositivos móviles, tabletas y computadores de escritorio. La aplicación debe ofrecer animaciones suaves, jerarquía visual y una experiencia memorable que represente fielmente la identidad de una pastelería artesanal nostálgica sin perder el toque rosado.

---

# REQUERIMIENTO 1: RESTRICCIONES TÉCNICAS

El proyecto deberá desarrollarse exclusivamente mediante HTML5, CSS3 y JavaScript Vanilla ES6+, sin utilizar frameworks ni librerías externas de interfaz de usuario. No se permite el uso de React, Vue, Angular, Next.js, Nuxt, Svelte, Bootstrap, Tailwind CSS, jQuery ni tecnologías similares. Toda la lógica deberá ejecutarse del lado del cliente y la estructura mínima del proyecto deberá componerse por los archivos index.html, styles.css y script.js. Se permite únicamente la utilización de Google Fonts para tipografías y la API de Google Sheets para la obtención de datos. El almacenamiento persistente deberá implementarse mediante LocalStorage.

---

# REQUERIMIENTO 2: ESTÉTICA VISUAL (Para el Css)

La interfaz deberá inspirarse en álbumes de recuerdos artesanales, cuadernos decorados a mano, fotografías instantáneas tipo Polaroid y elementos propios del scrapbooking. La paleta principal deberá utilizar colores pastel suaves como rosa claro, crema vainilla, beige cálido, blanco roto y marrón caramelo. Todos los componentes deberán incluir detalles decorativos como sombras, bordes suaves color café, cintas, etiquetas y elementos gráficos que refuercen la sensación de estar interactuando con un álbum físico de recuerdos.

---

# REQUERIMIENTO 3: TIPOGRAFÍA

Los encabezados principales deberán utilizar tipografías inspiradas en Bricolage Grotesque, Baloo 2 o Fredoka para transmitir cercanía, personalidad y dulzura. Para textos descriptivos y contenido secundario se deberán emplear fuentes como Space Mono, Inter o Nunito para garantizar legibilidad.

---

# REQUERIMIENTO 4: SOL Y LUNA (Tema claro y oscuro)

La aplicación deberá incluir un botón decorativo de cambio de tema representado mediante iconos de Sol y Luna. El modo diurno deberá utilizar colores pastel, fondos crema y una apariencia luminosa y acogedora. El modo nocturno, denominado "Noche Mágica", deberá transformar la interfaz mediante tonos morados profundos, azules oscuros, destellos suaves y detalles luminosos que generen una atmósfera mágica sin afectar la legibilidad. La preferencia seleccionada por el usuario deberá almacenarse en LocalStorage para mantenerse entre sesiones.

---

# REQUERIMIENTO 5: ABIERTO VS CERRADO

La interfaz deberá mostrar un indicador visual en tiempo real que informe si la tienda se encuentra abierta o cerrada. El horario de funcionamiento será desde las 9:00 AM hasta las 10:00 PM tomando como referencia la hora local del navegador del usuario. Cuando la tienda se encuentre abierta deberá mostrarse un distintivo verde. Cuando se encuentre cerrada deberá mostrarse un distintivo rojo.

---

# REQUERIMIENTO 6: GOOGLE SHEETS

La aplicación deberá consumir automáticamente los productos desde una hoja de cálculo de Google Sheets mediante una API pública. El sistema deberá interpretar correctamente las columnas NOMBRE, IMAGEN, PRECIO, DULZOR, DESCRIPCION, SABOR y CATEGORIA incluso si cambian de posición. En caso de que una imagen no cargue correctamente o el enlace sea inválido, se deberá mostrar automáticamente una imagen alternativa relacionada con repostería artesanal manteniendo la coherencia visual del catálogo. Además se debe buscar que si la imágen viene de pinterest, se copie, no el link de pinterest, sino el de la imágen.

---

# REQUERIMIENTO 7: CATÁLOGO

Los productos deberán mostrarse en un grid responsive compuesto por tarjetas diseñadas como fotografías Polaroid. Cada tarjeta deberá incluir la imagen del producto, nombre, precio, categoría, sabor, descripción corta (tamaños) y nivel de dulzor. El nivel de dulzor deberá representarse visualmente mediante iconos de pastel (🍰) en una escala de uno a cinco elementos según el valor recibido desde Google Sheets. Todas las tarjetas deberán incorporar animaciones suaves al pasar el cursor con un hover.

---

# REQUERIMIENTO 8: FILTROS.

Se deberá implementar un sistema de búsqueda dinámica capaz de filtrar productos en tiempo real mediante coincidencias en nombre, descripción o sabor. Adicionalmente, deberá existir un filtro por categoría que permita visualizar únicamente ciertos tipos de productos como tortas, cupcakes, donas, tartas, galletas o macarons. También deberá incluirse un control deslizante para limitar el nivel máximo de dulzor mostrado dentro del catálogo, ya sea de 1 o 2 hasta 4 y 5 de dulzura.

---

# REQUERIMIENTO 9: CARRITO DE COMPRAS

La aplicación deberá incorporar un carrito de compras completamente funcional que permita agregar productos, modificar cantidades, eliminar artículos, vaciar el carrito.Toda la información del carrito deberá persistir mediante LocalStorage para conservarse incluso después de recargar la página. 

---

# REQUERIMIENTO 10: CONFIRMACIÓN DE PEDIDO

El proceso de compra deberá finalizar mediante una simulación visual de confirmación de pedido. Al confirmar la compra se deberá mostrar una ventana modal con una animación suave, un mensaje de agradecimiento personalizado y un resumen completo de los productos adquiridos. NO SE MUESTRAN PRECIOS.

---

# REQUERIMIENTO 11: LIBRO DE RECUERDOS

La aplicación deberá incluir una sección denominada "Libro de Recuerdos" inspirada en un muro donde los visitantes puedan compartir experiencias relacionadas con sus postres favoritos. Esta sección deberá convertirse en un espacio comunitario que complemente la experiencia comercial del catálogo. Dando asi la impresión de que todo lo que se dice, fue por usuarios reales.

---

# REQUERIMIENTO 12: FORMULARIO DE RECUERDOS

El formulario deberá solicitar el nombre del visitante, un mensaje, el método mediante el cual conoció la pastelería y su nivel de dulce preferido. Entre las opciones disponibles deberán encontrarse redes sociales, recomendación familiar, amigos, eventos locales y otras alternativas personalizadas.

---

# REQUERIMIENTO 14: PUBLICACIÓN DINÁMICA DE RECUERDOS

Al enviar el formulario, la aplicación deberá generar automáticamente una nueva tarjeta de recuerdo dentro del muro comunitario. La publicación deberá mostrar la fotografía seleccionada, el nombre del usuario, el comentario escrito, el método de descubrimiento de la pastelería y el nivel de dulzor preferido. Se almacena en local storage.

---

# REQUERIMIENTO 15: RESPONSIVE DESIGN

Debe adaptarse a los distintos dispositivos por medio de media query.

---

# REQUERIMIENTO 16: VISUAL 

La calidad visual final deberá ser equivalente a una combinación entre Pinterest, un álbum artesanal de recuerdos, una cafetería premium, una pastelería tradicional y un scrapbook.
