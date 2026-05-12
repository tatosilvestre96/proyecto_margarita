# ⚡ Referencia Rápida de Backlog

## 🎯 3 Formas de Ver las Categorías

### ✨ Forma 1: Script Interactivo (Recomendado)
```bash
./backlog-interactive.sh
```
Te mostrará un menú bonito donde puedes:
1. Ver todas las categorías
2. Seleccionar una con números
3. Escribir tu idea
4. ¡Listo! Se guarda automáticamente

---

### 📋 Forma 2: Ver Guía de Categorías
```bash
cat BACKLOG_CATEGORIES.md
```
O simplemente abre en tu editor:
```bash
code BACKLOG_CATEGORIES.md
```

---

### 💬 Forma 3: Escribir Aquí Conmigo
Simplemente escribe la categoría y la idea:
```
Backend: Tu idea aquí
Frontend: Tu idea aquí
Video: Tu idea aquí
```

---

## 🏷️ Códigos de Categorías (Si Prefieres Escribir)

```
backend       → 🏗️  Backend
frontend      → 🎨  Frontend
gameplay      → 🗺️  Gameplay
video         → 🎬  Video Content
database      → 🗄️  Database
security      → 🔐  Seguridad & Performance
multiplayer   → 📱  Multiplayer
bug           → 🐛  Bugs & Fixes
docs          → 📚  Documentación
(ninguno)     → 🎯  Mejoras Generales
```

---

## 🚀 Ejemplo

### Con Script Interactivo
```bash
$ ./backlog-interactive.sh

╔════════════════════════════════════════╗
║  📋 AGREGAR IDEA AL BACKLOG           ║
╚════════════════════════════════════════╝

Categorías disponibles:

  1) 🏗️  Backend              - APIs, endpoints, servidor
  2) 🎨  Frontend             - UI, componentes, estilos
  ... (y más)

¿Qué categoría? (1-10): 1
✅ Categoría seleccionada: 🏗️ Backend

Escribe tu idea:
> Crear endpoint para guardar progreso

╔════════════════════════════════════════╗
║  ✅ IDEA GUARDADA EXITOSAMENTE        ║
╚════════════════════════════════════════╝

  📝 - [ ] **[2026-05-12 16:45]** Crear endpoint para guardar progreso
  📁 Categoría: 🏗️ Backend
  📊 Total de ideas: 21
```

---

## 📁 Archivos de Referencia

- **BACKLOG_CATEGORIES.md** - Listado detallado de todas las categorías
- **backlog-interactive.sh** - Script interactivo con menú
- **BACKLOG.md** - Archivo principal con todas las ideas

---

**💡 Pro Tip:** Usa el script interactivo cuando no recuerdes las categorías. Es mucho más fácil que escribir códigos.

