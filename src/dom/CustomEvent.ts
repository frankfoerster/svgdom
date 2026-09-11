import { Event } from './Event.js';
export class CustomEvent extends Event {
  declare detail: unknown;
  declare cancelable: boolean;

  constructor(
    name: string,
    props: { detail?: unknown; cancelable?: boolean } = {}
  ) {
    super(name);
    this.detail = props.detail || null;
    this.cancelable = props.cancelable || false;
  }
}
