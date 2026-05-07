# Arquitectura - Proyecto Margarita

## Stack Tecnológico

### Frontend
- **React 18+** con Vite
- **TypeScript** para type safety
- **Tailwind CSS** para estilos
- **Zustand** para state management
- **React Query** para fetching de datos
- **Leaflet/Mapbox** para mapas
- **PWA** para funcionamiento offline

### Backend
- **Node.js** + **Express.js**
- **PostgreSQL** como base de datos
- **Prisma ORM** para queries
- **JWT** para autenticación
- **Socket.io** para real-time multiplayer

### Deployment
- Frontend: Vercel o Netlify
- Backend: Railway, Heroku, o Render
- BD: Supabase o AWS RDS

---

## Decisiones Arquitectónicas

### 1. Validación de Ubicación (MVP)
- **Enfoque:** Acertijo basado en pista física
- **Razón:** No requiere GPS, más flexible para diferentes tipos de lugares
- **Futuro:** Agregar geofencing como validación secundaria

### 2. State Management
- **Zustand** en lugar de Redux
- **Razón:** Más ligero, mejor para MVP
- **Estructura:** Stores separadas (auth, game, user)

### 3. Autenticación
- **JWT** con tokens en localStorage
- **Refresh tokens** para seguridad
- **No sesiones server-side** para escalabilidad

### 4. Sesiones Multiplayer
- **Código de sesión:** String alphanumeric de 6 caracteres (ej: `A1B2C3`)
- **URL shareable:** `margarita.app/join/ABC123`
- **Expiration:** 24 horas de inactividad

### 5. Base de Datos
- **PostgreSQL** por robustez y features relacionales
- **Prisma** para queries type-safe
- **Migraciones** versionadas en `/database/migrations`

---

## Componentes Principales

### Frontend Architecture
```
App
├── Auth Context (Zustand store)
├── Game Context (Zustand store)
└── Routes
    ├── /login
    ├── /dashboard
    ├── /game
    │   ├── /game/mode-selector
    │   ├── /game/story-selector
    │   └── /game/play
    └── /profile
```

### Backend Architecture
```
Server (Express)
├── Auth Routes
│   ├── POST /signup
│   ├── POST /login
│   └── GET /me
├── Game Routes
│   ├── GET /stories
│   ├── POST /game-sessions
│   └── POST /game-sessions/:id/answer
├── Place Routes
│   ├── GET /places
│   └── POST /places
└── WebSocket (Socket.io)
    └── game:update
    └── game:progress
```

---

## Flujo de Datos

### Autenticación
```
Login Form
    ↓
POST /api/auth/login
    ↓
Backend: Validate email + password
    ↓
JWT token + refresh token
    ↓
Store en localStorage
    ↓
Redirect a dashboard
```

### Gameplay
```
Start Game Session
    ↓
GET /api/game-sessions/:id/next-mission
    ↓
Display: Location name + narrative + puzzle image
    ↓
Player navegates a lugar
    ↓
Player reads pista física
    ↓
POST /api/game-sessions/:id/answer
    ↓
Backend: Validate respuesta
    ↓
Si correcto → siguiente misión
Si incorrecto → hint o error
```

### Multiplayer Real-Time
```
Player 1 conecta → Socket.io room
Player 2 joins con código
    ↓
Ambos en: /collaborative-session/:id
    ↓
Player 1 responde acertijo
    ↓
Socket.io emit: game:answer
    ↓
Backend broadcast a Player 2
    ↓
Ambos ven: "Player 1 respondió"
```

---

## Seguridad

### Autenticación
- JWT con expiration (15 min)
- Refresh tokens (7 días)
- Password hashed con bcrypt
- HTTPS en producción

### Validación
- Todas las entradas validadas en backend
- Respuestas de acertijos case-insensitive y trimmed
- Rate limiting en auth endpoints

### CORS
- Frontend URL especificada
- Credenciales permitidas

---

## Performance

### Frontend
- **Code splitting** por rutas (React.lazy)
- **Image optimization** (WebP, lazy loading)
- **PWA caching** (service workers)
- **React Query** para caching de datos

### Backend
- **Connection pooling** en PostgreSQL
- **Indexing** en campos frecuentemente queries
- **Pagination** para listados
- **Compression** en responses (gzip)

---

## Testing

### Frontend
- **Unit tests:** Vitest + React Testing Library
- **E2E tests:** Playwright o Cypress
- **Coverage:** ~80% para lógica crítica

### Backend
- **Unit tests:** Jest
- **Integration tests:** Supertest
- **DB seeding** para tests

---

## Deployment Pipeline

```
git push
    ↓
GitHub Actions (CI/CD)
    ├── Frontend: Run tests → Build → Deploy a Vercel
    └── Backend: Run tests → Build → Deploy a Railway
```

---

## Escalabilidad Futura

- **Cache:** Redis para sessions multiplayer
- **Queue:** Bull o similar para background jobs
- **CDN:** CloudFlare para assets
- **Sharding:** Si necesitamos múltiples servidores BD
