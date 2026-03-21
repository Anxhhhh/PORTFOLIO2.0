# Our Works UI Upgrade Guide

This repository now includes an upgraded **Our Works** section in the frontend portfolio experience.

The section is designed so that:

- clicking **PROJECTS** opens a dedicated projects showcase,
- clicking **HACKATHON** opens a placeholder panel,
- clicking **ACHIEVEMENTS** opens a placeholder panel,
- the projects panel uses a **horizontal scrolling card rail**,
- every opened panel includes a **Go Back** button,
- hackathon and achievements currently display **“Not here yet, but soon.”**,
- projects currently use **3 placeholder projects** until real content is available.

---

## Project location

The implementation lives in:

- `frontend/src/App.jsx`

The app is a React + Vite frontend using:

- React
- Framer Motion
- Tailwind CSS
- Lucide React icons

---

## What was added

### 1. New “Our Works” section
A new section was added below the Skills block. It acts like a mini content navigator.

Default state:
- shows 3 clickable category cards:
  - `PROJECTS`
  - `HACKATHON`
  - `ACHIEVEMENTS`

Interactive state:
- when a user clicks a category, that category’s content panel opens,
- a **Go Back** button appears so the user can return to the category selection screen.

---

## 2. Projects panel behavior
The **Projects** view now contains:

- a heading,
- support text,
- left/right arrow buttons,
- a horizontally scrollable row of 3 placeholder project cards.

### Horizontal scrolling effect
The horizontal scroll effect is created using:

- a flex container,
- `overflow-x-auto`,
- `snap-x` and `snap-mandatory` for smooth card snapping,
- programmatic scroll buttons using `scrollBy()`.

### Placeholder projects currently used
The 3 placeholder cards are:

1. `Nova Commerce`
2. `Pulse Board`
3. `Echo Space`

Each card includes:
- category,
- year,
- title,
- summary,
- stack badges,
- a visual CTA.

---

## 3. Hackathon and Achievements behavior
For now, the **Hackathon** and **Achievements** sections intentionally show a placeholder state.

They display:
- a heading,
- a supporting label,
- the message:
  - **Not here yet, but soon.**

This makes the UI feel complete now while still being ready for real content later.

---

## 4. Back button behavior
The **Go Back** button appears only after a user opens a section.

When clicked, it:
- resets the active section state,
- hides the open panel,
- returns the user to the 3-card category selector.

---

## Implementation breakdown

## Step 1: Add state for active section
Use React state to track which panel is currently open.

Example idea:

- `null` = no panel open
- `projects` = projects panel open
- `hackathon` = hackathon panel open
- `achievements` = achievements panel open

This is what controls the section switching behavior.

---

## Step 2: Create content configuration objects
Define reusable objects/arrays for:

- section labels,
- section descriptions,
- placeholder project card content.

This keeps the UI scalable and avoids hardcoding everything directly inside JSX.

Recommended structure:

- one object for the 3 section definitions,
- one array for the 3 placeholder project cards.

---

## Step 3: Render category cards first
In the default layout:

- show a heading like `Our Works`,
- show 3 equal cards/buttons,
- each card should set the active section when clicked.

Recommended UX details:
- large text,
- hover feedback,
- subtle border/glow,
- consistent spacing,
- strong contrast for readability.

---

## Step 4: Conditionally render the opened panel
When a category is selected:

- hide the card selector,
- show the relevant content section,
- display the **Go Back** button.

This is achieved through conditional rendering.

Suggested logic:
- if no active section → show selector cards,
- if active section exists → show the chosen panel.

---

## Step 5: Build the projects horizontal rail
Inside the Projects panel:

- create a horizontal flex row,
- give each card a fixed/minimum width,
- enable `overflow-x-auto`,
- add scroll snap classes,
- hide the scrollbar if desired,
- attach a `ref` to the rail container.

### Why use a `ref`
A `ref` allows the left/right buttons to control scrolling.

Pseudo approach:

1. create `projectRailRef`,
2. attach it to the scroll container,
3. call `projectRailRef.current.scrollBy(...)` on button click.

---

## Step 6: Add previous/next controls
Use two buttons:

- left arrow → scroll left,
- right arrow → scroll right.

Recommended behavior:
- scroll by roughly 70–85% of the rail width,
- use `behavior: 'smooth'` for premium motion.

This gives the section a polished horizontal showcase experience.

---

## Step 7: Add motion/transition polish
Framer Motion is used for:

- entrance animations,
- switching between selector and detail panel,
- smooth panel transitions,
- subtle card reveal effects.

Best practice used here:
- `AnimatePresence` for section transitions,
- small `y` offset + opacity fade,
- fast but smooth easing curve.

---

## Step 8: Style the placeholder states
The non-project sections should still look intentional.

Recommended placeholder UI:
- center-aligned panel,
- subtle dashed border or glass effect,
- icon,
- “Coming Soon” label,
- clear short message.

This avoids empty-looking sections while keeping future expansion easy.

---

## Step 9: Replace placeholder content later
When real content is ready:

### To replace Projects
Update the `placeholderProjects` array with:
- real project names,
- real summaries,
- real years,
- real tech stack,
- real links or case studies.

### To replace Hackathon/Achievements
Convert their placeholder panels into:
- lists,
- card grids,
- timelines,
- or horizontally scrollable rails similar to Projects.

---

## Exact developer workflow to run locally

## Install dependencies
From the repository root:

```bash
cd frontend
npm install
```

## Start the development server
```bash
npm run dev
```

## Build for production
```bash
npm run build
```

## Lint the code
```bash
npm run lint
```

---

## Suggested future improvements

If you want to push this UI further, here are good next steps:

### Content improvements
- replace placeholder project text with real portfolio work,
- add project thumbnails/mockups,
- add live demo links and GitHub links,
- add hackathon event names, ranks, and problem statements,
- add achievements with dates and categories.

### UI improvements
- add active tab highlight,
- add drag-to-scroll support on desktop,
- add progress indicator for the project rail,
- add keyboard navigation for left/right scroll,
- add modal/detail drawer for each project,
- add autoplay or scroll-linked animation.

### Accessibility improvements
- keep buttons as real `<button>` elements,
- ensure clear `aria-label` values,
- preserve keyboard focus states,
- maintain strong color contrast,
- make section transitions readable and not too fast.

---

## Quick summary of the final result

After this upgrade, the **Our Works** section now works like this:

1. user sees 3 category cards,
2. clicking a category opens its respective panel,
3. Projects opens a horizontally scrollable 3-card showcase,
4. Hackathon and Achievements show “Not here yet, but soon.”,
5. user can press **Go Back** to return to the main category cards.

---

## If you want to customize it next

The fastest files/areas to edit are:

- `frontend/src/App.jsx` → all current UI logic and content
- project placeholder array → change project cards
- section config object → change labels and descriptions

If needed later, the next clean refactor would be:
- move `OurWorks` into its own component file,
- move project data into a separate constants file,
- add reusable `SectionCard` and `ProjectCard` components.

