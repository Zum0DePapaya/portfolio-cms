---
title: Five More Minutes - UE5.5 - Blueprints - Lead Programmer - Lead Designer
title_es: Five More Minutes - UE5.5 - Blueprints - Programador Principal - Diseñador Principal
weight: 1
category: games
thumbnail: /assets/images/5035198e.gif
hover_description: • 9 month long 4 person project in Unreal Engine 5. <br> • Time-attack action platformer with custom gravity mechanics. <br> • Engineered core locomotion, custom boss AI, user interface menus, and surface-specific footsteps. <br> • Managed level foliage design and external systems integration.
hover_description_es: • Proyecto de 9 meses con 4 personas en Unreal Engine 5. <br> • Juego de plataformas de acción contrarreloj con mecánicas de gravedad personalizadas. <br> • Diseñé la locomoción central, IA de jefe personalizada, menús de interfaz de usuario y pisadas específicas de superficie. <br> • Gestioné el diseño de follaje de niveles y la integración de sistemas externos.
full_width: false
body_es: |-
  <iframe frameborder="0" src="https://itch.io/embed/3830437?bg_color=222222&amp;fg_color=eeeeee&amp;link_color=fa5c5c&amp;border_color=363636" width="100%" style="max-width: 552px;" height="167"><a href="https://sanpitopatogames.itch.io/five-more-minutes">Play Five More Minutes on itch.io</a></iframe>

  ### Introducción

  El objetivo principal era construir un juego de plataformas rápido y basado en el impulso, donde cada sistema (movimiento, combate, coleccionables) se integrara en un bucle cohesivo. Fui responsable de las 3C (Personaje, Cámara, Controles) y de la mayoría de los sistemas principales del juego.

  ***

  ### Locomoción Basada en Estados y Pickups

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

  ***

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

  ***

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

  ***

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

  ***

  ### Sistema de Combate con Guantes

  Construí el sistema de combate completo desde cero: un par de guantes de boxeo flotantes que orbitan al jugador y atacan de forma autónoma. El núcleo es `BP_GloveBase`, una clase padre de la que heredan `BP_GloveElectric`, `BP_GloveSpeed` y `BP_GloveVamp`, cada una con su propio ataque especial y comportamiento único.

  #### Comportamiento de Flotación y Seguimiento

  Cada guante tiene un `SphereComponent` llamado `AssignedHome` que actúa como su punto de órbita. Un evento personalizado (`DistanceCheck`) se dispara cada 3 segundos vía `Set Timer by Event`; si el guante se aleja más de 370 unidades de su home y no está atacando, `InstantReturnGloves` lo teletransporta de vuelta al instante poniendo su velocidad física a cero. Cuando no hay objetivo, el guante rota suavemente interpolando su cuaternión de rotación hacia la rotación de la cámara usando `Slerp (Quat)` con `Alpha = 30.0 * DeltaSeconds`, lo que le da ese movimiento flotante y orgánico.

  <div class="videos_two">
    <div class="content-placeholder">
      <!-- [INSERTAR GIF: guantes flotando alrededor del jugador en idle] -->
    </div>
  </div>
  <p class="video-text">El guante orbita al jugador y se reorienta suavemente hacia la cámara cuando está inactivo.</p>

  #### Puñetazos y Sistema de Objetivo

  Los ataques ligeros alternan entre el guante izquierdo y el derecho a través de un booleano `IsLeftPunchNext` en `BP_ThirdPersonCharacter`. Al atacar, el guante deshabilita su física, cambia su tipo de colisión a `ECC_Destructible` y una `Timeline` lo interpola vía `Lerp` desde su posición actual hasta la posición del objetivo. Un nodo `Do Once` en `OnComponentBeginOverlap` garantiza que el daño se aplique una sola vez por golpe antes de que el guante regrese. Después del retorno, la física se reactiva y la colisión vuelve a su estado original.

  Para el objetivo, el personaje mantiene un array `DetectedEnemies`, una referencia `ClosestEnemy` y una variable `CurrentTarget`, con dos modos distintos: `TargetLocked` (bloqueo duro) y `TargetSoftLocked` (bloqueo suave). Cuando se activa el bloqueo, el guante calcula `Find Look at Rotation` con una corrección de -90° en el pitch cada tick para apuntar siempre directamente al enemigo.

  <div class="videos_two">
    <div class="content-placeholder" style="background: transparent; border: none;">
      <!-- [INSERTAR IFRAME: Blueprint del evento LightAttack en BP_GloveBase] -->
    </div>
  </div>
  <p class="video-text" style="font-size: 0.85rem; margin-top: 0.5rem;"><strong>LightAttack:</strong> Deshabilita física, cambia colisión, lanza la Timeline de golpe y aplica daño con un Do Once.</p>

  #### Ataque Cargado y Sistema Heavy

  Mantener el botón de ataque pesado activa `ChargingHeavyAttack?` en el personaje, lo que reduce `MaxWalkSpeed` por un factor `HeavyChargeSlowFactor` para simular el esfuerzo de cargar. Al soltar, el guante se lanza hacia un punto `LungeSpot` y el personaje recibe un impulso de `HeavyAttackLungeForce`. Para evitar que el daño se aplique múltiples veces en el mismo enemigo durante el arco del golpe, se usa un array `ChargeAlreadyHitEnemies` que se limpia al iniciar cada heavy y se rellena con `Add Unique` en cada colisión, con comprobación previa de si el enemigo ya está en la lista.

  #### Ataques Especiales y Enfriamiento Visual

  Los especiales se activan cuando `ModifierOn` está activo en el personaje y el `SpecialCooldown` del guante llega a 0. Ese cooldown baja cada tick con `DeltaSeconds`. Al activarse, se ejecuta uno de tres sub-grafos según el tipo de guante: `ElectricPunch` (daño de área eléctrica, recibe el array `LevelGeometry` para filtrar colisiones con el entorno), `SpeedPunch` (ráfaga de velocidad) o `VampGlove` (lifesteal usando `VampTarget`). El cooldown restante se visualiza en tiempo real en un `CooldownIndicator` StaticMeshComponent: su material recibe un escalar `"Percent"` calculado como `1.0 - (SpecialCooldown / DefaultCooldown)`, y el componente rota cada tick para mirar siempre hacia la cámara.

  #### Hitstop

  En cada golpe exitoso se llama a `StartHitstop` en el guante. En golpes ligeros, el guante se desancla del jugador con `Detach From Actor (KeepWorld)` para enfatizar el impacto visualmente. En golpes pesados, además se llama a `StartHitstop(Duration: 0.1)` en el propio `BP_ThirdPersonCharacter`, que aplica una dilatación temporal global para dar peso y satisfacción al golpe.

  <div class="videos_two">
    <div class="content-placeholder">
      <!-- [INSERTAR GIF: combate con guantes, ataque especial o hitstop visible] -->
    </div>
  </div>
  <p class="video-text">Combate con guantes: golpes ligeros alternados, ataque cargado y especiales con enfriamiento visual.</p>

  ***

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

  Desarrollar _Five More Minutes_ fue una gran experiencia de aprendizaje en liderazgo, gestión de alcance y comunicación técnica. Trabajar con un equipo con menos experiencia en el desarrollo de juegos significó que tuve que aprender a comunicar eficazmente las limitaciones técnicas y a orientar las reuniones de diseño lejos de características imposibles hacia mecánicas divertidas y viables.

  Para cumplir con los ajustados plazos de las fases alfa y beta, tuve que asumir casi todos los roles posibles dentro de Unreal Engine. Más allá de programar las físicas centrales y la IA, asumí la responsabilidad de revisar, hacer debugging, e integrar el trabajo de mis compañeros para asegurar que todo cumpliera con los estrictos estándares de entrega. Me enseñó que lanzar un juego no se trata solo de escribir buen código; se trata de mantener una visión clara, gestionar las capacidades del equipo y asumir la responsabilidad de la calidad general del proyecto de principio a fin.
engine: Unreal Engine 5.5
about_es: Five More Minutes es un juego de plataformas de acción contrarreloj desarrollado en Unreal Engine 5. Como Programador/Diseñador Principal en un equipo de 4 personas durante 9 meses, construí la locomoción central, una IA de jefe que desafía la gravedad, renderizado de portales sin interrupciones, menús de interfaz de usuario y audio de pisadas específico para cada superficie.
about: Five More Minutes is a time-attack action platformer built in Unreal Engine 5. As the Lead Programmer/Designer on a 4-person team over 9 months, I built the core locomotion, a gravity-defying boss AI, seamless portal rendering, UI menus, and surface-specific footstep audio.
role: Lead Systems & Gameplay Programmer/Designer
role_es: Programador/Diseñador Principal de Sistemas y Jugabilidad
team_size: 4
---

<iframe frameborder="0" src="https://itch.io/embed/3830437?bg_color=222222&amp;fg_color=eeeeee&amp;link_color=fa5c5c&amp;border_color=363636" width="100%" style="max-width: 552px;" height="167"><a href="https://sanpitopatogames.itch.io/five-more-minutes">Play Five More Minutes on itch.io</a></iframe>

### Introduction

The core goal was to build a fast, momentum-driven platformer where every system, including movement, combat, and collectibles, feeds into one tight loop. I was responsible for the 3C's (Character, Camera, Controls) and most of the game's major systems.

***

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

***

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

***

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

***

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

***

### The Glove Combat System

I built the entire combat system from scratch: a pair of floating boxing gloves that orbit the player and attack autonomously. The core is `BP_GloveBase`, a parent class inherited by `BP_GloveElectric`, `BP_GloveSpeed`, and `BP_GloveVamp`, each with their own special attack and unique behavior.

#### Hover and Follow Behavior

Each glove has a `SphereComponent` called `AssignedHome` that acts as its orbit point. A `DistanceCheck` custom event fires every 3 seconds via `Set Timer by Event`; if the glove drifts more than 370 units from its home while not attacking, `InstantReturnGloves` instantly teleports it back by zeroing its physics velocity. When idle with no target, the glove smoothly rotates toward the camera using `Slerp (Quat)` interpolation with `Alpha = 30.0 * DeltaSeconds`, which gives it that organic, living feel.

<div class="videos_two">
  <div class="content-placeholder">
    <!-- [INSERT GIF: gloves floating around player in idle] -->
  </div>
</div>
<p class="video-text">The glove orbits the player and smoothly reorients toward the camera while idle.</p>

#### Punching and Targeting

Light attacks alternate between left and right gloves via an `IsLeftPunchNext` boolean on `BP_ThirdPersonCharacter`. When attacking, the glove disables its physics, switches its collision type to `ECC_Destructible`, and a `Timeline` lerps it from its current position to the target's location. A `Do Once` node on `OnComponentBeginOverlap` guarantees damage fires exactly once per swing before the glove returns. On return, physics re-enables and collision resets.

For targeting, the character maintains a `DetectedEnemies` array, a `ClosestEnemy` reference, and a `CurrentTarget`, with two distinct modes: `TargetLocked` (hard lock) and `TargetSoftLocked` (soft lock). When locked on, the glove recalculates `Find Look at Rotation` with a -90 degree pitch correction every tick to always aim directly at the enemy.

<div class="videos_two">
  <div class="content-placeholder" style="background: transparent; border: none;">
    <!-- [INSERT IFRAME: Blueprint of LightAttack event in BP_GloveBase] -->
  </div>
</div>
<p class="video-text" style="font-size: 0.85rem; margin-top: 0.5rem;"><strong>LightAttack:</strong> Disables physics, switches collision, fires the strike Timeline, and applies damage through a Do Once.</p>

#### Charged Heavy Attack

Holding the heavy attack input sets `ChargingHeavyAttack?` on the character and reduces `MaxWalkSpeed` by a `HeavyChargeSlowFactor` multiplier to simulate the effort of winding up. On release, the glove launches toward a `LungeSpot` and the character gets a forward `HeavyAttackLungeForce` impulse. To prevent a single enemy from being hit multiple times during the swing arc, there's a `ChargeAlreadyHitEnemies` array that clears at the start of each heavy attack and fills up with `Add Unique` on each collision, with a pre-check so no enemy takes damage twice.

#### Special Attacks and Visual Cooldown

Specials fire when `ModifierOn` is active on the character and the glove's `SpecialCooldown` ticks down to zero, decrementing each frame with `DeltaSeconds`. On trigger, one of three sub-graphs runs depending on glove type: `ElectricPunch` (area electric damage, receives the `LevelGeometry` array to filter environmental collisions), `SpeedPunch` (speed burst), or `VampGlove` (lifesteal via `VampTarget`). The remaining cooldown is visualized in real-time on a `CooldownIndicator` StaticMeshComponent, with a `"Percent"` scalar material parameter set to `1.0 - (SpecialCooldown / DefaultCooldown)` and the component billboard-rotating each tick to always face the camera.

#### Hitstop

Every successful hit calls `StartHitstop` on the glove. For light hits, the glove detaches from the player via `Detach From Actor (KeepWorld)` to sell the impact visually. For heavy hits, it also calls `StartHitstop(Duration: 0.1)` on `BP_ThirdPersonCharacter` itself, which applies a brief global time dilation to make heavy strikes feel properly weighty.

<div class="videos_two">
  <div class="content-placeholder">
    <!-- [INSERT GIF: glove combat showing special attack or hitstop] -->
  </div>
</div>
<p class="video-text">Glove combat: alternating light punches, charged heavy attack, and special with visual cooldown.</p>

***

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

Building _Five More Minutes_ was a massive learning experience in leadership, scope management, and technical communication. Working with a team newer to game development meant I had to learn how to effectively communicate technical constraints and steer design meetings away from impossible features toward achievable, fun mechanics. 

To meet tight alpha and beta milestone deadlines, I had to wear almost every hat possible within Unreal Engine. Beyond engineering the core physics and AI, I took on the responsibility of reviewing, debugging, and integrating my teammates' work to ensure everything met strict delivery standards. It taught me that shipping a game isn't just about writing good code; it's about maintaining a clear vision, managing team capabilities, and taking ownership of the project's overall quality from start to finish.
