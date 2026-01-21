export const SUBMIT_PROCESS_EVENT = 'qti-submit-process';
export const SUBMIT_RENDER_EVENT = 'qti-submit-render';

export enum EventsEnum {
  SUBMIT_PROCESS_EVENT = 'qti-3-player:submit-process',
  SUBMIT_RENDER_EVENT = 'qti-3-player:submit-render',
}

export function dispatchSubmitProcessEvent(): void {
  document.dispatchEvent(new CustomEvent(EventsEnum.SUBMIT_PROCESS_EVENT));
}

export function dispatchSubmitRenderEvent(): void {
  document.dispatchEvent(new CustomEvent(EventsEnum.SUBMIT_RENDER_EVENT));
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
