import { ValueElement } from './types';

export const SUBMIT_PROCESS_EVENT = 'qti-submit-process';
export const SUBMIT_RENDER_EVENT = 'qti-submit-render';
export const AFTER_RENDER_EVENT = 'qti-after-render';
export const AFTER_VALIDATE_EVENT = 'qti-after-validate';

export enum EventsEnum {
  SUBMIT_PROCESS_EVENT = 'qti-3-player:submit-process',
  SUBMIT_RENDER_EVENT = 'qti-3-player:submit-render',
  AFTER_RENDER_EVENT = 'qti-3-player:after-render',
  AFTER_VALIDATE_EVENT = 'qti-3-player:after-validate',
}

export type SubmitProcessEventDetail = {
  outcomeValues: Map<string, ValueElement>;
  answers: Map<string, ValueElement>;
};

export class SubmitProcessEvent extends CustomEvent<SubmitProcessEventDetail> {
  constructor(type: string, detail: SubmitProcessEventDetail) {
    super(EventsEnum.SUBMIT_PROCESS_EVENT, { detail });
  }
}

export function dispatchSubmitProcessEvent(
  outcomeValues: Map<string, ValueElement>,
  answers: Map<string, ValueElement>
): void {
  document.dispatchEvent(
    new SubmitProcessEvent(EventsEnum.SUBMIT_PROCESS_EVENT, {
      outcomeValues,
      answers,
    })
  );
}

export function dispatchSubmitRenderEvent(): void {
  document.dispatchEvent(new CustomEvent(EventsEnum.SUBMIT_RENDER_EVENT));
}

export function dispatchAfterRenderEvent(): void {
  document.dispatchEvent(new CustomEvent(EventsEnum.AFTER_RENDER_EVENT));
}

export function dispatchAfterValidateEvent(): void {
  document.dispatchEvent(new CustomEvent(EventsEnum.AFTER_VALIDATE_EVENT));
}

export function onQti3PlayerEvent(
  event: EventsEnum,
  callback: () => void,
  element: HTMLElement | null = null
): void {
  if (element) {
    element.addEventListener(event, callback);
  } else {
    document.addEventListener(event, callback);
  }
}
