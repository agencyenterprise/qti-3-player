/**
 * Shared QTI 3.x XML examples
 *
 * All framework implementations (React, Vue, Vanilla JS) import examples from this file
 * to ensure consistency across Storybook stories.
 */

export { docsExample } from './docs-example';
export { mathQuestion } from './math-question';
export { planetsQuestion } from './planets-question';
export { modalFeedbackQuestion } from './modal-feedback';
export { inlineFeedbackQuestion } from './inline-feedback';
export { unlimitedChoicesQuestion } from './unlimited-choices';
export { choiceLayout } from './choice-layout';
export { textEntryInteraction } from './text-entry.interaction';
export { mapResponse } from './map-response';

// Backward compatibility
export { planetsQuestion as marsQuestion } from './planets-question';
export { planetsQuestion as exampleQtiXml } from './planets-question';
