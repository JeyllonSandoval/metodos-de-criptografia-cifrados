import matplotlib.pyplot as plt
import matplotlib.patches as patches

# Crear figura y eje
fig, ax = plt.subplots(figsize=(20, 10))
ax.axis('off')

# Definir el problema (efecto)
problem = "Desorganización operativa y falta\nde estandarización en\nBanca Electrónica TI"

# Redefinir las categorías para el nuevo formato
categories = {
    "Método": [
        "→ Falta de procedimientos estandarizados",
        "→ Documentación técnica desactualizada",
        "→ No aplicación de metodologías como ITIL o 5S"
    ],
    "Máquina": [
        "→ Herramientas sin clasificar",
        "→ Equipos sin mantenimiento regular",
        "→ Falta de automatización"
    ],
    "Gente": [
        "→ Falta de capacitación",
        "→ Alta rotación de personal",
        "→ Poca cultura de orden"
    ],
    "Material": [
        "→ Archivos duplicados o desorganizados",
        "→ Reportes sin control de versiones",
        "→ Bases de datos mal gestionadas"
    ],
    "Medio Ambiente": [
        "→ Cultura reactiva",
        "→ Poca integración entre áreas",
        "→ Falta de seguimiento"
    ],
    "Medición": [
        "→ Ausencia de KPIs",
        "→ No hay métricas de mejora continua",
        "→ Falta de auditorías internas"
    ]
}

def create_rounded_box(x, y, width, height, color='royalblue'):
    """Crear caja redondeada con texto"""
    rect = patches.FancyBboxPatch((x, y), width, height,
                                 boxstyle="round,pad=0.1",
                                 fc=color, ec="none", alpha=0.3)
    return rect

# Línea central horizontal
spine_y = 0.5
ax.plot([0.1, 0.85], [spine_y, spine_y], 'k-', linewidth=2)

# Configuración de las cajas (reducido 10 veces más)
box_height = 0.002  # Reducido de 0.02 a 0.002
box_width = 0.006   # Reducido de 0.06 a 0.006

# Crear caja del problema (efecto)
problem_box = create_rounded_box(0.85, spine_y-box_height/2, box_width*1.2, box_height)
ax.add_patch(problem_box)
ax.text(0.95, spine_y, problem, ha='center', va='center', fontsize=9, weight='bold')

# Posicionar las categorías en dos filas
top_categories = ["Método", "Máquina", "Material"]
bottom_categories = ["Medición", "Medio Ambiente", "Gente"]

# Posiciones x para las categorías
x_positions = [0.2, 0.4, 0.6]

# Dibujar categorías superiores
for i, category in enumerate(top_categories):
    x = x_positions[i]
    y = 0.8
    
    # Caja de categoría (mucho más pequeña)
    box = create_rounded_box(x-box_width/2, y-box_height/2, box_width, box_height)
    ax.add_patch(box)
    ax.text(x, y, category, ha='center', va='center', fontsize=9, weight='bold', color='black')
    
    # Línea diagonal
    ax.plot([x, x], [y-box_height/2, spine_y], 'k-', linewidth=1)
    
    # Causas
    if category in categories:
        for j, cause in enumerate(categories[category]):
            y_text = y - box_height - 0.08*(j+1)
            ax.text(x-0.07, y_text, cause, ha='left', va='center', fontsize=8)

# Dibujar categorías inferiores
for i, category in enumerate(bottom_categories):
    x = x_positions[i]
    y = 0.2
    
    # Caja de categoría (mucho más pequeña)
    box = create_rounded_box(x-box_width/2, y-box_height/2, box_width, box_height)
    ax.add_patch(box)
    ax.text(x, y, category, ha='center', va='center', fontsize=9, weight='bold', color='black')
    
    # Línea diagonal
    ax.plot([x, x], [y+box_height/2, spine_y], 'k-', linewidth=1)
    
    # Causas
    if category in categories:
        for j, cause in enumerate(categories[category]):
            y_text = y + box_height + 0.08*(j+1)
            ax.text(x-0.07, y_text, cause, ha='left', va='center', fontsize=8)

plt.title("Diagrama de Causa y efecto", pad=20, fontsize=16, color='navy', weight='bold')
plt.tight_layout()
plt.show()