# 🎮 Proyecto Margarita

Un juego de exploración urbana que combina **Escape Room + Pokémon Go + Turismo Interactivo**.

Los jugadores resuelven acertijos en lugares específicos de la ciudad para descubrir historias ocultas y aprender sobre su destino de una manera lúdica y divertida.

---

## 🎯 Objetivo

Crear una experiencia inmersiva donde los turistas (y residentes) visitan lugares de interés en **Ciudad Autónoma de Buenos Aires** mientras resuelven acertijos basados en pistas físicas encontradas en esos lugares.

---

## 🕹️ Mecánica del Juego

### 1. Elige un Modo
- **SOLO:** Juega por tu cuenta
- **COLABORATIVO:** Juega con amigos (grupo se mueve junto)
- **RIVALIDAD:** Compite contra otros jugadores

### 2. Selecciona una Historia
Una historia es una campaña completa con 5-10 misiones conectadas narrativamente.

### 3. Resuelve Acertijos
Para cada misión:
1. Se te indica un lugar específico en CABA
2. Navegas hasta ese lugar
3. Encuentras una pista física (placa, monumento, cartel, etc.)
4. Resuelves un acertijo basado en esa pista
5. Desbloqueas la siguiente misión

### 4. Completa la Historia
Al terminar todas las misiones, descubres el desenlace narrativo y ves tus estadísticas.

---

## 🏗️ Estructura del Proyecto

```
claude-code2/
├── frontend/          # React PWA
├── backend/           # Node.js + Express API
├── database/          # Migraciones y seeds
├── docs/              # Documentación técnica
├── capturas/          # Referencias visuales
├── historias/         # Historias prototipo
└── referencias/       # Diseño e inspiración
```

### Documentación Clave
- `docs/arquitectura.md` - Decisiones técnicas
- `docs/api-endpoints.md` - Especificación API
- `docs/base-datos.md` - Esquema y modelos
- `CLAUDE.md` - Overview y roadmap

---

## 🚀 Inicio Rápido

### Requisitos
- Node.js 18+
- PostgreSQL 13+
- npm o yarn

### Setup Desarrollo

**1. Clonar y navegar**
```bash
cd claude-code2
```

**2. Setup Frontend**
```bash
cd frontend
npm install
npm run dev
```
Frontend corre en `http://localhost:5173`

**3. Setup Backend**
```bash
cd ../backend
npm install
cp .env.example .env
npx prisma migrate dev
npm run dev
```
Backend corre en `http://localhost:3000`

**4. Base de Datos**
```bash
# Crear esquema
npx prisma db push

# Llenar con datos de prueba
npx prisma db seed
```

---

## 📋 Stack Tecnológico

### Frontend
- **React 18** + Vite
- **TypeScript**
- **Tailwind CSS**
- **Zustand** (state)
- **React Query** (data fetching)
- **Leaflet/Mapbox** (mapas)

### Backend
- **Node.js** + Express
- **TypeScript**
- **PostgreSQL**
- **Prisma ORM**
- **JWT** (auth)
- **Socket.io** (real-time)

---

## 📊 Fases de Desarrollo

### ✅ Fase 1: Setup e Infraestructura
- [x] Arquitectura diseñada
- [x] Documentación creada
- [ ] Frontend setup inicial
- [ ] Backend setup inicial
- [ ] BD local configurada

### 🔄 Fase 2: MVP Single-Player (en progreso)
- [ ] Sistema de autenticación
- [ ] Modelos de datos
- [ ] Flujo de gameplay básico
- [ ] UI principal

### 📍 Fase 3: Geolocalización & Mapas
- [ ] Integración de mapas
- [ ] GPS tracking
- [ ] Validación de ubicación

### 👥 Fase 4: Multiplayer
- [ ] WebSocket setup
- [ ] Sesiones colaborativas
- [ ] Modo rivalidad

### 🎨 Fase 5: Pulido y Deployment
- [ ] Testing completo
- [ ] Optimizaciones
- [ ] PWA setup
- [ ] Deploy a producción

---

## 🌍 Lugares en CABA

Estamos recopilando lugares interesantes mediante Google Form. Los lugares incluyen:
- Monumentos históricos
- Placas conmemorativas
- Murales y arte urbano
- Edificios emblemáticos
- Parques y plazas

**Lugares ya documentados:**
- CROBAR (boliche)
- Plaza República de Pakistán (Palermo)
- Placa conmemorativa histórica

---

## 📖 Historias

Cada historia es una experiencia completa con:
- **Narrativa:** Contexto y personajes
- **Misiones:** 5-10 ubicaciones ordenadas lógicamente
- **Acertijos:** Preguntas basadas en pistas físicas
- **Desenlace:** Conclusión narrativa

### Historias Prototipo
Ver `/historias/` para ejemplos en desarrollo.

---

## 🔐 Seguridad

- **Autenticación:** JWT tokens (15 min expiration)
- **Refresh tokens:** 7 días
- **Passwords:** Hashed con bcrypt
- **HTTPS:** Requerido en producción
- **CORS:** Configurado por dominio

---

## 🧪 Testing

### Frontend
```bash
cd frontend
npm run test
npm run test:e2e  # Playwright
```

### Backend
```bash
cd backend
npm run test
npm run test:integration
```

---

## 📈 Deployment

### Frontend (Vercel/Netlify)
```bash
# Vercel
vercel

# Netlify
netlify deploy
```

### Backend (Railway/Heroku)
```bash
# Railway
railway up

# Heroku
git push heroku main
```

---

## 🤝 Contribuir

Este proyecto está en desarrollo activo. Para contribuir:

1. Fork el repo
2. Crea rama feature (`git checkout -b feature/amazing`)
3. Commit cambios (`git commit -am 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing`)
5. Abre Pull Request

**Convenciones:**
- Commits: `feat:`, `fix:`, `docs:`, `refactor:`
- Código: English (comentarios OK en español)
- Tests: Incluir para features nuevas

---

## 📞 Contacto

**Creador:** Matias Silvestre  
**Email:** matias.silvestre@iubenda.com  
**Estado:** En desarrollo (MVP)

---

## 📝 Licencia

TBD - Por definir

---

## 🗺️ Roadmap Completo

**Corto Plazo (Mayo-Junio 2026)**
- [x] Diseñar arquitectura
- [ ] MVP single-player funcional
- [ ] 1-2 historias prototipo
- [ ] Base de 20-30 lugares en CABA

**Medio Plazo (Julio-Agosto 2026)**
- [ ] Multiplayer (colaborativo + rivalidad)
- [ ] Más historias (5-10 totales)
- [ ] Leaderboards
- [ ] Sistema de puntuación

**Largo Plazo (2026+)**
- [ ] Expandir a otras ciudades
- [ ] App nativa (iOS/Android)
- [ ] Integración con guías turísticos
- [ ] Monetización (freemium)
- [ ] Comunidad de creadores

---

**¡Gracias por jugar Proyecto Margarita! 🌼**
