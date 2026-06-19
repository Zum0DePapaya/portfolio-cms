---
title: "BLACKSHARD Optimized Tweaks - UE5.6 Mod - Performance Optimization - Solo Developer"
title_es: "BLACKSHARD Optimized Tweaks - Mod UE5.6 - Optimización de Rendimiento - Desarrollador en Solitario"
category: "tools"
weight: 5
thumbnail: "/assets/images/dfba02ee.jpg"
hover_description: "• Performance optimization mod for the UE5.6 game 'BLACKSHARD'.<br> • More than 2x performance increase with minimal visual loss.<br> • Disables heavy rendering features like Nanite and VSM.<br> • Offers TAA, FXAA, and NoAA variants."
hover_description_es: "• Mod de optimización de rendimiento para el juego 'BLACKSHARD' de UE5.6.<br> • Más del doble de rendimiento con una pérdida visual mínima.<br> • Deshabilita características de renderizado pesadas como Nanite y VSM.<br> • Ofrece variantes TAA, FXAA y NoAA."
full_width: false
about: "BLACKSHARD Optimized Tweaks is a performance optimization mod I created for the Unreal Engine 5.6 game 'BLACKSHARD'. By stripping away some of the engine's heaviest rendering features like Nanite and Virtual Shadow Maps, the mod effectively doubles framerates (e.g., from 65 FPS to 135 FPS) without significantly degrading the visual experience."
about_es: "BLACKSHARD Optimized Tweaks es un mod de optimización de rendimiento que creé para el juego 'BLACKSHARD', desarrollado con Unreal Engine 5.6. Al eliminar algunas de las características de renderizado más pesadas del motor, como Nanite y Virtual Shadow Maps, el mod duplica eficazmente los fotogramas por segundo (por ejemplo, de 65 FPS a 135 FPS) sin degradar significativamente la experiencia visual."
role: "Modder / Optimizer"
role_es: "Modder / Optimizador"
team_size: 1
engine: "Unreal Engine 5.6"
body_es: |
  <a href="https://www.nexusmods.com/blackshard/mods/1" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #fa5c5c; color: #fff; text-decoration: none; border-radius: 5px; margin-bottom: 20px; font-weight: bold; font-size: 1.1em; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">🛠️ ¡Descarga el mod en Nexus Mods!</a>
  
  <div class="videos_two">
    <div class="content-placeholder">
      <img src="{{ '/assets/images/blackshard-comparison.webp' | url }}" alt="BLACKSHARD Before and After FPS Comparison" style="width: 100%;">
    </div>
  </div>
  <p class="video-text">Comparación de rendimiento: El juego vanilla funciona a 65 FPS, mientras que la versión modificada salta a 135 FPS en la misma escena.</p>
  
  ### Introducción
  
  *BLACKSHARD* estaba sufriendo bajo las características de renderizado más pesadas de UE5. Después de probar decenas de comandos de consola y ajustes de configuración, descubrí que la solución más efectiva era la más simple: deshabilitar directamente los elementos más exigentes para un aumento de framerate de >2x.
  
  ---
  
  ### Los ajustes de Engine.ini
  
  El mod consiste en algunas anulaciones de configuración en el archivo `Engine.ini` del juego.
  
  ```ini
  [/Script/Engine.RendererSettings]
  r.Shadow.Virtual.Enable=0
  r.AntiAliasingMethod=2
  r.Nanite=0
  ```
  <p class="video-text" style="font-size: 0.85rem; margin-top: 0.5rem;"><strong>Configuración del Motor:</strong> Evita características de renderizado pesadas inyectando anulaciones de CVar directamente en la pipeline de inicialización del motor.</p>
  
  Al deshabilitar **Nanite** y **Virtual Shadow Maps (VSM)**, la sobrecarga de la GPU se desploma, lo que resulta en un enorme **aumento de rendimiento de >2x** con una pérdida sorprendentemente pequeña en la estética general del juego.
  
  ### Opciones de Anti-Aliasing
  
  Dado que deshabilitar Temporal Super Resolution (TSR) puede cambiar drásticamente cómo el juego maneja los bordes irregulares, empaqueté el mod en tres variantes diferentes para adaptarse a las preferencias de los distintos jugadores:
  
  1.  **TAA (Temporal Anti-Aliasing):** La opción estándar (mostrada en el fragmento `.ini` de arriba con `r.AntiAliasingMethod=2`). Proporciona bordes suaves con un coste de rendimiento mucho menor que TSR.
  2.  **FXAA:** Una pasada aún más ligera y de aproximación rápida para hardware antiguo.
  3.  **Sin AA:** Para puristas que prefieren la máxima nitidez y cero desenfoque, a costa del aliasing.
  
  ### Lo que aprendí
  
  Esto fue un buen recordatorio de que la optimización no siempre se trata de escribir código inteligente. La creación de perfiles del juego mostró que Nanite y Virtual Shadow Maps eran responsables de la mayor parte de la carga de la GPU, y simplemente desactivarlos dio mejores resultados que cualquier cantidad de ajuste fino. Saber cuándo eliminar una característica en lugar de optimizarla es igual de importante.
---



<a href="https://www.nexusmods.com/blackshard/mods/1" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #fa5c5c; color: #fff; text-decoration: none; border-radius: 5px; margin-bottom: 20px; font-weight: bold; font-size: 1.1em; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">🛠️ Download the mod on Nexus Mods!</a>

<div class="videos_two">
  <div class="content-placeholder">
    <img src="{{ '/assets/images/blackshard-comparison.webp' | url }}" alt="BLACKSHARD Before and After FPS Comparison" style="width: 100%;">
  </div>
</div>
<p class="video-text">Performance comparison: The vanilla game runs at 65 FPS, while the modded version jumps to 135 FPS in the same scene.</p>

### Introduction

*BLACKSHARD* was struggling under UE5's heavier rendering features. After testing dozens of console commands and config tweaks, I found the most effective fix was the simplest one — disabling the heaviest hitters outright for a >2x framerate increase.

---

### The Engine.ini Tweaks

The mod consists of a few configuration overrides in the game's `Engine.ini` file.

```ini
[/Script/Engine.RendererSettings]
r.Shadow.Virtual.Enable=0
r.AntiAliasingMethod=2
r.Nanite=0
```
<p class="video-text" style="font-size: 0.85rem; margin-top: 0.5rem;"><strong>Engine Config:</strong> Bypasses heavy rendering features by injecting CVar overrides directly into the engine's initialization pipeline.</p>

By disabling **Nanite** and **Virtual Shadow Maps (VSM)**, the GPU overhead plummets, resulting in a massive **>2x performance increase** with surprisingly little loss to the game's overall aesthetic.

### Aliasing Options

Because disabling Temporal Super Resolution (TSR) can drastically change how the game handles jagged edges, I packaged the mod into three different flavors to suit different player preferences:

1. **TAA (Temporal Anti-Aliasing):** The standard option (shown in the `.ini` snippet above with `r.AntiAliasingMethod=2`). Provides smooth edges at a much lower performance cost than TSR.
2. **FXAA:** An even lighter, fast-approximate pass for older hardware.
3. **No AA:** For purists who prefer maximum sharpness and zero blurring, at the cost of aliasing.

### What I Learned

This was a good reminder that optimization isn't always about writing clever code. Profiling the game showed that Nanite and Virtual Shadow Maps were responsible for the vast majority of the GPU load, and simply toggling them off gave better results than any amount of fine-tuning. Knowing when to cut a feature rather than optimize it is just as important.
