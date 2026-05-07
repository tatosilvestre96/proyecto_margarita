# Base de Datos - Proyecto Margarita

## Modelo Relacional

```
┌─────────────┐         ┌──────────────┐
│   Users     │         │   Stories    │
├─────────────┤         ├──────────────┤
│ id (PK)     │◄────────│ id (PK)      │
│ email       │         │ name         │
│ password    │         │ description  │
│ nickname    │         │ difficulty   │
│ createdAt   │         │ createdBy (FK)
│ updatedAt   │         │ createdAt    │
└─────────────┘         │ updatedAt    │
      ▲                 └──────────────┘
      │                       │
      │                       │ 1:N
      │                       ▼
      │              ┌─────────────────┐
      │              │   Missions      │
      │              ├─────────────────┤
      │              │ id (PK)         │
      │              │ storyId (FK)    │
      │              │ sequenceOrder   │
      │              │ placeId (FK)    │
      │              │ narrative       │
      │              │ createdAt       │
      │              └─────────────────┘
      │                       │
      │                       │ 1:N
      │                       ▼
      │              ┌─────────────────┐
      │              │   Puzzles       │
      │              ├─────────────────┤
      │              │ id (PK)         │
      │              │ missionId (FK)  │
      │              │ question        │
      │              │ correctAnswer   │
      │              │ hint            │
      │              │ difficulty      │
      │              │ imageUrl        │
      │              │ createdAt       │
      │              └─────────────────┘

┌──────────────┐
│   Places     │
├──────────────┤
│ id (PK)      │
│ name         │
│ barrio       │
│ latitude     │
│ longitude    │
│ description  │
│ imageUrl     │
│ createdBy(FK)├─────────┐
│ verified     │         │
│ createdAt    │         │
│ updatedAt    │         │
└──────────────┘         │
                         │
         ┌───────────────┘
         │
         ▼
┌──────────────────────┐
│  GameSessions        │
├──────────────────────┤
│ id (PK)              │
│ userId (FK)          │
│ storyId (FK)         │
│ gameMode (enum)      │
│ status (enum)        │
│ startedAt            │
│ completedAt (NULL)   │
│ totalTimeSeconds     │
│ createdAt            │
└──────────────────────┘
         │
         │ 1:N
         ▼
┌──────────────────────┐
│  PlayerProgress      │
├──────────────────────┤
│ id (PK)              │
│ sessionId (FK)       │
│ missionId (FK)       │
│ puzzleId (FK)        │
│ playerAnswer         │
│ isCorrect            │
│ attemptNumber        │
│ completedAt (NULL)   │
│ createdAt            │
└──────────────────────┘

┌──────────────────────────────┐
│ CollaborativeSessions        │
├──────────────────────────────┤
│ id (PK)                      │
│ sessionCode (UNIQUE)         │
│ storyId (FK)                 │
│ creatorUserId (FK)           │
│ maxPlayers                   │
│ status (enum)                │
│ sessionUrl                   │
│ createdAt                    │
│ expiresAt                    │
└──────────────────────────────┘
         │
         │ 1:N
         ▼
┌──────────────────────────────┐
│ CollaborativeSessionMembers  │
├──────────────────────────────┤
│ id (PK)                      │
│ sessionId (FK)               │
│ userId (FK)                  │
│ joinedAt                     │
│ isReady                      │
└──────────────────────────────┘
```

---

## Esquema SQL (PostgreSQL)

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL, -- hashed with bcrypt
  nickname VARCHAR(100) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);

-- Stories Table
CREATE TABLE stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  difficulty VARCHAR(20) NOT NULL, -- easy, medium, hard
  estimatedDuration INTEGER, -- minutes
  createdBy UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_stories_createdBy ON stories(createdBy);
CREATE INDEX idx_stories_difficulty ON stories(difficulty);

-- Places Table
CREATE TABLE places (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  barrio VARCHAR(100) NOT NULL,
  latitude DECIMAL(9, 6) NOT NULL,
  longitude DECIMAL(9, 6) NOT NULL,
  description TEXT,
  historicalContext TEXT,
  imageUrl VARCHAR(500),
  createdBy UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
  verified BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_places_barrio ON places(barrio);
CREATE INDEX idx_places_verified ON places(verified);
CREATE INDEX idx_places_coords ON places(latitude, longitude);

-- Missions Table
CREATE TABLE missions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  storyId UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  sequenceOrder INTEGER NOT NULL,
  placeId UUID NOT NULL REFERENCES places(id) ON DELETE RESTRICT,
  narrative TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(storyId, sequenceOrder)
);

CREATE INDEX idx_missions_storyId ON missions(storyId);
CREATE INDEX idx_missions_placeId ON missions(placeId);

-- Puzzles Table
CREATE TABLE puzzles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  missionId UUID NOT NULL REFERENCES missions(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  correctAnswer VARCHAR(500) NOT NULL, -- normalized for comparison
  hint TEXT,
  difficulty VARCHAR(20), -- easy, medium, hard
  imageUrl VARCHAR(500), -- photo of the physical clue
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_puzzles_missionId ON puzzles(missionId);

-- GameSessions Table
CREATE TABLE gameSessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  userId UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  storyId UUID NOT NULL REFERENCES stories(id) ON DELETE RESTRICT,
  gameMode VARCHAR(20) NOT NULL, -- solo, collaborative, rivalry
  status VARCHAR(20) NOT NULL, -- in_progress, completed, abandoned
  startedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completedAt TIMESTAMP,
  totalTimeSeconds INTEGER DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_gameSessions_userId ON gameSessions(userId);
CREATE INDEX idx_gameSessions_storyId ON gameSessions(storyId);
CREATE INDEX idx_gameSessions_status ON gameSessions(status);

-- PlayerProgress Table
CREATE TABLE playerProgress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sessionId UUID NOT NULL REFERENCES gameSessions(id) ON DELETE CASCADE,
  missionId UUID NOT NULL REFERENCES missions(id) ON DELETE RESTRICT,
  puzzleId UUID NOT NULL REFERENCES puzzles(id) ON DELETE RESTRICT,
  playerAnswer TEXT NOT NULL,
  isCorrect BOOLEAN NOT NULL,
  attemptNumber INTEGER DEFAULT 1,
  completedAt TIMESTAMP,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_playerProgress_sessionId ON playerProgress(sessionId);
CREATE INDEX idx_playerProgress_missionId ON playerProgress(missionId);
CREATE INDEX idx_playerProgress_puzzleId ON playerProgress(puzzleId);

-- CollaborativeSessions Table
CREATE TABLE collaborativeSessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sessionCode VARCHAR(10) UNIQUE NOT NULL,
  storyId UUID NOT NULL REFERENCES stories(id) ON DELETE RESTRICT,
  creatorUserId UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  maxPlayers INTEGER DEFAULT 4,
  status VARCHAR(20) NOT NULL, -- waiting, in_progress, completed
  sessionUrl VARCHAR(500),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expiresAt TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL '24 hours')
);

CREATE INDEX idx_collaborativeSessions_sessionCode ON collaborativeSessions(sessionCode);
CREATE INDEX idx_collaborativeSessions_creatorUserId ON collaborativeSessions(creatorUserId);

-- CollaborativeSessionMembers Table
CREATE TABLE collaborativeSessionMembers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sessionId UUID NOT NULL REFERENCES collaborativeSessions(id) ON DELETE CASCADE,
  userId UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  joinedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  isReady BOOLEAN DEFAULT FALSE,
  UNIQUE(sessionId, userId)
);

CREATE INDEX idx_sessionMembers_sessionId ON collaborativeSessionMembers(sessionId);
CREATE INDEX idx_sessionMembers_userId ON collaborativeSessionMembers(userId);
```

---

## Migraciones (Prisma)

### schema.prisma
Ver `/backend/prisma/schema.prisma` para configuración de Prisma con estos modelos.

### Ejecución de Migraciones
```bash
# Crear nueva migración
npx prisma migrate dev --name init

# Aplicar migraciones
npx prisma migrate deploy

# Resetear base de datos (desarrollo only)
npx prisma migrate reset
```

---

## Semillas (Seeds)

Ver `/database/seeds/` para scripts de población inicial de datos:
- Usuarios de prueba
- Historias prototipo
- Lugares en CABA
- Acertijos de ejemplo

### Ejecutar seeds
```bash
npx prisma db seed
```

---

## Constraints y Validaciones

| Tabla | Campo | Tipo | Validación |
|-------|-------|------|-----------|
| users | email | string | Email válido, único |
| users | password | string | Min 8 caracteres (hasheada) |
| users | nickname | string | 1-100 caracteres |
| stories | name | string | Required, 1-255 caracteres |
| stories | difficulty | enum | easy, medium, hard |
| places | latitude | decimal | -90 to 90 |
| places | longitude | decimal | -180 to 180 |
| puzzles | correctAnswer | string | Case-insensitive match |
| gameSessions | gameMode | enum | solo, collaborative, rivalry |
| gameSessions | status | enum | in_progress, completed, abandoned |
| collaborativeSessions | sessionCode | string | Alphanumeric, 6 caracteres |

---

## Índices Aplicados

**Primary Keys:** Todas las tablas
**Foreign Keys:** Como se muestra en esquema
**Unique Indexes:** email, sessionCode
**Search Indexes:** barrio, difficulty, status, verified
**Coordinate Index:** (latitude, longitude) para geolocalización futura

---

## Queries Comunes

### Obtener Historia con Misiones
```sql
SELECT s.*, m.*, p.*, pz.*
FROM stories s
LEFT JOIN missions m ON s.id = m.storyId
LEFT JOIN places p ON m.placeId = p.id
LEFT JOIN puzzles pz ON m.id = pz.missionId
WHERE s.id = $1
ORDER BY m.sequenceOrder;
```

### Obtener Progreso del Jugador
```sql
SELECT pp.*, m.sequenceOrder, p.name as placeName
FROM playerProgress pp
JOIN missions m ON pp.missionId = m.id
JOIN places p ON m.placeId = p.id
WHERE pp.sessionId = $1
ORDER BY m.sequenceOrder;
```

### Lugares por Barrio
```sql
SELECT * FROM places
WHERE barrio = $1 AND verified = TRUE
ORDER BY name;
```

---

## Backup y Maintenance

### Backup Regular
```bash
pg_dump margarita_db > backup_$(date +%Y%m%d).sql
```

### Restore
```bash
psql margarita_db < backup_20260507.sql
```

---

## Escalabilidad Futura

- **Replicación:** Replica read-only para analytics
- **Particionamiento:** Por fecha en gameSessions si crece mucho
- **Archivado:** Mover sesiones antiguas a tabla histórica
- **Cache:** Redis para queries frecuentes (lugares, historias)
