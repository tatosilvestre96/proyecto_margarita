# 📋 Backlog Management System

Sistema para capturar y organizar ideas de Proyecto Margarita de forma rápida y eficiente.

---

## 🚀 Uso Rápido

### Agregar una idea con categoría
```bash
./backlog.sh backend "Crear endpoint para guardar progreso"
./backlog.sh frontend "Mejorar responsive del mapa"
./backlog.sh video "Grabar intro del primer nivel"
```

### Agregar una idea general (sin categoría)
```bash
./backlog.sh "Idea rápida que se me ocurrió"
```

---

## 📂 Estructura

```
proyecto/
├── BACKLOG.md          ← Archivo principal (todas las ideas)
├── backlog.sh          ← Script para agregar ideas
└── backlog/
    ├── README.md       ← Este archivo
    ├── SPRINTS.md      ← Ideas organizadas por sprints
    └── COMPLETED.md    ← Historial de ideas completadas
```

---

## 🏷️ Categorías Disponibles

| Comando | Sección | Descripción |
|---------|---------|-------------|
| `backend` | 🏗️ Backend | APIs, endpoints, lógica de servidor |
| `frontend` | 🎨 Frontend | UI, React components, estilos |
| `gameplay` | 🗺️ Gameplay | Mecánicas, acertijos, misiones |
| `video` | 🎬 Video Content | Videos, narrativa, cinematografía |
| `database` | 🗄️ Database | Schema, optimizaciones, queries |
| `security` | 🔐 Seguridad | Autenticación, performance, escalabilidad |
| `multiplayer` | 📱 Multiplayer | Modo collab, rivalidad, social |
| `bug` | 🐛 Bugs & Fixes | Problemas a solucionar |
| `docs` | 📚 Documentación | Documentación y guías |
| *ninguno* | 🎯 Mejoras Generales | Categoría por defecto |

---

## 📝 Ejemplos Reales

### Backend
```bash
./backlog.sh backend "Crear endpoint GET /api/places/search?q=teatro"
./backlog.sh backend "Implementar validación de ubicación GPS"
./backlog.sh backend "Agregar rate limiting a endpoints públicos"
```

### Frontend
```bash
./backlog.sh frontend "Crear componente de mapa interactivo"
./backlog.sh frontend "Diseñar pantalla de resultados de puzzle"
./backlog.sh frontend "Mejorar animaciones de transición"
```

### Video Content
```bash
./backlog.sh video "Grabar intro de la historia principal"
./backlog.sh video "Editar escenas de Teatro Colón"
./backlog.sh video "Agregar efectos de sonido ambientes"
```

### Bugs
```bash
./backlog.sh bug "Socket.io desconexión después de 5 minutos inactivo"
./backlog.sh bug "Token refresh no funciona en algunos casos"
```

---

## 📊 Visualizar el Backlog

El backlog se organiza en el archivo principal `BACKLOG.md`:

```bash
# Ver todo el backlog
cat BACKLOG.md

# Ver solo una sección
grep -A 20 "## 🏗️ Backend" BACKLOG.md

# Contar total de ideas
grep -c "^- \[ \]" BACKLOG.md
```

---

## ✅ Marcar Completadas

Cuando completes una idea:

1. Abre `BACKLOG.md`
2. Busca la idea
3. Cambia `- [ ]` a `- [x]`
4. Opcionalmente mueve a sección "✅ Completado"

Ejemplo:
```markdown
- [x] **[2026-05-12 14:30]** Implementar login con JWT
```

---

## 🔄 Organizar por Sprints

Usa `backlog/SPRINTS.md` para organizar ideas por semanas:

```markdown
# Sprint 1 (May 12-18)

## 🎯 Prioridad Alta
- [ ] Completar Phase 2 Week 2
- [ ] Fijar conexión a base de datos

## 🟡 Prioridad Media
- [ ] Empezar CRUD de Stories
```

---

## 💡 Tips

- **Sé específico:** "Agregar validación de email" es mejor que "Mejorar auth"
- **Agrega contexto:** Si es un bug, describe cuándo sucede
- **Timestamped:** Automáticamente se agrega fecha/hora
- **Revisión semanal:** Repasa el backlog los lunes para priorizar

---

## 🛠️ Troubleshooting

### "Command not found: ./backlog.sh"
```bash
# Hacer ejecutable el script
chmod +x backlog.sh
```

### "Error: No se encuentra BACKLOG.md"
```bash
# Asegúrate de estar en la carpeta del proyecto
cd /ruta/a/proyecto
./backlog.sh "Tu idea"
```

### Script no agrega ideas
Puedes editar `BACKLOG.md` directamente y agregar:
```markdown
- [ ] **[YYYY-MM-DD HH:MM]** Tu idea aquí
```

---

## 🎯 Próximos Pasos

1. ✅ Script creado
2. ⏳ Usar `/backlog` desde aquí con Claude
3. ⏳ Migrar ideas existentes
4. ⏳ Revisar semanalmente

---

**Última actualización:** 2026-05-12  
**Sistema:** Backlog Management v1.0
