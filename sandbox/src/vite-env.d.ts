/// <reference types="vite/client" />

declare module 'lucide/dist/esm/lucide/src/lucide.js' {
  export const createElement: (iconNode: unknown, attrs?: Record<string, unknown>) => SVGElement;
  export const CheckCircle: unknown;
  export const Play: unknown;
  export const Sun: unknown;
  export const Moon: unknown;
}

declare module '*?inline' {
  const content: string;
  export default content;
}
