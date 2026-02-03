# Laravel API - Para usar fuera de pelupet-web

## ✅ API Laravel Completada

La API está en: `/pelupet-web/pelupet-api/`

### Para mover la API a otro lugar:

```bash
# 1. Copiar la carpeta completa
cp -r pelupet-api /ruta/destino/

# 2. En el nuevo destino, verificar que todo funciona:
cd /ruta/destino/pelupet-api
php artisan serve

# 3. La API estará en http://localhost:8000
```

### Conectar Next.js con la API:

En tu proyecto Next.js, edita `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Estructura creada:

```
pelupet-api/
├── app/
│   ├── Http/Controllers/Api/
│   │   ├── AuthController.php        ✅ Login, Register, Logout
│   │   ├── CustomerController.php    ✅ CRUD Clientes
│   │   ├── PetController.php         ✅ CRUD Mascotas
│   │   ├── ServiceController.php     ✅ CRUD Servicios
│   │   ├── GroomingAppointmentController.php  ✅ CRUD Citas
│   │   └── CustomServiceController.php        ✅ Servicios Personalizados
│   └── Models/
│       ├── User.php                  ✅ Con roles y Sanctum
│       ├── Customer.php              ✅ Con relaciones
│       ├── Pet.php                   ✅
│       ├── Service.php               ✅
│       ├── GroomingAppointment.php   ✅
│       └── CustomService.php         ✅
├── database/
│   ├── migrations/                   ✅ Todas las tablas
│   ├── seeders/ServiceSeeder.php     ✅ 6 servicios pre-cargados
│   └── database.sqlite               ✅ Base de datos lista
├── routes/api.php                    ✅ Todas las rutas configuradas
├── .env                              ✅ Configurado con CORS
└── README.md                         ✅ Documentación completa
```

### Endpoints disponibles:

#### Auth
- POST `/api/auth/register` - Registrar usuario
- POST `/api/auth/login` - Iniciar sesión
- GET `/api/auth/me` - Usuario actual
- POST `/api/auth/logout` - Cerrar sesión

#### Servicios
- GET `/api/services` - Listar servicios
- GET `/api/services/{id}` - Ver servicio
- POST `/api/services` - Crear servicio
- PUT `/api/services/{id}` - Actualizar servicio
- DELETE `/api/services/{id}` - Eliminar servicio

#### Clientes
- GET `/api/customers` - Listar clientes
- POST `/api/customers` - Crear cliente
- GET `/api/customers/{id}` - Ver cliente
- PUT `/api/customers/{id}` - Actualizar cliente
- DELETE `/api/customers/{id}` - Eliminar cliente

#### Mascotas
- GET `/api/pets` - Listar mascotas
- POST `/api/pets` - Registrar mascota
- GET `/api/pets/{id}` - Ver mascota
- PUT `/api/pets/{id}` - Actualizar mascota
- DELETE `/api/pets/{id}` - Eliminar mascota

#### Citas
- GET `/api/grooming-appointments` - Listar citas
- POST `/api/grooming-appointments` - Crear cita
- GET `/api/grooming-appointments/{id}` - Ver cita
- PUT `/api/grooming-appointments/{id}` - Actualizar cita (estado)
- DELETE `/api/grooming-appointments/{id}` - Cancelar cita

#### Servicios Personalizados
- GET `/api/custom-services` - Listar solicitudes
- POST `/api/custom-services` - Crear solicitud
- GET `/api/custom-services/{id}` - Ver solicitud
- PUT `/api/custom-services/{id}` - Actualizar solicitud
- DELETE `/api/custom-services/{id}` - Eliminar solicitud
- PATCH `/api/custom-services/{id}/approve` - Aprobar (Admin)
- PATCH `/api/custom-services/{id}/reject` - Rechazar (Admin)

### Base de datos ya poblada con:
- ✂️ Baño Completo - $25
- ✂️ Corte de Pelo - $30
- 🏥 Limpieza Dental - $50
- 🏥 Consulta Veterinaria - $35
- 💉 Vacunación - $20
- 🌟 Spa Premium - $60

### ¡Todo listo para usar! 🚀

El servidor está corriendo. Prueba:
```bash
curl http://localhost:8000/up
```

Para probar la API con Next.js, inicia ambos servidores:
```bash
# Terminal 1: API Laravel
cd pelupet-api
php artisan serve

# Terminal 2: Next.js
cd ..
pnpm dev
```

---

**¡La API está completa y lista para producción!** 🐾
