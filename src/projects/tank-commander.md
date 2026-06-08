---
title: "Tank Commander - UE5.7 - Blueprints and C++ - Systems & Tools Programming"
category: "games"
weight: 2
thumbnail: "/assets/images/aecc34f9.jpg"
hover_description: "• Unreal Engine 5 tank game.<br> • Built data-driven customization hangar with 3D previews & persistent loadouts.<br> • Engineered C++ geometry destruction optimization & modular destructibles.<br> • Programmed runtime debug & cheat menus."
full_width: false
---

# Tank Commander: Systems & Tools Programming

**Tank Commander** is an Unreal Engine 5 vehicle combat game. As the **Systems & Tools Programmer**, I engineered the core data architecture, built the dynamic vehicle customization systems, and developed C++ utilities to optimize performance during heavy Chaos destruction events.

Here is a technical deep dive into the three core systems I built for this project.

---

## 1. Data-Driven Customization System (The Hangar)

I architected a robust, persistent 3D tank customization hangar. To ensure the system was scalable and designer-friendly, I utilized a strict separation of concerns: separating the UI, the visual preview, and the persistent GameInstance data.

* **Primary Data Asset (PDA) Workflow:** Designers can create new tank parts (engines, suspensions, cannons) entirely through Data Assets (e.g., `DA_Engine`, `DA_Suspension`). Each part is identified by a Gameplay Tag, meaning no code or Blueprint logic needs to be touched to expand the game's arsenal.
* **Efficient Memory Management:** Inside `BP_GameInstance_Main`, the `InitializeForVehicle` routine iterates through a vehicle's `AvailableParts`, resolving Soft Object References and unlocking them via their Gameplay Tags only when needed, minimizing the base memory footprint.
* **Dynamic BeginPlay Initialization:** I intercepted the `EventBeginPlay` of `BP_Sherman` to read the player's active loadout from the GameInstance. The tank then iterates through its slot assignments, dynamically resolving and attaching the correct 3D modules before the player gains control.
* **Interpolating Orbit Camera:** I programmed a smooth orbit camera (`BP_HangarPawn`) that calculates and interpolates `OrbitYaw`, `OrbitPitch`, and `ZoomDistance` against target values, featuring an `IdleRotationSpeed` system that seamlessly takes over when player input stops.

*(Placeholder: Insert BlueprintUE.com iframe here showcasing the `InitializeForVehicle` logic from `BP_GameInstance_Main`)*

---

## 2. Chaos Destruction & C++ Performance Utilities

Unreal's Chaos Destruction engine provides incredible visuals, but generating thousands of physics-simulated debris pieces on ground contact severely impacts framerate and navmesh generation.

To solve this, I engineered a custom C++ component (`GeometryCollectionDebrisComponent`) that tracks fractured geometry. When debris hits the ground below a certain threshold, the component disables its physics proxy, visually hides the meshes by scaling their transform to zero, and replaces them with highly performant Niagara particle bursts.

```cpp
void UGeometryCollectionDebrisComponent::OnGCHit(
	UPrimitiveComponent* HitComponent,
	AActor* OtherActor,
	UPrimitiveComponent* OtherComp,
	FVector NormalImpulse,
	const FHitResult& Hit)
{
	auto* HitGC = Cast<UGeometryCollectionComponent>(HitComponent);
	if (!HitGC || !RegisteredGCComponents.Contains(HitGC)) return;

	// Filter out minor collisions
	if (NormalImpulse.SizeSquared() < ImpulseThreshold * ImpulseThreshold) return;

	const int32 ItemIndex = ResolveItemIndex(HitGC, Hit);
	if (ItemIndex < 0) return;
	
	/* ... [validation and timing logic omitted for brevity] ... */

	// 1. Disable physics for the piece and its descendants
	if (ValidIndices.Num() > 0 && Proxy)
	{
		Proxy->DisableParticles_External(MoveTemp(ValidIndices));
	}

	// 2. Hide visually by scaling transforms to zero
	TSet<int32>& Pending = PendingHideByGC.FindOrAdd(HitGC);
	for (int32 Idx : AllIndices)
	{
		Pending.Add(Idx);
	}
	HidePiecesVisually(HitGC, Pending);

	// 3. Spawn highly performant Niagara VFX in place of the geometry debris
	if (DebrisBurstSystem)
	{
		UNiagaraFunctionLibrary::SpawnSystemAtLocation(
			this, DebrisBurstSystem, Hit.ImpactPoint, NormalImpulse.GetSafeNormal().Rotation(),
			FVector(1.0f), true, true, ENCPoolMethod::AutoRelease
		);
	}
}
```

Alongside this, I built a modular destructible building template (`BP_ModularDestructible`) that utilizes **Cluster Union Actors** to structurally bind separate geometry components together, allowing buildings to shatter realistically while remaining easy to author.

---

## 3. In-Game Developer Tools & Cheat Console

Recognizing that rapid iteration is key to game design, I developed a suite of in-game tools to accelerate playtesting for the rest of the team.

* **Debug Pause Menu (`WBP_DebugPauseMenu`):** A custom runtime interface that allows developers to hot-swap graphic quality settings, invert keybinds, and mix audio sliders on the fly without having to restart the editor or dive into project settings.
* **Custom Cheat Console:** I integrated backend cheat commands offering toggles for infinite ammunition and a zero-delay rapid-fire cannon mode, allowing designers to quickly stress-test physics interactions and AI responsiveness.

*(Placeholder: Insert screenshot here showcasing the `WBP_DebugPauseMenu` interface)*
