#!/bin/bash

# Script para agregar ideas rápidamente al backlog
# Uso: ./backlog.sh [categoría] "Tu idea aquí"
# Ejemplos:
#   ./backlog.sh backend "Crear endpoint para validar ubicación"
#   ./backlog.sh frontend "Mejorar UI de login"
#   ./backlog.sh "Mi idea sin categoría"

BACKLOG_FILE="BACKLOG.md"

# Validar que el archivo existe
if [ ! -f "$BACKLOG_FILE" ]; then
    echo "❌ Error: No se encuentra $BACKLOG_FILE"
    exit 1
fi

# Si solo hay un argumento, no hay categoría explícita
if [ $# -eq 1 ]; then
    CATEGORIA="Mejoras Generales"
    IDEA="$1"
elif [ $# -eq 2 ]; then
    CATEGORIA="$1"
    # Convertir a mayúscula la primera letra para match
    CATEGORIA_DISPLAY=$(echo "$CATEGORIA" | sed 's/\b./\U&/g')
    IDEA="$2"
else
    echo "❌ Uso: ./backlog.sh [categoría] \"Tu idea aquí\""
    echo ""
    echo "Ejemplos:"
    echo "  ./backlog.sh backend \"Crear nuevo endpoint\""
    echo "  ./backlog.sh frontend \"Mejorar diseño\""
    echo "  ./backlog.sh \"Idea sin categoría específica\""
    exit 1
fi

# Mapeo de categorías a secciones del backlog
case "${CATEGORIA,,}" in
    backend)
        SECTION="## 🏗️ Backend" ;;
    frontend)
        SECTION="## 🎨 Frontend" ;;
    gameplay|juego|game)
        SECTION="## 🗺️ Gameplay" ;;
    video|contenido|videos)
        SECTION="## 🎬 Video Content" ;;
    database|db|datos)
        SECTION="## 🗄️ Database" ;;
    security|seguridad|performance)
        SECTION="## 🔐 Seguridad & Performance" ;;
    multiplayer|multi|collab)
        SECTION="## 📱 Multiplayer" ;;
    bug|bugs|fix)
        SECTION="## 🐛 Bugs & Fixes" ;;
    docs|documentación|doc)
        SECTION="## 📚 Documentación" ;;
    *)
        SECTION="## 🎯 Mejoras Generales" ;;
esac

# Timestamp
TIMESTAMP=$(date '+%Y-%m-%d %H:%M')

# Crear el item del backlog
NEW_ITEM="- [ ] **[$TIMESTAMP]** $IDEA"

# Buscar la sección y agregar el item después del comentario
if grep -q "$SECTION" "$BACKLOG_FILE"; then
    # Encontrar la línea del comentario y agregar después
    LINE_NUM=$(grep -n "$SECTION" "$BACKLOG_FILE" | cut -d: -f1)
    NEXT_LINE=$((LINE_NUM + 2))

    # Usar sed para insertar la nueva línea
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "${NEXT_LINE}i\\
${NEW_ITEM}" "$BACKLOG_FILE"
    else
        # Linux/Windows (Git Bash)
        sed -i "${NEXT_LINE}i${NEW_ITEM}" "$BACKLOG_FILE"
    fi

    # Incrementar el contador de ideas
    TOTAL=$(grep -c "^- \[ \]" "$BACKLOG_FILE")
    sed -i "s/^**Total de ideas:** .*//**Total de ideas:** $TOTAL/" "$BACKLOG_FILE"

    echo "✅ Idea agregada a: $SECTION"
    echo "📝 $NEW_ITEM"
else
    echo "❌ Error: Sección '$SECTION' no encontrada en el backlog"
    exit 1
fi
