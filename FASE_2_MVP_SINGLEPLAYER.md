# Fase 2: MVP Single-Player (4-5 semanas)

**Status:** Próxima a comenzar (después de Fase 1)  
**Alcance:** Autenticación JWT + Flujo básico de gameplay solo

---

## 📋 Tareas Principales

### 1. Autenticación JWT (Backend) - ~3 días
**Archivos a crear:**
- `backend/src/middleware/auth.ts` - Validar JWT
- `backend/src/controllers/auth.controller.ts` - Signup, Login, Refresh
- `backend/src/services/auth.service.ts` - Lógica de autenticación
- `backend/src/routes/auth.routes.ts` - Endpoints

**Endpoints a implementar:**
```
POST   /api/auth/signup         - Crear cuenta
POST   /api/auth/login          - Login (devuelve tokens)
POST   /api/auth/refresh        - Refresh token
GET    /api/auth/me             - Usuario actual (requiere JWT)
```

**Dependencias necesarias:**
```
npm install --save bcryptjs jsonwebtoken
npm install --save-dev @types/bcryptjs @types/jsonwebtoken
```

---

### 2. CRUD de Historias y Lugares (Backend) - ~2 días
**Endpoints:**
```
GET    /api/stories             - Listar historias
GET    /api/stories/:id         - Detalle historia
POST   /api/stories             - Crear historia (admin)
GET    /api/places              - Listar lugares
POST   /api/places              - Sugerir lugar (usuario)
GET    /api/places/:id          - Detalle lugar
```

---

### 3. Gameplay Loop (Backend) - ~4 días

#### 3a. Game Sessions
```
POST   /api/game-sessions                    - Crear sesión (elegir historia + modo)
GET    /api/game-sessions/:id                - Estado actual
GET    /api/game-sessions/:id/next-mission   - Siguiente misión (con puzzle)
```

#### 3b. Responder Acertijos
```
POST   /api/game-sessions/:id/answer  - Enviar respuesta
  Body: { sessionId, puzzleId, answer }
  Response: { isCorrect, message, nextMission }
```

#### 3c. Progreso
```
GET    /api/game-sessions/:id/progress   - Progreso completo
  Response: { 
    currentMission: 2/5,
    solvedPuzzles: 2,
    failedAttempts: 1,
    timeElapsed: 420
  }
```

---

### 4. Frontend - Componentes Base (React) - ~3 días

**Estructura:**
```
src/
├── components/
│   ├── Auth/
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   │   └── AuthGuard.tsx
│   ├── Game/
│   │   ├── GameModeSelector.tsx
│   │   ├── StorySelector.tsx
│   │   ├── GamePlay.tsx (componente principal)
│   │   ├── PuzzleDisplay.tsx
│   │   ├── PuzzleInput.tsx
│   │   └── ProgressTracker.tsx
│   └── Navigation/
│       └── NavBar.tsx
├── pages/
│   ├── Login.tsx
│   ├── Signup.tsx
│   ├── Dashboard.tsx
│   ├── Game.tsx
│   └── 404.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useGameSession.ts
│   └── useApi.ts
├── store/
│   ├── authStore.ts (Zustand)
│   └── gameStore.ts
├── services/
│   └── api.ts
└── types/
    ├── auth.ts
    ├── game.ts
    └── api.ts
```

**Componentes a crear:**

#### Auth Components
- **LoginForm** - Input email/password, botón login
- **SignupForm** - Input email/password/nickname, botón signup
- **AuthGuard** - Protege rutas (redirige a login si no está autenticado)

#### Game Components
- **GameModeSelector** - Elige SOLO (MVP), COLLABORATIVE (futuro), RIVALRY (futuro)
- **StorySelector** - Lista de historias disponibles, selecciona una
- **GamePlay** - Componente principal:
  - Muestra contexto de misión
  - Muestra puzzle (pregunta + imagen)
  - Input para respuesta
  - Muestra resultado (✓ correcto / ✗ incorrecto)
  - Botón "Siguiente Misión"
- **PuzzleDisplay** - Pregunta + imagen + hint
- **PuzzleInput** - Campo texto + botón enviar
- **ProgressTracker** - Barra visual (2/5 misiones)

---

### 5. State Management (Zustand) - ~1 día

**Auth Store:**
```typescript
interface AuthStore {
  user: User | null
  token: string | null
  signup: (email, password, nickname) => Promise<void>
  login: (email, password) => Promise<void>
  logout: () => void
  refreshToken: () => Promise<void>
}
```

**Game Store:**
```typescript
interface GameStore {
  session: GameSession | null
  currentMission: Mission | null
  createSession: (storyId, gameMode) => Promise<void>
  getNextMission: () => Promise<void>
  submitAnswer: (puzzleId, answer) => Promise<void>
  getProgress: () => Promise<GameProgress>
}
```

---

### 6. API Service (React) - ~1 día

**File:** `src/services/api.ts`

Wrapper para Axios con:
- Base URL del backend
- Interceptores para agregar JWT a requests
- Manejo de errores centralizado
- Refresh token automático

```typescript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
})

// Interceptor: agregar token a cada request
api.interceptors.request.use((config) => {
  const token = authStore.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

---

## 📊 Flujo de Gameplay (MVP)

```
1. Usuario abre app (no autenticado)
   ↓
2. Ve LoginForm / SignupForm
   ↓
3. Autentica exitosamente → Guarda JWT en localStorage
   ↓
4. Dashboard: ve lista de historias
   ↓
5. Elige SOLO mode + selecciona historia
   ↓
6. Crea GameSession (POST /game-sessions)
   ↓
7. Loop:
   a. Obtiene siguiente misión (GET /next-mission)
   b. Muestra contexto + puzzle
   c. Usuario ingresa respuesta
   d. POST /answer { puzzleId, answer }
   e. Si correcto: muestra "✓ Correcto" → siguiente misión
   f. Si incorrecto: muestra "✗ Incorrecto" + hint → reintentar
   ↓
8. Última misión completada
   ↓
9. Pantalla de fin: tiempo total, puntuación
   ↓
10. Vuelve a dashboard
```

---

## 🔄 Orden Recomendado de Implementación

1. **Semana 1:** Autenticación JWT (backend)
   - Endpoints funcionando
   - Tests manuales con Postman/curl

2. **Semana 2:** CRUD stories/places + Game Sessions (backend)
   - Endpoints básicos
   - Tests manuales

3. **Semana 2-3:** Gameplay loop (backend)
   - Lógica de validación de respuestas
   - Progreso guardado en BD

4. **Semana 3-4:** Frontend autenticación
   - LoginForm + SignupForm funcionando
   - AuthGuard protegiendo rutas
   - Zustand auth store

5. **Semana 4:** Frontend gameplay
   - Componentes Game creados
   - Conectados al backend
   - MVP funcional

6. **Semana 5:** Polish
   - UI/UX improvements
   - Validaciones
   - Error handling

---

## 📁 Estructura Esperada al Final de Fase 2

```
claude-code2/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   ├── story.controller.ts
│   │   │   ├── place.controller.ts
│   │   │   └── game.controller.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── game.service.ts
│   │   │   └── story.service.ts
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   ├── story.routes.ts
│   │   │   └── game.routes.ts
│   │   ├── middleware/
│   │   │   └── auth.ts
│   │   ├── utils/
│   │   │   ├── jwt.ts
│   │   │   ├── validation.ts
│   │   │   └── responses.ts
│   │   └── server.ts (updated)
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   ├── Game/
│   │   │   └── Navigation/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── store/
│   │   ├── services/
│   │   ├── types/
│   │   ├── App.jsx (updated)
│   │   └── main.jsx
│   └── ...
│
└── docs/
    ├── FASE_1_PROGRESO.md ✅
    ├── FASE_2_MVP_SINGLEPLAYER.md ← Aquí está
    ├── api-endpoints.md (actualizado)
    ├── arquitectura.md
    └── ...
```

---

## ✨ Criterios de Aceptación - Fase 2 Completada

- [ ] Usuario puede registrarse con email/password/nickname
- [ ] Usuario puede loguearse
- [ ] JWT se guarda en localStorage
- [ ] Usuario ve lista de historias disponibles
- [ ] Usuario elige SOLO mode + historia
- [ ] Se crea GameSession
- [ ] Usuario ve primer puzzle con contexto
- [ ] Usuario ingresa respuesta
- [ ] Sistema valida respuesta vs correctAnswer
- [ ] Si correcto: muestra "✓" + siguiente misión
- [ ] Si incorrecto: muestra "✗" + hint
- [ ] Último puzzle completado: muestra pantalla de fin
- [ ] Progreso se guarda en BD (PlayerProgress)
- [ ] No hay errores en consola
- [ ] UI responsive (desktop + mobile)

---

**Siguiente:** Completa Fase 1 (database) y avísame para comenzar Fase 2. 🚀
