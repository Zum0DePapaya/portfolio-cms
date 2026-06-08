---
title: "Five More Minutes - UE5.5 - Blueprints - Lead Programmer/Designer"
category: "games"
weight: 1
thumbnail: "/assets/images/5035198e.gif"
hover_description: "• 9 month long 4 person project in Unreal Engine 5. <br> • Time-attack action platformer with custom gravity mechanics. <br> • Engineered core locomotion, custom boss AI, graphics configuration widgets, and surface-specific footsteps. <br> • Managed level foliage design and external systems integration."
full_width: false
about: "Five More Minutes is a unique time-attack action platformer built in Unreal Engine 5. As the Lead Systems & Gameplay Programmer/Designer for our 4-person team, I engineered the 3C's (Character, Camera, Controls), custom gravity boss AI, graphics upscaling settings, dynamic footfall audio, level foliage layouts, and external system integrations over a 9-month development cycle."
role: "Lead Systems & Gameplay Programmer/Designer"
team_size: 4
engine: "Unreal Engine 5.5"
---

<iframe frameborder="0" src="https://itch.io/embed/123456?bg_color=222222&amp;fg_color=eeeeee&amp;link_color=fa5c5c&amp;border_color=363636" width="552" height="167"><a href="https://example.itch.io/game">Play Five More Minutes on itch.io</a></iframe>

### Advanced 3C Architecture (Character, Camera, Controls)

Owning the entirety of the 3C's meant engineering a player controller that felt consistently responsive across highly varied movement paradigms.

- **State-Driven Locomotion:** To handle the immense complexity of the character's movement capabilities, I built a robust, enum-based state machine (`E_States`) to smoothly transition between Grounded, Aerial, WallRunning, Dashing, Grappling, and Sliding states without overlapping input conflicts.
- **Wall-Running & IK Integration:** Engineered a modular wall-running system driven by a custom `WallRunTick` and `ContinueWallRun?` validation loop. It calculates the `WallSurfaceNormal` using side-traces and dynamically adjusts the player's momentum. I also integrated procedural Inverse Kinematics (IK) for the hands (`WallRunHandIK_LeftLocation`, etc.) to visually ground the character against the wall.
- **Dynamic Grappling System:** Developed a momentum-based grappling hook that utilizes a dual-trace validation method (`GetGrappleTargetInfo`) to identify viable anchor points. The system smoothly interpolates the character's velocity (`TotalGrappleVelocity`) while dynamically managing physical cable spline components (`SetGrappleCableLocation`).
- **Sliding & Friction Physics:** Implemented a physics-aware sliding mechanic that factors in surface incline (`FindCurrentFloorAngleAndDirection`), applying dynamic `SlopeSpeed` and `SlideFriction` to either accelerate the player down ramps or safely decelerate them on flat terrain.

<div class="videos_two">
  <div class="content-placeholder">
    <img src="{{ '/assets/images/22b8325b.jpg' | url }}" alt="Advanced Movement Gameplay" style="width: 100%;">
  </div>
</div>

### Combat & The Time-Attack Game Loop

The core loop of the game replaces traditional health with a persistent time countdown. Taking damage subtracts time, while collecting pickups restores it.

- **Persistent Countdown Timer:** Driven by the custom game instance (`BP_GeneralGameInstance`), a central `Countdown` variable ticks down across level transitions. Taking damage triggers the custom event `RestarTiempo` which applies a 10.0-second time penalty to the player's remaining pool and updates the HUD timer UI (`BP_Widget`'s `UpdateTimer` function) in real-time. When the timer hits zero, it dynamically loads `WBP_GameOver_V2` and shows the cursor.
- **Floating Glove Combat:** I designed and coded a floating boxing glove combat system with magnet-like hover physics, organic sway animations, and strike/return logic (`InitialGloveSpawn`).
- **Target Acquisition:** Built a dynamic soft-lock targeting system that populates arrays of `DetectedEnemies` within a cone of vision, calculating the `ClosestEnemyDistance` to snap punches toward the most optimal `CurrentTarget`.
- **Magnetic Pickups:** Developed magnet-like attraction logic for gameplay pickups such as `BP_Coin` and `BP_Multiplier`. The coin blueprints continuously check player proximity. Once the player enters the `AttractRange` sphere, the coin uses vector math to smoothly slide and pull itself toward the player's coordinate space.

### Custom AI Spider Boss

I engineered the game's flagship boss fight, a giant robotic spider (`BP_Spider`) controlled by a custom behavior tree (`BT_Spider`) and blackboard (`BB_Spider`).

- **Gravity-Bending Locomotion:** Developed the custom `BTTask_JumpStick` task. This task uses vector math and local rotation updates to launch the spider boss towards walls or ceilings, dynamically altering the gravity scaling and rotating the actor to align its feet with the new surface.
- **Dynamic Laser Sweeps:** Coded the `BP_Laser` actor which handles the boss's sweeping laser attacks. The laser dynamically performs geometry checks, traces collision paths, and spawns impact particle systems when intersecting with the level structure or player.
- **Ranged Projectile Attacks:** Programmed the `BTTask_RangedAttack` task, configuring fire rate thresholds, firing vectors, and cooldown intervals to keep the player constantly on the move.

### Graphics, Plugins, & Systems Integration

To deliver a polished and high-performing production build, I handled the implementation and configuration of key engine plugins and settings interfaces.

- **Upscaling & Graphics Settings:** Built the `WBP_SettingsUpscaling` widget, allowing players to dynamically configure upscaling methods like DLSS, FSR3, XeSS, and NIS. The widget executes console variables (CVars) directly to modify screen percentages, anti-aliasing methods, and latency reduction settings (NVIDIA Reflex).
- **Asynchronous Level Loading:** Integrated the **AsyncLoadingScreen** plugin to manage background level swapping seamlessly via a dedicated loading thread. This hides layout streaming processes and eliminates frame drops during level transitions.
- **Epic Leaderboards Integration:** Integrated the **EpicLeaderboard** plugin, establishing database connections to upload player finish times and scores, and displaying live leaderboards in the game's main menu.
- **Interactable Shop System (Unused):** Showcased clean systems design by building a modular shop blueprint (`BP_Shop`). The shop utilizes custom blueprint interfaces (`BPI_Interactable_C`) to spawn upgrade pickups in exchange for coins.

### Polish, Audio, & Environment

- **Dynamic Footsteps System:** Programmed a surface-specific footsteps system. A custom AnimNotify (`FootstepAnimNofify`) queries skeletal socket locations on the player model and executes line traces. Based on the returned physical material, it spawns corresponding Niagara dust VFX and plays customized Sound Cues (e.g., metal, grass, stone). Each cue utilizes 5 unique wav variants with slightly shifted pitch and volume modulators to prevent repetitive audio fatigue.
- **Level & Foliage Layout:** Constructed the main layout for the gameplay map (`dani_lvl.umap`) and the central world hub (`Hub.umap`), configuring lighting, actor placements, and painting environment foliage layers using the `InstancedFoliageActor` system.
