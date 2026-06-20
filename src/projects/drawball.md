---
title: Drawball - Unity 6 - C# - Solo Developer
title_es: Drawball - Unity 6 - C# - Desarrollador en Solitario
weight: 3
category: games
thumbnail: /assets/images/e43b32d8.gif
hover_description: • Solo Unity C# project for Inbound Shovel jam 2025, top 9% (105) of 1157 entries.<br> • Built custom live-drawing physics system.<br> • Engineered procedural 'drawn-in' geometry using Clipper2Lib.<br> • Integrated LootLocker API for leaderboards.
hover_description_es: • Proyecto Unity C# en solitario para Inbound Shovel jam 2025, top 9% (105) de 1157.<br> • Integré API de LootLocker para rankings.<br> • Utilidades personalizadas del Editor.<br> • Generación procedural de colisiones utilizando el input del ratón.
full_width: false
body_es: |-
  <iframe frameborder="0" src="https://itch.io/embed/3738877?bg_color=222222&amp;fg_color=eeeeee&amp;link_color=fa5c5c&amp;border_color=363636" width="100%" style="max-width: 552px;" height="167"><a href="https://zumodepapaya.itch.io/drawball">Jugar a Drawball en itch.io</a></iframe>

  ### Introducción

  La mecánica principal es sencilla: la única forma de controlar al personaje es dibujando líneas de tinta físicas para guiarlo, hacerlo rebotar y protegerlo a través de obstáculos. Una vez que la optimización de la ruta y conseguir el mejor tiempo se convirtió en la parte divertida, evolucionó naturalmente hacia un speedrunner basado en el tiempo.

  ***

  ### Físicas de Dibujo en Tiempo Real

  El dibujo y las físicas tenían que mantenerse sincronizados sin que ninguno de los dos bloqueara al otro, especialmente a altas velocidades de cámara.

  Construí `DrawLine2D` para desacoplar las actualizaciones visuales de las líneas de los cálculos físicos. Los elementos visuales se actualizan en `LateUpdate` utilizando el suavizado de splines Catmull-Rom para que la tinta se vea fluida, mientras que las físicas se actualiza en `FixedUpdate` generando dinámicamente un `EdgeCollider2D`. El jugador puede alternar entre tipos de tinta "Standard" y "Bouncy", cada uno con sus propios PhysicsMaterial2D y costes de consumo de tinta.

  <div class="videos_two">
    <img src="{{ '/assets/images/live-drawing-action.gif' | url }}" alt="Acción de Dibujo en Vivo" style="width: 100%;">
  </div>
  <p class="video-text">Dibujo en Vivo: Elementos visuales suavizados dinámicamente usando splines Catmull-Rom mientras la física genera EdgeCollider2Ds.</p>

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

  <p class="video-text" style="font-size: 0.85rem; margin-top: 0.5rem;"><strong>Suavizado de Splines:</strong> Utiliza algoritmos Catmull-Rom para suavizar los puntos de entrada brutos en una curva visual fluida.</p>

  ***

  ### Geometría de Nivel "Dibujada" Proceduralmente

  La estética de "garabato" significaba que la propia geometría del nivel debía parecer dibujado a mano, así que hice que se animara como si estuviera siendo esbozado en tiempo real al comienzo del nivel.

  Diseñé `LevelDrawer`, que utiliza la librería `Clipper2Lib` para realizar uniones booleanas en múltiples colliders 2D superpuestos (`DrawableLevelPiece`). Fusiona las formas, extrae las rutas de contorno exteriores y aplica el suavizado Chaikin. Finalmente, una corrutina anima un `LineRenderer` a lo largo de estas rutas a lo largo del tiempo, creando el efecto visual de que los límites del nivel se dibujan en tiempo real.

  <div class="videos_two">
    <img src="{{ '/assets/images/level-drawing-effect.gif' | url }}" alt="Efecto de Dibujo de Nivel" style="width: 100%;">
  </div>
  <p class="video-text">Geometría Dibujada: Los colliders 2D superpuestos se fusionan usando Clipper2Lib y sus contornos se animan con el tiempo.</p>

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

  <p class="video-text" style="font-size: 0.85rem; margin-top: 0.5rem;"><strong>Operaciones Booleanas:</strong> Fusiona formas 2D que se intersectan utilizando Clipper2Lib y suaviza el contorno final mediante iteraciones Chaikin.</p>

  ***

  ### Clasificaciones de LootLocker

  Dado que el speedrunning se convirtió en el bucle principal, necesitaba un sistema de tabla de clasificaciones. Integré el **SDK de LootLocker** para gestionar sesiones de invitados y envíos de puntuaciones. El sistema `DisplayLeaderboard` consulta automáticamente las tablas de clasificación generadas dinámicamente por nivel (`level_1_times`, `level_2_times`), pagina los datos y formatea las puntuaciones en milisegundos brutos en lecturas limpias `mm:ss.fff`.

  <div class="videos_two">
    <img src="{{ '/assets/images/lootlocker-leaderboard.png' | url }}" alt="Clasificaciones de LootLocker" style="width: 100%;">
  </div>
  <p class="video-text">Clasificaciones: Integración de servidor en vivo que formatea tiempos con precisión de milisegundos.</p>

  Para evitar que se envíen tiempos falsos mediante solicitudes de red manipuladas, implementé un `ScoreValidator` del lado del cliente. Este sistema genera un hash SHA256 combinando la puntuación bruta con una frase secreta (Salt) y lo envía en los metadatos de LootLocker. Al recuperar la clasificación, el cliente vuelve a calcular el hash y, si no coincide, oculta la puntuación de la interfaz de usuario, invalidando efectivamente los intentos de trampa.

  ```csharp
  // ScoreValidator.cs: SHA256 Anti-Cheat Validation
  private const string SecretKey = "J8f#z!2&pL@9xQvM4$bN7^tW1;c*AeKdG%oR3sYmP+qX5uV";

  public static string GenerateChecksum(string rawScoreString)
  {
      string rawData = SecretKey + rawScoreString;
      using (SHA256 sha256 = SHA256.Create())
      {
          byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(rawData));
          StringBuilder builder = new StringBuilder();
          for (int i = 0; i < bytes.Length; i++)
              builder.Append(bytes[i].ToString("x2"));
          return builder.ToString();
      }
  }
  ```
  <p class="video-text" style="font-size: 0.85rem; margin-top: 0.5rem;"><strong>Suma de Verificación de Metadatos:</strong> Autentica las puntuaciones recuperadas recalculando el hash en el cliente con una Salt oculta, ignorando así las puntuaciones enviadas a través de API ilegítimas.</p>

  ### Lo Que Aprendí

  Crear un juego en menos de 8 días me enseñó a limitar agresivamente el alcance: las físicas del dibujo y la generación de niveles fueron los únicos dos sistemas que realmente importaron, y todo lo demás (clasificaciones, tipos de tinta) fue evolucionando naturalmente una vez que esos sistemas estuvieron sólidos.
engine: Unity
about_es: "Drawball fue un proyecto en solitario desarrollado en menos de 8 días para la Inbound Shovel Jam (Tema: 'Just Get Started'). Quedó en el 9% superior de las 1.144 entradas. La mecánica principal limita el control del jugador únicamente a dibujar líneas físicas en la pantalla para guiar una bola a través de obstáculos, evolucionando naturalmente hacia un juego de plataformas de velocidad rápida."
about: "Drawball was a solo project built in under 8 days for the Inbound Shovel Jam (Theme: 'Just Get Started'). It placed in the top 9% out of 1,144 entries. The core mechanic limits player control entirely to drawing physical lines on the screen to guide a ball through obstacles, naturally evolving into a fast-paced speedrunning platformer."
role: Solo Developer
role_es: Desarrollador en Solitario
team_size: 1
---

<iframe frameborder="0" src="https://itch.io/embed/3738877?bg_color=222222&amp;fg_color=eeeeee&amp;link_color=fa5c5c&amp;border_color=363636" width="100%" style="max-width: 552px;" height="167"><a href="https://zumodepapaya.itch.io/drawball">Play Drawball on itch.io</a></iframe>

### Introduction

The core mechanic is simple: the only way to control the character is by drawing physical ink lines to guide, bounce, and protect them through obstacles. Once path optimization and getting the best time became the fun part, it naturally evolved into a time-based speedrunner.

***

### Live Drawing Physics

Drawing and physics had to stay in sync without either one blocking the other, especially at high camera speeds.

I built `DrawLine2D` to decouple the visual line updates from the physics calculations. Visuals update in `LateUpdate` using Catmull-Rom spline smoothing to keep the ink looking fluid, while physics update in `FixedUpdate` by dynamically generating an `EdgeCollider2D`. The player can swap between "Standard" and "Bouncy" ink types, each with their own PhysicsMaterial2D and ink consumption costs.

<div class="videos_two">
  <img src="{{ '/assets/images/live-drawing-action.gif' | url }}" alt="Live Drawing Action" style="width: 100%;">
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

<p class="video-text" style="font-size: 0.85rem; margin-top: 0.5rem;"><strong>Spline Smoothing:</strong> Uses Catmull-Rom algorithms to smooth the raw input points into a fluid visual curve.</p>

***

### Procedural "Drawn-In" Level Geometry

Because the doodle aesthetic meant the level geometry itself needed to look hand-drawn, I made it animate in as if it were being sketched in real-time when the level starts.

I engineered `LevelDrawer`, which uses the `Clipper2Lib` library to perform boolean unions on multiple overlapping 2D colliders (`DrawableLevelPiece`). It merges the shapes, extracts the outer contour paths, and applies Chaikin smoothing. Finally, a coroutine animates a `LineRenderer` along these paths over time, creating the visual effect of the level boundaries being sketched in real-time.

<div class="videos_two">
  <img src="{{ '/assets/images/level-drawing-effect.gif' | url }}" alt="Level Drawing Effect" style="width: 100%;">
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

<p class="video-text" style="font-size: 0.85rem; margin-top: 0.5rem;"><strong>Boolean Operations:</strong> Merges intersecting 2D shapes using Clipper2Lib and smooths the final contour via Chaikin iterations.</p>

***

### LootLocker Leaderboards

Since speedrunning became the core loop, I needed a robust backend to track completion times. I integrated the **LootLocker SDK** to handle guest sessions and score submissions. The `DisplayLeaderboard` system automatically queries leaderboards dynamically generated per-level (`level_1_times`, `level_2_times`), paginates the data, and formats the raw millisecond scores into clean `mm:ss.fff` readouts.

<div class="videos_two">
  <img src="{{ '/assets/images/lootlocker-leaderboard.png' | url }}" alt="LootLocker Leaderboards" style="width: 100%;">
</div>
<p class="video-text">Leaderboards: Live server integration formatting millisecond precision times.</p>

To prevent fake times from being submitted via network manipulation, I implemented a client-sided `ScoreValidator`. It generates a SHA256 hash by combining the raw score with a secret Salt phrase and submits it into the LootLocker metadata. When fetching the leaderboard, the client recalculates the hash and, if it doesn't match, hides the score from the UI, effectively voiding cheating attempts.

```csharp
// ScoreValidator.cs: SHA256 Anti-Cheat Validation
private const string SecretKey = "J8f#z!2&pL@9xQvM4$bN7^tW1;c*AeKdG%oR3sYmP+qX5uV";

public static string GenerateChecksum(string rawScoreString)
{
    string rawData = SecretKey + rawScoreString;
    using (SHA256 sha256 = SHA256.Create())
    {
        byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(rawData));
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < bytes.Length; i++)
            builder.Append(bytes[i].ToString("x2"));
        return builder.ToString();
    }
}
```
<p class="video-text" style="font-size: 0.85rem; margin-top: 0.5rem;"><strong>Metadata Checksum:</strong> Authenticates fetched scores by recalculating the hash on the client with a hidden Salt, silently ignoring scores submitted via illegitimate API requests.</p>

### What I Learned

Shipping a game in under 8 days taught me to scope aggressively, the drawing physics and level generation were the only two systems that truly mattered, and everything else (leaderboards, ink types) evolved naturally once those were solid.
