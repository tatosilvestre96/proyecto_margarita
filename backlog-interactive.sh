#!/bin/bash

# Script interactivo para agregar ideas al backlog
# Uso: ./backlog-interactive.sh

BACKLOG_FILE="BACKLOG.md"

# Colores para terminal
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Validar que el archivo existe
if [ ! -f "$BACKLOG_FILE" ]; then
    echo -e "${RED}❌ Error: No se encuentra $BACKLOG_FILE${NC}"
    exit 1
fi

echo ""
echo -e "${CYAN}╔════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║  📋 AGREGAR IDEA AL BACKLOG           ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════╝${NC}"
echo ""

# Mostrar categorías
echo -e "${YELLOW}Categorías disponibles:${NC}"
echo ""
echo "  1) ${BLUE}🏗️  Backend${NC}              - APIs, endpoints, servidor"
echo "  2) ${BLUE}🎨  Frontend${NC}             - UI, componentes, estilos"
echo "  3) ${BLUE}🗺️  Gameplay${NC}             - Mecánicas, acertijos"
echo "  4) ${BLUE}🎬  Video Content${NC}       - Videos, narrativa"
echo "  5) ${BLUE}🗄️  Database${NC}             - Schema, queries"
echo "  6) ${BLUE}🔐  Seguridad & Performance${NC} - Seguridad, performance"
echo "  7) ${BLUE}📱  Multiplayer${NC}         - Modo colaborativo, social"
echo "  8) ${BLUE}🐛  Bugs & Fixes${NC}        - Problemas, correcciones"
echo "  9) ${BLUE}📚  Documentación${NC}       - Docs, guías, comentarios"
echo "  10) ${BLUE}🎯  Mejoras Generales${NC}   - Ideas generales (por defecto)"
echo ""

# Pedir selección
echo -e "${YELLOW}¿Qué categoría?${NC} (1-10): "
read -r choice

case $choice in
    1) CATEGORIA="backend" ;;
    2) CATEGORIA="frontend" ;;
    3) CATEGORIA="gameplay" ;;
    4) CATEGORIA="video" ;;
    5) CATEGORIA="database" ;;
    6) CATEGORIA="security" ;;
    7) CATEGORIA="multiplayer" ;;
    8) CATEGORIA="bug" ;;
    9) CATEGORIA="docs" ;;
    10) CATEGORIA="general" ;;
    *)
        echo -e "${RED}❌ Opción inválida${NC}"
        exit 1
        ;;
esac

# Mostrar categoría seleccionada
SECTION_MAP=(
    ["backend"]="🏗️ Backend"
    ["frontend"]="🎨 Frontend"
    ["gameplay"]="🗺️ Gameplay"
    ["video"]="🎬 Video Content"
    ["database"]="🗄️ Database"
    ["security"]="🔐 Seguridad & Performance"
    ["multiplayer"]="📱 Multiplayer"
    ["bug"]="🐛 Bugs & Fixes"
    ["docs"]="📚 Documentación"
    ["general"]="🎯 Mejoras Generales"
)

SECTION="${SECTION_MAP[$CATEGORIA]}"

echo ""
echo -e "${GREEN}✅ Categoría seleccionada: $SECTION${NC}"
echo ""

# Pedir la idea
echo -e "${YELLOW}Escribe tu idea:${NC}"
read -r idea

if [ -z "$idea" ]; then
    echo -e "${RED}❌ Error: Debes escribir una idea${NC}"
    exit 1
fi

# Crear item con timestamp
TIMESTAMP=$(date '+%Y-%m-%d %H:%M')
NEW_ITEM="- [ ] **[$TIMESTAMP]** $idea"

# Encontrar la sección y agregar
if grep -q "$SECTION" "$BACKLOG_FILE"; then
    LINE_NUM=$(grep -n "$SECTION" "$BACKLOG_FILE" | cut -d: -f1)
    NEXT_LINE=$((LINE_NUM + 2))

    # Insertar en la posición correcta
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "${NEXT_LINE}i\\
${NEW_ITEM}" "$BACKLOG_FILE"
    else
        sed -i "${NEXT_LINE}i${NEW_ITEM}" "$BACKLOG_FILE"
    fi

    # Actualizar contador
    TOTAL=$(grep -c "^- \[ \]" "$BACKLOG_FILE")
    sed -i "s/\*\*Total de ideas: [0-9]*\*\*/\*\*Total de ideas: $TOTAL\*\*/" "$BACKLOG_FILE"

    echo ""
    echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║  ✅ IDEA GUARDADA EXITOSAMENTE        ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "  ${GREEN}📝 $NEW_ITEM${NC}"
    echo -e "  ${CYAN}📁 Categoría: $SECTION${NC}"
    echo -e "  ${CYAN}📊 Total de ideas: $TOTAL${NC}"
    echo ""
else
    echo -e "${RED}❌ Error: Sección '$SECTION' no encontrada${NC}"
    exit 1
fi
