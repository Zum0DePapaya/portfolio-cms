---
title: "BLACKSHARD Optimized Tweaks - UE5.6 Mod - Performance Optimization - Solo Developer"
category: "tools"
weight: 5
thumbnail: "/assets/images/dfba02ee.jpg"
hover_description: "• Performance optimization mod for the UE5.6 game 'BLACKSHARD'.<br> • More than 2x performance increase with minimal visual loss.<br> • Disables heavy rendering features like Nanite and VSM.<br> • Offers TAA, FXAA, and NoAA variants."
full_width: false
about: "BLACKSHARD Optimized Tweaks is a performance optimization mod I created for the Unreal Engine 5.6 game 'BLACKSHARD'. By stripping away some of the engine's heaviest rendering features like Nanite and Virtual Shadow Maps, the mod effectively doubles framerates (e.g., from 65 FPS to 135 FPS) without significantly degrading the visual experience."
role: "Modder / Optimizer"
team_size: 1
engine: "Unreal Engine 5.6"
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
