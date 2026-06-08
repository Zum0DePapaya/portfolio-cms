---
title: "Tank Commander - UE5.7 - Blueprints and C++ - Systems & Tools Programming"
category: "games"
weight: 2
thumbnail: "/assets/images/aecc34f9.jpg"
hover_description: "• Unreal Engine 5 tank game.<br> • Built data-driven customization hangar with 3D previews & persistent loadouts.<br> • Engineered C++ geometry destruction optimization & modular destructibles.<br> • Programmed runtime debug & cheat menus."
full_width: false
about: "Tank Commander is an Unreal Engine 5 vehicle combat game. As the Systems & Tools Programmer, I engineered the core data architecture, built the dynamic vehicle customization systems, and developed C++ utilities to optimize performance during heavy Chaos destruction events."
role: "Systems & Tools Programmer"
team_size: 4
engine: "Unreal Engine 5.7"
---

### Introduction

My main focus for this project was creating the **data-driven customization system** that allows designers to easily swap out tank parts, as well as optimizing the game's **performance** when dealing with heavy Chaos destruction.

I worked closely with the design team to ensure that the systems I built were modular, easy to extend, and didn't require any blueprint logic changes when adding new content.

### Modular Customization System (The Hangar)

The system is built on a simple idea: **Gameplay Tags are the universal key for everything.**

Every customization slot on a vehicle (turret, barrel, hull front, etc.) has a Gameplay Tag. Every attachable part also has a Gameplay Tag. When a player picks a part in the hangar UI, the system writes a `{SlotTag → PartTag}` mapping into a persistent struct on the GameInstance. When they deploy to gameplay, the tank reads that struct and spawns the correct meshes into the correct sockets.

Because everything is driven by tag lookups and data assets, you can add new parts or even new slots without touching blueprint logic — just create data assets and register them.

#### Hangar Interface & Preview

To provide a seamless customization experience, I built a dedicated Hangar GameMode. The player controls a `BP_HangarPawn` with custom orbit camera logic to smoothly rotate around the tank. 

When navigating the UI, clicking a part in the `WBP_PartSelectionPanel` triggers a `SwapSlotMesh` function on the `BP_HangarVehiclePreview` actor. This provides instant 3D visual feedback without affecting the actual gameplay actor. Once the player confirms their loadout, the final configuration is written to the GameInstance.

<div class="videos_two">
  <div class="content-placeholder">
    <img src="{{ '/assets/images/5035198e.gif' | url }}" alt="Hangar Customization Flow" style="width: 100%;">
  </div>
</div>

#### System Architecture

```mermaid
graph TD
    subgraph Data ["Data Layer (Content Only)"]
        Tags["DT_GameplayTags<br/>Slot.* & Part.*"]
        PDA["PDA_AttachableActor<br/>(per part)"]
        VDef["DA_VehicleDef_Sherman<br/>(per vehicle type)"]
        PDA -.->|"references"| Tags
        VDef -->|"AvailableParts[]"| PDA
        VDef -->|"DefaultLoadout[]"| DefaultSlots["SSlotAssignment[]"]
    end
    subgraph Core ["Core (Persistent State)"]
        GI["BP_GameInstance_Main"]
        GI -->|"holds"| Loadout["ActiveLoadout<br/>(SVehicleLoadout)"]
        GI -->|"tracks"| Unlocked["UnlockedParts<br/>(GameplayTagContainer)"]
    end
    subgraph Hangar ["Hangar (Preview & UI)"]
        GM_H["BP_HangarGameMode"] -->|"first-boot init"| GI
        Ctrl["BP_HangarController"] -->|"creates"| HUD["WBP_HangarHUD"]
        Ctrl -->|"possesses"| Pawn["BP_HangarPawn<br/>(orbit camera)"]
        HUD -->|"OpenSlotPanel()"| Panel["WBP_PartSelectionPanel"]
        Panel -->|"ShowForSlot()"| Items["WBP_PartListItem × N"]
        Items -->|"on click"| Preview["BP_HangarVehiclePreview<br/>(SwapSlotMesh)"]
        Items -->|"on click"| GI
    end
    subgraph Gameplay ["Gameplay (Spawning)"]
        Sherman["BP_Sherman"] -->|"BeginPlay"| GI
        Sherman -->|"populates"| SocketMap["SocketsAndAttachables Map"]
        SocketMap -->|"Parent::BeginPlay"| Spawner["BP_BaseTrackedVehicle<br/>(AttachModules)"]
    end
    VDef -.-> GI
```



### Chaos Destruction & Performance

Unreal's Chaos Destruction engine provides incredible visuals, but generating thousands of physics-simulated debris pieces on ground contact severely impacted our framerate.

To solve this, I engineered a **custom C++ component** (`GeometryCollectionDebrisComponent`) that tracks fractured geometry. When debris hits the ground below a certain impulse threshold, the component disables its physics proxy, visually hides the meshes, and replaces them with highly performant Niagara particle bursts.

<div class="videos_two">
  <div class="content-placeholder">
    <img src="{{ '/assets/images/e43b32d8.gif' | url }}" alt="Chaos Destruction to Niagara Optimization" style="width: 100%;">
  </div>
</div>

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



### In-Game Developer Tools

Recognizing that rapid iteration is key to game design, I developed a suite of in-game tools to accelerate playtesting for the rest of the team. This included a custom Debug Pause Menu for hot-swapping graphic settings and keybinds, and a Cheat Console for testing physics and AI with infinite ammo and rapid-fire.

<div class="videos_two">
  <div class="content-placeholder">
    <img src="{{ '/assets/images/dfba02ee.jpg' | url }}" alt="Debug Pause Menu" style="width: 100%;">
  </div>
</div>

### What I learned

In this project, I learned a lot about architecting **data-driven systems** that empower designers. Creating a system that relies entirely on Data Assets and Gameplay Tags showed me the importance of separating content from logic.

I also gained valuable experience optimizing C++ code for Chaos destruction. Profiling and finding the exact bottleneck allowed me to create a targeted solution that drastically improved performance while maintaining visual fidelity.
