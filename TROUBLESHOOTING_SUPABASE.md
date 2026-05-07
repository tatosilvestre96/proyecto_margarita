# Troubleshooting - Conexión Supabase

## Problema
Prisma no puede conectarse a Supabase:
```
Error: P1001: Can't reach database server at `db.voisvccoozkexypvyrnm.supabase.co:5432`
```

---

## Posibles Causas

### 1. ✅ Verifica que tu proyecto Supabase esté activo
- Ve a https://app.supabase.com
- Entra a tu proyecto `margarita-dev`
- En **Settings → Database**, verifica el status
- Debe decir "Database is running" (en verde)

### 2. ✅ Verifica las credenciales
En Supabase → Settings → Database → Connection String:
- Revisa que tu password sea **exactamente** `gEgJLZ9vT1GjP5IH`
- No debe haber caracteres especiales que necesiten escaping

### 3. ✅ Verifica el dominio
El dominio debe ser **exactamente**: `db.voisvccoozkexypvyrnm.supabase.co`
- Verifica que no haya espacios
- Verifica que sea `.supabase.co` (no `.supabase.in` u otro)

### 4. ✅ Prueba conexión con psql (si lo tienes instalado)
```bash
psql "postgresql://postgres:gEgJLZ9vT1GjP5IH@db.voisvccoozkexypvyrnm.supabase.co:5432/postgres"
```

Si funciona, el problema es específico de Prisma/Node.

### 5. ✅ Firewall/Red
- ¿Estás detrás de un VPN o proxy?
- ¿El puerto 5432 está bloqueado?
- Intenta desde otra red (mobile hotspot)

---

## Soluciones Recomendadas

### Opción A: Usar PostgreSQL Local (para desarrollo)

Si Supabase no funciona, podemos usar PostgreSQL local:

**En Windows:**
1. Descarga PostgreSQL desde: https://www.postgresql.org/download/windows/
2. Instala (elige puerto 5432, password admin)
3. Abre pgAdmin (viene incluido) y crea una BD llamada `margarita`
4. Actualiza `.env`:
   ```
   DATABASE_URL="postgresql://postgres:admin@localhost:5432/margarita"
   ```
5. Corre: `npm run prisma:migrate`

### Opción B: Verificar Supabase URL

Quizás la URL que compartiste no es la correcta. Para obtenerla nuevamente:
1. Ve a https://app.supabase.com/project/[PROJECT-ID]/settings/database
2. Copia "Connection string" → "Standard format"
3. Reemplaza `[PASSWORD]` con tu contraseña

---

## Si Nada Funciona

Podemos continuar sin BD por ahora:
1. Saltamos `prisma migrate dev`
2. Desarrollamos la lógica de backend
3. Después vinculamos la BD

O usamos una BD en memoria para testing.

---

## Próximo Paso

Avísame cuál de las 5 verificaciones falla, y lo solucionaremos:

1. ¿El proyecto en Supabase está activo? ✓/✗
2. ¿Las credenciales son exactas? ✓/✗
3. ¿El dominio es correcto? ✓/✗
4. ¿`psql` funciona si lo tienes? ✓/✗/No tiene psql
5. ¿Estás detrás de VPN/proxy? ✓/✗

O podemos cambiar a PostgreSQL local si prefieres.
