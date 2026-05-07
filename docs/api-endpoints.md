# API Endpoints - Proyecto Margarita

## Base URL
- Development: `http://localhost:3000/api`
- Production: `https://api.margarita.app/api`

---

## Authentication

### POST /auth/signup
Crear nueva cuenta de usuario

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "nickname": "NickName"
}
```

**Response (201):**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "nickname": "NickName",
    "createdAt": "2026-05-07T12:00:00Z"
  },
  "token": "jwt_token_here",
  "refreshToken": "refresh_token_here"
}
```

---

### POST /auth/login
Iniciar sesión

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "user": { ... },
  "token": "jwt_token_here",
  "refreshToken": "refresh_token_here"
}
```

---

### GET /auth/me
Obtener datos del usuario actual

**Headers:** `Authorization: Bearer {token}`

**Response (200):**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "nickname": "NickName",
  "createdAt": "2026-05-07T12:00:00Z"
}
```

---

### POST /auth/logout
Cerrar sesión (opcional para JWT stateless)

**Headers:** `Authorization: Bearer {token}`

**Response (200):**
```json
{ "message": "Logged out successfully" }
```

---

### POST /auth/refresh
Obtener nuevo token usando refresh token

**Request:**
```json
{
  "refreshToken": "refresh_token_here"
}
```

**Response (200):**
```json
{
  "token": "new_jwt_token",
  "refreshToken": "new_refresh_token"
}
```

---

## Stories (Historias)

### GET /stories
Listar todas las historias disponibles

**Query Params:**
- `difficulty` (opcional): `easy`, `medium`, `hard`
- `skip` (opcional): Pagination offset
- `take` (opcional): Pagination limit (default: 10)

**Response (200):**
```json
{
  "stories": [
    {
      "id": "uuid",
      "name": "Misterio en Palermo",
      "description": "Descubre los secretos ocultos...",
      "difficulty": "medium",
      "estimatedDuration": 45,
      "barrios": ["Palermo", "San Telmo"]
    }
  ],
  "total": 5,
  "skip": 0,
  "take": 10
}
```

---

### GET /stories/:id
Obtener detalle completo de una historia (con misiones)

**Response (200):**
```json
{
  "id": "uuid",
  "name": "Misterio en Palermo",
  "description": "...",
  "difficulty": "medium",
  "estimatedDuration": 45,
  "missions": [
    {
      "id": "uuid",
      "sequenceOrder": 1,
      "narrative": "Tu aventura comienza en...",
      "place": {
        "id": "uuid",
        "name": "Plaza República de Pakistán",
        "barrio": "Palermo",
        "latitude": -34.577,
        "longitude": -58.423
      }
    }
  ]
}
```

---

## Places (Lugares)

### GET /places
Listar lugares disponibles

**Query Params:**
- `barrio` (opcional): Filtrar por barrio
- `skip` (opcional): Pagination
- `take` (opcional): Limit

**Response (200):**
```json
{
  "places": [
    {
      "id": "uuid",
      "name": "Plaza República de Pakistán",
      "barrio": "Palermo",
      "latitude": -34.577,
      "longitude": -58.423,
      "description": "Plaza histórica con placa...",
      "imageUrl": "https://...",
      "verified": true
    }
  ],
  "total": 42
}
```

---

### POST /places
Sugerir un nuevo lugar (contribución de usuarios)

**Headers:** `Authorization: Bearer {token}`

**Request:**
```json
{
  "name": "Nuevo Lugar",
  "barrio": "Palermo",
  "latitude": -34.577,
  "longitude": -58.423,
  "description": "Descripción del lugar",
  "imageUrl": "https://..."
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "name": "Nuevo Lugar",
  "barrio": "Palermo",
  ...
}
```

---

## Game Sessions

### POST /game-sessions
Crear nueva sesión de juego

**Headers:** `Authorization: Bearer {token}`

**Request:**
```json
{
  "storyId": "uuid",
  "gameMode": "solo"  // solo, collaborative, rivalry
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "storyId": "uuid",
  "gameMode": "solo",
  "status": "in_progress",
  "startedAt": "2026-05-07T12:00:00Z",
  "totalTimeSeconds": 0
}
```

---

### GET /game-sessions/:id
Obtener estado actual de una sesión

**Headers:** `Authorization: Bearer {token}`

**Response (200):**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "storyId": "uuid",
  "gameMode": "solo",
  "status": "in_progress",
  "startedAt": "2026-05-07T12:00:00Z",
  "completedAt": null,
  "totalTimeSeconds": 300
}
```

---

### GET /game-sessions/:id/next-mission
Obtener la siguiente misión a resolver

**Headers:** `Authorization: Bearer {token}`

**Response (200):**
```json
{
  "mission": {
    "id": "uuid",
    "sequenceOrder": 1,
    "narrative": "Tu aventura comienza en...",
    "place": {
      "name": "Plaza República de Pakistán",
      "latitude": -34.577,
      "longitude": -58.423,
      "imageUrl": "https://..."
    }
  },
  "puzzle": {
    "id": "uuid",
    "question": "¿Qué dice la placa sobre...?",
    "hint": "Busca en la placa...",
    "imageUrl": "https://... (foto de la pista)"
  },
  "missionNumber": 1,
  "totalMissions": 5
}
```

---

### POST /game-sessions/:id/answer
Enviar respuesta a un acertijo

**Headers:** `Authorization: Bearer {token}`

**Request:**
```json
{
  "puzzleId": "uuid",
  "answer": "La respuesta del usuario"
}
```

**Response (200):**
```json
{
  "correct": true,
  "message": "¡Correcto! Avanza a la siguiente misión",
  "nextMissionAvailable": true
}
```

**Response (200) - Respuesta incorrecta:**
```json
{
  "correct": false,
  "message": "Respuesta incorrecta. Intenta nuevamente",
  "hint": "Pista adicional: busca en...",
  "attemptNumber": 1
}
```

---

### GET /game-sessions/:id/progress
Obtener progreso actual en la sesión

**Headers:** `Authorization: Bearer {token}`

**Response (200):**
```json
{
  "sessionId": "uuid",
  "missionsCompleted": 3,
  "totalMissions": 5,
  "currentMission": 4,
  "timeElapsed": "00:15:30",
  "completedMissions": [
    {
      "missionNumber": 1,
      "placeName": "Plaza República de Pakistán",
      "completedAt": "2026-05-07T12:05:00Z"
    }
  ]
}
```

---

### POST /game-sessions/:id/complete
Completar una sesión

**Headers:** `Authorization: Bearer {token}`

**Response (200):**
```json
{
  "id": "uuid",
  "status": "completed",
  "completedAt": "2026-05-07T12:45:00Z",
  "totalTimeSeconds": 2700,
  "statistics": {
    "totalAttempts": 8,
    "totalHintsUsed": 2,
    "averageTimePerMission": 540
  }
}
```

---

## Collaborative Sessions

### POST /collaborative-sessions
Crear sesión colaborativa

**Headers:** `Authorization: Bearer {token}`

**Request:**
```json
{
  "storyId": "uuid",
  "maxPlayers": 4
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "sessionCode": "A1B2C3",
  "sessionUrl": "https://margarita.app/join/A1B2C3",
  "storyId": "uuid",
  "creatorUserId": "uuid",
  "maxPlayers": 4,
  "members": [
    {
      "userId": "uuid",
      "nickname": "Player1",
      "joinedAt": "2026-05-07T12:00:00Z",
      "isReady": false
    }
  ],
  "status": "waiting"
}
```

---

### POST /collaborative-sessions/:code/join
Unirse a una sesión colaborativa usando código

**Headers:** `Authorization: Bearer {token}`

**Request:**
```json
{
  "sessionCode": "A1B2C3"
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "sessionCode": "A1B2C3",
  "status": "waiting",
  "members": [ ... ]
}
```

---

### GET /collaborative-sessions/:id
Obtener estado de sesión colaborativa

**Headers:** `Authorization: Bearer {token}`

**Response (200):**
```json
{
  "id": "uuid",
  "sessionCode": "A1B2C3",
  "storyId": "uuid",
  "status": "in_progress",
  "members": [
    {
      "userId": "uuid",
      "nickname": "Player1",
      "isReady": true,
      "currentMission": 2
    },
    {
      "userId": "uuid",
      "nickname": "Player2",
      "isReady": true,
      "currentMission": 2
    }
  ]
}
```

---

### POST /collaborative-sessions/:id/ready
Marcar como listo para empezar

**Headers:** `Authorization: Bearer {token}`

**Response (200):**
```json
{
  "message": "Ready status updated",
  "allReady": true,
  "canStart": true
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "INVALID_INPUT",
  "message": "El email no es válido"
}
```

### 401 Unauthorized
```json
{
  "error": "UNAUTHORIZED",
  "message": "Token inválido o expirado"
}
```

### 404 Not Found
```json
{
  "error": "NOT_FOUND",
  "message": "Recurso no encontrado"
}
```

### 500 Internal Server Error
```json
{
  "error": "INTERNAL_ERROR",
  "message": "Error interno del servidor"
}
```

---

## Rate Limiting

- Auth endpoints: 5 requests per minute per IP
- General endpoints: 100 requests per minute per user
- WebSocket: Unlimited

---

## Versioning

Actualmente: `v1`  
Futura: `/api/v2/...`
