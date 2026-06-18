---
title: "Drawball - Unity - C# - Solo Developer"
category: "games"
weight: 3
thumbnail: "/assets/images/e43b32d8.gif"
hover_description: "• Solo Unity C# project for Inbound Shovel jam 2025, top 9% (105) of 1157 entries.<br> • Built custom live-drawing physics system.<br> • Engineered procedural 'drawn-in' geometry using Clipper2Lib.<br> • Integrated LootLocker API for leaderboards."
full_width: false
about: "Drawball was a solo project built in under 8 days for the Inbound Shovel Jam (Theme: 'Just Get Started'). It placed in the top 9% out of 1,144 entries. The core mechanic limits player control entirely to drawing physical lines on the screen to guide a ball through obstacles, naturally evolving into a fast-paced speedrunning platformer."
role: "Solo Developer"
team_size: 1
engine: "Unity"
---

# Drawball

<iframe frameborder="0" src="https://itch.io/embed/3738877?bg_color=222222&amp;fg_color=eeeeee&amp;link_color=fa5c5c&amp;border_color=363636" width="552" height="167"><a href="https://zumodepapaya.itch.io/drawball">Play Drawball on itch.io</a></iframe>
<div class="videos_two">
  <div class="content-placeholder">
    <img src="{{ '/assets/images/e43b32d8.gif' | url }}" alt="Drawball Gameplay" style="width: 100%;">
  </div>
</div>

### Introduction

The original idea for the "Just Get Started" jam theme was that players would draw to procedurally generate a level. This quickly morphed into something much more immediate: the only way to control the character is by drawing physical ink lines to guide, bounce, and protect them. As I realized how fun it was to optimize paths, it naturally evolved into a time-based speedrunner.

---

### Live Drawing Physics

The drawing system had to feel perfectly smooth and responsive, no matter how fast the camera was moving. 

I built `DrawLine2D` to decouple the visual line updates from the physics calculations. Visuals update in `LateUpdate` using Catmull-Rom spline smoothing to keep the ink looking fluid, while physics update in `FixedUpdate` by dynamically generating an `EdgeCollider2D`. The player can swap between "Standard" and "Bouncy" ink types, each with their own PhysicsMaterial2D and ink consumption costs.

<div class="videos_two">
  <div class="content-placeholder" style="aspect-ratio: 16/9; background: #222; border: 1px dashed #555; display: flex; align-items: center; justify-content: center; color: #888;">
    [PLACEHOLDER_GIF_DRAWING: GIF showing drawing standard and bouncy ink in action]
  </div>
</div>
<p class="video-text">Live Drawing: Visuals dynamically smoothed using Catmull-Rom splines while physics generate EdgeCollider2Ds.</p>

```csharp
private List<Vector3> GenerateSmoothedPoints(List<Vector2> points)
{
    if (points.Count < 2) return new List<Vector3>();
    var res = new List<Vector3>();
    var pts = new Vector2[points.Count + 2];
    points.CopyTo(pts, 1);
    pts[0] = points[0];
    pts[^1] = points[^2];
    
    for (int i = 1; i < pts.Length - 2; i++)
        for (int j = 0; j < smoothSteps; j++)
            res.Add(CatmullRom(pts[i - 1], pts[i], pts[i + 1], pts[i + 2], j / (float)smoothSteps));
            
    res.Add(points[^1]);
    return res;
}
```

---

### Procedural "Drawn-In" Level Geometry

To match the doodle aesthetic, I wanted the actual level geometry to look like it was being drawn into existence when the level starts.

I engineered `LevelDrawer`, which uses the `Clipper2Lib` library to perform boolean unions on multiple overlapping 2D colliders (`DrawableLevelPiece`). It merges the shapes, extracts the outer contour paths, and applies Chaikin smoothing. Finally, a coroutine animates a `LineRenderer` along these paths over time, creating the visual effect of the level boundaries being sketched in real-time.

<div class="videos_two">
  <div class="content-placeholder" style="aspect-ratio: 16/9; background: #222; border: 1px dashed #555; display: flex; align-items: center; justify-content: center; color: #888;">
    [PLACEHOLDER_GIF_LEVEL_DRAWING: GIF showing the level boundaries being drawn in when the level starts]
  </div>
</div>
<p class="video-text">Drawn-In Geometry: Overlapping 2D colliders are merged using Clipper2Lib and their contours are animated over time.</p>

```csharp
// Snippet from LevelDrawer: Merging colliders and applying Chaikin smoothing
Paths64 solution = new Paths64();
clipper.AddSubject(subject);
clipper.Execute(ClipType.Union, FillRule.NonZero, solution);

List<List<Vector2>> finalPaths = new List<List<Vector2>>();
foreach (var path in solution)
{
    List<Vector2> finalPath = new List<Vector2>();
    foreach (var p in path)
        finalPath.Add(new Vector2(p.X / ClipperScale, p.Y / ClipperScale));
        
    finalPaths.Add(finalPath);
}

// Applying Chaikin smoothing to the merged contours
for (int i = 0; i < smoothingIterations; i++) 
{ 
    animationPath = ChaikinSmooth(animationPath); 
}
```

---

### LootLocker Leaderboards

Since speedrunning became the core loop, I needed a robust backend to track completion times. I integrated the **LootLocker SDK** to handle guest sessions and score submissions. The `DisplayLeaderboard` system automatically queries leaderboards dynamically generated per-level (`level_1_times`, `level_2_times`), paginates the data, and formats the raw millisecond scores into clean `mm:ss.fff` readouts.

<div class="videos_two">
  <div class="content-placeholder" style="aspect-ratio: 16/9; background: #222; border: 1px dashed #555; display: flex; align-items: center; justify-content: center; color: #888;">
    [PLACEHOLDER_IMG_LEADERBOARD: Screenshot of the paginated LootLocker leaderboard UI]
  </div>
</div>
<p class="video-text">Leaderboards: Live server integration formatting millisecond precision times.</p>

---

### The Mobile Port

Because the game performed so well in the jam, I started adapting it for mobile. I rewrote the camera systems (`CameraZoomController`) to support multi-touch pinch-to-zoom using Unity's new Input System, calculating the magnitude difference between two active touches to dynamically adjust the orthographic size. While I never officially released the mobile port, building these touch-first control schemes was a great learning experience.

<div class="videos_two">
  <div class="content-placeholder" style="aspect-ratio: 16/9; background: #222; border: 1px dashed #555; display: flex; align-items: center; justify-content: center; color: #888;">
    [PLACEHOLDER_GIF_MOBILE_ZOOM: GIF or video demonstrating pinch-to-zoom on a mobile device]
  </div>
</div>
<p class="video-text">Mobile Controls: Multi-touch pinch-to-zoom dynamically adjusting orthographic camera size.</p>
