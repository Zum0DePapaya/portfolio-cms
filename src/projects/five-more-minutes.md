---
title: "Five More Minutes - UE5.5 - Blueprints - Lead Programmer/Designer"
category: "games"
weight: 1
thumbnail: "/assets/images/5035198e.gif"
hover_description: "• 9 month long 4 person project in Unreal Engine 5. <br> • Time-attack action platformer with custom gravity mechanics. <br> • Engineered core locomotion, custom boss AI, user interface menus, and surface-specific footsteps. <br> • Managed level foliage design and external systems integration."
full_width: false
about: "Five More Minutes is a time-attack action platformer built in Unreal Engine 5. As the Lead Programmer/Designer on a 4-person team over 9 months, I built the core locomotion, a gravity-defying boss AI, seamless portal rendering, UI menus, and surface-specific footstep audio."
role: "Lead Systems & Gameplay Programmer/Designer"
team_size: 4
engine: "Unreal Engine 5.5"
---

<iframe frameborder="0" src="https://itch.io/embed/3830437?bg_color=222222&amp;fg_color=eeeeee&amp;link_color=fa5c5c&amp;border_color=363636" width="552" height="167"><a href="https://sanpitopatogames.itch.io/five-more-minutes">Play Five More Minutes on itch.io</a></iframe>

### Introduction

The core goal was to build a fast, momentum-driven platformer where every system — movement, combat, collectibles — feeds into one tight loop. I was responsible for the 3C's (Character, Camera, Controls) and most of the game's major systems.

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

Most grappling hooks just teleport you. Ours is a **momentum tool** — players use it to gain height and speed, then chain the launch into an air-dash or a sloped slide.

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

A ground-based boss would be trivial to outrun in a game with this much vertical mobility. The Spider Boss uses the **same 3D space as the player** — it crawls on walls and ceilings, turning the arena into a true spatial cat-and-mouse fight.

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

Early on, the plan was to keep the player fully immersed — killing certain enemies would spawn a portal into a separate shop dimension for upgrades. I built the full system: oblique clip-plane rendering via `SceneCaptureComponent2D`, momentum-preserving teleportation using dot products, and a modular shop built on `BPI_Interactable_C` interfaces.

It worked, but playtesting showed it broke the game's pacing. We pivoted to a faster mid-level elevator upgrade system instead — a good lesson in knowing when to cut a feature.

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
