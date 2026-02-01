# Leonardo Sanchez - Senior Full Stack Developer Portfolio

Un portafolio profesional moderno construido con Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion y MongoDB.

## 🚀 Características

- ✨ **Diseño Moderno**: Interfaz profesional con animaciones fluidas usando Framer Motion
- 🎨 **Tailwind CSS 4**: Estilos modernos con utilidades personalizadas
- 📱 **Responsive**: Diseño adaptable desde móviles hasta pantallas 4K
- ⚡ **Rendimiento Optimizado**: Next.js 16 con React 19 para máxima velocidad
- 🗄️ **Base de Datos**: MongoDB con Prisma ORM
- 🎭 **Animaciones**: Transiciones y efectos visuales con Framer Motion
- 📊 **Gestión de Contenido**: Sistema de administración para proyectos y experiencias

## 🛠️ Tecnologías

- **Next.js 16** - Framework de React
- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS 4** - Framework de utilidades CSS
- **Framer Motion 12** - Animaciones
- **MongoDB** - Base de datos NoSQL
- **Prisma ORM** - ORM para TypeScript

## 🚀 Inicio Rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar .env
DATABASE_URL="mongodb+srv://..."

# 3. Generar Prisma client
npm run prisma:generate

# 4. Sincronizar esquema
npm run prisma:push

# 5. Poblar base de datos
npm run seed

# 6. Iniciar desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## 📝 Scripts

```bash
npm run dev              # Desarrollo
npm run build            # Build producción
npm run start            # Servidor producción
npm run seed             # Poblar BD
npm run prisma:studio    # Abrir Prisma Studio
```

## 📂 Estructura

```
src/
├── app/
│   ├── about/          # Página sobre mí
│   ├── contact/        # Contacto
│   ├── projects/       # Proyectos
│   ├── api/            # API Routes
│   ├── globals.css     # Estilos
│   ├── layout.tsx      # Layout
│   └── page.tsx        # Home
├── components/         # Componentes
└── lib/               # Utilidades
```

## 🎨 Personalización

### Actualizar Datos

Edita `seed.ts` con tu información y ejecuta:
```bash
npm run seed
```

### Cambiar Colores

Edita `src/app/globals.css`:
```css
@theme {
  --color-primary-400: #0ee958;
  /* ... */
}
```

## 📱 Páginas

- **/** - Página principal con hero section
- **/about** - Sobre mí, skills y experiencia
- **/projects** - Galería de proyectos
- **/contact** - Formulario de contacto

## 👤 Autor

**Leonardo Sanchez**
- GitHub: [@Lordcreos](https://github.com/Lordcreos)
- LinkedIn: [leonardo-sanchez-dev](https://linkedin.com/in/leonardo-sanchez-dev)
- Email: leonardo.sanchez.dev@gmail.com

---

⭐️ Si te gustó este proyecto, dale una estrella!
