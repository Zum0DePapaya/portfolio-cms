# AI Handoff Document: Portfolio CMS

This document is intended for any AI agent or LLM assisting the user with their portfolio. It provides a comprehensive overview of the architecture, tech stack, and conventions used in this project. Please read this entirely before making modifications.

## 1. Project Overview & Tech Stack
This is a static portfolio website for a Game Developer/Systems Programmer, designed to showcase Unreal Engine, Unity, and specialized programming projects.

*   **Static Site Generator:** Eleventy (11ty)
*   **Templating Language:** Nunjucks (`.njk`)
*   **Content:** Markdown (`.md`) with YAML frontmatter
*   **Styling:** Pure vanilla CSS (`style.css`). *Do not use Tailwind or other CSS frameworks.*
*   **Hosting/Deployment:** GitHub Pages via GitHub Actions.

## 2. Directory Structure
*   `src/index.njk`: The main landing page. Handles the layout, iterates over categories, and renders the project cards.
*   `src/_data/`: Contains global data files.
    *   `landing.json`: Site metadata, social links, and biographical text (bilingual).
    *   `categories.json`: Defines the sections (e.g., "Games", "Tools & Simulations").
*   `src/projects/`: Contains the Markdown files for each portfolio project.
*   `src/css/style.css`: All styling for the site.
*   `src/assets/`: Contains images, thumbnails, and videos.

## 3. Bilingual System (Critical Concept)
The entire site is natively bilingual (English and Spanish) without using URL routing or separate pages. It uses a **zero-latency CSS toggling approach**.

**How it works:**
*   The `<html>` root element has a `lang` attribute (either `lang="en"` or `lang="es"`).
*   Content that needs translation is duplicated in the HTML/Markdown and wrapped in specific classes: `.lang-en` and `.lang-es`.
*   CSS rules in `style.css` instantly hide the inactive language:
    ```css
    :root[lang="en"] .lang-es { display: none !important; }
    :root[lang="es"] .lang-en { display: none !important; }
    ```

**Rule for AI Agents:**
Whenever you add text, captions, bio information, or project descriptions, you **MUST** provide both languages.
*   *In Markdown:* 
    ```html
    <div class="lang-en">English text here...</div>
    <div class="lang-es">Texto en español aquí...</div>
    ```
*   *In JSON (`landing.json`):* Data is usually structured with `en` and `es` keys.

## 4. Modifying and Adding Projects
Projects are added by creating a new Markdown file inside `src/projects/`. 

**Frontmatter Requirements:**
```yaml
---
title: "Project Name"
category: "tools" # Must match an ID in src/_data/categories.json
thumbnail: "assets/img/project-thumbnail.png"
tags: ["UE5", "Blueprints", "VR"]
weight: 10 # Used for sorting (lower numbers appear first)
---
```

**Markdown Body:**
*   The body of the markdown file is rendered using an Eleventy Markdown-IT filter.
*   Use standard Markdown (`##`, `###`, `*`, `**`).
*   **Media:** You can embed HTML directly in the markdown for advanced layouts. We commonly use a `videos_two` class for side-by-side media blocks.
    ```html
    <div class="videos_two">
      <div class="content-placeholder">
         <img src="assets/img/demo.gif" alt="Demo">
      </div>
    </div>
    ```
*   **Placeholders:** If the user doesn't have the media yet, inject an invisible HTML comment placeholder so they remember to add it later:
    ```html
    <!-- [INSERT GIF: player jumping] -->
    ```
*   **BlueprintUE:** The CSS is specifically tuned to handle embedded `iframe` elements from blueprintue.com.

## 5. Deployment Workflow
You have direct access to the user's local repository. The CI/CD pipeline is fully automated.

**To deploy changes to the live site:**
1.  Make your edits to the local files (use file editing tools).
2.  Use the `run_command` tool to execute git commands:
    ```powershell
    git add .
    git commit -m "Your descriptive commit message"
    git push
    ```
3.  Once pushed to the `master` branch, GitHub Actions will automatically build the Eleventy site and deploy it to GitHub Pages. It usually takes ~30 seconds.

## 6. CSS and Design Philosophy
*   **Dark Theme:** The site uses a sleek, dark aesthetic (`#121212` background) with glassmorphism effects (`backdrop-filter: blur()`).
*   **Typography:** It uses `IBM Plex Mono` for a programming-centric feel.
*   **Hover Effects:** The design relies heavily on smooth transitions (e.g., hovering over project thumbnails scales the image and reveals an overlay).
*   **Interactive Background:** The site features a `<canvas id="bg-canvas">` that renders a pixelated interactive background. Be careful with `z-index` and `pointer-events` to ensure the canvas doesn't block clicks on the actual content.

## 7. AI Agent Checklist Before Finishing a Task
- [ ] Did I make the text bilingual (`.lang-en` / `.lang-es`)?
- [ ] Did I respect the vanilla CSS architecture (no Tailwind)?
- [ ] Did I verify my HTML tags are properly closed?
- [ ] Did I commit and push to trigger the deployment?

---
*Generated by Antigravity.*
