# 🐾 PeluPet - Veterinaria y Grooming

Aplicación web moderna y **humana** para gestión de servicios veterinarios y grooming con animaciones fluidas GSAP y sistema completo de autenticación y administración.

## ✨ Características

### 🎨 Frontend Moderno y Humano
- **Next.js 16** con App Router
- **TypeScript** para type safety
- **Tailwind CSS 4** para estilos modernos
- **GSAP** con animaciones fluidas y profesionales
- **Diseño empático** - Interfaz pensada para crear conexión emocional
- **Responsive** - Optimizado para todos los dispositivos
- **React Hot Toast** - Notificaciones amigables
- **Hero Icons** - Iconografía profesional

### 🔐 Sistema de Autenticación
- **Login/Registro** con animaciones
- **Roles de usuario**: Customer, Admin, Doctor
- **Sesiones persistentes** con localStorage
- **Protección de rutas** por rol
- **Demo mode** - Funciona sin API para pruebas

### 👥 Roles y Permisos

#### 🏠 Cliente (Customer)
- Dashboard personalizado
- Gestión de mascotas
- Agendar citas
- Ver historial
- Solicitar servicios personalizados

#### 🏥 Doctor
- Ver todas las citas
- Actualizar estados
- Gestionar pacientes
- Aprobar servicios custom

#### 👑 Administrador
- Dashboard completo con estadísticas
- Gestión de citas
- Aprobar/Rechazar servicios personalizados
- Ver todos los clientes y mascotas
- Estadísticas en tiempo real

### 🎯 Funcionalidades Principales

#### 1. Página Principal (Landing)
- Hero con animaciones GSAP de entrada
- Sección de servicios con cards animadas
- Features con scroll triggers
- Paw prints animadas flotantes
- CTA sections con gradientes
- **Botón de Login visible** en navegación

#### 2. Login & Registro (`/login`)
- Formulario animado con GSAP
- Cambio fluido entre login/registro
- Validación de formularios
- Cuentas demo incluidas
- Redirección automática por rol

#### 3. Dashboard Usuario (`/dashboard`)
- Resumen de mascotas
- Próximas citas
- Estadísticas personales
- Acceso rápido a servicios
- Cards animadas con GSAP

#### 4. Panel Admin (`/admin`)
- **Tabs para navegación**: Overview, Citas, Solicitudes, Clientes, Mascotas
- **Estadísticas en tiempo real**
- **Gestión completa de citas** con cambio de estados
- **Aprobación de servicios** personalizados
- **Vista de clientes y mascotas**
- **Diseño profesional** con tablas y cards

#### 5. Servicios (`/services`)
- Catálogo completo
- Filtrado por categorías
- Cards con gradientes
- Agendar directo

#### 6. Agendar Citas (`/appointments`)
- Formulario multi-paso
- Cliente nuevo/existente
- Mascota nueva/existente
- Validación completa

#### 7. Servicios Personalizados (`/custom-services`)
- Solicitud detallada
- Presupuesto estimado
- Sistema de aprobación

## 🚀 Instalación

### Requisitos Previos
- Node.js 18+
- pnpm (recomendado) o npm
- PHP 8.2+ (opcional - para API real)
- Composer (opcional)

### Pasos de Instalación

1. **Navegar al proyecto**
```bash
cd /home/hendr/Codes/php/laravel/pelupet-web
```

2. **Instalar dependencias**
```bash
pnpm install
```

3. **Variables de entorno**
```bash
# Ya configurado en .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

4. **Iniciar servidor**
```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🎭 Cuentas Demo

El sistema funciona en **modo demo** sin necesidad de API backend.

### Para probar como Admin:
```
Email: admin@pelupet.com
Password: cualquier contraseña
```

### Para probar como Usuario:
```
Email: cualquier@email.com
Password: cualquier contraseña
```

💡 **Tip**: El rol se determina por el email. Si contiene "admin", será admin. Cualquier otro será customer.

## 🏗️ Estructura del Proyecto

```
pelupet-web/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Layout principal
│   ├── globals.css                 # Estilos globales
│   ├── login/
│   │   └── page.tsx               # Login & Registro
│   ├── dashboard/
│   │   └── page.tsx               # Dashboard Usuario
│   ├── admin/
│   │   └── page.tsx               # Panel Administración
│   ├── services/
│   │   └── page.tsx               # Catálogo servicios
│   ├── appointments/
│   │   └── page.tsx               # Agendamiento
│   └── custom-services/
│       └── page.tsx               # Servicios personalizados
├── lib/
│   ├── api.ts                      # Cliente API Axios
│   ├── auth.ts                     # Sistema autenticación
│   ├── auth-types.ts               # Types autenticación
│   ├── types.ts                    # TypeScript types
│   └── utils.ts                    # Utilidades
├── components/
│   ├── AnimatedComponents.tsx      # Componentes GSAP
│   └── ToastProvider.tsx           # Provider notificaciones
└── public/                         # Assets estáticos
```

## 🎨 Animaciones GSAP

### Implementadas

#### Landing Page
- **Hero Entrance**: Títulos y CTAs con `power3.out`
- **Scroll Triggers**: Cards aparecen al hacer scroll
- **Floating Pawprints**: Animación continua `yoyo`
- **Feature Items**: Entrada con stagger

#### Login/Dashboard/Admin
- **Form Sections**: Cascade entrance con stagger
- **Stats Cards**: Aparición escalonada
- **Success States**: Scale con `back.out` easing
- **Tab Changes**: Transiciones suaves

### Toques Humanos

- ✅ **Emojis contextuales** en toda la interfaz
- ✅ **Mensajes amigables** de éxito y error
- ✅ **Gradientes suaves** para mejor visualización
- ✅ **Microinteracciones** en botones y cards
- ✅ **Feedback visual** en todas las acciones
- ✅ **Estados de carga** con spinners animados

## 📡 API Integration

El sistema está preparado para trabajar con la API de Laravel pero **funciona en modo demo** sin backend.

### Endpoints Configurados

```typescript
// Autenticación
POST   /api/auth/login
POST   /api/auth/register
GET    /api/auth/me

// Servicios
GET    /api/services
GET    /api/services/{id}

// Clientes
GET    /api/customers
POST   /api/customers

// Mascotas
GET    /api/pets
POST   /api/pets

// Citas
GET    /api/grooming-appointments
POST   /api/grooming-appointments
PUT    /api/grooming-appointments/{id}

// Servicios Personalizados
GET    /api/custom-services
POST   /api/custom-services
PATCH  /api/custom-services/{id}/approve
PATCH  /api/custom-services/{id}/reject
```

## 🎯 Flujos Principales

### 1. Nuevo Usuario
1. Click en "Iniciar Sesión" en navbar
2. Click en "¿No tienes cuenta? Regístrate"
3. Completa formulario de registro
4. Redirección automática a Dashboard
5. Explora servicios y agenda citas

### 2. Usuario Recurrente
1. Login con email y contraseña
2. Acceso a Dashboard personalizado
3. Ve sus mascotas y citas
4. Puede agendar nuevas citas

### 3. Administrador
1. Login con email admin
2. Acceso a Panel Admin completo
3. Ve estadísticas generales
4. Gestiona citas y solicitudes
5. Aprueba servicios personalizados

## 🌟 Diferencias con Sistemas Genéricos

### 🎨 Diseño Humano
- Emojis y personalidad en cada sección
- Mensajes cálidos y amigables
- Feedback visual constante
- Animaciones que crean conexión

### 💡 UX Pensada
- Flujos intuitivos
- Información contextual
- Estados claros
- Acciones rápidas

### 🏥 Enfoque Veterinario
- Terminología adecuada
- Gestión de múltiples mascotas
- Historial de servicios
- Aprobación de servicios custom

## 📱 Responsive Design

- **Mobile**: < 768px - Stack vertical, touch optimizado
- **Tablet**: 768px - 1024px - Grid 2 columnas
- **Desktop**: > 1024px - Grid 3+ columnas

## 🚀 Optimizaciones

- **Code splitting** automático
- **Lazy loading** con scroll triggers
- **Bundle optimization** con Turbopack
- **CSS** optimizado con Tailwind
- **Animaciones** performantes con GSAP

## 🔜 Próximas Mejoras

### Funcionalidades
- [ ] Calendario interactivo
- [ ] Notificaciones push
- [ ] Chat en vivo
- [ ] Sistema de reviews
- [ ] Galería before/after
- [ ] Recordatorios automáticos
- [ ] Dashboard para doctores

### Técnicas
- [ ] Tests E2E con Playwright
- [ ] PWA capabilities
- [ ] Internacionalización (i18n)
- [ ] Analytics integration
- [ ] Error tracking (Sentry)

## 🛠️ Scripts

```bash
# Desarrollo
pnpm dev

# Producción
pnpm build
pnpm start

# Linting
pnpm lint
```

## 🐛 Troubleshooting

### Puerto en uso
```bash
pkill -f "next dev"
pnpm dev
```

### Error de TypeScript
```bash
rm -rf .next
pnpm dev
```

### Dependencias
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## 📞 Contacto

- **Email**: info@pelupet.com
- **Teléfono**: +1 234 567 89

## 📄 Licencia

© 2025 PeluPet. Todos los derechos reservados.

---

**Desarrollado con 💚 y mucho ☕ usando Next.js, TypeScript, GSAP y Tailwind CSS**

*"Porque cada mascota merece una web tan especial como ellos" 🐾*
# pelupet-web
