# LearnCS Landing Page Maintenance

## Current Status
Initiating controlled final UX repair pass.

## Architecture / Important Files
- `frontend/components/marketing/adaptive-engine-section.tsx`: Adaptive engine scroll animation.
- `frontend/components/marketing/hero-section.tsx`: Intro section.
- `frontend/components/marketing/knowledge-graph-section.tsx`: Knowledge map graph visualization.

## Completed Changes

### Adaptive Engine
- **What was wrong (Dot targeting):** The moving dot was present but stuck at 0% due to incorrect GSAP static DOM caching.
- **What was changed (Dot targeting):** Updated GSAP targeting to use `q(".moving-dot")`. The dot now smoothly traverses the track based on scroll progress.
- **What was wrong (Visual Indicator):** The indicator was a white circular dot. The user requested an elegant glowing horizontal line/bar instead.
- **What was changed (Visual Indicator):** Changed `.moving-dot` styling from `w-4 h-4 rounded-full` to `h-1 w-12 md:w-16 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.9),_0_0_24px_rgba(255,255,255,0.4)]` to create a sleek glowing horizontal pill that acts like a progress marker.
- **Verification result:** Verified visually. The line smoothly moves along the track.

### Hero/Intro
- **What was wrong:** The layout was `h-[200vh]` with an inner `sticky h-screen` child. It forced all content to fit inside a single viewport height, causing the top badge and bottom stats to be permanently clipped on 100% zoom displays.
- **What was changed:** Removed the `h-screen` and `overflow-hidden` constraints. The section is now a clean `min-h-screen` with `pt-32 pb-24`. The GSAP exit timeline was adjusted to `start: "top top"` and `end: "bottom top"` to match the new normal scrolling flow.
- **Verification result:** Verified visually. The content now acts as a proper tall section and no elements are hidden or clipped.

### Knowledge Graph
- **What was wrong:** The layout used `paddingBottom: "62%"` causing the graph height to scale out of the viewport on wide screens. Nodes were clipped at the top and bottom. The transition text overlapped the bottom nodes.
- **What was changed:** Separated the title, graph container, and transition text into three distinct Flexbox layers (`flex-col justify-between pt-12 pb-12`). Gave the graph area a `flex-1` role to fill the safe vertical space without strict width-based aspect ratios. Adjusted `ROW_POSITIONS` to distribute nodes cleanly between 6% and 94%. Reduced initial graph scale to `1.05`. Increased total scroll height to `600vh` to slow down the animation.
- **Verification result:** Verified visually. The title, all nodes (18 total), and the transition text are perfectly visible without clipping or overlapping at 100% browser zoom.

## Known Issues
- Hero section content is clipped/hidden at 100% zoom.
- Knowledge Map is squeezed and needs vertical expansion, graph logic fixes, and a text toggle.

## Verification Checklist
- [x] Phase 0 - Inspect
- [x] Phase 1 - Adaptive Engine
- [x] Phase 2 - Hero/Intro
- [x] Phase 3 - Knowledge Map structure
- [x] Phase 4 - Knowledge Map interaction
- [ ] Phase 5 - Full page visual audit
- [ ] Phase 6 - Final validation
