# Fase 2 - MVP Single-Player - Checklist Detallado

**Status:** En progreso (15% completado)  
**Duración estimada:** 4-5 semanas  
**Prioridad:** MVP funcional con flujo básico

---

## 🔐 Sección 1: Autenticación JWT (Semana 1)

### ✅ Implementado
- [x] JWT utilities (generate, verify tokens)
- [x] Auth service (signup, login, getCurrentUser)
- [x] Auth middleware (protect routes)
- [x] Auth controllers (4 endpoints)
- [x] Auth routes (POST/signup, login, refresh + GET/me)
- [x] Server.ts actualizado

### 🧪 Próximo: Testing
- [ ] Test POST /auth/signup
- [ ] Test POST /auth/login
- [ ] Test POST /auth/refresh
- [ ] Test GET /auth/me
- [ ] Verificar errores (409, 401, 400)
- [ ] Verificar JWT en Authorization header

**Comandos para testear:**
```bash
# Signup
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@margarita.com","password":"password123","nickname":"TestPlayer"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@margarita.com","password":"password123"}'

# Get me (reemplaza TOKEN con el accessToken)
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

---

## 📖 Sección 2: CRUD Stories & Places (Semana 2)

### Tareas

#### 2.1 Story Service & Controller
- [ ] `services/story.service.ts`:
  - `getStories()` - Listar historias
  - `getStoryById(id)` - Detalle historia
  - `createStory(data, userId)` - Crear historia (admin)
  - `updateStory(id, data)` - Actualizar
  - `deleteStory(id)` - Eliminar

- [ ] `controllers/story.controller.ts`:
  - `getStoriesController` - GET /api/stories
  - `getStoryController` - GET /api/stories/:id
  - `createStoryController` - POST /api/stories
  - `updateStoryController` - PUT /api/stories/:id
  - `deleteStoryController` - DELETE /api/stories/:id

#### 2.2 Place Service & Controller
- [ ] `services/place.service.ts`:
  - `getPlaces()` - Listar lugares
  - `getPlaceById(id)` - Detalle
  - `createPlace(data, userId)` - Crear/sugerir
  - `updatePlace(id, data)` - Actualizar (solo owner o admin)
  - `verifyPlace(id)` - Admin verification

- [ ] `controllers/place.controller.ts`:
  - `getPlacesController` - GET /api/places
  - `getPlaceController` - GET /api/places/:id
  - `createPlaceController` - POST /api/places
  - `updatePlaceController` - PUT /api/places/:id
  - `verifyPlaceController` - PATCH /api/places/:id/verify (admin)

#### 2.3 Routes
- [ ] `routes/story.routes.ts` - Crear rutas
- [ ] `routes/place.routes.ts` - Crear rutas
- [ ] Integrar en `server.ts`

### Endpoints resultantes
```
GET    /api/stories              - Listar historias
GET    /api/stories/:id          - Detalle historia
POST   /api/stories              - Crear (admin)
PUT    /api/stories/:id          - Actualizar (admin)
DELETE /api/stories/:id          - Eliminar (admin)

GET    /api/places               - Listar lugares
GET    /api/places/:id           - Detalle lugar
POST   /api/places               - Sugerir lugar (usuario)
PUT    /api/places/:id           - Actualizar (owner o admin)
PATCH  /api/places/:id/verify    - Verificar (admin)
```

---

## 🎮 Sección 3: Game Sessions & Gameplay (Semana 2-3)

### 3.1 Game Session Service
- [ ] `services/game.service.ts`:
  - `createGameSession(userId, storyId, gameMode)` - Crear sesión
  - `getGameSession(sessionId)` - Obtener estado
  - `getNextMission(sessionId)` - Siguiente misión
  - `submitAnswer(sessionId, puzzleId, answer)` - Responder acertijo
  - `completeSession(sessionId)` - Marcar como completada
  - `getProgress(sessionId)` - Progreso

### 3.2 Game Controller
- [ ] `controllers/game.controller.ts`:
  - `createSessionController` - POST /api/game-sessions
  - `getSessionController` - GET /api/game-sessions/:id
  - `getNextMissionController` - GET /api/game-sessions/:id/next-mission
  - `submitAnswerController` - POST /api/game-sessions/:id/answer
  - `getProgressController` - GET /api/game-sessions/:id/progress

### 3.3 Routes
- [ ] `routes/game.routes.ts`
- [ ] Integrar en `server.ts`

### Endpoints resultantes
```
POST   /api/game-sessions                    - Crear sesión
GET    /api/game-sessions/:id                - Estado sesión
GET    /api/game-sessions/:id/next-mission   - Próxima misión
POST   /api/game-sessions/:id/answer         - Responder acertijo
GET    /api/game-sessions/:id/progress       - Progreso
```

### Lógica de validación
```typescript
// POST /api/game-sessions/:id/answer
{
  "puzzleId": "uuid",
  "answer": "respuesta del usuario"
}

// Validación:
1. Obtener puzzle
2. Normalizar respuesta (trim, lowercase)
3. Comparar con correctAnswer normalizada
4. Guardar en PlayerProgress
5. Si correcto: retornar siguienteMisión
6. Si incorrecto: retornar hint + intento aumentado
```

---

## 🎨 Sección 4: Frontend Auth Components (Semana 3)

### 4.1 Zustand Auth Store
- [ ] `src/store/authStore.ts`:
  ```typescript
  interface AuthStore {
    user: User | null
    tokens: { accessToken: string; refreshToken: string } | null
    signup: (email, password, nickname) => Promise<void>
    login: (email, password) => Promise<void>
    logout: () => void
    refreshToken: () => Promise<void>
    setUser: (user) => void
  }
  ```

### 4.2 Auth Components
- [ ] `components/Auth/LoginForm.tsx`:
  - Email input
  - Password input
  - Submit button
  - "Don't have account?" link

- [ ] `components/Auth/SignupForm.tsx`:
  - Email input
  - Password input
  - Nickname input
  - Submit button
  - "Already have account?" link

- [ ] `components/Auth/AuthGuard.tsx`:
  - Protege rutas privadas
  - Redirige a login si no hay token

### 4.3 API Service
- [ ] `src/services/api.ts`:
  - Axios instance con baseURL
  - Interceptor de request (agregar token)
  - Interceptor de response (refresh token si expira)

### 4.4 Pages
- [ ] `src/pages/Login.tsx` - Página de login
- [ ] `src/pages/Signup.tsx` - Página de registro
- [ ] `src/pages/Dashboard.tsx` - Home después de login

### 4.5 Router
- [ ] Configurar rutas con AuthGuard
- [ ] Proteger dashboard, game, etc.

---

## 🎮 Sección 5: Frontend Game Components (Semana 3-4)

### 5.1 Game Store (Zustand)
- [ ] `src/store/gameStore.ts`:
  ```typescript
  interface GameStore {
    session: GameSession | null
    currentMission: Mission | null
    puzzle: Puzzle | null
    progress: GameProgress | null
    createSession: (storyId, gameMode) => Promise<void>
    loadNextMission: () => Promise<void>
    submitAnswer: (answer) => Promise<SubmitResult>
    getProgress: () => Promise<void>
  }
  ```

### 5.2 Components
- [ ] `components/Game/GameModeSelector.tsx` - Elegir SOLO/COLLAB/RIVAL
- [ ] `components/Game/StorySelector.tsx` - Listar y elegir historia
- [ ] `components/Game/GamePlay.tsx` - Componente principal
  - Contexto de misión
  - Puzzle display
  - Input respuesta
  - Mostrar resultado
  - Botón siguiente
- [ ] `components/Game/PuzzleDisplay.tsx` - Pregunta + imagen
- [ ] `components/Game/PuzzleInput.tsx` - Campo respuesta
- [ ] `components/Game/ProgressTracker.tsx` - Barra de progreso

### 5.3 Pages
- [ ] `src/pages/Game.tsx` - Página principal de juego

---

## 🔄 Sección 6: Testing & Validación (Semana 4)

- [ ] Test endpoints auth (curl/Postman)
- [ ] Test endpoints stories/places
- [ ] Test game flow (crear sesión → responder → progreso)
- [ ] Test error cases (auth, validación)
- [ ] Test frontend components
- [ ] Verificar UI responsive

---

## 📊 Flujo de Gameplay Completo (MVP)

```
User opens app (no token)
  ↓
Redirect to Login/Signup
  ↓
Autentica (POST /auth/signup o /auth/login)
  ↓
Guarda tokens en localStorage
  ↓
Dashboard: Lista de historias (GET /api/stories)
  ↓
Selecciona SOLO mode + historia
  ↓
Crea GameSession (POST /api/game-sessions)
  ↓
Loop:
  a. Obtiene siguiente misión (GET /api/game-sessions/:id/next-mission)
  b. Muestra contexto + puzzle (question + imageUrl)
  c. Usuario ingresa respuesta
  d. POST /api/game-sessions/:id/answer { puzzleId, answer }
  e. Si correcto:
     - Muestra "✓ Correcto"
     - Siguiente misión (repite desde 'a')
  f. Si incorrecto:
     - Muestra "✗ Incorrecto - {hint}"
     - Opción reintentar
  ↓
Última misión completada
  ↓
Pantalla de fin: tiempo total, stats
  ↓
Botón volver a dashboard
```

---

## 📝 Tareas Inmediatas (Esta semana)

1. **AHORA:** Test auth endpoints (TESTING_AUTH.md)
2. **Después:** Implementar CRUD Stories/Places
3. **Luego:** Implementar Game Sessions
4. **Finalmente:** Frontend components

---

## 🎯 Criterios de Aceptación - Fase 2 Completa

- [ ] Usuario puede registrarse y loguearse
- [ ] JWT se guarda en localStorage
- [ ] Usuario ve lista de historias
- [ ] Usuario elige modo SOLO + historia
- [ ] Se crea GameSession
- [ ] Usuario ve primer puzzle con contexto
- [ ] Usuario ingresa respuesta
- [ ] Sistema valida respuesta
- [ ] Si correcto: muestra siguiente misión
- [ ] Si incorrecto: muestra hint
- [ ] Último puzzle: pantalla de fin
- [ ] Progreso guardado en BD
- [ ] Frontend responsive
- [ ] No hay errores en consola

---

**Status:** Próximo paso = Test auth endpoints  
**Avísame cuando hayas completado los tests y seguimos con Stories/Places.**
