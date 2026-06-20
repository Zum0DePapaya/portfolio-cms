---
title: "Five More Minutes - UE5.5 - Blueprints - Lead Programmer - Lead Designer"
title_es: "Five More Minutes - UE5.5 - Blueprints - Programador Principal - Diseñador Principal"
category: "games"
weight: 1
thumbnail: "/assets/images/5035198e.gif"
hover_description: "• 9 month long 4 person project in Unreal Engine 5. <br> • Time-attack action platformer with custom gravity mechanics. <br> • Engineered core locomotion, custom boss AI, user interface menus, and surface-specific footsteps. <br> • Managed level foliage design and external systems integration."
hover_description_es: "• Proyecto de 9 meses con 4 personas en Unreal Engine 5. <br> • Juego de plataformas de acción contrarreloj con mecánicas de gravedad personalizadas. <br> • Diseñé la locomoción central, IA de jefe personalizada, menús de interfaz de usuario y pisadas específicas de superficie. <br> • Gestioné el diseño de follaje de niveles y la integración de sistemas externos."
full_width: false
about: "Five More Minutes is a time-attack action platformer built in Unreal Engine 5. As the Lead Programmer/Designer on a 4-person team over 9 months, I built the core locomotion, a gravity-defying boss AI, seamless portal rendering, UI menus, and surface-specific footstep audio."
about_es: "Five More Minutes es un juego de plataformas de acción contrarreloj desarrollado en Unreal Engine 5. Como Programador/Diseñador Principal en un equipo de 4 personas durante 9 meses, construí la locomoción central, una IA de jefe que desafía la gravedad, renderizado de portales sin interrupciones, menús de interfaz de usuario y audio de pisadas específico para cada superficie."
role: "Lead Systems & Gameplay Programmer/Designer"
role_es: "Programador/Diseñador Principal de Sistemas y Jugabilidad"
team_size: 4
engine: "Unreal Engine 5.5"
body_es: |
  <iframe frameborder="0" src="https://itch.io/embed/3830437?bg_color=222222&amp;fg_color=eeeeee&amp;link_color=fa5c5c&amp;border_color=363636" width="100%" style="max-width: 552px;" height="167"><a href="https://sanpitopatogames.itch.io/five-more-minutes">Play Five More Minutes on itch.io</a></iframe>
  
  ### Introducción
  
  El objetivo principal era construir un juego de plataformas rápido y basado en el impulso, donde cada sistema (movimiento, combate, coleccionables) se integrara en un bucle cohesivo. Fui responsable de las 3C (Personaje, Cámara, Controles) y de la mayoría de los sistemas principales del juego.
  
  ---
  
  ### Locomoción Basada en Estados y Recogibles
  
  Todo funciona a través de una máquina de estados basada en enumeradores (`E_States`) que evita conflictos de física entre el dash, el deslizamiento y el movimiento aéreo. El sistema de deslizamiento utiliza `FindCurrentFloorAngleAndDirection` para leer el ángulo de la pendiente y acelerar al jugador cuesta abajo en consecuencia.
  
  También construí coleccionables magnéticos (`BP_Coin`, `BP_Multiplier`) que detectan al jugador mediante una colisión esférica y se interpolan suavemente hacia él con `VInterp To`, de modo que recoger objetos nunca interrumpe tu impulso.
  
  <div class="videos_two">
    <div class="content-placeholder">
      <img src="{{ '/assets/images/wall-running-to-slide.gif' | url }}" alt="Locomotion chaining: transitioning into a slide">
    </div>
  </div>
  <p class="video-text">Cadena de locomoción: correr por la pared, dash aéreo y física de deslizamiento.</p>
  
  <div class="videos_two">
    <div class="content-placeholder" style="background: transparent; border: none;">
      <iframe src="https://blueprintue.com/render/51yk4yfz/" width="100%" height="300" scrolling="no" allowfullscreen></iframe>
      <p class="video-text" style="font-size: 0.85rem; margin-top: 0.5rem;"><strong>WallRunRotation:</strong> Calcula la inclinación de la cámara en relación con la normal de la pared para enfatizar el impulso.</p>
    </div>
    <div class="content-placeholder" style="background: transparent; border: none;">
      <iframe src="https://blueprintue.com/render/o3jtcnzx/" width="100%" height="300" scrolling="no" allowfullscreen></iframe>
      <p class="video-text" style="font-size: 0.85rem; margin-top: 0.5rem;"><strong>AirDash:</strong> Aplica un impulso direccional para corregir la trayectoria del jugador en el aire.</p>
    </div>
  </div>
  <iframe src="https://blueprintue.com/render/wq9_b7ms/" width="100%" height="400" scrolling="no" allowfullscreen></iframe>
  <p class="video-text" style="font-size: 0.85rem; margin-top: 0.5rem;"><strong>SetSlideVariables:</strong> Configura la fricción y la aceleración en pendiente basándose en el material físico de la superficie.</p>
  
  ---
  
  ### Gancho de Agarre Basado en Impulso
  
  La mayoría de los ganchos de agarre simplemente te teletransportan. El nuestro es una **herramienta de impulso**: los jugadores lo usan para ganar altura y velocidad, y luego encadenan el lanzamiento en un dash aéreo o un deslizamiento por pendiente.
  
  El sistema valida los objetivos con un doble raycast (`GetGrappleTargetInfo`) para la línea de visión y el espacio libre, luego calcula el impulso de lanzamiento a partir de la distancia y el delta de elevación. Un componente spline `BP_Cable` renderiza la cuerda en tiempo real.
  
  <div class="videos_two">
    <div class="content-placeholder">
      <img src="{{ '/assets/images/momentum-grappling.gif' | url }}" alt="Momentum-based grappling hook launch">
    </div>
  </div>
  <p class="video-text">Gancho de Agarre de Impulso: agarrarse a anclajes para lanzarse en dashes aéreos.</p>
  
  <iframe src="https://blueprintue.com/render/6b5-_zht/" width="100%" height="400" scrolling="no" allowfullscreen></iframe>
  <p class="video-text" style="font-size: 0.85rem; margin-top: 0.5rem;"><strong>CalculateGrappleTargetLocation:</strong> Validación con doble raycast con impulso de lanzamiento escalado por el delta de elevación.</p>
  
  ---
  
  ### IA Personalizada: El Jefe Araña
  
  Un jefe terrestre sería trivial de superar en un juego con tanta movilidad vertical. El Jefe Araña utiliza el **mismo espacio 3D que el jugador**: se arrastra por paredes y techos, convirtiendo la arena en una verdadera lucha espacial del gato y el ratón.
  
  Está impulsado por un Árbol de Comportamiento (`BT_Spider`) y un Pizarra (`BB_Spider`) personalizados. La pieza clave es `BTTask_JumpStick`: lee las normales de la superficie de colisión para lanzar a la araña a paredes/techos y utiliza una matriz de rotación para alinear su malla con el nuevo eje de gravedad. Para ataques a distancia, `BTTask_RangedAttack` dispara raycasts multi-línea a través de `BP_Laser`.
  
  <div class="videos_two">
    <div class="content-placeholder">
      <img src="{{ '/assets/images/spider-boss-combat.gif' | url }}" alt="Spider Boss combat gameplay">
    </div>
  </div>
  <p class="video-text">Combate contra el Jefe Araña: navegando arenas verticales mientras se evitan los barridos láser.</p>
  
  <iframe src="https://blueprintue.com/render/5im3ap-h/" width="100%" height="400" scrolling="no" allowfullscreen></iframe>
  <p class="video-text" style="font-size: 0.85rem; margin-top: 0.5rem;"><strong>BTTask_JumpStick:</strong> Lee las normales de colisión para lanzar al jefe a paredes y techos, luego alinea su malla con la nueva superficie.</p>
  
  ---
  
  ### Iteración de Diseño: La Tienda de Portales Sin Fisuras
  
  Al principio, el plan era mantener al jugador completamente inmerso: matar a ciertos enemigos generaría un portal a una dimensión de tienda separada para mejoras. Construí el sistema completo: renderizado de plano de recorte oblicuo a través de `SceneCaptureComponent2D`, teletransportación que conserva el impulso utilizando productos escalares, y una tienda modular construida sobre interfaces `BPI_Interactable_C`.
  
  Funcionó, pero las pruebas de juego demostraron que rompía el ritmo del juego. En su lugar, pivotamos a un sistema de mejora de elevador más rápido a mitad de nivel, lo cual fue una buena lección sobre cuándo es necesario eliminar una característica.
  
  <div class="videos_two">
    <div class="content-placeholder">
      <img src="{{ '/assets/images/seamless-portal.gif' | url }}" alt="Seamless visual portal loop">
    </div>
  </div>
  <p class="video-text">Portal Sin Fisuras: transiciones espaciales entre entornos.</p>
  
  <iframe src="https://blueprintue.com/render/j0np63es/" width="100%" height="400" scrolling="no" allowfullscreen></iframe>
  <p class="video-text" style="font-size: 0.85rem; margin-top: 0.5rem;"><strong>SetClipPlanes:</strong> Define un plano de recorte cercano oblicuo en el SceneCaptureComponent usando el vector frontal del portal.</p>
  
  ---
  
  ### Pulido: UI/UX y Audio Dinámico
  
  Más allá de los sistemas centrales, construí el framework de interfaz de usuario y la pipeline de audio del juego para que se sintiera como un producto terminado.
  
  *   **Framework de UI:** Construí la mayor parte de la jerarquía de widgets (`WBP_Menu`, `WBP_BossHP`, `WBP_UpgradeScreen`, `WBP_Tutorial`) con navegación completa por teclado y gamepad.
  *   **Audio de Pisadas (`FootstepAnimNotify`):** Un AnimNotify personalizado que realiza un line-trace desde el hueso del pie en cada paso. Basándose en el material físico impactado (hierba, metal, piedra), reproduce una de 5 variantes de Sound Cue moduladas en tono/volumen para evitar la repetición.
  *   **Plugins Externos:** Integré `AsyncLoadingScreen` para la carga de niveles sin interrupciones y `EpicLeaderboard` para la subida de puntuaciones en vivo.
  
  <div class="videos_two">
    <div class="content-placeholder">
      <img src="{{ '/assets/images/menu-flow.gif' | url }}" alt="Main Menu to Settings transition flow">
    </div>
  </div>
  <p class="video-text">Flujo de UI: transición entre el Menú Principal y los submenús de Ajustes.</p>
  
  ### Lo que Aprendí
  
  Desarrollar *Five More Minutes* fue una gran experiencia de aprendizaje en liderazgo, gestión de alcance y comunicación técnica. Trabajar con un equipo con menos experiencia en el desarrollo de juegos significó que tuve que aprender a comunicar eficazmente las limitaciones técnicas y a orientar las reuniones de diseño lejos de características imposibles hacia mecánicas divertidas y viables.

  Para cumplir con los ajustados plazos de las fases alfa y beta, tuve que asumir casi todos los roles posibles dentro de Unreal Engine. Más allá de programar las físicas centrales y la IA, asumí la responsabilidad de revisar, depurar e integrar el trabajo de mis compañeros para asegurar que todo cumpliera con los estrictos estándares de entrega. Me enseñó que lanzar un juego no se trata solo de escribir buen código; se trata de mantener una visión clara, gestionar las capacidades del equipo y asumir la responsabilidad de la calidad general del proyecto de principio a fin.
---

<iframe frameborder="0" src="https://itch.io/embed/3830437?bg_color=222222&amp;fg_color=eeeeee&amp;link_color=fa5c5c&amp;border_color=363636" width="100%" style="max-width: 552px;" height="167"><a href="https://sanpitopatogames.itch.io/five-more-minutes">Play Five More Minutes on itch.io</a></iframe>

### Introduction

The core goal was to build a fast, momentum-driven platformer where every system, including movement, combat, and collectibles, feeds into one tight loop. I was responsible for the 3C's (Character, Camera, Controls) and most of the game's major systems.

---

### State-Driven Locomotion & Pickups

Everything runs through an enum-based state machine (`E_States`) that prevents conflicting physics between dashing, sliding, and aerial movement. The sliding system uses `FindCurrentFloorAngleAndDirection` to read the slope angle and accelerate the player downhill accordingly.

I also built magnetic collectibles (`BP_Coin`, `BP_Multiplier`) that detect the player via sphere collision and smoothly interpolate toward them with `VInterp To`, so picking up items never interrupts your momentum.

<div class="videos_two">
  <div class="content-placeholder">
    <img src="{{ '/assets/images/wall-running-to-slide.gif' | url }}" alt="Locomotion chaining: transitioning into a slide">
  </div>
</div>
<p class="video-text">Locomotion chain: wall-running, air-dashing, and slide physics.</p>

<div class="videos_two">
  <div class="content-placeholder" style="background: transparent; border: none;">
    <iframe src="https://blueprintue.com/render/51yk4yfz/" width="100%" height="300" scrolling="no" allowfullscreen></iframe>
    <p class="video-text" style="font-size: 0.85rem; margin-top: 0.5rem;"><strong>WallRunRotation:</strong> Calculates camera tilt relative to the wall normal to emphasize momentum.</p>
  </div>
  <div class="content-placeholder" style="background: transparent; border: none;">
    <iframe src="https://blueprintue.com/render/o3jtcnzx/" width="100%" height="300" scrolling="no" allowfullscreen></iframe>
    <p class="video-text" style="font-size: 0.85rem; margin-top: 0.5rem;"><strong>AirDash:</strong> Applies a directional impulse to correct the player's trajectory mid-air.</p>
  </div>
</div>
<iframe src="https://blueprintue.com/render/wq9_b7ms/" width="100%" height="400" scrolling="no" allowfullscreen></iframe>
<p class="video-text" style="font-size: 0.85rem; margin-top: 0.5rem;"><strong>SetSlideVariables:</strong> Configures friction and slope acceleration based on the surface's physics material.</p>

---

### Momentum-Based Grappling

Most grappling hooks just teleport you, but ours is a **momentum tool**. Players use it to gain height and speed, then chain the launch into an air-dash or a sloped slide.

The system validates targets with a double-raycast (`GetGrappleTargetInfo`) for line-of-sight and clearance, then calculates launch impulse from the distance and elevation delta. A `BP_Cable` spline component renders the rope in real-time.

<div class="videos_two">
  <div class="content-placeholder">
    <img src="{{ '/assets/images/momentum-grappling.gif' | url }}" alt="Momentum-based grappling hook launch">
  </div>
</div>
<p class="video-text">Momentum Grappling: grappling to anchors to launch into air dashes.</p>

<iframe src="https://blueprintue.com/render/6b5-_zht/" width="100%" height="400" scrolling="no" allowfullscreen></iframe>
<p class="video-text" style="font-size: 0.85rem; margin-top: 0.5rem;"><strong>CalculateGrappleTargetLocation:</strong> Double-raycast validation with launch impulse scaled by elevation delta.</p>

---

### Custom AI: The Spider Boss

A ground-based boss would be trivial to outrun in a game with this much vertical mobility. To prevent this, the Spider Boss uses the **same 3D space as the player**, crawling on walls and ceilings to turn the arena into a true spatial cat-and-mouse fight.

It's driven by a custom Behavior Tree (`BT_Spider`) and Blackboard (`BB_Spider`). The key piece is `BTTask_JumpStick`: it reads collision surface normals to launch the spider onto walls/ceilings and uses a rotation matrix to align its mesh to the new gravity axis. For ranged attacks, `BTTask_RangedAttack` fires sweeping multi-line raycasts through `BP_Laser`.

<div class="videos_two">
  <div class="content-placeholder">
    <img src="{{ '/assets/images/spider-boss-combat.gif' | url }}" alt="Spider Boss combat gameplay">
  </div>
</div>
<p class="video-text">Spider-Boss Combat: navigating vertical arenas while avoiding laser sweeps.</p>

<iframe src="https://blueprintue.com/render/5im3ap-h/" width="100%" height="400" scrolling="no" allowfullscreen></iframe>
<p class="video-text" style="font-size: 0.85rem; margin-top: 0.5rem;"><strong>BTTask_JumpStick:</strong> Reads collision normals to launch the boss onto walls and ceilings, then aligns its mesh to the new surface.</p>

---

### Design Iteration: The Seamless Portal Shop

Early on, the plan was to keep the player fully immersed by making sure that killing certain enemies would spawn a portal into a separate shop dimension for upgrades. I built the full system: oblique clip-plane rendering via `SceneCaptureComponent2D`, momentum-preserving teleportation using dot products, and a modular shop built on `BPI_Interactable_C` interfaces.

It worked, but playtesting showed it broke the game's pacing. We pivoted to a faster mid-level elevator upgrade system instead, which served as a good lesson in knowing when to cut a feature.

<div class="videos_two">
  <div class="content-placeholder">
    <img src="{{ '/assets/images/seamless-portal.gif' | url }}" alt="Seamless visual portal loop">
  </div>
</div>
<p class="video-text">Seamless Portal: spatial transitions between environments.</p>

<iframe src="https://blueprintue.com/render/j0np63es/" width="100%" height="400" scrolling="no" allowfullscreen></iframe>
<p class="video-text" style="font-size: 0.85rem; margin-top: 0.5rem;"><strong>SetClipPlanes:</strong> Defines an oblique near-clip plane on the SceneCaptureComponent using the portal's forward vector.</p>

---

### Polish: UI/UX & Dynamic Audio

Beyond the core systems, I built the game's UI framework and audio pipeline to make it feel like a finished product.

*   **UI Framework:** Built most of the widget hierarchy (`WBP_Menu`, `WBP_BossHP`, `WBP_UpgradeScreen`, `WBP_Tutorial`) with full keyboard and gamepad navigation.
*   **Footstep Audio (`FootstepAnimNotify`):** A custom AnimNotify that line-traces from the foot bone on each step. Based on the physical material hit (grass, metal, stone), it plays from a bank of 5 pitch/volume-modulated Sound Cue variants to avoid repetition.
*   **External Plugins:** Integrated `AsyncLoadingScreen` for hitchless level streaming and `EpicLeaderboard` for live score uploads.

<div class="videos_two">
  <div class="content-placeholder">
    <img src="{{ '/assets/images/menu-flow.gif' | url }}" alt="Main Menu to Settings transition flow">
  </div>
</div>
<p class="video-text">UI Flow: transitioning between Main Menu and Settings submenus.</p>

### What I Learned

Building *Five More Minutes* was a massive learning experience in leadership, scope management, and technical communication. Working with a team newer to game development meant I had to learn how to effectively communicate technical constraints and steer design meetings away from impossible features toward achievable, fun mechanics. 

To meet tight alpha and beta milestone deadlines, I had to wear almost every hat possible within Unreal Engine. Beyond engineering the core physics and AI, I took on the responsibility of reviewing, debugging, and integrating my teammates' work to ensure everything met strict delivery standards. It taught me that shipping a game isn't just about writing good code; it's about maintaining a clear vision, managing team capabilities, and taking ownership of the project's overall quality from start to finish.
