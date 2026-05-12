# 📋 Cómo Usar el Sistema de Backlog

Tienes 3 formas de agregar ideas al backlog:

---

## ✨ Forma 1: Hablar Directamente Conmigo (Recomendado)

Simplemente escribe en la conversación lo siguiente:

### Agregar idea con categoría
```
/backlog backend: Crear endpoint para guardar progreso
/backlog frontend: Mejorar responsive del mapa  
/backlog video: Grabar intro del primer nivel
/backlog bug: Socket.io se desconecta después de 5 min
```

### Agregar idea rápida sin categoría
```
/backlog: Se me ocurrió agregar temas oscuros
```

**Ventaja:** Rápido y conversacional. Yo automáticamente lo guardo en el backlog.

---

## 🐍 Forma 2: Script Python (Cross-Platform)

```bash
# Con categoría
python add-backlog.py backend "Implementar JWT refresh"

# Sin categoría (usa Mejoras Generales)
python add-backlog.py "Mi idea rápida"
```

**Categorías disponibles:**
- `backend` - APIs y lógica de servidor
- `frontend` - UI y componentes React
- `gameplay` - Mecánicas y acertijos
- `video` - Videos y narrativa
- `database` - Schema y optimizaciones
- `security` - Autenticación y performance
- `multiplayer` - Modo colaborativo
- `bug` - Problemas a solucionar
- `docs` - Documentación

---

## 🔧 Forma 3: Script Bash (Linux/Mac)

```bash
# Con categoría
./backlog.sh backend "Crear validación de ubicación"

# Sin categoría
./backlog.sh "Idea rápida"
```

---

## 📂 Dónde se Guardan

Todas las ideas van a:
```
proyecto/BACKLOG.md
```

Organizadas por sección:
- 🏗️ Backend
- 🎨 Frontend
- 🗺️ Gameplay
- 🎬 Video Content
- 🗄️ Database
- 🔐 Seguridad & Performance
- 📱 Multiplayer
- 🐛 Bugs & Fixes
- 📚 Documentación
- 🎯 Mejoras Generales

---

## 🎯 Ejemplos

### Aquí mismo en la conversación
```
/backlog backend: Agregar autenticación por Google
/backlog frontend: Diseñar pantalla de resultados
/backlog video: Necesitamos música de fondo
/backlog bug: El mapa no carga en móvil
/backlog: Pensar en un nombre mejor para el juego
```

### Por terminal
```bash
python add-backlog.py backend "Crear endpoint de búsqueda"
./backlog.sh video "Grabar escena del Teatro Colón"
```

---

## ✅ Marcar Completadas

Cuando termines una tarea:

1. Abre `BACKLOG.md`
2. Busca la idea
3. Cambia `- [ ]` a `- [x]`

Ejemplo:
```markdown
- [x] **[2026-05-12]** Implementar login con JWT
```

---

## 📊 Ver el Backlog Completo

```bash
# Abrir archivo
cat BACKLOG.md

# O editar
code BACKLOG.md
```

---

## 🚀 Mi Sistema Automático

Cuando uses `/backlog` aquí conmigo:

1. ✅ Extraigo la categoría y la idea
2. ✅ Agrego timestamp automático
3. ✅ Actualizo el contador total
4. ✅ Guardo en BACKLOG.md
5. ✅ Confirmo que se guardó

---

## 💡 Tips

- **Sé específico:** "Agregar validación de emails" es mejor que "Mejorar auth"
- **Rápido:** Las ideas en conversación son las más rápidas
- **Contexto:** Si necesitas detalles, escribe después de la idea
- **Revisar semanalmente:** El lunes revisa y prioriza

---

## 🔄 Flujo Típico

```
1. Durante el desarrollo: "/backlog backend: Nueva idea"
2. Idea se guarda automáticamente
3. Fin de la semana: Reviso BACKLOG.md
4. Priorizo para la próxima semana
5. Comienzo a trabajar en ellas
6. Marcar como [x] cuando termino
```

---

## ❓ Preguntas Frecuentes

**P: ¿Puedo agregar varias ideas de una vez?**  
R: Sí, simplemente escribe cada una en una línea separada con `/backlog`

**P: ¿Las ideas se pierden?**  
R: No, todas se guardan en `BACKLOG.md` en el repositorio Git

**P: ¿Puedo cambiar de categoría después?**  
R: Sí, edita el archivo `BACKLOG.md` y muévela manualmente

**P: ¿Qué pasa con las ideas completadas?**  
R: Márcalas con `[x]` y puedes moverlas a la sección "✅ Completado"

---

**Sistema creado:** 2026-05-12  
**Estatus:** Listo para usar  
**Próximos pasos:** ¡Empieza a agregar ideas!
