# Testing Autenticación JWT - Fase 2

**Status:** Ready to test  
**Endpoints:** 4 endpoints de autenticación implementados

---

## ✅ Endpoints Implementados

### 1. **POST /api/auth/signup** - Registrar usuario
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jugador1@margarita.com",
    "password": "password123",
    "nickname": "MargaritaPlayer"
  }'
```

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "uuid-aqui",
      "email": "jugador1@margarita.com",
      "nickname": "MargaritaPlayer"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR..."
  }
}
```

---

### 2. **POST /api/auth/login** - Loguearse
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jugador1@margarita.com",
    "password": "password123"
  }'
```

**Respuesta esperada:** (igual que signup)
```json
{
  "success": true,
  "message": "Login successful",
  "data": { ... }
}
```

---

### 3. **POST /api/auth/refresh** - Refrescar token
```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR..."
  }'
```

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR..."
  }
}
```

---

### 4. **GET /api/auth/me** - Obtener usuario actual
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR..."
```

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "User info retrieved successfully",
  "data": {
    "id": "uuid-aqui",
    "email": "jugador1@margarita.com",
    "nickname": "MargaritaPlayer",
    "createdAt": "2026-05-07T..."
  }
}
```

---

## 🧪 Plan de Testing Manual

### Paso 1: Signup
1. Abre Postman o usa curl
2. POST a `http://localhost:3000/api/auth/signup`
3. Copia el `accessToken` y `refreshToken` de la respuesta

### Paso 2: Logout y Login nuevamente
1. POST a `http://localhost:3000/api/auth/login` con las mismas credenciales
2. Verifica que obtienes tokens nuevos
3. Intenta login con password incorrecto → debe fallar con 401

### Paso 3: Obtener usuario actual
1. GET a `http://localhost:3000/api/auth/me`
2. Header: `Authorization: Bearer {accessToken}`
3. Debería retornar info del usuario

### Paso 4: Refresh token
1. POST a `http://localhost:3000/api/auth/refresh`
2. Body: `{ "refreshToken": "{refreshToken}" }`
3. Debería retornar un nuevo `accessToken`

---

## ⚠️ Casos de Error a Testear

| Caso | Endpoint | Esperado | Status |
|------|----------|----------|--------|
| Email duplicado | POST /signup | 409 USER_EXISTS | ⏳ Test |
| Password < 6 chars | POST /signup | 400 Error | ⏳ Test |
| Sin credentials | POST /login | 401 INVALID_CREDENTIALS | ⏳ Test |
| Sin token | GET /auth/me | 401 MISSING_TOKEN | ⏳ Test |
| Token inválido | GET /auth/me | 401 INVALID_TOKEN | ⏳ Test |

---

## 📝 Notas

- **JWT_SECRET:** Cambiar en `.env` a un valor seguro antes de producción
- **Password hashing:** Usando bcryptjs con salt rounds = 10
- **Token expiration:** 
  - Access: 15 minutos
  - Refresh: 7 días
- **CORS:** Habilitado para http://localhost:5173

---

## ✨ Próximos Pasos (Fase 2 continuación)

Después de verificar que auth funciona:
1. ✅ Autenticación JWT - HECHO
2. ⏳ CRUD Stories & Places
3. ⏳ Game Sessions
4. ⏳ Puzzle validation
5. ⏳ Frontend Auth components

**Avísame cuando hayas testeado los endpoints.**
