# Setup Base de Datos - Guía Paso a Paso

## 📋 Checklist Rápido

- [ ] **Paso 1:** Autenticar MCP Supabase
- [ ] **Paso 2:** Verificar conexión a BD
- [ ] **Paso 3:** Ejecutar migraciones Prisma
- [ ] **Paso 4:** Generar cliente Prisma
- [ ] **Paso 5:** Testear server backend

---

## 🔐 Paso 1: Autenticar MCP Supabase

### Opción A: En Terminal Regular (Recomendado)

```bash
# Abre una terminal (NO en VS Code)
cd C:\Users\matias.silvestre\OneDrive\ -\ team.blue\Desktop\claude-code2

# Ejecuta el comando MCP
claude /mcp
```

Esto abrirá tu navegador automáticamente. Selecciona:
1. Servidor: `supabase`
2. Haz clic en "Authenticate"
3. Completa login en Supabase
4. Copia el token si es necesario

### Opción B: En Claude Code IDE

Si prefieres desde Claude Code, ejecuta en la terminal integrada:
```bash
claude /mcp
```

---

## ✅ Paso 2: Verificar Conexión

Una vez autenticado, verifica que Supabase está accesible:

```bash
cd backend

# Prueba la conexión
npm run prisma:generate
```

Si ves: ✅ `@prisma/client@VERSION generated in /path`

→ **Conexión exitosa**

---

## 🗄️ Paso 3: Ejecutar Migraciones

El archivo de migración ya está creado en:
```
backend/prisma/migrations/001_init/migration.sql
```

Ejecuta:

```bash
# Aún en /backend
npm run prisma:migrate
```

Se ejecutarán estos pasos:
1. Supabase crea todas las tablas
2. Se crean índices y relaciones
3. Se generan los enums (Difficulty, GameMode, etc.)

**Salida esperada:**
```
✔ Enter a name for the new migration: … 001_init
✔ Created migration file in prisma/migrations/001_init

✔ Running migrate against database db.xxx.supabase.co
```

---

## 🔧 Paso 4: Generar Cliente Prisma

```bash
npm run prisma:generate
```

Esto actualiza `node_modules/@prisma/client` con los tipos de tus modelos.

**Salida esperada:**
```
@prisma/client@7.x generated in XXms
```

---

## 🚀 Paso 5: Testear Server Backend

```bash
npm run dev
```

**Salida esperada:**
```
✅ Server running on http://localhost:3000
✅ Socket.io listening on ws://localhost:3000
✅ Database connected to Supabase
```

Si ves esos mensajes → **¡Fase 1 Completada!** 🎉

---

## 🐛 Troubleshooting

### Error: "P1001: Can't reach database server"
- Verifica que el DATABASE_URL en `.env` es exacto
- Comprueba que `sslmode=disable` está en la URL
- Intenta con `sslmode=require` si lo anterior no funciona

### Error: "Unexpected token @"
- Asegúrate de usar Node 16+
- Ejecuta: `npm install`

### Error: "Relations to other models"
- Las tablas existen pero no se encuentra alguna relación
- Ejecuta nuevamente: `npm run prisma:generate`

---

## ✨ Una Vez Completado

La base de datos está lista para **Fase 2: MVP Single-Player**

Próximos pasos:
1. ✅ Implementar autenticación JWT (POST /api/auth/signup, login, etc.)
2. ✅ CRUD de historias y lugares
3. ✅ Flujo de gameplay (crear sesión, obtener misiones, responder acertijos)
4. ✅ Frontend: componentes de auth, selector de historias, gameplay

---

## 📞 Estado Actual

- **Proyecto:** Margarita ✅
- **Fase 1:** 95% - Awaiting database verification
- **Base de Datos:** Supabase (MCP configured)
- **Schema:** 10 modelos con relaciones ✅
- **Siguiente:** Implementar endpoints de API

Avísame cuando termines los pasos y te guío hacia Fase 2.
