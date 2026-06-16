---
title: "Five More Minutes - UE5.5 - Blueprints - Lead Programmer/Designer"
category: "games"
weight: 1
thumbnail: "/assets/images/5035198e.gif"
hover_description: "• 9 month long 4 person project in Unreal Engine 5. <br> • Time-attack action platformer with custom gravity mechanics. <br> • Engineered core locomotion, custom boss AI, user interface menus, and surface-specific footsteps. <br> • Managed level foliage design and external systems integration."
full_width: false
about: "Five More Minutes is a unique time-attack action platformer built in Unreal Engine 5. As the Lead Systems & Gameplay Programmer/Designer for our 4-person team, I engineered the 3C's (Character, Camera, Controls), custom gravity boss AI, user interface menus, dynamic footfall audio, level foliage layouts, and external system integrations over a 9-month development cycle."
role: "Lead Systems & Gameplay Programmer/Designer"
team_size: 4
engine: "Unreal Engine 5.5"
---

<iframe frameborder="0" src="https://itch.io/embed/123456?bg_color=222222&amp;fg_color=eeeeee&amp;link_color=fa5c5c&amp;border_color=363636" width="552" height="167"><a href="https://example.itch.io/game">Play Five More Minutes on itch.io</a></iframe>

### 1. Introduction & Core Philosophy

For our 9-month development cycle, my primary goal as Lead Systems & Gameplay Programmer/Designer was to engineer a responsive, high-speed action platformer. Rather than settling for basic platforming mechanics, I wanted to build a tightly integrated system where the 3C's (Character, Camera, Controls), movement, and collectibles fed directly into a high-pressure, momentum-driven experience.

---

### 2. State-Driven Locomotion & Pickups

**Design Rationale:** In a high-speed, momentum-based platformer, fluid movement transitions and uninterrupted collectible gathering are critical. I engineered a state-driven locomotion system (dashing and sliding) coordinated with magnetic pickups, ensuring players can chain movement options and gather items without losing speed.

**Technical Execution:**
*   **State-Driven Foundation:** Coordinated all character locomotion through a robust, enum-based state machine (`E_States`), preventing buggy physics overlays between dashing, sliding, and aerial movement.
*   **Slope-Aware Sliding:** Implemented `FindCurrentFloorAngleAndDirection` to calculate the slope vector of the terrain, dynamically applying forward velocity acceleration when sliding down steep inclines.
*   **Magnetic Collectible System:** Programmed `BP_Coin` and `BP_Multiplier` actors to detect player proximity via sphere collision components, using frame-rate independent vector interpolation (`VInterp To`) to steer items smoothly into the character's collection volume.

<div class="videos_two">
  <div class="content-placeholder">
    <img src="{{ '/assets/images/wall-running-to-slide.gif' | url }}" alt="Locomotion chaining: transitioning into a slide">
  </div>
</div>
<p class="video-text">Locomotion chain: slide physics and state-driven transitions.</p>

<iframe src="https://blueprintue.com/render/PLACEHOLDER_BP_SLIDE_PHYSICS/" width="100%" height="400" scrolling="no" allowfullscreen></iframe>

---

### 3. Momentum-Based Grappling System

**Design Rationale:** In many games, a grappling hook acts as a linear teleport. I designed our grapple to function as a *momentum tool*. Players use it to gain height and speed, rewarding skillful chaining of grapple launches directly into air-dashes or sloped slides.

**Technical Execution:**
*   **Double-Raycast Validation:** Built `GetGrappleTargetInfo` to perform line-of-sight and clearance checks before allowing a grapple connection.
*   **Kinetic Launch:** Calculated `TotalGrappleVelocity` using distance and elevation deltas to dynamically adjust launch impulse via `SetGrapplingVelocity`.
*   **Spline Rendering:** Dynamically mapped a physical `BP_Cable` component to simulate the rope tension between the player and anchor point.

<div class="videos_two">
  <div class="content-placeholder">
    <img src="{{ '/assets/images/momentum-grappling.gif' | url }}" alt="Momentum-based grappling hook launch">
  </div>
</div>
<p class="video-text">Momentum Grappling: grappling to anchors to launch into air dashes.</p>

<iframe src="https://blueprintue.com/render/6b5-_zht/" width="100%" height="400" scrolling="no" allowfullscreen></iframe>

---

### 4. Custom AI: The Spider Boss

**Design Rationale:** A standard ground-based boss would be trivially bypassed by a player utilizing high locomotion speeds and aerial mobility. The Spider Boss was engineered to utilize the exact same vertical 3D space as the player, crawling on walls and ceilings to create a true spatial cat-and-mouse encounter.

**Technical Execution:**
*   **AI Architecture:** Directed via the `BPAI_Spider` controller, hooking into a custom Behavior Tree (`BT_Spider`) and Blackboard data structure (`BB_Spider`).
*   **Gravity-Bending Jumping:** Programmed the `BTTask_JumpStick` custom task. It utilizes collision surface normal vectors to dynamically launch the spider at walls/ceilings and uses a rotation matrix to align the mesh against the new axis of gravity.
*   **Dynamic Laser Sweeps:** Coded the `BTTask_RangedAttack` and `BP_Laser` actors, managing interval-based firing thresholds and executing multi-line raycasts to simulate sweeping laser damage that physically impacts level geometry.

<div class="videos_two">
  <div class="content-placeholder">
    <img src="{{ '/assets/images/spider-boss-combat.gif' | url }}" alt="Spider Boss combat gameplay">
  </div>
</div>
<p class="video-text">Spider-Boss Combat: navigating vertical arenas while avoiding laser sweeps.</p>

<iframe src="https://blueprintue.com/render/PLACEHOLDER_BP_SPIDERJUMP/" width="100%" height="400" scrolling="no" allowfullscreen></iframe>

---

### 5. Design Iteration: The Seamless Portal Shop

**Design Rationale:** Early in development, the vision was to keep the player completely immersed. Killing specific enemies would spawn a portal, allowing players to walk seamlessly into a separate spatial dimension—a persistent shop area—to spend time on upgrades. While technically ambitious, playtesting revealed it broke the game's high-speed pacing. Demonstrating mature design judgment, I pivoted the game to a faster, mid-level elevator upgrade system.

**Technical Execution:**
*   **Oblique Clip Planes:** `BP_portal` utilizes custom oblique projection matrices to mirror the scene via a `SceneCaptureComponent2D` without geometry clipping.
*   **Momentum Conservation:** The `TeleportCharacter` function computes the dot product of the player's movement and perfectly translates their spatial position and rotation matrix to the exit portal, preserving kinetic energy.
*   **Modular Systems:** The `BP_Shop` utilized `BPI_Interactable_C` blueprint interfaces to create highly decoupled upgrade item spawners.

<div class="videos_two">
  <div class="content-placeholder">
    <img src="{{ '/assets/images/seamless-portal.gif' | url }}" alt="Seamless visual portal loop">
  </div>
</div>
<p class="video-text">Seamless Portal: spatial transitions between environments.</p>

<iframe src="https://blueprintue.com/render/PLACEHOLDER_BP_PORTAL/" width="100%" height="400" scrolling="no" allowfullscreen></iframe>

---

### 6. Polish: UI/UX & Dynamic Audio

To ensure the game felt like a finished, performant product, I engineered the underlying framework for UI, audio, and asynchronous loading.

*   **Extensive UI Framework:** Built the majority of the game's widget hierarchy (e.g., `WBP_Menu`, `WBP_BossHP`, `WBP_UpgradeScreen`, `WBP_Tutorial`) supporting full keyboard and gamepad navigation, coordinating transitions smoothly between the Main Menu and Settings submenus.
*   **Material-Specific Audio System (`FootstepAnimNofify`):** Developed a custom AnimNotify that performs a bone-socket line trace on every footfall. Based on the returned physical material (grass, metal, stone), it spawns corresponding Niagara dust VFX and plays Sound Cues equipped with 5 unique, pitch/volume-modulated wave variants to eliminate acoustic fatigue.
*   **External Plugins Integration:** Leveraged `AsyncLoadingScreen` for smooth, background-thread level streaming without hitches, and `EpicLeaderboard` for dynamic live score uploads.

<div class="videos_two">
  <div class="content-placeholder" style="aspect-ratio: 16/9; background: #222; border: 1px dashed #555; display: flex; align-items: center; justify-content: center; color: #888;">
    [PLACEHOLDER_IMG_UI_FLOW: Image or GIF of transition flow from Main Menu to Settings Menu]
  </div>
  <div class="content-placeholder" style="aspect-ratio: 16/9; background: #222; border: 1px dashed #555; display: flex; align-items: center; justify-content: center; color: #888;">
    [PLACEHOLDER_GIF_FOOTSTEPS: GIF of dust VFX and footfall impacts across different surfaces]
  </div>
</div>
