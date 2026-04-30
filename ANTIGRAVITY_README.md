# Antigravity Task Brief: Make Portfolio Fully Responsive

## Goal
Update this portfolio so it is fully responsive across modern devices without changing the core visual identity.

## Project Scope
- **Frontend path:** `frontend/`
- **Do not edit backend files** unless strictly required for frontend build/runtime compatibility.

## What “Responsive” Means for This Project
Antigravity should implement and verify the following:

1. **Mobile-first layout strategy**
   - Start from small screens (~320px) and progressively enhance for larger breakpoints.
   - Ensure no horizontal scrolling at any breakpoint.

2. **Core breakpoints to support**
   - 320px (small phones)
   - 375px / 390px (modern phones)
   - 768px (tablets)
   - 1024px (small laptops)
   - 1280px+ (desktop)

3. **Typography and spacing responsiveness**
   - Use fluid sizing (`clamp`) where appropriate.
   - Prevent text overflow/wrapping issues.
   - Maintain readable line lengths and consistent vertical rhythm.

4. **Navigation responsiveness**
   - Provide a clear mobile navigation pattern (hamburger/drawer/dropdown).
   - Ensure keyboard accessibility and focus visibility.

5. **Section/component behavior**
   - Hero section scales without clipping.
   - Cards, grids, and project tiles collapse gracefully (e.g., multi-column to single-column).
   - Buttons and interactive controls have adequate tap targets (>=44px preferred).

6. **Media handling**
   - Images/videos/icons should scale with containers (`max-width: 100%`, proper object-fit usage).
   - Avoid layout shift where possible.

7. **Accessibility while adapting responsiveness**
   - Preserve semantic structure.
   - Ensure color contrast remains acceptable across states.
   - Keep visible focus styles.

8. **Performance constraints**
   - Avoid unnecessary heavy dependencies.
   - Prefer CSS solutions over JS when possible for layout responsiveness.

## Technical Guidelines
- Keep existing component structure where possible.
- Refactor CSS/classes for responsiveness in a maintainable way.
- If using utility classes/framework conventions already in the repo, stay consistent.
- Add concise comments only where behavior is non-obvious.

## Acceptance Criteria
Antigravity should consider the task complete when:

- [ ] No horizontal overflow on supported breakpoints.
- [ ] Navigation is usable on both mobile and desktop.
- [ ] Major sections render correctly at 320px, 768px, and 1280px.
- [ ] Text remains readable and not clipped/overlapping.
- [ ] Media scales correctly without distortion.
- [ ] Lighthouse mobile checks show no critical responsive/accessibility regressions.

## Suggested Validation Steps
From the frontend directory:

```bash
npm install
npm run dev
```

Then manually test in browser devtools at the target widths above.

Optional production check:

```bash
npm run build
npm run preview
```

## Deliverables Expected from Antigravity
1. Updated frontend code implementing responsiveness.
2. Short changelog summarizing what was adjusted.
3. List of tested breakpoints + any known limitations.
