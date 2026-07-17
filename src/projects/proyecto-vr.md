---
title: "Industrial Sorting Simulator - UE5.5 - VR - Blueprints - Solo Developer"
title_es: "Industrial Sorting Simulator - UE5.5 - RV - Blueprints - Solo Developer"
category: "showcases"
weight: 3
thumbnail: "/assets/images/industrial-sorting-thumbnail.gif"
hover_description: "• Unreal Engine 5 VR Simulation.<br> • Built data-driven package generation systems using Structs & Enums.<br> • Programmed dynamic conveyor belt physics and delivery validation.<br> • Optimized rendering for Intel ARC GPUs."
hover_description_es: "• Simulación de RV en Unreal Engine 5.<br> • Sistemas de generación de paquetes basados en datos usando Structs y Enums.<br> • Programación de físicas dinámicas para cintas transportadoras y validación de entregas.<br> • Renderizado optimizado para GPUs Intel ARC."
full_width: false
about: "Industrial Sorting Simulator is an immersive industrial warehouse simulation built from the ground up for Virtual Reality in Unreal Engine 5. I engineered the core gameplay systems entirely in Blueprints, focusing on data-driven physical interactions, dynamic spawning, and maintaining high VR framerates."
about_es: "Industrial Sorting Simulator es una simulación inmersiva de un almacén industrial construida desde cero para Realidad Virtual en Unreal Engine 5. Diseñé los sistemas de juego principales completamente en Blueprints, centrándome en interacciones físicas basadas en datos, generación dinámica y mantenimiento de altas tasas de fotogramas en RV."
role: "Gameplay Systems & VR Programmer"
role_es: "Programador de Sistemas de Juego y RV"
team_size: 1
engine: "Unreal Engine 5.5"
body_es: |
  ### Introducción
  
  **Industrial Sorting Simulator** fue diseñado desde el primer día para ser una experiencia de realidad virtual interactiva y con físicas precisas. Mi responsabilidad principal fue la arquitectura e implementación de todos los sistemas lógicos y de juego utilizando **Blueprints** en Unreal Engine 5.
  
  En lugar de depender de animaciones pregrabadas, construí un entorno de almacén verdaderamente dinámico donde los paquetes se generan, se mueven físicamente en cintas transportadoras y son procesados por el jugador utilizando las manos virtuales.
  
  ### Generación de Elementos Basada en Datos
  
  Para asegurar que la simulación fuera escalable, construí una arquitectura de paquetes basada en datos utilizando un sistema modular con `BP_Paquete`.
  
  En lugar de crear docenas de Blueprints únicos para cada tipo de caja, utilicé Estructuras de Datos (`S_Paquetes`) y Enumeradores (`E_TiposDePaquete`). A través del **User Construction Script**, cada caja lee dinámicamente sus datos al momento de aparecer para determinar su malla visual, peso físico y perfil de colisión. Esto permite a los diseñadores añadir infinitas variaciones de paquetes simplemente añadiendo una nueva fila de datos, sin tocar la lógica visual.
  
  <iframe src="https://blueprintue.com/render/ju85etys/" width="100%" height="400" scrolling="no" allowfullscreen></iframe>
  <p class="video-text" style="font-size: 0.85rem; margin-top: 0.5rem;"><strong>Arquitectura de BP_Paquete:</strong> El Construction Script asume el tipo de caja y configura de manera procedimental las físicas y los componentes visuales necesarios para la RV.</p>
  
  ### Físicas de Transporte y Clasificación
  
  El núcleo del bucle de juego gira en torno al movimiento físico de los objetos. Para lograr esto, diseñé la clase `BP_ConveyorBelt`. 
  
  En lugar de usar trucos visuales, la cinta rastrea activamente los `PrimitiveComponents` que aterrizan sobre ella y aplica una velocidad de traslación continua. Los jugadores deben agarrar físicamente los paquetes de la cinta móvil utilizando las mecánicas de agarre de RV y colocarlos en las zonas de entrega correspondientes.
  
  El `BP_DeliveryPoint` actúa como el validador lógico final: lee la etiqueta enumeradora del paquete que se ha soltado y la compara con la lógica de puntuación antes de destruir físicamente el objeto y liberar la memoria.
  
  <div class="videos_two">
    <img src="{{ '/assets/images/proyecto-vr-gameplay.gif' | url }}" alt="VR Conveyor and Teleportation Gameplay" style="width: 100%;">
  </div>
  <p class="video-text">Interacción en RV: El jugador agarra físicamente los objetos que se mueven dinámicamente en el sistema de cintas transportadoras y los deposita en la zona correcta.</p>
  
  ### Generadores de Volumen Dinámicos
  
  Para mantener la simulación activa e impredecible, construí un `BP_SpawnerVolume` personalizado. Esta herramienta utiliza cajas de colisión para definir zonas de generación seguras y genera aleatoriamente paquetes con estructuras de datos variables. Se ajusta perfectamente al flujo de la cinta transportadora, asegurando un suministro constante de objetos interactivos para el jugador en RV.
  
  ### Rendimiento en RV y Optimización
  
  Desarrollar para la Realidad Virtual requiere mantener una tasa de fotogramas estricta para evitar mareos. Durante las pruebas en hardware de gama baja (Intel ARC), nos encontramos con cuellos de botella severos en la GPU.
  
  Para resolver esto, rediseñé el pipeline de renderizado del proyecto. Cambié el motor a **Forward Shading**, desactivé completamente Lumen y el RayTracing de hardware, e implementé MSAA. Además, resolví errores de horneado de luz (Lightmaps) en las mallas de la fábrica forzando modos de movilidad e ignorando las UV superpuestas. El resultado fue una simulación física robusta que se ejecuta de manera increíblemente fluida en visores de RV.
---

### Introduction

**Industrial Sorting Simulator** was designed from day one to be an interactive, physically accurate virtual reality experience. My primary responsibility was the architecture and implementation of all gameplay and logic systems using **Blueprints** in Unreal Engine 5.

Rather than relying on canned animations, I built a truly dynamic warehouse environment where packages spawn, move physically on conveyor belts, and are processed by the player using their virtual hands.

### Data-Driven Item Generation

To ensure the simulation was scalable, I built a data-driven package architecture using a modular `BP_Paquete` system.

Instead of making dozens of unique Blueprints for every box type, I utilized Data Structs (`S_Paquetes`) and Enumerators (`E_TiposDePaquete`). Through the **User Construction Script**, each box dynamically reads its data upon spawning to determine its visual mesh, physical weight, and collision profile. This allows designers to add infinite package variations just by adding a new data row, without ever touching the visual logic.

<iframe src="https://blueprintue.com/render/ju85etys/" width="100%" height="400" scrolling="no" allowfullscreen></iframe>
<p class="video-text" style="font-size: 0.85rem; margin-top: 0.5rem;"><strong>BP_Paquete Architecture:</strong> The Construction Script casts the box type and procedurally sets up the necessary physics and visual components for VR.</p>

### Conveyor Physics & Sorting

The core gameplay loop revolves around the physical movement of objects. To achieve this, I engineered the `BP_ConveyorBelt` class. 

Rather than using visual trickery, the belt actively tracks `PrimitiveComponents` that land on it and applies a continuous translational velocity. Players must physically grab packages off the moving belt using VR grabbing mechanics and place them into the corresponding delivery zones.

The `BP_DeliveryPoint` acts as the final logic validator: it reads the enumerator tag off the dropped package and checks it against the scoring logic before physically destroying the object and freeing memory.

<div class="videos_two">
  <img src="{{ '/assets/images/proyecto-vr-gameplay.gif' | url }}" alt="VR Conveyor and Teleportation Gameplay" style="width: 100%;">
</div>
<p class="video-text">VR Interaction: The player physically grabs objects moving dynamically on the conveyor system and deposits them into the correct zone.</p>

### Dynamic Volume Spawners

To keep the simulation active and unpredictable, I built a custom `BP_SpawnerVolume`. This tool utilizes bounding boxes to define safe spawning zones and randomly generates packages with varying data structs. It feeds seamlessly into the conveyor workflow, ensuring a steady stream of interactable objects for the VR player.

### VR Performance & Optimization

Developing for Virtual Reality requires maintaining strict framerates to prevent motion sickness. During testing on lower-end hardware (Intel ARC GPUs), we hit severe GPU bottlenecks.

To solve this, I overhauled the project's rendering pipeline. I shifted the engine to **Forward Shading**, completely disabled Lumen and hardware RayTracing, and implemented MSAA. Additionally, I resolved lightmap baking errors on the factory meshes by forcing mobility modes and overriding overlapping UVs. The result was a robust physics simulation that runs buttery-smooth in VR headsets.
