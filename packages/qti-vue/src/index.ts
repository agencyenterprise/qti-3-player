// Export Vue component (for Vue projects)
export { default as QtiItem } from './QtiItem.vue';

// Also export as default for convenience
export { default } from './QtiItem.vue';

// Export types separately (TypeScript can't extract types from .vue files)
export type { QtiItemProps } from './types';
