import stages from './stages.json';
export const STAGE_DEFINITIONS = stages;
export function getStageDefinition(stage) { return STAGE_DEFINITIONS[(stage - 1 + STAGE_DEFINITIONS.length) % STAGE_DEFINITIONS.length]; }
export function getStageGimmicks(stage) { return getStageDefinition(stage).gimmicks || []; }
