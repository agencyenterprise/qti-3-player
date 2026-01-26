import { QtiRendererOptions } from '@qti-renderer/core';

/**
 * Props interface for QtiItem Vue component
 */
export interface QtiItemProps {
  xml: string;
  options?: QtiRendererOptions;
}
