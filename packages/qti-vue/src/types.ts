import type { AssessmentResult } from "@qti-renderer/core";

/**
 * Props interface for QtiItem Vue component
 */
export interface QtiItemProps {
  xml: string;
  onResponseChange?: (responses: Record<string, string | string[]>) => void;
  onAssessmentResult?: (result: AssessmentResult) => void;
}
