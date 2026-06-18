---
title: "Upscaling Menu - Unreal Engine 5 Plugin"
category: "tools"
weight: 4
thumbnail: "/assets/images/22b8325b.jpg"
hover_description: "• Standalone UE5 plugin for comprehensive graphics upscaling.<br> • Extracted and expanded from 'Five More Minutes'.<br> • Custom C++ Hardware Info Library for dynamic UI adaptation.<br> • Published asset on Fab."
full_width: false
about: "Originally developed for the speedrunner 'Five More Minutes', I extracted the upscaling UI into a robust, standalone Unreal Engine 5 plugin. It provides a complete widget-based upscaling menu system, backed by a custom C++ library that queries the user's hardware to dynamically enable or disable supported features (like DLSS 3 Frame Generation)."
role: "Solo Developer"
team_size: 1
engine: "Unreal Engine 5"
---



<a href="https://www.fab.com/listings/690d9082-35b6-4a22-b388-4c44bf7c0e4a" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #fa5c5c; color: #fff; text-decoration: none; border-radius: 5px; margin-bottom: 20px; font-weight: bold; font-size: 1.1em; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">📦 Get the Upscaling Menu on Fab!</a>
<div class="videos_two">
  <div class="content-placeholder" style="aspect-ratio: 16/9; background: #222; border: 1px dashed #555; display: flex; align-items: center; justify-content: center; color: #888;">
    [PLACEHOLDER_IMG_FAB_LISTING: Image of the Upscaling Menu Fab listing or the UI itself]
  </div>
</div>

### Introduction

I originally built this system for *Five More Minutes* to manage DLSS, FSR, XeSS, and NIS from a single UI. I extracted it into a standalone plugin — a drag-and-drop UMG Widget (`WBP_SettingsUpscaling`) backed by a custom C++ library that detects the user's GPU and dynamically enables or disables upscaling options based on hardware support.

---

### Dynamic Hardware Querying (C++)

The core problem is preventing users from activating features their hardware doesn't support. I wrote `UHardwareInfoLibrary`, a C++ Blueprint Function Library that queries the OS directly — parsing the GPU brand string with regex to identify the exact series (3000 vs 4000 for Frame Gen compatibility), checking the Windows Registry for Hardware-Accelerated GPU Scheduling (`HwSchMode`), and validating DLL presence (`nvngx_dlss.dll`) alongside plugin descriptor JSONs.

<div class="videos_two">
  <div class="content-placeholder" style="aspect-ratio: 16/9; background: #222; border: 1px dashed #555; display: flex; align-items: center; justify-content: center; color: #888;">
    [PLACEHOLDER_GIF_MENU_TOGGLE: GIF showing the UI graying out options based on hardware limitations]
  </div>
</div>
<p class="video-text">Hardware Adaptation: The UI dynamically locks features based on the parsed C++ hardware details struct.</p>

```cpp
// Snippet: Extracting the GPU Series Number via Regex
static const FRegexPattern Pattern(TEXT("(\\d+)"), ERegexPatternFlags::CaseInsensitive);
FRegexMatcher Matcher(Pattern, Info.FullGPUName);

if (Matcher.FindNext())
{
    int32 FullNumber = FCString::Atoi(*Matcher.GetCaptureGroup(1));
    if (FullNumber >= 1000)
    {
        Info.SeriesNumber = (FullNumber / 1000) * 1000;
        Info.bFoundSeries = true;
    }
}
```
<p class="video-text" style="font-size: 0.85rem; margin-top: 0.5rem;"><strong>Regex Parsing:</strong> Extracts the exact GPU series number from the OS hardware string to validate Frame Generation compatibility.</p>

```cpp
// Snippet: Checking Windows Registry for GPU Scheduling (Required for Frame Gen)
#if PLATFORM_WINDOWS
HKEY hKey = nullptr;
const TCHAR* SubKey = TEXT("SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers");
if (RegOpenKeyEx(HKEY_LOCAL_MACHINE, SubKey, 0, KEY_READ, &hKey) == ERROR_SUCCESS)
{
    DWORD Value = 0, Size = sizeof(Value);
    LSTATUS Status = RegQueryValueEx(hKey, TEXT("HwSchMode"), nullptr, nullptr, reinterpret_cast<LPBYTE>(&Value), &Size);
    RegCloseKey(hKey);
    return (Status == ERROR_SUCCESS && Value == 2);
}
#endif
```
<p class="video-text" style="font-size: 0.85rem; margin-top: 0.5rem;"><strong>Registry Query:</strong> Directly queries the Windows Registry to ensure Hardware-Accelerated GPU Scheduling is enabled.</p>

---

### The Standalone Extraction

Decoupling the system from *Five More Minutes* meant ensuring zero hard references to game-specific classes. `WBP_SettingsUpscaling` relies entirely on the data struct from `UHardwareInfoLibrary` to populate boolean flags (`DLSS-FG Supported`, `XeSS Supported`, etc.). Its `UpdateDependentUI` function runs a `Switch on E_UpscalerType` to conditionally disable UI sections for unsupported features like Anti-Lag 2 or Ray Reconstruction.

### What I Learned

Building this as a reusable plugin forced me to think about API boundaries differently than building a game feature. Every function in the C++ library had to be useful without any context about the consuming project — no assumptions about game state, no references to specific blueprints. It was a good exercise in writing genuinely modular engine code.
