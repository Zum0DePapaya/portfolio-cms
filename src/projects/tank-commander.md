---
title: "Tank Commander - UE5.7 - Blueprints and C++ - Systems & Tools Programming"
category: "games"
weight: 2
thumbnail: "/assets/images/aecc34f9.jpg"
hover_description: "• Unreal Engine 5 tank game.<br> • Built data-driven customization hangar with 3D previews & persistent loadouts.<br> • Engineered C++ geometry destruction optimization & modular destructibles.<br> • Programmed runtime debug & cheat menus."
full_width: false
---

<div class="project-info-grid">
  <div class="about-section">
    <h3>About</h3>
    <p>Tank Commander is an Unreal Engine 5 vehicle combat game. As the Systems & Tools Programmer, I engineered the core data architecture, built the dynamic vehicle customization systems, and developed C++ utilities to optimize performance during heavy Chaos destruction events.</p>
  </div>
  <div class="info-section">
    <h3>Project Info</h3>
    <ul>
      <li><strong>Role:</strong> Systems & Tools Programmer</li>
      <li><strong>Team Size:</strong> 4</li>
      <li><strong>Engine:</strong> Unreal Engine 5.7</li>
    </ul>
  </div>
</div>

<style>
.project-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  background-color: var(--bg-color-secondary, #2a2a2a);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}
.project-info-grid h3 {
  margin-top: 0;
  margin-bottom: 15px;
}
.info-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.info-section li {
  margin-bottom: 8px;
}
@media (max-width: 768px) {
  .project-info-grid {
    grid-template-columns: 1fr;
  }
}
</style>

### Introduction

My main focus for this project was creating the **data-driven customization system** that allows designers to easily swap out tank parts, as well as optimizing the game's **performance** when dealing with heavy Chaos destruction.

I worked closely with the design team to ensure that the systems I built were modular, easy to extend, and didn't require any blueprint logic changes when adding new content.

### Modular Customization System (The Hangar)

The customization system is built entirely on a data-driven approach using **Gameplay Tags**. Every customization slot on the vehicle and every attachable part has a unique tag. This allows the system to map parts to slots dynamically using Data Assets.

When a player selects a part in the UI, the system instantly updates the 3D preview and saves the loadout persistently. During gameplay deployment, the vehicle reads this data and automatically spawns the correct meshes. Because it's completely data-driven, adding new parts is as simple as creating a new Data Asset—no code changes required.

*(Placeholder: Insert Hangar Customization UI Flow GIF here)*

[Code - Modular Customization System](#)

### Chaos Destruction & Performance

Unreal's Chaos Destruction engine provides incredible visuals, but generating thousands of physics-simulated debris pieces on ground contact severely impacted our framerate.

To solve this, I engineered a **custom C++ component** (`GeometryCollectionDebrisComponent`) that tracks fractured geometry. When debris hits the ground below a certain impulse threshold, the component disables its physics proxy, visually hides the meshes, and replaces them with highly performant Niagara particle bursts.

*(Placeholder: Insert Chaos Destruction to Niagara Optimization GIF here)*

```cpp
void UGeometryCollectionDebrisComponent::OnGCHit(
	UPrimitiveComponent* HitComponent, AActor* OtherActor, UPrimitiveComponent* OtherComp,
	FVector NormalImpulse, const FHitResult& Hit)
{
	auto* HitGC = Cast<UGeometryCollectionComponent>(HitComponent);
	if (!HitGC || !RegisteredGCComponents.Contains(HitGC)) return;

	if (NormalImpulse.SizeSquared() < ImpulseThreshold * ImpulseThreshold) return;

	// Disable physics for the piece and its descendants
	if (ValidIndices.Num() > 0 && Proxy) {
		Proxy->DisableParticles_External(MoveTemp(ValidIndices));
	}

	// Hide visually by scaling transforms to zero
	TSet<int32>& Pending = PendingHideByGC.FindOrAdd(HitGC);
	for (int32 Idx : AllIndices) Pending.Add(Idx);
	HidePiecesVisually(HitGC, Pending);

	// Spawn highly performant Niagara VFX in place of the geometry debris
	if (DebrisBurstSystem) {
		UNiagaraFunctionLibrary::SpawnSystemAtLocation(
			this, DebrisBurstSystem, Hit.ImpactPoint, NormalImpulse.GetSafeNormal().Rotation(),
			FVector(1.0f), true, true, ENCPoolMethod::AutoRelease
		);
	}
}
```

[Code - Geometry Collection Debris Component](#)

### In-Game Developer Tools

Recognizing that rapid iteration is key to game design, I developed a suite of in-game tools to accelerate playtesting for the rest of the team. This included a custom Debug Pause Menu for hot-swapping graphic settings and keybinds, and a Cheat Console for testing physics and AI with infinite ammo and rapid-fire.

*(Placeholder: Insert screenshot here showcasing the WBP_DebugPauseMenu interface)*

### What I learned

In this project, I learned a lot about architecting **data-driven systems** that empower designers. Creating a system that relies entirely on Data Assets and Gameplay Tags showed me the importance of separating content from logic.

I also gained valuable experience optimizing C++ code for Chaos destruction. Profiling and finding the exact bottleneck allowed me to create a targeted solution that drastically improved performance while maintaining visual fidelity.
