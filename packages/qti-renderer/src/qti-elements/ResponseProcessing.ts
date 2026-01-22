import { BaseQtiElement } from './BaseQtiElement';
import { QtiRenderer } from '../renderer';
import { EmptyElement } from '../types';
import { dispatchSubmitRenderEvent, EventsEnum, onQti3PlayerEvent } from '../events';

/**
 * XML Schema type: ResponseProcessingDType
 * Response processing is the process by which the Delivery Engine assigns outcomes based on
 * the candidate's responses. The outcomes may be used to provide feedback to the candidate.
 * Feedback is either provided immediately following the end of the candidate's attempt or it
 * is provided at some later time, perhaps as part of a summary report on the item session.
 * The end of an attempt, and therefore response processing, must only take place in direct
 * response to a user action or in response to some expected event, such as the end of a tes-
 * t. An item session that enters the suspended state may have values for the response varia-
 * bles that have yet to be submitted for response processing.
 */
export class ResponseProcessing extends BaseQtiElement {
  static readonly elementNames = ['qti-response-processing'];
  static readonly canBeRoot = false;

  process(renderer: QtiRenderer): EmptyElement {
    onQti3PlayerEvent(EventsEnum.SUBMIT_PROCESS_EVENT, () => {
      renderer.processElementChildren(this.element, null);
      dispatchSubmitRenderEvent();
    });
    return {
      type: 'empty',
    };
  }
}
