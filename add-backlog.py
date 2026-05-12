#!/usr/bin/env python3
"""
Script para agregar ideas al backlog de Proyecto Margarita
Uso: python add-backlog.py [categoría] "Tu idea aquí"
Ejemplos:
  python add-backlog.py backend "Crear endpoint de búsqueda"
  python add-backlog.py frontend "Mejorar UI de login"
  python add-backlog.py "Idea rápida"
"""

import sys
import re
from datetime import datetime
from pathlib import Path

# Mapeo de categorías a secciones
CATEGORY_MAP = {
    'backend': '🏗️ Backend',
    'frontend': '🎨 Frontend',
    'gameplay': '🗺️ Gameplay',
    'game': '🗺️ Gameplay',
    'juego': '🗺️ Gameplay',
    'video': '🎬 Video Content',
    'contenido': '🎬 Video Content',
    'videos': '🎬 Video Content',
    'database': '🗄️ Database',
    'db': '🗄️ Database',
    'datos': '🗄️ Database',
    'security': '🔐 Seguridad & Performance',
    'seguridad': '🔐 Seguridad & Performance',
    'performance': '🔐 Seguridad & Performance',
    'multiplayer': '📱 Multiplayer',
    'multi': '📱 Multiplayer',
    'collab': '📱 Multiplayer',
    'bug': '🐛 Bugs & Fixes',
    'bugs': '🐛 Bugs & Fixes',
    'fix': '🐛 Bugs & Fixes',
    'docs': '📚 Documentación',
    'documentación': '📚 Documentación',
    'doc': '📚 Documentación',
}

def find_backlog_file():
    """Encuentra el archivo BACKLOG.md en el proyecto"""
    current = Path.cwd()

    # Buscar en el directorio actual y padres
    for path in [current] + list(current.parents):
        backlog = path / 'BACKLOG.md'
        if backlog.exists():
            return backlog

    return None

def get_section_line(content, section_header):
    """Encuentra el número de línea de una sección"""
    lines = content.split('\n')
    for i, line in enumerate(lines):
        if section_header in line:
            return i
    return None

def main():
    # Validar argumentos
    if len(sys.argv) < 2:
        print("❌ Uso: python add-backlog.py [categoría] \"Tu idea aquí\"")
        print("")
        print("Ejemplos:")
        print("  python add-backlog.py backend \"Crear endpoint\"")
        print("  python add-backlog.py frontend \"Mejorar UI\"")
        print("  python add-backlog.py \"Idea rápida\"")
        sys.exit(1)

    # Parsear argumentos
    if len(sys.argv) == 2:
        category = 'general'
        idea = sys.argv[1]
    else:
        category = sys.argv[1].lower()
        idea = ' '.join(sys.argv[2:])

    # Obtener sección
    section_header = CATEGORY_MAP.get(category, '🎯 Mejoras Generales')

    # Encontrar archivo
    backlog_path = find_backlog_file()
    if not backlog_path:
        print("❌ Error: No se encontró BACKLOG.md")
        print("   Asegúrate de estar en la carpeta del proyecto")
        sys.exit(1)

    # Leer contenido
    with open(backlog_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Crear item
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M')
    new_item = f"- [ ] **[{timestamp}]** {idea}"

    # Buscar sección
    section_line = get_section_line(content, section_header)
    if section_line is None:
        print(f"❌ Error: Sección '{section_header}' no encontrada")
        sys.exit(1)

    # Agregar item después del comentario (línea + 2)
    lines = content.split('\n')
    insert_line = section_line + 2

    if insert_line < len(lines):
        lines.insert(insert_line, new_item)
    else:
        lines.append(new_item)

    # Actualizar contador
    updated_content = '\n'.join(lines)
    total_ideas = len(re.findall(r'^- \[ \]', updated_content, re.MULTILINE))
    updated_content = re.sub(
        r'\*\*Total de ideas: \d+\*\*',
        f'**Total de ideas: {total_ideas}**',
        updated_content
    )

    # Guardar
    with open(backlog_path, 'w', encoding='utf-8') as f:
        f.write(updated_content)

    print(f"✅ Idea agregada a: {section_header}")
    print(f"📝 {new_item}")
    print(f"📍 Total de ideas: {total_ideas}")

if __name__ == '__main__':
    main()
