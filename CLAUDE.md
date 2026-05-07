# Proyecto Margarita — Documentación General

## 1. Descripción General del Proyecto

**Nombre:** Proyecto Margarita (provisional)

**Concepto:** Un juego de aventura urbana que combina elementos de:
- **Escape Room** (acertijos y puzzles para resolver)
- **Pokémon Go** (geolocalización y exploración en la ciudad)
- **City Tourism** (aprendizaje sobre la ciudad y sus lugares)

**Propósito:** Que los jugadores descubran y aprendan sobre la ciudad de una manera lúdica, divertida e interactiva.

**Público Target:**
- Turistas que desean conocer la ciudad de forma innovadora
- Residentes locales que quieren redescubrir su ciudad
- Grupos de amigos/familias

---

## 2. Mecánica Principal del Juego

### Flujo de Gameplay

1. **Selección de Modo:** El jugador elige entre:
   - **SOLO:** Juego individual
   - **COLABORATIVO:** Grupo se mueve junto, pueden usar 1+ dispositivos
   - **RIVALIDAD:** Modo competitivo, cada uno su ritmo

2. **Selección de Historia:** Elige una historia/misión para jugar

3. **Gameplay Loop:**
   - Se presenta el contexto narrativo
   - Obtiene siguientes misión + ubicación
   - Se muestra el acertijo (pregunta + imagen de pista)
   - Navega a lugar específico en CABA
   - Lee pista física en el lugar
   - Resuelve acertijo
   - Si correcto → siguiente misión
   - Si incorrecto → hint o reintentar

4. **Desenlace:** Al completar todas las misiones, se muestra pantalla de fin con estadísticas

### Validación de Ubicación

- **MVP:** Acertijo basado en pista física (sin GPS)
- El acertijo solo puede completarse si el jugador leyó la pista en persona
- **Futuro:** Agregar geofencing como validación secundaria

### Métricas Tracked
- Tiempo total de gameplay
- Intentos por acertijo
- Progreso secuencial

---

## 3. Stack Tecnológico

### Frontend (Web/PWA)
- **React 18+** - UI interactiva
- **TypeScript** - Type safety
- **Tailwind CSS** - Estilos
- **Vite** - Build tool
- **Zustand** - State management
- **React Query** - Data fetching/caching
- **Leaflet.js** o **Mapbox** - Mapas
- **PWA Manifest** - Capacidad offline/mobile

### Backend
- **Node.js + Express.js** - Servidor HTTP
- **PostgreSQL** - Base de datos
- **Prisma ORM** - ORM moderno
- **JWT** - Autenticación
- **Socket.io** - WebSocket para multiplayer

### Deployment
- **Vercel/Netlify** - Frontend
- **Railway/Heroku** - Backend
- **Supabase** o **AWS RDS** - BD gestionada

---

## 4. Estructura del Proyecto

```
claude-code2/
├── CLAUDE.md                          # Este archivo
├── README.md                          # Descripción general
├── .gitignore
├── docs/
│   ├── arquitectura.md               # Decisiones técnicas
│   ├── api-endpoints.md              # Documentación API
│   ├── base-datos.md                 # Esquema y modelos
│   ├── historias.md                  # Catálogo de historias
│   ├── lugares.md                    # Catálogo de lugares en CABA
│   ├── mecanicas.md                  # Reglas y mecánicas
│   └── roadmap.md                    # Plan de desarrollo
├── capturas/                         # Referencias visuales
│   ├── 01_crobar_neon.jpeg
│   ├── 02_plaza_pakistan.jpeg
│   └── 03_placa_conmemorativa.jpeg
├── historias/                        # Historias en desarrollo
│   ├── historia_prototipo_1/
│   │   ├── descripcion.md
│   │   ├── misiones.json
│   │   └── acertijos.json
│   └── README.md
├── referencias/                      # Diseño e inspiración
│   ├── wireframes/
│   ├── ui-mockups/
│   └── benchmarks.md
├── frontend/                         # React PWA app
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── backend/                          # Node + Express API
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── models/
│   │   ├── utils/
│   │   ├── types/
│   │   └── server.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
└── database/                         # Migraciones y SQL
    ├── migrations/
    ├── seeds/
    └── schema.sql
```

---

## 5. Base de Datos - Modelos Principales

```typescript
// Users
Users {
  id: UUID
  email: string (unique)
  password: string (hashed)
  nickname: string
  createdAt: timestamp
}

// Historias (campaigns)
Stories {
  id: UUID
  name: string
  description: text
  difficulty: enum (easy, medium, hard)
  estimatedDuration: integer (minutos)
  createdBy: UUID (FK → Users)
  createdAt: timestamp
}

// Misiones dentro de una historia
Missions {
  id: UUID
  storyId: UUID (FK → Stories)
  sequenceOrder: integer (1, 2, 3...)
  placeId: UUID (FK → Places)
  narrative: text
  createdAt: timestamp
}

// Lugares en CABA
Places {
  id: UUID
  name: string
  barrio: string
  latitude: float
  longitude: float
  description: text
  imageUrl: string
  createdBy: UUID (FK → Users)
  verified: boolean
  createdAt: timestamp
}

// Acertijos
Puzzles {
  id: UUID
  missionId: UUID (FK → Missions)
  question: text
  correctAnswer: string
  hint: string
  difficulty: enum
  imageUrl: string
  createdAt: timestamp
}

// Sesiones de juego
GameSessions {
  id: UUID
  userId: UUID (FK → Users)
  storyId: UUID (FK → Stories)
  gameMode: enum (solo, collaborative, rivalry)
  status: enum (in_progress, completed, abandoned)
  startedAt: timestamp
  completedAt: timestamp (nullable)
  totalTimeSeconds: integer
}

// Progreso del jugador
PlayerProgress {
  id: UUID
  sessionId: UUID (FK → GameSessions)
  missionId: UUID (FK → Missions)
  puzzleId: UUID (FK → Puzzles)
  playerAnswer: string
  isCorrect: boolean
  attemptNumber: integer
  completedAt: timestamp (nullable)
}
```

Ver `/docs/base-datos.md` para el esquema SQL completo.

---

## 6. Fases de Desarrollo

### **Fase 1: Setup e Infraestructura** (2-3 semanas)
- [ ] Setup React + Vite
- [ ] Setup Node + Express
- [ ] Setup PostgreSQL
- [ ] Autenticación JWT
- [ ] Estructura de carpetas

### **Fase 2: MVP Single-Player** (4-5 semanas)
- [ ] Modelos de datos
- [ ] CRUD historias/lugares
- [ ] Gameplay básico
- [ ] Sistema de acertijos
- [ ] UI principal

### **Fase 3: Geolocalización & Mapas** (2 semanas)
- [ ] Integración Leaflet/Mapbox
- [ ] Ubicación del usuario
- [ ] Validación "cerca del lugar"

### **Fase 4: Multiplayer** (3-4 semanas)
- [ ] WebSocket setup
- [ ] Sesiones colaborativas
- [ ] Sincronización real-time
- [ ] Modo rivalidad

### **Fase 5: Pulido y Deployment** (2 semanas)
- [ ] Testing
- [ ] Performance
- [ ] PWA setup
- [ ] Deployment

---

## 7. Guía de Desarrollo

### Antes de Empezar

1. Lee `/docs/arquitectura.md` para decisiones técnicas
2. Revisa `/docs/api-endpoints.md` para estructura API
3. Comprende los modelos en `/docs/base-datos.md`

### Convenciones

- **Código:** Inglés (comentarios pueden ser español o inglés)
- **Git:** Commits con tipo (`feat:`, `fix:`, `docs:`, etc.)
- **Variables de entorno:** Usar `.env.example`
- **Documentación:** Mantener CLAUDE.md actualizado

### Historias Prototipo

Están en `/historias/` - incluyen:
- Descripción narrativa
- Misiones (lugares + pistas)
- Acertijos (preguntas + respuestas correctas)

### Referencias Visuales

Capturas están en `/capturas/` para inspiración al crear acertijos.

---

## 8. API Endpoints (Backend)

Ver `/docs/api-endpoints.md` para la documentación completa.

**Resumen:**
- `POST /api/auth/signup` - Crear cuenta
- `POST /api/auth/login` - Login
- `GET /api/stories` - Listar historias
- `POST /api/game-sessions` - Crear sesión
- `POST /api/game-sessions/:id/answer` - Enviar respuesta
- `GET /api/game-sessions/:id/progress` - Ver progreso

---

## 9. Próximos Pasos Inmediatos

1. ✅ Plan arquitectónico completado
2. 📁 Crear estructura de carpetas (frontend, backend, database)
3. 🚀 Inicializar proyectos React + Node
4. 🔐 Implementar autenticación JWT
5. 📖 Documentar historia prototipo
6. 🎮 Comenzar con gameplay básico

---

## 10. Notas Importantes

### Cuello de Botella Principal
**Validación de ubicación:** El jugador debe visitar el lugar físico para completar el acertijo. Solucionado con acertijos basados en pistas visibles.

### Base de Datos de Lugares
Google Form en recopilación de lugares. Cuando tengamos respuestas, usaremos IA para completar:
- Barrio
- Coordenadas GPS
- Descripción histórica
- Fotos

### Multiplayer
Aunque es Phase 4, la arquitectura desde el inicio debe soportar:
- WebSocket ready
- Session codes
- Real-time sync

---

## 11. Key People & Resources

**Creador:** Matias Silvestre
**Email:** matias.silvestre@iubenda.com

**Recursos:**
- Plan detallado: `/plans/temporal-beaming-tarjan.md`
- Figma (cuando haya wireframes)
- Google Form respuestas (cuando lleguen)

---

**Última actualización:** 2026-05-07  
**Status:** Fase 1 iniciada
