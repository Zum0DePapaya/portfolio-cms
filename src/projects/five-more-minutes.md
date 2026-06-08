---
title: "Five More Minutes - UE5.5 - Blueprints - Lead Programmer/Designer"
category: "games"
weight: 1
thumbnail: "/assets/images/5035198e.gif"
hover_description: "• 9 month long 4 person project In Unreal Engine 5. <br> • Third person action platformer with roguelike elements. <br> • Led gameplay/systems. <br> • Built controls, camera, menus, audio, combat, advanced movement, optimization, levels and more."
full_width: false
about: "Five More Minutes is a unique time-based roguelite action platformer built in Unreal Engine 5. As the Lead Systems & Gameplay Designer/Programmer for our 4-person team, I owned the 3C's (Character, Camera, Controls), built the core combat and platforming mechanics, and engineered the persistent level streaming architecture over a 9-month development cycle."
role: "Lead Systems & Gameplay Designer/Programmer"
team_size: 4
engine: "Unreal Engine 5.5"
---

<iframe frameborder="0" src="https://itch.io/embed/123456?bg_color=222222&amp;fg_color=eeeeee&amp;link_color=fa5c5c&amp;border_color=363636" width="552" height="167"><a href="https://example.itch.io/game">Play Five More Minutes on itch.io</a></iframe>

### The 3C's (Character, Camera, Controls)

Owning the entirety of the 3C's from start to finish was my primary responsibility. 

- **Advanced Movement System:** I programmed a complete, highly-responsive character movement system in Blueprints. It features directional dashing, air dashes, wall jumps, double jumps, and sliding. To ensure platforming felt precise, I implemented a "coyote time" mechanic utilizing raycast ground detection, allowing players slightly more leeway when jumping off ledges.
- **Dynamic Camera System:** Drawing insights from classic 3D platformers and souls-like combat, I created a satisfying camera system that smoothly handles both tight platforming sections and intense combat encounters.
- **Adaptive Controls:** The game features advanced input handling for both keyboard and controller. Players can trigger directional dashes in any of the four cardinal directions by double-tapping movement keys, alongside executing button combos for special abilities.

<div class="videos_two">
  <div class="content-placeholder">
    <img src="{{ '/assets/images/22b8325b.jpg' | url }}" alt="Advanced Movement Gameplay" style="width: 100%;">
  </div>
</div>

### Combat & The 5-Minute Game Loop

The core loop of the game replaces traditional health with a persistent 5-minute timer. 
- Taking damage subtracts time, while collecting pickups adds time back to the clock. 
- I designed and coded a floating boxing glove combat system with magnet-like hover physics, organic sway animations, and strike/return logic. 
- The combat system includes specialized cooldown abilities, enemy targeting, and adaptive floating damage numbers that scale dynamically upon impact. 
- I also built a multi-phase boss fight from scratch, encompassing melee and ranged attacks, pathfinding, custom animations, and sound design.

<div class="videos_two">
  <div class="content-placeholder">
    <img src="{{ '/assets/images/fa2ef94f.jpg' | url }}" alt="Combat Engine" style="width: 100%;">
  </div>
</div>

### Architecture & Level Streaming

To keep performance high and transitions seamless, I engineered a robust level loading architecture.

- **Persistent Level System:** The game's 5 main levels are streamed dynamically into a highly optimized persistent level.
- **Elevator Transitions:** I implemented an elevator system that masks async level switching. The transitions between levels are entirely seamless.
- **Mid-Level Upgrades:** During these elevator transitions, players are presented with a data-driven upgrade screen. This UI is fully functional on gamepads and keyboards, featuring smooth intro/outro animations and detailed stat cards to help players make informed build choices.

### Additional Features

Beyond the core mechanics, I wore many hats to ensure the project shipped polished:
- **Audio:** Implemented dynamic footstep sounds with up to 5 variants per surface type. Pitch and volume are slightly randomized on each step to ensure natural acoustic variance.
- **Level Design:** Designed full levels including enemy placements, lighting, and an art pass utilizing downloaded assets.
- **UI/UX:** Built the entire user interface, from responsive main/pause menus to upscaling settings.
- **Prototyping:** Explored and prototyped portal-style seamless transitions and an in-game shop mechanic for resource spending.
