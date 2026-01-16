// Export React wrapper (for React-based Storybook)
export { VueQtiItemWrapper } from './QtiItemWrapper';
export type { VueQtiItemWrapperProps } from './QtiItemWrapper';

// Note: Vue component (QtiItem.vue) is available in src/ for direct import in Vue projects
// It cannot be exported from compiled dist due to TypeScript limitations with .vue files
