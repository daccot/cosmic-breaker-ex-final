Cosmic Breaker EX - TypeScript Phase 6

Phase 6 changes:
- State split into gameplay / ui / combat / input segments
- Weapon behavior moved to src/data/weaponDefinitions.ts
- Ball trait behavior moved to src/data/ballTraitDefinitions.ts
- Stage data moved to src/data/stages.json
- Stage wrapper remains in src/data/stageDefinitions.ts
- dist/main.js remains the runtime entry

Phase 7:
- generic drop interpreter moved to systems/dropInterpreter.ts
- stage gimmicks added to stages.json
- weapon definitions moved to data/weaponDefinitions.json
- ball render definitions moved to data/ballTraitRenderDefinitions.ts


Phase 8 additions:
- Stage gimmick interpreter
- Stage auto weapons
- Block resistances
- Stage drop biases
- Trait affinity modifiers
- Multiball rebalance


Phase 9:
- Hostile gimmick interpreter
- Block definitions moved to JSON
- Stage patterns and playful layouts
- Resistance block destruction effects
- Warning UI cards
- Reduced multiball power


Phase 10 updates:
- Block-type abilities
- Hostile gimmick dedicated effects
- Stage-specific audio themes
- Boss block support


v20.26c simplified mode: hostile gimmicks and upper enemy walkers disabled.
