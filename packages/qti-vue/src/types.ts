import { QtiRendererOptions } from '@ae-studio/qti-renderer';

/**
 * Props interface for QtiItem Vue component
 */
export interface QtiItemProps {
  xml: string;
  options?: QtiRendererOptions;
}
