---
title: Tokyo Relighting Exercise - UE5.5 - Lighting - Solo Developer - Materials
title_es: Ejercicio de Relighting de Tokyo - UE5.5 - Iluminación - Solo Developer - Materiales
weight: 15
category: showcases
thumbnail: /assets/images/tokyo-relight/tokyo_relight_thumbnail.gif
hover_description: • UE5 Relighting exercise<br> • Stylized Tokyo environment transformed into an Alan Wake 2 aesthetic.<br> • Custom cinematic created with Unreal sequencing and scripting.
hover_description_es: • Ejercicio de relighting en UE5<br> • Entorno estilizado de Tokio transformado con la estética de Alan Wake 2.<br> • Cinemática personalizada creada con secuenciación y scripting en Unreal.
full_width: false
engine: Unreal Engine 5
about: A complete re-lighting of a stylized Tokyo environment asset from Fab, reimagined to match the dark, moody atmosphere of Alan Wake 2. The project features a custom cinematic, sequenced and scripted entirely within Unreal Engine.
about_es: Un relighting completo de un entorno estilizado de Tokio obtenido en Fab, reimaginado para recrear la atmósfera oscura y tensa de Alan Wake 2. El proyecto incluye una cinemática personalizada, secuenciada y programada por completo dentro de Unreal Engine.
role: Lighting & Cinematic Artist
role_es: Artista de Iluminación y Cinemáticas
team_size: 1
---

<div style="text-align: center; margin-bottom: 2rem;">
  <iframe width="100%" height="500" src="https://www.youtube.com/embed/ZSiM_Du4-OU" title="Tokyo Relight Cinematic" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.5);"></iframe>
</div>
<p class="video-text">Final custom cinematic, directed and recorded entirely within Unreal Engine 5 using Sequencer.</p>

<div class="lang-en">

### Overview and Aesthetic
The goal was to take a stylized Tokyo/cyberpunk environment and relight it to feel like something out of *Alan Wake 2* — moody, neo-noir, and leaning hard into psychological thriller territory. The whole thing is built around extreme contrast: very dark shadows against punchy, saturated light sources. Instead of the typical "bright cyberpunk" look, the palette is dominated by deep greens and harsh reds to create something that feels more uneasy than flashy. I also added an `ExponentialHeightFog` with a yellow-greenish color (`#C3FF36FF`) and a very small Extinction Scale (`0.1`) to lightly tint the background without washing out the shadows.

<div style="text-align: center; margin: 1rem 0;">
  <img src="/assets/images/tokyo-relight/overview_aesthetic.png" alt="Overview Aesthetic" style="width: 100%; border-radius: 8px;">
</div>
<p class="video-text">Wide shot demonstrating the extreme contrast, oppressive shadows, and the subtle yellow-greenish fog bathing the background.</p>

### Pre-Production & Reference Gathering
Before touching any lights, I studied the "Dark Place" sections of *Alan Wake 2*, especially the New York street areas. From my references, I knew the level needed a warm green-yellowish base tone, broken up by deep, blood-red neon. Reflective puddles, hard contrasts, very dark shadows, and a hazy atmosphere were all key elements I wanted to hit. (Rain and fog are a big part of the game's actual look, but I kept them out of scope since this is purely a relighting exercise). Getting the colors right was the hardest part — the reds had to feel like blood, and the greens needed that decaying, rotten quality.

<div style="display: flex; gap: 1rem; margin: 1rem 0; align-items: stretch;">
  <div style="flex: 1; display: flex; flex-direction: column;">
    <img src="/assets/images/tokyo-relight/aw2_reference.jpg" alt="Alan Wake 2 In-Game Reference" style="width: 100%; object-fit: cover; border-radius: 8px; flex: 1;">
    <p class="video-text" style="margin-top: 0.5rem;">In-game reference shot from <em>Alan Wake 2</em>'s Dark Place in New York.</p>
  </div>
  <div style="flex: 1; display: flex; flex-direction: column;">
    <img src="/assets/images/tokyo-relight/aw2_color_theme.jpeg" alt="Alan Wake 2 Color Palette" style="width: 100%; object-fit: cover; border-radius: 8px; flex: 1;">
    <p class="video-text" style="margin-top: 0.5rem;">Extracted color palette focusing on toxic greens and blood-red contrast.</p>
  </div>
</div>

### Technical Highlights & Process

#### Iterative Relighting
I started from a completely unlit environment, laid down a first pass of base lighting, and refined it from there. The final setup uses a mix of static ambient lighting and dynamic light sources that react naturally to the surrounding surfaces.

<div style="display: flex; flex-direction: column; gap: 1.5rem; margin-top: 1rem;">
  <div>
    <img src="/assets/images/tokyo-relight/progression1_unlit.png" alt="Unlit Base Asset" style="width: 100%; border-radius: 8px; border: 1px solid var(--border-color);">
    <p class="video-text"><strong>1. Base Asset:</strong> The environment in a completely unlit state, serving as a blank canvas.</p>
  </div>
  <div>
    <img src="/assets/images/tokyo-relight/progression1_firstpass.png" alt="First Pass Lighting" style="width: 100%; border-radius: 8px; border: 1px solid var(--border-color);">
    <p class="video-text"><strong>2. First Pass:</strong> Establishing the dominant green ambient light and initial placement of harsh red neons.</p>
  </div>
  <div>
    <img src="/assets/images/tokyo-relight/progression1_final.png" alt="Final Post-Processed Image" style="width: 100%; border-radius: 8px; border: 1px solid var(--border-color);">
    <p class="video-text"><strong>3. Final Result:</strong> The complete heavily contrasted image, enhanced by aggressive post-processing and deep, oppressive shadows.</p>
  </div>
</div>

#### Custom Materials & Lighting Setups
- **Neon & Emissive Materials:** Neon materials are used throughout the level, but emissive glow alone wasn't enough to sell the bounce lighting on nearby walls. To fix that, I placed extra *Rect Lights* close to the walls behind each sign to get a more accurate, intense glow. All the street lights use a similar setup.

<div style="text-align: center; margin: 1rem 0;">
  <img src="/assets/images/tokyo-relight/rect_lights.png" alt="Rect Lights on Neon Signs" style="width: 100%; border-radius: 8px;">
</div>
<p class="video-text">Demonstration of extra Rect Lights used alongside neon signs to provide accurate, intense bounce lighting on adjacent walls.</p>

- **Alan Wake 2 Shadow Material:** I built a flowing shadow material to mimic the dark presence effect from *Alan Wake 2*'s shadow enemies.

<div style="text-align: center; margin: 1rem 0;">
  <img src="/assets/images/tokyo-relight/shadow_material.gif" alt="Flowing Shadow Material" style="width: 100%; border-radius: 8px;">
</div>
<p class="video-text">The flowing shadow material in action, closely mimicking the dark presence from Alan Wake 2.</p>

- **M_Neon Emissive Setup:** I made a custom `M_Neon` material (Surface, Opaque, Unlit) for the neon sign glow. It multiplies a `Light Color` parameter by a `Glow` intensity value to control the emissive strength. To keep things from looking too static, a time-based math block (`Time` -> `Sine` -> `Frac`) subtracts a small value over time, giving the signs a subtle pulse.

<div style="margin: 1rem 0;">
  <iframe src="https://blueprintue.com/render/gwj5knrj/" width="100%" height="400" scrolling="no" allowfullscreen style="border-radius: 8px; border: 1px solid var(--border-color);"></iframe>
</div>
<p class="video-text">Material node graph for the `M_Neon` emissive setup, showcasing the math used to drive the color intensity and the subtle pulsing effect.</p>

#### Post-Processing
Post-processing does a lot of the heavy lifting here. To make the neon really pop, I pushed the red shadow and midtone saturation to 1.5 across all channels. I cranked the Convolution Bloom up to 10 and paired it with Fusion-style Local Exposure (Highlight Contrast at 0.5) for that hazy, dreamlike look. Shadow Contrast sits at 1.3 to keep the dark areas really dark.

<div style="position: relative; width: 100%; margin: 1rem 0; aspect-ratio: 16/9; overflow: hidden; border-radius: 8px; border: 1px solid var(--border-color);">
  <img src="/assets/images/tokyo-relight/postprocess_enabled.png" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;" alt="Post-Process Enabled">
  <img src="/assets/images/tokyo-relight/postprocess_disabled.png" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);" id="slider-img-en" alt="Post-Process Disabled">
  <input type="range" min="0" max="100" value="50" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: ew-resize; margin: 0; z-index: 10;" oninput="document.getElementById('slider-img-en').style.clipPath = `polygon(0 0, ${this.value}% 0, ${this.value}% 100%, 0 100%)`; document.getElementById('slider-line-en').style.left = `${this.value}%`;">
  <div id="slider-line-en" style="position: absolute; top: 0; bottom: 0; width: 4px; background: white; left: 50%; transform: translateX(-50%); pointer-events: none; box-shadow: 0 0 10px rgba(0,0,0,0.5); z-index: 5;">
    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 32px; height: 32px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px rgba(0,0,0,0.5);">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: -2px;"><polyline points="15 18 9 12 15 6"></polyline></svg>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: -12px; transform: rotate(180deg);"><polyline points="15 18 9 12 15 6"></polyline></svg>
    </div>
  </div>
  <div style="position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.7); padding: 4px 8px; border-radius: 4px; font-size: 0.8em; font-weight: bold; pointer-events: none; z-index: 5;">Disabled</div>
  <div style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.7); padding: 4px 8px; border-radius: 4px; font-size: 0.8em; font-weight: bold; pointer-events: none; z-index: 5;">Enabled</div>
</div>
<p class="video-text">Comparison showing the impact of the aggressive Post-Process Volume, highlighting the Convolution Bloom and heavy shadow contrast.</p>

#### Cinematic Sequencing & Problem Solving
The entire cinematic was put together in UE5's Sequencer — camera, audio, everything. I used custom spline paths for the camera to get smooth, deliberate tracking shots that build tension throughout.

<div style="text-align: center; margin: 1rem 0;">
  <img src="/assets/images/tokyo-relight/cinematic_spline.gif" alt="Cinematic Spline Setup" style="width: 100%; border-radius: 8px;">
</div>
<p class="video-text">Editor view showcasing the camera spline path and the Sequencer timeline used to orchestrate the entire cinematic.</p>

- **Flickering Lights:** Getting lights to flicker reliably inside Sequencer was trickier than expected. The material logic worked fine on its own, but the timing kept shifting between playbacks, so it took a lot of tweaking to get it consistent. I also set up dual flickering lights to simulate the red and blue flashing of a police car siren, which had its own timing challenges.

<div style="text-align: center; margin: 1rem 0;">
  <img src="/assets/images/tokyo-relight/flickering_light.gif" alt="Flickering Light Test" style="width: 100%; border-radius: 8px;">
</div>
<p class="video-text">Flickering light test showcasing the erratic behavior that was difficult to synchronize consistently within Sequencer.</p>

- **The Object Swap Trick:** For the climax, I needed certain lights to snap to bright red on a specific frame. The problem was that emissive materials wouldn't activate at the exact frame I needed in Sequencer. My workaround was an "object swap" — at the precise moment, the unlit objects get instantly replaced with identical copies that already have the emissive materials active. It's completely seamless on playback.

<div style="text-align: center; margin: 1rem 0;">
  <img src="/assets/images/tokyo-relight/object_swap.gif" alt="Object Swap Trick" style="width: 100%; border-radius: 8px;">
</div>
<p class="video-text">Demonstration of the object swap trick in action, instantly replacing unlit props with glowing emissive versions for the climax.</p>

</div>

<div class="lang-es">

### Resumen y Estética
El objetivo era tomar un entorno estilizado de Tokio/cyberpunk y reiluminarlo para que se sintiera como algo sacado de *Alan Wake 2* — oscuro, neo-noir, con mucho thriller psicológico. Todo gira en torno al contraste extremo: sombras muy oscuras contra fuentes de luz saturadas y potentes. En vez del típico look "cyberpunk brillante", la paleta está dominada por verdes profundos y rojos duros para crear algo que se siente más inquietante que llamativo. También añadí un `ExponentialHeightFog` con un color verde amarillento (`#C3FF36FF`) y una Escala de Extinción muy pequeña (`0.1`) para teñir ligeramente el fondo sin desvanecer las sombras.

<div style="text-align: center; margin: 1rem 0;">
  <img src="/assets/images/tokyo-relight/overview_aesthetic.png" alt="Estética General" style="width: 100%; border-radius: 8px;">
</div>
<p class="video-text">Toma amplia que demuestra el contraste extremo, las sombras opresivas y la sutil niebla verde amarillenta que baña el fondo.</p>

### Preproducción y Búsqueda de Referencias
Antes de tocar ninguna luz, estudié las secciones del "Lugar Oscuro" de *Alan Wake 2*, especialmente las calles de Nueva York. Por mis referencias, sabía que el nivel necesitaba un tono base verde amarillento cálido, roto por luces de neón de un rojo sangre profundo. Charcos reflectantes, contrastes duros, sombras muy oscuras y una atmósfera brumosa eran los elementos clave que quería conseguir. (La lluvia y la niebla son parte importante del look real del juego, pero las dejé fuera del alcance ya que esto es puramente un ejercicio de reiluminación). Lo más difícil fue clavar los colores — los rojos tenían que parecer sangre, y los verdes necesitaban esa calidad de descomposición.

<div style="display: flex; gap: 1rem; margin: 1rem 0; align-items: stretch;">
  <div style="flex: 1; display: flex; flex-direction: column;">
    <img src="/assets/images/tokyo-relight/aw2_reference.jpg" alt="Referencia de Alan Wake 2" style="width: 100%; object-fit: cover; border-radius: 8px; flex: 1;">
    <p class="video-text" style="margin-top: 0.5rem;">Imagen de referencia del "Lugar Oscuro" de <em>Alan Wake 2</em> en Nueva York.</p>
  </div>
  <div style="flex: 1; display: flex; flex-direction: column;">
    <img src="/assets/images/tokyo-relight/aw2_color_theme.jpeg" alt="Paleta de colores de Alan Wake 2" style="width: 100%; object-fit: cover; border-radius: 8px; flex: 1;">
    <p class="video-text" style="margin-top: 0.5rem;">Paleta de colores extraída, centrada en verdes tóxicos y contraste rojo sangre.</p>
  </div>
</div>

### Aspectos Técnicos y Proceso

#### Relighting Iterativo
Empecé desde un entorno completamente sin iluminación, apliqué una primera pasada de iluminación base y fui refinando a partir de ahí. La configuración final usa una mezcla de iluminación ambiental estática y fuentes de luz dinámicas que reaccionan de forma natural con las superficies.

<div style="display: flex; flex-direction: column; gap: 1.5rem; margin-top: 1rem;">
  <div>
    <img src="/assets/images/tokyo-relight/progression1_unlit.png" alt="Unlit Base Asset" style="width: 100%; border-radius: 8px; border: 1px solid var(--border-color);">
    <p class="video-text"><strong>1. Asset Base:</strong> El entorno en un estado completamente sin iluminación, sirviendo como un lienzo en blanco.</p>
  </div>
  <div>
    <img src="/assets/images/tokyo-relight/progression1_firstpass.png" alt="First Pass Lighting" style="width: 100%; border-radius: 8px; border: 1px solid var(--border-color);">
    <p class="video-text"><strong>2. Primera Pasada:</strong> Estableciendo la luz ambiental verde dominante y la colocación inicial de neones rojos intensos.</p>
  </div>
  <div>
    <img src="/assets/images/tokyo-relight/progression1_final.png" alt="Final Post-Processed Image" style="width: 100%; border-radius: 8px; border: 1px solid var(--border-color);">
    <p class="video-text"><strong>3. Resultado Final:</strong> La imagen completamente contrastada, mejorada por un postprocesado agresivo y sombras profundas y opresivas.</p>
  </div>
</div>

#### Materiales Personalizados y Configuración de Iluminación
- **Materiales Emisivos y Neón:** Los materiales de neón se usan en todo el nivel, pero el brillo emisivo solo no era suficiente para lograr la iluminación de rebote en las paredes cercanas. Para solucionarlo, coloqué *Rect Lights* extra cerca de las paredes detrás de cada letrero para conseguir un brillo más preciso e intenso. Todas las farolas usan una configuración similar.

<div style="text-align: center; margin: 1rem 0;">
  <img src="/assets/images/tokyo-relight/rect_lights.png" alt="Rect Lights en Letreros de Neón" style="width: 100%; border-radius: 8px;">
</div>
<p class="video-text">Demostración de las Rect Lights adicionales utilizadas junto a los letreros de neón para proporcionar una iluminación de rebote precisa e intensa en las paredes adyacentes.</p>

- **Material de Sombra (Alan Wake 2):** Construí un material de sombra fluida para imitar el efecto de presencia oscura de los enemigos sombra de *Alan Wake 2*.

<div style="text-align: center; margin: 1rem 0;">
  <img src="/assets/images/tokyo-relight/shadow_material.gif" alt="Flowing Shadow Material" style="width: 100%; border-radius: 8px;">
</div>
<p class="video-text">El material de sombra fluida en acción, imitando de cerca la presencia oscura de Alan Wake 2.</p>

- **Configuración Emisiva M_Neon:** Creé un material personalizado `M_Neon` (Surface, Opaque, Unlit) para el brillo de los letreros de neón. Multiplica un parámetro `Light Color` por un valor de intensidad `Glow` para controlar la fuerza emisiva. Para que no se viera demasiado estático, un bloque matemático basado en el tiempo (`Time` -> `Sine` -> `Frac`) resta un pequeño valor con el tiempo, dándole a los letreros un pulso sutil.

<div style="margin: 1rem 0;">
  <iframe src="https://blueprintue.com/render/gwj5knrj/" width="100%" height="400" scrolling="no" allowfullscreen style="border-radius: 8px; border: 1px solid var(--border-color);"></iframe>
</div>
<p class="video-text">Grafo de nodos del material para la configuración emisiva `M_Neon`, mostrando los cálculos utilizados para impulsar la intensidad del color y el sutil efecto de pulso.</p>

#### Postprocesado
El postprocesado hace gran parte del trabajo pesado aquí. Para que el neón realmente destaque, subí la saturación de sombras rojas y tonos medios a 1.5 en todos los canales. Puse el Bloom de Convolución a 10 y lo combiné con Exposición Local estilo *Fusion* (Contraste de Reflejos a 0.5) para ese aspecto brumoso y onírico. El Contraste de Sombras está a 1.3 para mantener las zonas oscuras realmente oscuras.

<div style="position: relative; width: 100%; margin: 1rem 0; aspect-ratio: 16/9; overflow: hidden; border-radius: 8px; border: 1px solid var(--border-color);">
  <img src="/assets/images/tokyo-relight/postprocess_enabled.png" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;" alt="Postprocesado Activado">
  <img src="/assets/images/tokyo-relight/postprocess_disabled.png" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);" id="slider-img-es" alt="Postprocesado Desactivado">
  <input type="range" min="0" max="100" value="50" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: ew-resize; margin: 0; z-index: 10;" oninput="document.getElementById('slider-img-es').style.clipPath = `polygon(0 0, ${this.value}% 0, ${this.value}% 100%, 0 100%)`; document.getElementById('slider-line-es').style.left = `${this.value}%`;">
  <div id="slider-line-es" style="position: absolute; top: 0; bottom: 0; width: 4px; background: white; left: 50%; transform: translateX(-50%); pointer-events: none; box-shadow: 0 0 10px rgba(0,0,0,0.5); z-index: 5;">
    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 32px; height: 32px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px rgba(0,0,0,0.5);">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: -2px;"><polyline points="15 18 9 12 15 6"></polyline></svg>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: -12px; transform: rotate(180deg);"><polyline points="15 18 9 12 15 6"></polyline></svg>
    </div>
  </div>
  <div style="position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.7); padding: 4px 8px; border-radius: 4px; font-size: 0.8em; font-weight: bold; pointer-events: none; z-index: 5;">Desactivado</div>
  <div style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.7); padding: 4px 8px; border-radius: 4px; font-size: 0.8em; font-weight: bold; pointer-events: none; z-index: 5;">Activado</div>
</div>
<p class="video-text">Comparación que muestra el impacto del agresivo Volumen de Postprocesado, destacando el Bloom de Convolución y el fuerte contraste de sombras.</p>

#### Creación de la Cinemática y Secuenciación
La cinemática entera se montó en el Sequencer de UE5 — cámara, audio, todo. Usé trazados de *spline* personalizados para la cámara y conseguir tomas de seguimiento suaves y deliberadas que construyen la tensión progresivamente.

<div style="text-align: center; margin: 1rem 0;">
  <img src="/assets/images/tokyo-relight/cinematic_spline.gif" alt="Configuración de Spline en Cinemática" style="width: 100%; border-radius: 8px;">
</div>
<p class="video-text">Vista del editor que muestra el trazado del spline de la cámara y la línea de tiempo del Sequencer utilizada para orquestar toda la cinemática.</p>

- **Luces Parpadeantes:** Hacer que las luces parpadearan de forma fiable dentro del Sequencer fue más complicado de lo esperado. La lógica del material funcionaba bien por sí sola, pero el timing se desplazaba entre reproducciones, así que requirió muchos ajustes para conseguir consistencia. También monté luces parpadeantes duales para simular las sirenas rojas y azules de un coche de policía, lo cual tuvo sus propios retos de sincronización.

<div style="text-align: center; margin: 1rem 0;">
  <img src="/assets/images/tokyo-relight/flickering_light.gif" alt="Flickering Light Test" style="width: 100%; border-radius: 8px;">
</div>
<p class="video-text">Prueba de la luz parpadeante que muestra el comportamiento errático que fue difícil de sincronizar consistentemente dentro del Sequencer.</p>

- **El Truco del Intercambio de Objetos:** Para el clímax, necesitaba que ciertas luces cambiaran a rojo intenso en un fotograma específico. El problema era que los materiales emisivos no se activaban en el fotograma exacto que necesitaba en el Sequencer. Mi solución fue un "intercambio de objetos" — en el momento preciso, los objetos apagados se reemplazan instantáneamente por copias idénticas que ya tienen los materiales emisivos activos. En la reproducción es completamente imperceptible.

<div style="text-align: center; margin: 1rem 0;">
  <img src="/assets/images/tokyo-relight/object_swap.gif" alt="Object Swap Trick" style="width: 100%; border-radius: 8px;">
</div>
<p class="video-text">Demostración del truco de intercambio de objetos en acción, reemplazando instantáneamente objetos sin luz por versiones emisivas para el clímax.</p>

</div>
