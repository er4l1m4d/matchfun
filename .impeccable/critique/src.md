# MatchFun Design Critique

**Target:** src (all pages + styles)
**Date:** 2026-07-10
**Score:** 24/40 (Acceptable)

## Heuristic Scores

| # | Heuristic | Score |
|---|-----------|-------|
| 1 | Visibility of System Status | 3 |
| 2 | Match System / Real World | 4 |
| 3 | User Control and Freedom | 2 |
| 4 | Consistency and Standards | 4 |
| 5 | Error Prevention | 1 |
| 6 | Recognition Rather Than Recall | 3 |
| 7 | Flexibility and Efficiency of Use | 1 |
| 8 | Aesthetic and Minimalist Design | 4 |
| 9 | Error Recovery | 1 |
| 10 | Help and Documentation | 1 |

## Anti-Patterns

- **bounce-easing** in design-system.css:154 — toggle thumb uses bounce easing, tonally mismatched
- **overused-font** in global.css:5 — Inter flagged as overused, functional but not distinctive

## Priority Issues

### P1: No confirmation before locking predictions
- MatchView.tsx `handleConfirm` locks instantly with no undo
- Highest-trust moment in the app has least safeguards

### P1: No keyboard navigation or focus management
- No tabindex, no :focus-visible styles on interactive elements
- Bottom nav, segment controls, prediction tiles are click-only

### P2: Empty states are generic
- "No NFTs in this category" provides no guidance
- Live filter empty shows blank screen instead of upcoming matches

### P2: No contextual help on odds/streaks/predictions
- First-time users see odds with no explanation
- Streak mechanics unexplained

### P3: Bounce easing on toggle feels tonally wrong
- --ease-bounce on toggle thumb clashes with stadium-serious tone

## What's Working

1. Three-signal-color system (orange/teal/yellow) with disciplined job assignment
2. Prediction tile interaction model (tap → selected → locked)
3. Component vocabulary consistency across all 9 pages

## Cognitive Load

- 2 failed items (moderate): mobile page density, prediction tile width on 2-option markets
- Primary task flow is well-structured: one decision at a time, minimal choices

## Persona Red Flags

- **Casey (Mobile):** Confirm button mid-screen, not in thumb zone
- **Sam (A11y):** Prediction tiles are div+onClick with no ARIA roles
- **Riley (Stress):** No loading state on confirm, no network error handling
